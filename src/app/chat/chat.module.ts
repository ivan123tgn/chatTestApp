import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { StartDialogComponent } from './start-dialog/start-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { DialogListComponent } from './dialog-list/dialog-list.component';
import { DialogItemComponent } from './dialog-item/dialog-item.component';
import { StoreModule } from '@ngrx/store';
import * as fromDialogs from './reducers';

@NgModule({
  declarations: [
    UserInfoComponent,
    StartDialogComponent,
    DialogListComponent,
    DialogItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: UserInfoComponent}]),
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    StoreModule.forFeature(fromDialogs.dialogsFeatureKey, fromDialogs.reducers)
  ]
})
export class ChatModule {}
