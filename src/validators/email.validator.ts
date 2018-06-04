import { FormControl } from '@angular/forms';
 
export class EmailValidator {

    // SINGLE FIELD VALIDATORS
emailValidator(control: FormControl): {[key: string]: any} {
    var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (control.value && !emailRegexp.test(control.value)) {
      return { invalidEmail: true };
    }
  }
 
//   static checkEmail(control: FormControl){

//     console.log("e-mail check");

//     var requiredDomains = ["gmail.com","yahoo.com"];
//     var lowercaseValue = control.value.toLowerCase();
//     var providedDomain = lowercaseValue.substr(lowercaseValue.indexOf('@')+1);
//     var returnVal: any;

//     for (var i = 0; i < requiredDomains.length; i++) {
//       if(requiredDomains[i] != providedDomain) {
//         returnVal =  {"invalid_domain": true};
//         i = requiredDomains.length;
//       }
//     }
    
//     return returnVal;
//   }
 
}