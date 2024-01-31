import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { UpdateUserModel } from 'src/app/Models/Dtos/UpdateUserModel';
import { UserExtendedModel } from 'src/app/Models/Dtos/UserExtendedModel';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil-management',
  templateUrl: './profil-management.component.html',
  styleUrls: ['./profil-management.component.scss'],
})
export class ProfilManagementComponent
  extends CommonComponent
  implements OnInit
{
  user: UserExtendedModel;
  userToUpdate: UpdateUserModel = new UpdateUserModel();
  spinner = true;

  isAdmin = false;

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    isAdmin: new FormControl(false),
    isJournalist: new FormControl(false),
  });

  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public snackbar: MatSnackBar
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      let id = params['id'];
      this.isAdmin = this.userService.isAdmin();
      this.userService
        .getUserById(id)
        .pipe(
          takeUntil(this.localNgUnsubscribe),
          map((x) => {
            this.user = x;
            this.userForm.controls['email'].setValue(this.user.email);
            this.userForm.controls['firstName'].setValue(this.user.firstName);
            this.userForm.controls['lastName'].setValue(this.user.lastName);
            this.userForm.controls['isAdmin'].setValue(
              this.user.roles.includes('Admin')
            );
            this.userForm.controls['isJournalist'].setValue(
              this.user.roles.includes('Journalist')
            );
          })
        )
        .subscribe(() => {
          this.spinner = false;
        });
    });
  }

  save(): void {
    if (!this.userForm.valid) {
      this.snackbar.open('no valid form', undefined, {
        duration: 3000,
      });
      return;
    }

    let data = new UpdateUserModel();
    data.email = this.userForm.get('email').value;
    data.firstName = this.userForm.get('firstName').value;
    data.lastName = this.userForm.get('lastName').value;
    data.isAdmin = this.userForm.get('isAdmin').value;
    data.isJournalist = this.userForm.get('isJournalist').value;

    this.userService.updateUser(this.user.id, data).subscribe(() => {
      this.router.navigate([
        `${ConstRouteService.home}/${ConstRouteService.userDashboard}`,
      ]);
    });
  }
}
