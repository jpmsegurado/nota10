import { Injectable } from '@angular/core';
import * as Parse from 'parse';

declare var uploadcare;

@Injectable()
export class ConteudoService {



  constructor() { }

  uploadFile() {

    return new Promise((resolve, reject) => {
      let widget = uploadcare.openDialog(null, {
        previewStep: true,
      });
  
      widget.done((info) => {
        info.then((file) => {
          resolve(file);
        }, (err) => {
          reject(err);
        });
      });
    });
  }

  get(turmaId) {
    const query = new Parse.Query('Conteudo');
    const Turma = Parse.Object.extend('Turma');
    const turma = new Turma();
    turma.id = turmaId;
    query.equalTo('turma', turma);
    return query.find().then(resp => resp.map(item => item.toJSON()));
  }

  add(turmaId, fileId, nome) {
    const Conteudo = Parse.Object.extend('Conteudo');
    const Turma = Parse.Object.extend('Turma');
    const conteudo = new Conteudo();
    const turma = new Turma();
    turma.id = turmaId;
    conteudo.set('turma', turma);
    conteudo.set('fileId', fileId);
    conteudo.set('nome', nome);
    return conteudo.save();
  }

  update(cont) {
    const query = new Parse.Query('Conteudo');
    query.equalTo('objectId', cont.objectId);
    return query.first().then((item) => {
      item.set('nome', cont.nome);
      return item.save();
    });
  }

  delete(id) {
    const Conteudo = Parse.Object.extend('Conteudo');
    const conteudo = new Conteudo();
    conteudo.id = id;
    return conteudo.destroy();
  }

}
