import { Component, OnInit, NgZone } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlunoService } from '../aluno.service';
import { TurmaService } from '../turma.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConteudoService } from '../conteudo.service';

@Component({
  selector: 'app-add-turma',
  templateUrl: './add-turma.component.html',
  styleUrls: ['./add-turma.component.css']
})
export class AddTurmaComponent implements OnInit {

  public turma: any = { nome: '' };
  public atividades: Array<any> = [];
  public conteudos: Array<any> = [];
  private closeResult: string;
  public text: String = '';
  public loading: Boolean = false;
  public searching: Boolean = false;
  public alunos: Array<any>;
  public modal: any;
  public loadingInfo: Boolean = false;
  public params: any = {};

  constructor(
    private modalService: NgbModal,
    private alunoService: AlunoService,
    private turmaService: TurmaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public conteudoService: ConteudoService,
    public zone: NgZone,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.loadingInfo = true;
      this.params = params;
      this.turmaService.get(params.id).then((turma) => {
        this.turma = turma;

        this.turmaService.getAtividades(params.id).then((atividades) => {
          this.atividades = atividades;
          this.conteudoService.get(params.id).then((conteudos) => {
            this.conteudos = conteudos;
            this.turmaService.getAlunos(params.id).then((alunos) => {
              this.turma.alunos = alunos;
              console.log(alunos);
              this.loadingInfo = false;
            }, () => {
              this.loadingInfo = false;
            })
          }, () => {
            this.loadingInfo = false;
          })
        }, () => {
          this.loadingInfo = false;
        })

      }, () => {
        this.loadingInfo = false;
      });
    });
  }

  upload() {
    this.conteudoService.uploadFile().then((file: any) => {
      this.conteudoService.add(this.turma.objectId, file.uuid, file.name).then((conteudo) => {
        this.conteudos.push(conteudo.toJSON());
      });
    });
  }

  changeName(conteudo) {
    if(conteudo.timeout) {
      window.clearTimeout(conteudo.timeout);
    }

    this.zone.run(() => {
      conteudo.timeout = setTimeout(() => {
        conteudo.loading = true;
        this.conteudoService.update(conteudo).then((cont) => {
          conteudo.loading = false;
          conteudo.saved = true;
          console.log(conteudo);
        });
      }, 300);
    })
  }

  deleteConteudo(conteudo, index) {
    conteudo.deletando = true;
    this.conteudoService.delete(conteudo.objectId).then((conteudo) => {
      this.conteudos.splice(index, 1);
    });
  }

  open(content) {
    delete this.alunos;
    this.text = '';
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  search(text) {
    this.searching = true;
    this.alunoService.procurarAlunos(text).then((alunos) => {
      this.alunos = alunos;
      this.searching = false;
    }, () => {
      this.searching = false;
    });
  }

  deletarAtividade(atividade, index) {
    atividade.deletando = true;
    this.turmaService.deleteAtividade(atividade.objectId).then(() => {
      atividade.deletando = false;
      this.atividades.splice(index, 1);
    }, () => {
      atividade.deletando = false;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  add() {
    this.loading = true;
    this.turmaService.add(this.turma, this.params.id).then((turma) => {
      this.router.navigate([`add-turma/${turma.id}`]);
    }, () => {
      this.loading = false;
    })
  }

  deletarAluno(aluno, index) {
    aluno.deleting = true;
    this.turmaService.deleteAluno(aluno, this.turma.objectId).then(() => {
      this.turma.alunos.splice(index, 1);
    }, () => aluno.deleting = false);
  }

  select(aluno) {
    if(!this.turma.alunos) this.turma.alunos = [];
    const index = this.turma.alunos.findIndex((user) => user.username === aluno.username)
    if(index === -1) this.turma.alunos.push({ id: aluno.objectId, username: aluno.username });
    this.modal.dismiss();
    this.turmaService.insertAluno(aluno, this.turma.objectId)
  }

}
