import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isJournalist: boolean = false;
  fullName: string = '';

  constructor(
    private userService: UserService,
    private authorizationService: AuthorizationService,
    private route: Router
  ) {}

  ngOnInit() {
    this.fullName =
      this.userService.user.firstName + this.userService.user.lastName;
    this.isAdmin = this.userService.isAdmin();
    this.isJournalist = this.userService.isJournalist();
  }

  logout() {
    this.authorizationService.logout();
  }

  navigateToUsers(): void {
    this.route.navigate([
      `${ConstRouteService.home}/${ConstRouteService.userDashboard}`,
    ]);
  }
  navigateToProfile(): void {
    this.route.navigate([
      `${ConstRouteService.home}/${ConstRouteService.profile}`,
    ]);
  }
  navigateToArticles(): void {
    this.route.navigate([
      `${ConstRouteService.home}/${ConstRouteService.articles}`,
    ]);
  }
  navigateToMyArticles(): void {
    this.route.navigate([
      `${ConstRouteService.home}/${ConstRouteService.myArticles}/` +
        this.userService.user.id,
    ]);
  }

  navigateToTags(): void {
    this.route.navigate([
      `${ConstRouteService.home}/${ConstRouteService.tags}`,
    ]);
  }
}
