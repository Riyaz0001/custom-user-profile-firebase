import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
// import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database-deprecated";
import { Profile } from '../../model/profile';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

    profileData: FirebaseObjectObservable<Profile>

  constructor(
      private afAuth: AngularFireAuth,
      private afDatabase: AngularFireDatabase,
      public navCtrl: NavController, 
      public navParams: NavParams, 
      private toast: ToastController) {
  }

  ionViewWillLoad(){
      this.afAuth.authState.subscribe(data => {
          if(data.email && data.uid) {  
              this.toast.create({
                  message: `Welcome to EidSMS, ${data.email}`,
                  duration: 3000
                }).present();

                this.profileData = this.afDatabase.object(`profile/${data.uid}`);
            
            } else {
                this.toast.create({
                    message: `Could not find authentication details.`,
                    duration: 3000
                }).present();
            }
        });
  }

    signOut(){
        this.afAuth.auth.signOut().then(res => {
            this.navCtrl.setRoot("LoginPage"); // or somewhere else
        });
    }

}
