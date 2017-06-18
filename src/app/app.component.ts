import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD0mGIXWCGngappuoP3MeBP_oe296dgroY',
      authDomain: 'ng-recipe-983de.firebaseapp.com',
    });
  }
}
