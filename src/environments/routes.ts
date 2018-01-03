import { LoginComponent } from "../app/login/login.component";
import { DashboardComponent } from "../app/dashboard/dashboard.component";
import { TurmasComponent } from "../app/turmas/turmas.component";
import { AddTurmaComponent } from "../app/add-turma/add-turma.component";
import { AddAtividadeComponent } from "../app/add-atividade/add-atividade.component";
import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'turmas', component: TurmasComponent },
    { path: 'add-turma/:id', component: AddTurmaComponent },
    { path: 'add-turma', component: AddTurmaComponent },
    { path: 'add-atividade/:turma', component: AddAtividadeComponent },
    { path: 'add-atividade/:turma/:id', component: AddAtividadeComponent },
];