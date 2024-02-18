import { Injectable } from "@angular/core";
import { UserService } from "../modules/user/services/user.service";
import { Actions } from "@ngrx/effects";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private userService: UserService) {}
              
}