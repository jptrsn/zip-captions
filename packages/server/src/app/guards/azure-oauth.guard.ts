import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AzureOAuthGuard extends AuthGuard('azure') {
  handleRequest(err, obj, info) {
    console.log('azure oauth guard', err, obj, info)
    // You can throw an exception based on either "info" or "err" arguments
    if (err) {
      throw err;
    }
    return obj;
  }
}