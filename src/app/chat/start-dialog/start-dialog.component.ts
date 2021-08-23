import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'start-dialog',
  templateUrl: './start-dialog.component.html',
  styleUrls: ['./start-dialog.component.css']
})
export class StartDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder) {

    this.form = fb.group({
      to: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  onDialogStart() {

  }

}
