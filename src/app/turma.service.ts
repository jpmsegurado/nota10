import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import shortid from 'shortid';

@Injectable()
export class TurmaService {

  constructor() { }

  getTurmas() {
    const user = Parse.User.current();
    const query = new Parse.Query('Turma');
    query.equalTo('professor', user);
    return query.find().then(turmas => turmas.map(turma => turma.toJSON()));
  }

  get(id) {
    const query = new Parse.Query('Turma');
    query.equalTo('objectId', id);
    return query.first().then(item => item.toJSON());
  }

  delete(id) {
    const query = new Parse.Query('Turma');
    query.equalTo('objectId', id);
    return query.first().then(item => item.destroy());
  }

  getAtividades(turmaId) {
    const query = new Parse.Query('Atividade');
    const Turma = Parse.Object.extend('Turma');
    const turma = new Turma();
    turma.id = turmaId;
    query.equalTo('turma', turma);
    return query.find().then(resp => resp.map(item => item.toJSON()));
  }

  add(turma, id?) {
    const Turma = Parse.Object.extend('Turma');
    const newTurma = new Turma();
    if (id) newTurma.id = id;
    if (!id) newTurma.set('chave', shortid().toUpperCase());
    newTurma.set('nome', turma.nome);
    newTurma.set('alunos', turma.alunos);
    newTurma.set('professor', Parse.User.current());
    return newTurma.save();
  }

  addAtividade(atividade, turmaId, id?) {
    const Atividade = Parse.Object.extend('Atividade');
    const newAtividade = new Atividade();
    if (id) newAtividade.id = id;
    const Turma = Parse.Object.extend('Turma');
    const turma = new Turma();
    turma.id = turmaId;
    newAtividade.set('turma', turma);
    newAtividade.set('nome', atividade.nome);
    newAtividade.set('descricao', atividade.descricao);
    newAtividade.set('questoes', atividade.questoes);
    return newAtividade.save();
  }

  getAtividade(id) {
    const query = new Parse.Query('Atividade');
    query.equalTo('objectId', id);
    return query.first().then(item => item.toJSON());
  }

  getAnswers(atividadeId) {
    const query = new Parse.Query('Resposta');
    const Atividade = Parse.Object.extend('Atividade');
    const atividade = new Atividade();
    atividade.id = atividadeId;
    query.equalTo('atividade', atividade);
    query.include('aluno');
    return query.find().then(res => res.map(item => item.toJSON()));
  }

  deleteAtividade(id) {
    const query = new Parse.Query('Atividade');
    query.equalTo('objectId', id);
    return query.first().then(item => item.destroy());
  }

  insertAluno(aluno, turmaId) {
    const Inscricao = Parse.Object.extend('Inscricao');
    const Turma = Parse.Object.extend('Turma');
    const inscricao = new Inscricao();
    const turma = new Turma();
    const user = new Parse.User();
    user.id = aluno.objectId;
    turma.id = turmaId;
    inscricao.set('aluno', user);
    inscricao.set('turma', turma);
    return inscricao.save();
  }

  getAlunos(turmaId) {
    const query = new Parse.Query('Inscricao');
    const Turma = Parse.Object.extend('Turma');
    const turma = new Turma();
    turma.id = turmaId;
    query.include('aluno');
    query.equalTo('turma', turma);
    return query.find().then(res => res.map(item => item.toJSON().aluno));
  }

  deleteAluno(aluno, turmaId) {
    const query = new Parse.Query('Inscricao');
    const userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo('objectId', aluno.objectId);
    return userQuery.find().then((user) => {
      const Turma = Parse.Object.extend('Turma');
      const turma = new Turma();
      turma.id = turmaId;
      query.equalTo('aluno', user[0]);
      query.equalTo('turma', turma);
      return query.first().then(item => item.destroy());
    });
  }

}
