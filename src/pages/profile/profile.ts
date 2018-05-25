import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
// import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { Profile } from '../../model/profile';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

    profile = {} as Profile;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      private afAuth: AngularFireAuth, 
      private afDatabase: AngularFireDatabase) {
  }

  createProfile() {
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
            .then(() => this.navCtrl.setRoot(HomePage))
      })
  }

}
