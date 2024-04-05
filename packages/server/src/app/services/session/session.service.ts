import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SocketConnection, SocketConnectionDocument } from '../../models/socket-connection.model';
import { Model } from 'mongoose';
import { CacheService } from '../cache/cache.service';
import { OwnerRoom, OwnerRoomDocument } from '../../models/owner-rooms.model';
import { BroadcastSession, BroadcastSessionDocument } from '../../models/broadcast-session.model';

@Injectable()
export class SessionService {
  constructor(@InjectModel(SocketConnection.name) private socketConnections: Model<SocketConnection>,
              @InjectModel(OwnerRoom.name) private rooms: Model<OwnerRoom>,
              @InjectModel(BroadcastSession.name) private broadcasts: Model<BroadcastSession>,
              private cache: CacheService) {}

  async getUserIdForNewClientConnection(clientId: string): Promise<string | void> {
    console.log(`client ${clientId} connected`)
    const userId = await this.getUserFromClientId(clientId);
    if (userId) {
      await this.setUserId(userId);
    }
    return userId
  }
  
  async handleClientDisconnected(clientId: string): Promise<BroadcastSession[] | null> {
    console.log(`client ${clientId} disconnected`)
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

  async getBroadcastSession(clientId: string, payload: { room?: string, myBroadcast?: boolean}): Promise<BroadcastSession> {
    const userId = await this._getClientUserId(clientId);
    if (!userId) {
      throw new Error(`Cannot determine client user ${clientId}`);
    }

    let room: OwnerRoomDocument;
    let broadcast: BroadcastSessionDocument;
    // If we know what room user wants
    if (payload.room) {
      // Check if user is hosting
      if (payload.myBroadcast) {
        // Hosting or re-joining an existing broadcast room
        room = await this.rooms.findOne({ userId, roomId: payload.room });
        broadcast = await this.broadcasts.findOne({ roomId: room.roomId, hostUserId: userId })
      } else {
        // Joining a room as a viewer
        room = await this.rooms.findOne({ roomId: payload.room});
        broadcast = await this.broadcasts.findOne({roomId: payload.room})
      }
    // If we don't know what room, check if user is hosting
    } else if (payload.myBroadcast) {
      // The user is hosting, do we have an existing room for them?
      room = await this.rooms.findOne({ userId });
      broadcast = await this.broadcasts.findOne({ hostUserId: userId })
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
      broadcast = new this.broadcasts({ hostUserId: userId, hostClientId: clientId, roomId: room.roomId, startTime: new Date() })
    } else if (broadcast.endTime && payload.myBroadcast) {
      broadcast.endTime = undefined;
      broadcast.startTime = new Date();
    }
    await broadcast.save();

    return broadcast.toObject();
  }

  async endBroadcastSession(clientId: string, payload: { room: string}): Promise<BroadcastSession> {
    const userId = await this._getClientUserId(clientId);
    if (!userId) {
      throw new Error(`Cannot determine client user ${clientId}`);
    }
    const broadcast: BroadcastSessionDocument = await this.broadcasts.findOne({roomId: payload.room});
    broadcast.endTime = new Date();
    await broadcast.save();
    return broadcast.toObject();
  }

  async setUserId(clientId: string, id?: string): Promise<string> {
    // console.log(`set user id`, clientId, id)
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
        console.log('User ID changed')
        connection.userId = id;
      }
      if (connection.clientIds) {
        if (!connection.clientIds.find((val) => val === clientId)) {
          // New client ID for this user's connection
          // console.log('New client ID for existing user');
          const broadcasts = await this.broadcasts.updateMany({ hostUserId: connection.userId }, { hostClientId: clientId });
          if (broadcasts.matchedCount) {
            console.log(`${broadcasts.matchedCount} broadcast host client IDs updated`)
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
    return await this.rooms.find(query ? {...query, userId} : {userId})
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
      currentValue += prefix.charCodeAt(i)
    }
    return !!(currentValue % 2)
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
      // console.log('found connection user ID from DB')
      await this._cacheClientUserIdMap(clientId, conn.userId);
      return conn.userId;
    } 
    return undefined;
  }


}
