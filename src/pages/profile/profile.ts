import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

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
        //   const afList = this.afDatabase.list(`${auth.uid}`);
        //   afList.push(this.profile);
        //   const listObservable = afList.snapshotChanges();
        //   listObservable.subscribe(() => this.navCtrl.setRoot(HomePage));

        this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
            .then(() => this.navCtrl.setRoot(HomePage))

      })
  }

}
