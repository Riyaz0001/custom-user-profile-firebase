import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController, ToastController, MenuController } from "ionic-angular";

// Firebase services
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';

// Register & Home page
import { HomePage } from '../home/home';
import { RegisterPage } from "../register/register";
import { User } from '../../model/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    user = {} as User;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams, 
      public forgotCtrl: AlertController, 
      public menu: MenuController, 
      public toastCtrl: ToastController,
      private auth: AngularFireAuth ) {

          this.menu.swipeEnable(false);
        }

  // go to register page
  register() {
    this.navCtrl.setRoot(RegisterPage);
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
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
              return this.navCtrl.push(HomePage, data);
              
          }).catch(e => console.error("Google+ Login Error: " + JSON.stringify(e)));
  }

  loginWithFacebook() {
    let fireAuthFacebook = new firebase.auth.FacebookAuthProvider();
    this.auth.auth.signInWithPopup(fireAuthFacebook)
        .then(data => {
            console.log("Facebook Login Success, Data: " + JSON.stringify(data));
            
        }).catch(e => console.error("Facebook Login Error: " + JSON.stringify(e)));
    }

    loginWithTwitter() {
        let fireAuthtwitter = new firebase.auth.TwitterAuthProvider();
        this.auth.auth.signInWithPopup(fireAuthtwitter)
            .then(data => {
                console.log("Twitter Login Success, Data: " + JSON.stringify(data));
                
            }).catch(e => console.error("Twitter Login Error: " + JSON.stringify(e)));
        }

}
