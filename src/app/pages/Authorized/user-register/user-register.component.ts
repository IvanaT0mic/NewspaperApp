import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { CreateUserModel } from 'src/app/Models/Dtos/CreateUserModel';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent extends CommonComponent implements OnInit {
  newUser: CreateUserModel = new CreateUserModel();
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false),
    isJournalist: new FormControl(false),
  });

  constructor(private userService: UserService, private router: Router) {
    super();
  }
  ngOnInit() {
    this.newUser.firstName = '';
    this.newUser.lastName = '';
    this.newUser.email = '';
    this.newUser.password = '';
    this.newUser.isAdmin = false;
    this.newUser.isJournalist = false;
  }

  save(): void {
    if (!this.userForm.valid) {
      //TODO
      console.log('popup not valid');
      return;
    }

    this.newUser.firstName = this.userForm.get('firstName').value;
    this.newUser.lastName = this.userForm.get('lastName').value;
    this.newUser.email = this.userForm.get('email').value;
    this.newUser.password = this.userForm.get('password').value;

    this.userService
      .registerUser(this.newUser)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe((res) => {
        this.router.navigate([`${ConstRouteService.userDashboard}`]);
      });
  }
}
