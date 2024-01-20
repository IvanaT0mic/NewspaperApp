import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAdminComponent } from './pages/contact-admin/contact-admin.component';
import { LoginComponent } from './pages/login/login.component';
import { ConstRouteService } from './services/const/const-route.service';

const routes: Routes = [
  {
    path: ConstRouteService.login,
    component: LoginComponent,
  },
  {
    path: ConstRouteService.contactAdmin,
    component: ContactAdminComponent,
  },
  {
    path: ConstRouteService.home,
    loadChildren: () =>
      import('./pages/Authorized/authorization.module').then(
        (x) => x.AuthorizedModule
      ),
  },

  { path: '', redirectTo: ConstRouteService.login, pathMatch: 'full' },
  { path: '**', redirectTo: ConstRouteService.login },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
