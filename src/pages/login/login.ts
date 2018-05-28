import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';

import { User } from '../../model/user';
import { RegisterPage } from '../register/register';
// import { ProfilePage } from '../profile/profile';
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
          //console.log('Login Success, Data: ' + JSON.stringify(result));
          if(result) {
              this.navCtrl.setRoot(HomePage);
          }
          
      } catch(e) {
          console.error(e);
          
      }

  }

  loginWithGoogle() {
      let fireAuthGoogle = new firebase.auth.GoogleAuthProvider();
      this.auth.auth.signInWithPopup(fireAuthGoogle)
          .then(data => {
              console.log("Google+ Login Success, Data: " + JSON.stringify(data));
              
          }).catch(e => console.error("Google+ Login Error: " + JSON.stringify(e)));
  }

  loginWithFacebook() {
    let fireAuthFacebook = new firebase.auth.FacebookAuthProvider();
    this.auth.auth.signInWithPopup(fireAuthFacebook)
        .then(data => {
            console.log("Facebook Login Success, Data: " + JSON.stringify(data));
            
        }).catch(e => console.error("Facebook Login Error: " + JSON.stringify(e)));
    }

  register() {
      this.navCtrl.push(RegisterPage);
  }

}
