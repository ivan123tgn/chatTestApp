import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: UserInfoComponent}]),
    MatButtonModule
  ]
})
export class ChatModule {}
