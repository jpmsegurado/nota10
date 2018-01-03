import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable()
export class UserService {

  constructor() {

  }

  signIn(email, password) {
    return Parse.User.logIn(email, password);
  }

  getCurrentUser() {
    const user = Parse.User.current();
    return user ? user.toJSON() : null;
  }

}
