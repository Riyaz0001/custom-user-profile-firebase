import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user';
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    user = {} as User;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private auth: AngularFireAuth) {

  }

  async register(user: User) {
      try {
          const result = await this.auth.auth.createUserWithEmailAndPassword(user.email, user.password);
          console.log(result);
          
      }
      catch(e) {
          console.error(e);
      }
  }

}
