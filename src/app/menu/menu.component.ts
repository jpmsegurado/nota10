import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menu: Array<any> = [{
    title: 'Turmas',
    path: '/turmas',
  }];

  public path: String;
  public user: any = {};

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService
  ) {
    this.user = this.userService.getCurrentUser();
    console.log(this.user);
  }

  ngOnInit() {
    this.route.url.subscribe((params) => {
      this.path = params[0].path;
      console.log(this.path);
      if(this.path !== 'login') {
        if(!this.userService.getCurrentUser()) {
          this.router.navigate(['login']);
        }
      }
    });
  }

  logout() {
    this.userService.logout().then(() => this.router.navigate(['login']));
  }

}
