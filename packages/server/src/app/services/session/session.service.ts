import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SocketConnection, SocketConnectionDocument } from '../../models/socket-connection.model';
import { Model } from 'mongoose';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class SessionService {
  constructor(@InjectModel(SocketConnection.name) private sessionModel: Model<SocketConnection>,
              private cache: CacheService) {}

  async setUserId(clientId: string, id?: string): Promise<string> {
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
    await this._saveClientUserIdMap(clientId, userId);
    return userId;
  }

  async handleClientDisconnected(clientId: string): Promise<void> {
    const userId = await this._getClientUserId(clientId);
    let response: SocketConnectionDocument | undefined;

    if (userId) {
      response = await this.sessionModel.findOne({userId})
      if (response.clientIds) {
        response.clientIds = response.clientIds.filter((id) => id !== clientId);
        await response.save();
      }
    } else {
      await this.sessionModel.updateMany({ clientIds: { "$in": [clientId] }}, { $pull: { clientIds: clientId }});
      await this.sessionModel.deleteMany({clientIds: { $exists: true, $size: 0 }});
    }
  }

  private _saveClientUserIdMap(clientId: string, userId: string): Promise<void> {
    return this.cache.set(`client_to_user_map_${clientId}`, userId, 60);
  }

  private _getClientUserId(clientId: string): Promise<string | undefined> {
    return this.cache.get(`client_to_user_map_${clientId}`) as Promise<string | undefined>
  }


}
