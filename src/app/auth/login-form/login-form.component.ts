import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {

    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    if (!!localStorage.getItem('userId')) {
      this.router.navigateByUrl('/chat');
    };
  }

  signIn() {
    this.auth.login(this.form.value.email, this.form.value.password);
  }

  googleSignIn() {
    this.auth.loginGoogle();
  }

  githubSignIn() {
    this.auth.loginGithub();
  }

}
