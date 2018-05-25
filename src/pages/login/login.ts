import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";

import { User } from '../../model/user';
import { RegisterPage } from '../register/register';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    user = {} as User;

  constructor(private auth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User) {
      try {
          const result = await this.auth.auth.signInWithEmailAndPassword(user.email, user.password);
          console.log(result);
          if(result) {
              this.navCtrl.setRoot(HomePage);
          }
          
      } catch(e) {
          console.error(e);
          
      }

  }

  register() {
      this.navCtrl.push('RegisterPage');
  }

}
