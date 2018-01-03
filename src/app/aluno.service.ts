import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable()
export class AlunoService {

  constructor() { }

  procurarAlunos(text) {
    const query = new Parse.Query(Parse.User);
    query.contains('email', text);
    return query.find().then(res => res.map(item => item.toJSON()));
  }

}
