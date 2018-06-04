import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";

import { UsernameValidator } from  "../../validators/username.validator";
// import { EmailValidator } from  "../../validators/email.validator";
// import { PasswordValidator } from  "../../validators/password.validator";

import { User } from '../../model/user';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    user = {} as User;
    registrationForm: FormGroup;

    // validateor error msg.
    validation_messages = {
        username: [
            { type: 'required', message: 'Username is required.' },
            { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
            { type: 'minlength', message: 'Minimum 6 characters' },
            { type: 'maxlength', message: 'Maximum 30 characters' },
            { type: 'validUsername', message: 'Your username has already been taken.' }
        ],
        name: [
            { type: 'required', message: 'Name is required.' },
            { type: 'pattern', message: 'Just use alphabet character' },
            { type: 'minlength', message: 'Name must be at least 6 characters long.' },
            { type: 'maxlength', message: 'Name Username cannot be more than 30 characters long.' }
        ],
        email: [
            { type: 'required', message: 'Email required.' },
            { type: 'pattern', message: 'Invalid Email!' }
        ],
        password: [
            { type: 'required', message: 'Password required.' },
            { type: 'minlength', message: 'Passwod must be at least 6 characters long.' },
            { type: 'maxlength', message: 'Password cannot be more than 30 characters long.' },
            // { type: 'pattern', message: 'Please input valid Email address.' }
        ],
        // confirmPassword: [
        //     { type: 'required', message: 'ConfirmPassword required.' },
        //     { type: 'mismatchedPasswords',  message: 'Passwords do not match!' }
        // ]
    }

  constructor(private afAuth:AngularFireAuth, public fb: FormBuilder) {
    // email parttern
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    
    // Example use of FormBuilder, FormGroups, and FormControls
    this.registrationForm = fb.group({
        username: ['', Validators.compose([
            UsernameValidator.validUsername,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
            Validators.required
        ])],
        name: ['', Validators.compose([
            Validators.required, 
            Validators.pattern('[a-zA-Z ]*'), 
            Validators.minLength(6),
            Validators.maxLength(30)
        ])],      
        email: ['', Validators.compose([
            Validators.required,
            Validators.pattern(EMAILPATTERN)            
        ])],
        password: ['', Validators.compose([
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.required,
            // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
        ])],
        confirmPassword: ['', Validators.required],
    }, { validator: this.matchingPasswords('password', 'confirmPassword')})
    
  }
  

    // FORM GROUP VALIDATORS
    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
          let password = group.controls[passwordKey];
          let confirmPassword = group.controls[confirmPasswordKey];
          
          if (password.value !== confirmPassword.value) {
            return {
              mismatchedPasswords: true
            };
          }
        }
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
