import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('f') signupForm;

  constructor(private authService: AuthService) { }

  public ngOnInit() {
  }

  public onSignin() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.authService.signinUser(email, password);
  }
}

