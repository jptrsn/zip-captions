import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class PatreonOAuthGuard extends AuthGuard('patreon') {

  handleRequest(err, obj, info) {
    console.log('Patreon OAuth Guard handle request', info, obj)
    if (info) {
      console.log('info', info);
    }
    if (obj) {
      console.log('obj', obj);
    }
    // console.log(info);
    if (err) {
      console.log('throwing err', err)
      throw err;
    }
    return obj;
  }
}