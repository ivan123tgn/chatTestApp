import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { TodoScreenComponent } from './todo-screen/todo-screen.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

const todoRoutes: Routes = [
  {
    path: '',
    component: TodoScreenComponent
  }
]

@NgModule({
  declarations: [
    TodoScreenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(todoRoutes),
    MatCardModule,
    MatButtonModule
  ]
})
export class TodoModule { }
