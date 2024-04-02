import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SocketConnection, SocketConnectionDocument } from '../../models/socket-connection.model';
import { Model } from 'mongoose';
import { CacheService } from '../cache/cache.service';
import { Socket } from 'socket.io';
import { OwnerRoom, OwnerRoomDocument } from '../../models/owner-rooms.model';
import { BroadcastSession, BroadcastSessionDocument } from '../../models/broadcast-session.model';

@Injectable()
export class SessionService {
  constructor(@InjectModel(SocketConnection.name) private sessionModel: Model<SocketConnection>,
              @InjectModel(OwnerRoom.name) private rooms: Model<OwnerRoom>,
              @InjectModel(BroadcastSession.name) private broadcasts: Model<BroadcastSession>,
              private cache: CacheService) {}

  async handleClientConnected(clientId: string): Promise<string | void> {
    console.log(`client ${clientId} connected`)
    const userId = await this.getUserFromClientId(clientId);
    if (userId) {
      await this.setUserId(userId);
    }
    return userId
  }
  
  async handleClientDisconnected(clientId: string): Promise<void> {
    console.log(`client ${clientId} disconnected`)
    const userId = await this._getClientUserId(clientId);
    let response: SocketConnectionDocument | undefined;

    if (userId) {
      response = await this.sessionModel.findOne({userId})
      if (response.clientIds) {
        response.clientIds = response.clientIds.filter((id) => id !== clientId);
        await response.save();
      }
    } else {
      await this.sessionModel.updateMany({ clientIds: { "$in": [clientId] }}, { $pull: { clientIds: clientId }, lastUpdated: new Date()});
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
    }
    await broadcast.save();

    return broadcast.toObject();
  }

  async setUserId(clientId: string, id?: string): Promise<string> {
    console.log(`set user id`, clientId, id)
    let response: SocketConnectionDocument | undefined;
    let userId: string | undefined;

    if (id) {
      response = await this.sessionModel.findOne({ userId: id })
    } else {
      userId = await this._getClientUserId(clientId);
      if (userId) {
        response = await this.sessionModel.findOne({ userId })
      }
    }
    if (response) {
      if (id && id !== response.userId) {
        response.userId = id;
      }
      if (response.clientIds) {
        if (!response.clientIds.find((val) => val === clientId)) {
          response.clientIds = [...response.clientIds, clientId];
        }
      } else {
        response.clientIds = [ clientId ];
      }
      response = await response.save();
      userId = response.userId;
    } else {
      let newSession = new this.sessionModel({ userId: id, clientIds: [ clientId ] });
      newSession = await newSession.save();
      userId = newSession.userId;
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
    const response = await this.sessionModel.findOne({clientIds: clientId})
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

  private _getClientUserId(clientId: string): Promise<string | undefined> {
    return this.cache.get(`client_to_user_map_${clientId}`) as Promise<string | undefined>
  }


}
