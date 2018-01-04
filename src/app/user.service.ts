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

  signUp(info) {
    var user = new Parse.User();
    user.set('username', info.email);
    user.set('email', info.email);
    user.set('password', info.password);
    user.set('nome', info.nome);
    user.set('aluno', false);

    return user.signUp();
  }

  logout() {
    return Parse.User.logOut();
  }

}
