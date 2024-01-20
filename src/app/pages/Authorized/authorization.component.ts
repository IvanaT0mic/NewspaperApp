import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/Models/Dtos/UserModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  user: UserModel = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.user;
  }
}
