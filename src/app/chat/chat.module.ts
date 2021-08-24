import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { StartDialogComponent } from './start-dialog/start-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { DialogListComponent } from './dialog-list/dialog-list.component';
import { DialogItemComponent } from './dialog-item/dialog-item.component';
import { StoreModule } from '@ngrx/store';
import {dialogsReducer} from "./reducers";
import {ChatService} from "./services/chat.service";
import {EffectsModule} from "@ngrx/effects";
import {ChatEffects} from "./chat.effects";
import {DialogsResolver} from "./dialogs.resolver";
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageItemComponent } from './message-item/message-item.component';

export const chatRoutes: Routes = [{
  path: '',
  component: UserInfoComponent,
  resolve: {
   dialogs: DialogsResolver
    }
  },
  {
    path: 'dialog/:dialogId',
    component: DialogInfoComponent
  }
];

@NgModule({
  declarations: [
    UserInfoComponent,
    StartDialogComponent,
    DialogListComponent,
    DialogItemComponent,
    DialogInfoComponent,
    MessageListComponent,
    MessageItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(chatRoutes),
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    StoreModule.forFeature('chat', dialogsReducer),
    EffectsModule.forFeature([ChatEffects])
  ],
  providers: [
    ChatService,
    DialogsResolver
  ]
})
export class ChatModule {}
