import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { LoginFormComponent } from './login-form/login-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { RegFormComponent } from './reg-form/reg-form.component';
import {AuthService} from "./auth.service";

const routes: Routes = [
  {
    path: 'reg',
    component: RegFormComponent
  }
];

@NgModule({
  declarations: [
    LoginFormComponent,
    RegFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: LoginFormComponent}]),
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [
    LoginFormComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule
    };
  }
}
