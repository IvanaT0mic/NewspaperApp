import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleDashboardComponent } from './article-dashboard/article-dashboard.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { AuthorizedRoutingModule } from './authorization-routing.module';
import { CreateArticleComponent } from './create-article/create-article.component';
import { PrivateArticlesComponent } from './private-articles/private-articles.component';
import { ProfilManagementComponent } from './profil-management/profil-management.component';
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
    ArticleDashboardComponent,
    ArticleEditComponent,
    CreateArticleComponent,
    PrivateArticlesComponent,
    ProfilManagementComponent,
    TagManagementComponent,
    UserManagemenComponent,
    UserRegisterComponent,
  ],
  exports: [CommonModule, ReactiveFormsModule],
})
export class AuthorizedModule {}
