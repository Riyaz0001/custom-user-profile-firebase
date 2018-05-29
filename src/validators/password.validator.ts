import { FormGroup } from '@angular/forms';
 
export class PasswordValidator {
 
  static isMatching(group: FormGroup){

    console.log("password check");
    
    var firstPassword = group.controls['password'].value;
    var secondPassword = group.controls['re_password'].value;
    if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
      console.log("mismatch");
      return { "pw_mismatch": true };      
    } else{
      return null;
    }
    
  }
 
}