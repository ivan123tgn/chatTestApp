import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: UserInfoComponent}]),
  ]
})
export class ChatModule {}
