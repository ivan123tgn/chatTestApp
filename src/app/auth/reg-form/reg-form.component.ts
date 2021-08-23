import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {

    this.form = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    if (!!localStorage.getItem('userId')) {
      this.router.navigateByUrl('/chat');
    };
  }

  signUp() {
    this.auth.mailPasswordReg(this.form.value.email, this.form.value.password);
  }

}
