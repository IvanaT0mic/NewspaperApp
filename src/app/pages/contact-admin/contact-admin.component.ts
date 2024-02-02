import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactAdminModel } from 'src/app/Models/Dtos/ContantAdminModel';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.scss'],
})
export class ContactAdminComponent implements OnInit {
  body: string;
  title: string;
  username: string;
  bodyEmpty: boolean = false;
  titleEmpty: boolean = false;
  passEmpty: boolean = false;

  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    title: ['', Validators.required],
    body: ['', Validators.required],
  });

  constructor(
    private authorizationService: AuthorizationService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  navigateAfterSubmit() {
    if (this.authorizationService.isAuthorizated) {
      if (this.userService.user == null) {
        this.router.navigate([`/${ConstRouteService.login}`]);
      }
    }
    this.router.navigate([
      `/${ConstRouteService.home}/${ConstRouteService.articles}`,
    ]);
  }

  submit(): void {
    if (this.contactForm.invalid) {
      return;
    }
    const credentials = new ContactAdminModel();
    credentials.email = this.contactForm.value.email;
    credentials.title = this.contactForm.value.title;
    credentials.body = this.contactForm.value.body;

    this.userService.contactAdmin(credentials).subscribe((res) => {
      this.navigateAfterSubmit();
    });
  }
}
