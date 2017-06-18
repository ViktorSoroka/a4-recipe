import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';


@Injectable()
export class AuthService {
  public isFirstPageLoad = true;
  private token = null;

  constructor(private router: Router) {
  }

  public signupUser(email: string, password: string): void {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(e => console.error(e));
  }

  public signinUser(email: any, password: string): void {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken().then((token) => {
          this.token = token;
        });
      })
      .catch(e => console.error(e));
  }

  public signoutUser(): void {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/signin']);
  }

  public isAuthenticated(): boolean {
    return this.token !== null;
  }

  public getToken(): string {
    if (!firebase.auth().currentUser) {
      return this.token;
    }

    firebase.auth().currentUser.getToken().then((token) => {
      this.token = token;
    });

    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }
}
