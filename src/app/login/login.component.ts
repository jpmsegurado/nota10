import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
  });

  public loading: Boolean = false;

  constructor(
    public userService: UserService,
    public router: Router,
  ) { 
    if(userService.getCurrentUser()) this.router.navigate(['/turmas']);
  }

  submit(form: FormGroup) {
    const email = form.value.email;
    const password = form.value.password;
    this.loading = true;
    this.userService.signIn(email, password).then(() => {
      this.loading = false;
      this.router.navigate(['/turmas']);
    }, () => {
      this.loading = false;
    })
  }

}
