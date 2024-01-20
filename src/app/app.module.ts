import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './pages/Authorized/authorization.component';
import { ContactAdminComponent } from './pages/contact-admin/contact-admin.component';
import { LoginComponent } from './pages/login/login.component';
import { InterceptorService } from './services/Interceptor.service';
import { AuthorizationService } from './services/authorization.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,

    //Pages
    LoginComponent,
    ContactAdminComponent,
    AuthorizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: getCurrentUser,
      deps: [AuthorizationService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      // useFactory: function (authService: AuthorizationService) {
      //   return new InterceptorService(authService);
      // },
      deps: [AuthorizationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function getCurrentUser(authorizationService: AuthorizationService) {
  return (): Observable<void> => {
    return of(authorizationService.initService());
  };
}
