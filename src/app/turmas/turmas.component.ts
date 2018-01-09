import { Component, OnInit, ViewChild } from '@angular/core';
import { TurmaService } from '../turma.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { UserService } from '../user.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {

  public turmas: Array<any> = [];
  public loading: Boolean = false;
  @ViewChild('content') private content;

  constructor(
    public turmaService: TurmaService,
    public userService: UserService,
    public router: Router,
    public modalService: NgbModal,
  ) { }

  add() {
    this.router.navigate(['add-turma']);
  }

  alertBeta() {
    const user = this.userService.getCurrentUser();
    if(user.seenAlert) return;
    const modal = this.modalService.open(this.content);
    this.userService.seenAlert();
  }

  ngOnInit() {

    this.alertBeta();

    this.loading = true;
    this.turmaService.getTurmas().then((turmas) => {
      this.loading = false;
      this.turmas = turmas;
    });
  }

  deletar(turma, index) {
    turma.deletando = true;
    this.turmaService.delete(turma.objectId).then(() => {
      this.turmas.splice(index, 1);
    }, () => {
      turma.deletando = false;
    });
  }

}
