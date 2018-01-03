import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { TurmaService } from '../turma.service';
import { Router, ActivatedRoute } from '@angular/router';
import groupBy from 'lodash/fp/groupBy';

declare var window;

@Component({
  selector: 'app-add-atividade',
  templateUrl: './add-atividade.component.html',
  styleUrls: ['./add-atividade.component.css']
})
export class AddAtividadeComponent implements OnInit {

  private modal: any;
  private atividade: any = {};
  private question: any = {};
  private newAlt = '';
  public params: any = {};
  public loading: Boolean = false;
  public loadingInfo: Boolean = false;
  public data: any = [];
  public type: any;
  public options: any;
  public respostas: any = [];
  public selected: any = {};

  constructor(
    private modalService: NgbModal,
    private turmaService: TurmaService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.params = params;
      if (params.id) {
        this.loadingInfo = true;
        this.turmaService.getAtividade(params.id).then((atividade) => {
          this.loadingInfo = false;
          this.atividade = atividade;

          this.turmaService.getAnswers(params.id).then((respostas: Array<any>) => {
            this.respostas = respostas;
            respostas.forEach((resp) => {
              let nota = 0;
              resp.questoes.forEach((questao) => {
                const right = questao.alternativas[questao.selected].correct;
                if (right) nota = nota + 1;
              });
              this.data.push({ nota });
            });

            let data = groupBy(item => item.nota)(this.data);
            const labels = Object.keys(data).map((item) => {
              const nota = parseInt(item);
              return `${((nota / this.atividade.questoes.length) * 100).toFixed(0)}%`;
            });
            data = Object.keys(data).map(item => data[item]);
            for (let prop in data) {
              data[prop] = data[prop].length;
            }

            this.initChart(data, labels);

          });

        }, () => {
          this.loadingInfo = false;
        });
      }
    });
  }

  openRespostas(content, resposta) {
    this.selected = resposta;
    this.modal = this.modalService.open(content);
  }

  getNota(resp) {
    let nota = 0;
    resp.questoes.forEach((questao) => {
      const right = questao.alternativas[questao.selected].correct;
      if (right) nota = nota + 1;
    });

    return `${((nota / this.atividade.questoes.length) * 100).toFixed(0)}%`
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  initChart(data, labels) {
    const colors = labels.map(() => this.getRandomColor())
    this.type = 'pie';
    this.data = {
      labels,
      datasets: [
        {
          label: "% de alunos",
          data: data,
          backgroundColor: colors
        }
      ],
    };
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  open(content) {
    this.modal = this.modalService.open(content);
  }

  addAlt(newAlt) {
    if (!this.question.alternativas) this.question.alternativas = [];
    this.question.alternativas.push({
      text: newAlt,
      correct: false,
    });

    this.newAlt = '';
  }

  addQuestao(question) {
    if (!this.atividade.questoes) this.atividade.questoes = [];
    this.atividade.questoes.push(question);
    this.question = {};
    this.modal.dismiss();
  }

  select(alternativa, index, question?) {
    if (!question) {
      this.question.alternativas = this.question.alternativas.map((item, i) => {
        item.correct = i === index;
        return item;
      });
    } else {
      question.alternativas = question.alternativas.map((item, i) => {
        item.correct = i === index;
        return item;
      });
    }
  }

  add(atividade) {
    this.loading = true;
    const turma = this.params.turma;
    const id = this.params.id;
    this.turmaService.addAtividade(atividade, turma, id).then((ativ) => {
      this.router.navigate([`add-turma/${turma}`]);
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  atividadeInvalida(atividade) {
    if (!atividade.nome || atividade.nome.length === 0) return true;
    if (!atividade.questoes || atividade.questoes.length === 0) return true;

    for (let questao of atividade.questoes) {
      if (questao.alternativas.length <= 1) return true;
    }

    return false;
  }

  isInvalid(question) {
    if (!question.enunciado || question.enunciado.length === 0) return true;
    if (!question.alternativas || question.alternativas.length <= 1) return true;

    const index = question.alternativas.findIndex((alt) => {
      return alt.correct === true;
    });

    if (index === -1) return true;
  }

}
