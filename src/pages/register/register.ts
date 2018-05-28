import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

import { User } from '../../model/user';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    profile = {} as User;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private afAuth: AngularFireAuth) {

  }

  async register(newUser: User) {
      try {
          const result = await this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password);
          console.log("Register Success, Data: " + JSON.stringify(result));
          this.navCtrl.push(ProfilePage);
      }
      catch(e) {
          console.error(JSON.stringify(e));
      }
  }

}
