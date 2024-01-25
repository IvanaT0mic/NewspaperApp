import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { UserModel } from 'src/app/Models/Dtos/UserModel';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-managemen',
  templateUrl: './user-managemen.component.html',
  styleUrls: ['./user-managemen.component.scss'],
})
export class UserManagemenComponent extends CommonComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'username',
    'fullname',
    'email',
    'actions',
  ];
  dataSource: Array<UserModel> = new Array();

  constructor(private userService: UserService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.userService
      .getAllUsers()
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe((res) => {
        this.dataSource = res;
      });
  }

  editUser(id: number): void {
    this.router.navigate([
      `${ConstRouteService.home}/${ConstRouteService.profile}/` + id,
    ]);
  }

  viewActivity(id: number): void {
    this.router.navigate([
      `${ConstRouteService.home}/${ConstRouteService.myArticles}/` + id,
    ]);
  }

  addUser(): void {
    this.router.navigate([
      `${ConstRouteService.home}/${ConstRouteService.register}`,
    ]);
  }
}
