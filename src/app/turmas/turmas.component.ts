import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../turma.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {

  public turmas: Array<any> = [];
  public loading: Boolean = false;

  constructor(
    public turmaService: TurmaService,
    public router: Router,
  ) { }

  add() {
    this.router.navigate(['add-turma']);
  }

  ngOnInit() {
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
