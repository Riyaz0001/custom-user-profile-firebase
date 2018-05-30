import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";

import { UsernameValidator } from  "../../validators/username.validator";
//import { EmailValidator } from  "../../validators/email.validator";
import { PasswordValidator } from  "../../validators/password.validator";

import { User } from '../../model/user';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    user = {} as User;

    registerForm: FormGroup;
    // userData = {} as User;
    // userData = { username: "", password: "", re_password: "", email: "", name: "" };
    validation_messages = {
        username: [
            { type: 'required', message: 'Username is required.' },
            { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
            { type: 'minlength', message: 'Minimum 6 characters' },
            { type: 'maxlength', message: 'Maximum 26 characters' },
            { type: 'validUsername', message: 'Your username has already been taken.' }
        ],

        fname: [
            { type: 'required', message: 'Name is required.' },
            { type: 'pattern', message: 'Just use alphabet character' },
            { type: 'minlength', message: 'Name must be at least 6 characters long.' },
            { type: 'maxlength', message: 'Name Username cannot be more than 30 characters long.' }
        ],
        
        // lname: [
        //     { type: 'required', message: 'List Name is required.' }
        // ],

        email: [
            { type: 'required', message: 'Please input your Email.' },
            { type: 'pattern', message: 'Email address invalid' }
        ],

        password: [
            { type: 'required', message: 'Please input your password.' },
            { type: 'minlength', message: 'Passwod must be at least 6 characters long.' },
            { type: 'maxlength', message: 'Password cannot be more than 26 characters long.' },
            // { type: 'pattern', message: 'Please input valid Email address.' }
        ],

        confirm_password: [
            // { type: 'required', message: 'Please input your Confirm-Password.' },
            { type: 'required',  message: 'Passwords do not match!' }
            // { type: 'pw_mismatch', message: 'Passwords do not match!' }
        ]
    }

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private afAuth: AngularFireAuth) { 

        let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.registerForm = new FormGroup({
            username: new FormControl('', Validators.compose([
                UsernameValidator.validUsername,
                Validators.minLength(6),
                Validators.maxLength(26),
                Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
                Validators.required
            ])),

            fname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(6), Validators.maxLength(30)]),
            
            lname: new FormControl('', Validators.required),

            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern(EMAILPATTERN)
            ])),

            password: new FormControl('', Validators.compose([
                Validators.minLength(6),
                Validators.maxLength(26),
                Validators.required,
                //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
           ])),

           confirm_password: new FormControl('', [Validators.required]),
    
        }, (formGroup: FormGroup) => {
            return PasswordValidator.areEqual(formGroup);
        });

      }

  
    

  


    async register(newUser: User) {
        try {
        const resultL = await this.afAuth.auth.signInWithEmailAndPassword(newUser.email, newUser.password);
        //   const result = /*await*/ this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password);
        //   console.log("Register Success, Data: " + JSON.stringify(result));
        //   this.navCtrl.push(ProfilePage);
        }
        catch(e) {
            console.error("Register Failed: " + JSON.stringify(e));
        }
    }


}
