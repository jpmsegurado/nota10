import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routes } from '../environments/routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import * as Parse from 'parse';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { TurmasComponent } from './turmas/turmas.component';
import { TurmaService } from './turma.service';
import { AddTurmaComponent } from './add-turma/add-turma.component';
import { NgbModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AlunoService } from './aluno.service';
import { AddAtividadeComponent } from './add-atividade/add-atividade.component';
import { BlankStateComponent } from './blank-state/blank-state.component';
import { ChartModule } from 'angular2-chartjs';
import { ConteudoService } from './conteudo.service';
import { RegisterComponent } from './register/register.component';

Parse.serverURL = 'https://professor-server.herokuapp.com/parse';
Parse.initialize('9ac78096f6a609ac63227bc1ba09a004b8d513f7', '9ac78096f6a609ac63227bc1ba09a004b8d513f7');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    TurmasComponent,
    AddTurmaComponent,
    AddAtividadeComponent,
    BlankStateComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ChartModule,
  ],
  providers: [
    UserService,
    TurmaService,
    AlunoService,
    ConteudoService,
    NgbDropdown,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
