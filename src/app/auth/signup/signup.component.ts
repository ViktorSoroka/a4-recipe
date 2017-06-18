import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('f') signupForm;

  constructor(private authService: AuthService) {
  }

  public ngOnInit() {
  }

  public onSignup() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.authService.signupUser(email, password);
  }
}
