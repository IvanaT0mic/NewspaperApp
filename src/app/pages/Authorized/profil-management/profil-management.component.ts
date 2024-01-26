import { Component, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';

@Component({
  selector: 'app-profil-management',
  templateUrl: './profil-management.component.html',
  styleUrls: ['./profil-management.component.scss'],
})
export class ProfilManagementComponent
  extends CommonComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit() {}
}
