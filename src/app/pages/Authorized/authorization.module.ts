import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { AuthorizedRoutingModule } from './authorization-routing.module';
import { CreateArticleComponent } from './create-article/create-article.component';
import { TagManagementComponent } from './tag-management/tag-management.component';
import { UserManagemenComponent } from './user-managemen/user-managemen.component';
import { UserRegisterComponent } from './user-register/user-register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthorizedRoutingModule,
    SharedModule,
  ],
  declarations: [
    //PAGES
    ArticleEditComponent,
    CreateArticleComponent,
    TagManagementComponent,
    UserManagemenComponent,
    UserRegisterComponent,
  ],
  exports: [CommonModule, ReactiveFormsModule],
})
export class AuthorizedModule {}
