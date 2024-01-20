import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/Guards/auth.guard';
import { ConstRouteService } from 'src/app/services/const/const-route.service';
import { ArticleDashboardComponent } from './article-dashboard/article-dashboard.component';
import { AuthorizationComponent } from './authorization.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: ConstRouteService.articles,
        component: ArticleDashboardComponent,
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
