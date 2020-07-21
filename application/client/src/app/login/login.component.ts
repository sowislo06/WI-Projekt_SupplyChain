import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UserService } from '../_services/index';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})

export class LoginComponent {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private userService: UserService
  ) { }

  login(state: RouterStateSnapshot) {
    console.log("In login ()");
    this.loading = true;

    var user = {
      userid: this.model.userid,
      password: this.model.password,
      usertype: ""
    }

    this.apiService.id = this.model.userid;
    this.apiService.pwd = this.model.password;

    this.apiService.getUser().subscribe(res => {
      user.usertype = res['usertype'];
      this.userService.setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (res['usertype'] == "admin") {
        this.router.navigate(['users']);
        this.router.navigate(['/supervisor']);
      }
     else if (res['usertype'] == "Mitarbeiter"){
        this.router.navigate([res['usertype']]);
        this.router.navigate(['/employee']);
      }
      else if (res['usertype'] == "Einkauf"){
        this.router.navigate([res['usertype']]);
        this.router.navigate(['/procurement']);
      }
      else if (res['usertype'] == "Qualitätssicherung"){
        this.router.navigate([res['usertype']]);
        this.router.navigate(['/qualitymanagement']);
      }
      else if (res['usertype'] == "Verkauf"){
        this.router.navigate([res['usertype']]);
        this.router.navigate(['/retailer']);
      }
      else if (res['usertype'] == "Kunde"){
        this.router.navigate([res['usertype']]);
        this.router.navigate(['/customer']);
      }
      else if (res['usertype'] == "Leitung"){
        this.router.navigate([res['usertype']]);
        this.router.navigate(['/supervisor']);
      }
    }, error => {
      console.log(JSON.stringify(error));
      alert("Login failed: ");
      this.loading = false;
    });
  }
}
