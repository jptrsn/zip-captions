import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BroadcastSession, BroadcastSessionDocument } from '../../models/broadcast-session.model';
import { OwnerRoom, OwnerRoomDocument, OwnerRoomUpdate } from '../../models/owner-rooms.model';
import { SocketConnection, SocketConnectionDocument } from '../../models/socket-connection.model';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);
  constructor(@InjectModel(SocketConnection.name) private socketConnections: Model<SocketConnection>,
              @InjectModel(OwnerRoom.name) private rooms: Model<OwnerRoom>,
              @InjectModel(BroadcastSession.name) private broadcasts: Model<BroadcastSession>,
              private cache: CacheService) {}

  async getUserIdForNewClientConnection(clientId: string): Promise<string | void> {
    this.logger.log(`client ${clientId} connected`)
    const userId = await this.getUserFromClientId(clientId);
    if (userId) {
      await this.setUserId(userId);
    }
    return userId
  }
  
  async handleClientDisconnected(clientId: string): Promise<BroadcastSession[] | null> {
    this.logger.log(`client ${clientId} disconnected`)
    const userId = await this._getClientUserId(clientId);
    let response: SocketConnectionDocument | undefined;

    if (userId) {
      response = await this.socketConnections.findOne({userId})
      if (response.clientIds) {
        response.clientIds = response.clientIds.filter((id) => id !== clientId);
        await response.save();
      }
      return await this.broadcasts.find({ hostUserId: userId })
    } else {
      await this.socketConnections.updateMany({ clientIds: { "$in": [clientId] }}, { $pull: { clientIds: clientId }, lastUpdated: new Date()});
      return await this.broadcasts.find({ hostClientId: clientId })
    }
  }

  async getBroadcastSession(clientId: string, payload: { room?: string, myBroadcast?: boolean, allowAnonymous?: boolean}): Promise<BroadcastSession> {
    const userId = await this._getClientUserId(clientId);
    if (!userId) {
      throw new Error(`Cannot determine client user ${clientId}`);
    }

    // console.log(`get broadcast session for ${userId}`)
    let room: OwnerRoomDocument;
    let broadcast: BroadcastSessionDocument;
    // If we know what room user wants
    if (payload.room) {
      // Check if user is hosting
      if (payload.myBroadcast) {
        // Hosting or re-joining an existing broadcast room
        room = await this.rooms.findOne({ userId, roomId: payload.room });
        broadcast = await this.broadcasts.findOne({ roomId: payload.room, hostUserId: userId, endTime: undefined })
      } else {
        // Joining a room as a viewer
        console.log('joining as viewer', userId, payload.room);
        room = await this.rooms.findOne({ roomId: payload.room });
        broadcast = await this.broadcasts.findOne({roomId: payload.room, endTime: undefined });
        if (!broadcast) {
          console.log('searching for ended broadcast')
          broadcast = await this.broadcasts.findOne({roomId: payload.room}, null, { sort: { endTime: -1 } });
        }
        if (!broadcast) {
          throw new HttpException('Broadcast not found', HttpStatus.NOT_FOUND)
        }
        return broadcast.toObject();
      }
    // If we don't know what room, check if user is hosting
    } else if (payload.myBroadcast) {
      // The user is hosting, do we have an existing room for them?
      broadcast = await this.broadcasts.findOne({ hostUserId: userId, endTime: undefined, allowAnonymous: payload.allowAnonymous })
      if (broadcast) {
        room = await this.rooms.findOne({ userId });
      }
    } else {
      // No room ID specified, not hosting - no op
      throw new Error(`No room to join as viewer`);
    }

    // We are creating an ephemeral room for this session
    if (!room) {
      room = new this.rooms({ userId, roomId: this.generateRandomRoomId(false)});
      await room.save();
    }

    // Create the broadcast if not found
    if (!broadcast) {
      // console.log('creating new broadcast entry')
      broadcast = new this.broadcasts({ hostUserId: userId, hostClientId: clientId, roomId: room.roomId, startTime: new Date(), allowAnonymous: payload.allowAnonymous })
    } else if (broadcast.hostClientId !== clientId && broadcast.hostUserId == userId) {
      // console.log('updating broadcast host client ID')
      broadcast.hostClientId = clientId;
      broadcast.allowAnonymous = payload.allowAnonymous;
    }
    await broadcast.save();

    return broadcast.toObject();
  }

  async endBroadcastSession(clientId: string, payload: { room: string}): Promise<BroadcastSession> {
    const userId = await this._getClientUserId(clientId);
    if (!userId) {
      throw new Error(`Cannot determine client user ${clientId}`);
    }
    const broadcast: BroadcastSessionDocument = await this.broadcasts.findOne({roomId: payload.room, endTime: undefined });
    broadcast.endTime = new Date();
    await broadcast.save();
    return broadcast.toObject();
  }

  async setUserId(clientId: string, id?: string): Promise<string> {
    let connection: SocketConnectionDocument | undefined;
    let userId: string | undefined;

    if (id) {
      connection = await this.socketConnections.findOne({ userId: id })
    } else {
      userId = await this._getClientUserId(clientId);
      if (userId) {
        connection = await this.socketConnections.findOne({ userId })
      }
    }
    if (connection) {
      if (id && id !== connection.userId) {
        // User ID changed, user logged in/out
        connection.userId = id;
      }
      if (connection.clientIds) {
        if (!connection.clientIds.find((val) => val === clientId)) {
          // New client ID for this user's connection
          const broadcasts = await this.broadcasts.updateMany({ hostUserId: connection.userId, endTime: undefined }, { hostClientId: clientId });
          if (broadcasts.matchedCount) {
            this.logger.log(`${broadcasts.matchedCount} broadcast host client IDs updated`)
          }
          connection.clientIds = [...connection.clientIds, clientId];
        }
      } else {
        // New connection
        connection.clientIds = [ clientId ];
      }
      connection = await connection.save();
      userId = connection.userId;
    } else {
      let newSocketConnection = new this.socketConnections({ userId: id, clientIds: [ clientId ] });
      newSocketConnection = await newSocketConnection.save();
      userId = newSocketConnection.userId;
    }
    await this._cacheClientUserIdMap(clientId, userId);
    return userId;
  }

  async findUserRooms(userId: string, query?: Partial<OwnerRoom>): Promise<OwnerRoom[]> {
    return await this.rooms.find(query ? {...query, userId} : {userId}).sort([['isStatic', -1], ['createdAt', -1]])
  }

  async updateUserRooms(userId: string, rooms: OwnerRoomUpdate[]): Promise<OwnerRoom[]> {
    const updateRoomIds = rooms.map((room) => room.roomId);
    
    const broadcastingRooms = await this.broadcasts.find({roomId: [ updateRoomIds ], endTime: undefined })
    if (broadcastingRooms.length) {
      throw new HttpException(`Unable to update room with broadcast in progress.`, HttpStatus.CONFLICT);
    }

    const existingRooms = (await this.rooms.find({roomId: [updateRoomIds]})).reduce((acc, room) => {
      acc[room.roomId] = room;
      return acc;
    }, {} as {[roomId: string]: OwnerRoomDocument})
    
    const updates: OwnerRoom[] = [];

    for (const update of rooms) {
      const room = existingRooms[update.roomId] || new this.rooms({ userId });
      room.roomId = update.roomId;
      room.isStatic = !!update.isStatic;
      room.allowAnonymous = !!update.allowAnonymous;
      if (!this._validateRoomForUser(userId, room)) {
        throw new HttpException(`Invalid room update ${room.roomId}`, HttpStatus.BAD_REQUEST)
      }
      await room.save();
      updates.push(room.toObject())
    }
    return updates;
  }

  async updateUserRoom(userId: string, room: OwnerRoomUpdate): Promise<OwnerRoom> {
    const broadcastingRooms = await this.broadcasts.find({roomId: room.roomId, endTime: undefined })
    if (broadcastingRooms.length) {
      throw new HttpException(`Unable to update room with broadcast in progress.`, HttpStatus.CONFLICT);
    }

    let roomModel: OwnerRoomDocument = await this.rooms.findOne({userId, roomId: room.roomId});
    
    if (!roomModel) {
      roomModel = new this.rooms({
        userId,
        roomId: room.roomId,
        isStatic: room.isStatic,
        allowAnonymous: room.allowAnonymous
      })
    } else {
      roomModel.isStatic = room.isStatic;
      roomModel.allowAnonymous = room.allowAnonymous;
    }

    roomModel = await roomModel.save()
    return roomModel.toObject();
  }

  async getUserFromClientId(clientId: string): Promise<string | undefined> {
    const userId = await this._getClientUserId(clientId);
    if (userId) {
      return userId;
    }
    const response = await this.socketConnections.findOne({clientIds: clientId})
    if (response?.userId) {
      this._cacheClientUserIdMap(clientId, response.userId)
      return response.userId;
    }
  }

  getRoomIdsList(isStatic?: boolean): string[] {
    const list: string[] = [];
    for (let i = 0; i < 10; i++) {
      list.push(this.generateRandomRoomId(isStatic))
    }
    return list;
  }

  private _validateRoomForUser(userId: string, room: OwnerRoom): boolean {
    if (userId !== room.userId) {
      console.log(`room ${room.roomId} is not owned by ${userId}`);
      return false;
    }
    if (this._prefixIndicatesDynamic(room.roomId) !== !room.isStatic) {
      console.log(`room ${room.roomId} prefix indicates ${this._prefixIndicatesDynamic(room.roomId) ? 'dynamic' : 'static'} but property isStatic is ${room.isStatic}`)
      return false;
    }
    return true;
  }

  generateRandomRoomId(isStatic?: boolean): string {
    let outString: string;
    const outParts: string[] = [];
    const inOptions = 'acdefghjkmnpqrstuvwxyz2345679';
    
    outParts.push(this._generatePrefix(inOptions, isStatic));
    for (let i = 0; i < 2; i++) {
      outString = '';
      for (let j = 0; j < 4; j++) {
        outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
      }
      outParts.push(outString);
    }
    return outParts.join('-');
  }

  private _generatePrefix(inOptions: string, isStatic?: boolean): string {
    let outString: string;
    do {
      outString = '';
      for (let i = 0; i < 2; i++) {
        outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
      }
    } while (this._prefixIndicatesDynamic(outString) === !isStatic)
    return outString;
  }

  private _prefixIndicatesDynamic(prefix: string): boolean {
    if (prefix.length < 2) {
      throw new Error("Incorrect session ID prefix")
    }
    let currentValue = 0;
    for (let i = 0; i < 2; i++) {
      currentValue += prefix.charCodeAt(i);
    }
    return !!(currentValue % 2);
  }

  private _cacheClientUserIdMap(clientId: string, userId: string): Promise<void> {
    return this.cache.set(`client_to_user_map_${clientId}`, userId, 60 * 60 * 1000);
  }

  private async _getClientUserId(clientId: string): Promise<string | undefined> {
    const fromCache = await this.cache.get<string>(`client_to_user_map_${clientId}`);
    if (fromCache) {
      return fromCache;
    }
    const conn: SocketConnectionDocument | null = await this.socketConnections.findOne({clientIds: clientId});
    if (conn) {
      await this._cacheClientUserIdMap(clientId, conn.userId);
      return conn.userId;
    } 
    return undefined;
  }


}
