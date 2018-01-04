import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    nome: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
  });

  public loading: boolean = false;

  constructor(
    public userService: UserService,
    public router: Router,
  ) { }

  submit(form: FormGroup) {
    this.loading = true;
    this.userService.signUp(form.value).then(() => {
      this.router.navigate(['turmas']);
    })
  }

}
