import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from 'src/app/services/Guards/IsAdmin.guard';
import { AuthGuardService } from 'src/app/services/Guards/auth.guard';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { ArticleDashboardComponent } from './article-dashboard/article-dashboard.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { AuthorizationComponent } from './authorization.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { PrivateArticlesComponent } from './private-articles/private-articles.component';
import { ProfilManagementComponent } from './profil-management/profil-management.component';
import { TagManagementComponent } from './tag-management/tag-management.component';
import { UserManagemenComponent } from './user-managemen/user-managemen.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ViewArticleComponent } from './view-article/view-article.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
    canActivate: [AuthGuardService],
    children: [
      //navigatioon paths
      {
        path: ConstRouteService.articles,
        component: ArticleDashboardComponent,
      },
      {
        path: ConstRouteService.myArticles + '/:id',
        component: PrivateArticlesComponent,
      },
      {
        path: ConstRouteService.userDashboard,
        component: UserManagemenComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: ConstRouteService.tags,
        component: TagManagementComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: ConstRouteService.profile + '/:id',
        component: ProfilManagementComponent,
      },

      //separated pages
      {
        path: ConstRouteService.register,
        component: UserRegisterComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: ConstRouteService.createArticle,
        component: CreateArticleComponent,
      },
      {
        path: ConstRouteService.editArticle + '/:id',
        component: ArticleEditComponent,
      },
      {
        path: ConstRouteService.viewArticle + '/:id',
        component: ViewArticleComponent,
      },
      { path: '', redirectTo: ConstRouteService.articles, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizedRoutingModule {}
