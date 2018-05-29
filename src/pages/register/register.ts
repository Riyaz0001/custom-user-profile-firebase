import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";

import { EmailValidator } from  "../../validators/email.validator";
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
    email: AbstractControl;
    password: AbstractControl;
    re_password: AbstractControl;

    submitAttempt: Boolean = false;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private afAuth: AngularFireAuth,
      private formBuilder: FormBuilder) {

        this.registerForm = formBuilder.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.required, Validators.maxLength(26), EmailValidator.checkEmail])],
            'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(45)]],
            're_password': ['', [Validators.required]]
            }, { 'validator': PasswordValidator.isMatching }
        );

        this.email = this.registerForm.controls['email'];
        this.password = this.registerForm.controls['password'];
        this.re_password = this.registerForm.controls['re_password']; 


        // this.form = fb.group({
        //     'pwd1': ['', Validators.required],
        //     'pwd2': ['', Validators.required]
        //   }, {validator: RegisterPage.passwordsMatch});

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

    save(){
    
        this.submitAttempt = true;
    
      if(!this.registerForm.valid){
          console.log("Invalid Submission!")
      } 
      else {
          console.log("Success!")
          console.log(this.registerForm.value);
      }
    
    }
    
    elementChanged(input){
    
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
    }
    
    logControlErrors(){
    
      console.log(this.email.errors);
      console.log(this.password.errors);
      console.log(this.re_password.errors);
    
    }

//   static passwordsMatch(cg: FormGroup): {[err: string]: any} {
//     let pwd1 = cg.get('pwd1');
//     let pwd2 = cg.get('pwd2');
//     let rv: {[error: string]: any} = {};
//     if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
//       rv['passwordMismatch'] = true;
//     }
//     return rv;
//   }

}
