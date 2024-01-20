import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { LoginModel } from 'src/app/Models/Dtos/LoginModel';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends CommonComponent implements OnInit {
  password: string;
  username: string;
  userEmpty: boolean = false;
  passEmpty: boolean = false;
  loginInvalid: boolean = false;
  passRegex: RegExp = /^(?=.*[A-Z])(?=.*\d).+$/;

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private authorizationService: AuthorizationService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    if (this.authorizationService.isAuthorizated) {
      if (this.userService.user == null) {
        return;
      }
      this.loginInvalid = false;
      this.router.navigate([`/${ConstRouteService.home}`]);
    }
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const credentials = new LoginModel();
    credentials.username = this.loginForm.value.username;
    credentials.password = this.loginForm.value.password;

    this.loginApi(credentials);
  }

  loginApi(credentials: LoginModel): void {
    this.authorizationService.login(credentials).subscribe((res) => {
      this.loginInvalid = !res;
      if (res) {
        this.router.navigate([`/${ConstRouteService.home}`]);
      }
    });
  }

  navigateToContactUser(): void {
    this.router.navigate([`${ConstRouteService.contactAdmin}`]);
  }
}
