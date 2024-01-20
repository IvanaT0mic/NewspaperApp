import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-article-dashboard',
  templateUrl: './article-dashboard.component.html',
  styleUrls: ['./article-dashboard.component.scss'],
})
export class ArticleDashboardComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log(this.userService.user);
  }
}
