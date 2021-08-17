import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { LoginFormComponent } from './login-form/login-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { RegFormComponent } from './reg-form/reg-form.component';
import {AuthService} from "../services/auth.service";
import { StoreModule } from '@ngrx/store';
import {authReducer} from "./reducers";

const routes: Routes = [
  {
    path: 'reg',
    component: RegFormComponent
  },
  {
    path: '',
    component: LoginFormComponent
  }
];

@NgModule({
  declarations: [
    LoginFormComponent,
    RegFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    StoreModule.forFeature('auth', authReducer),
  ],
  exports: [
    LoginFormComponent
  ],
  providers: []

})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule
    };
  }
}
