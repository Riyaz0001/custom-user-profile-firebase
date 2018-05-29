import { FormControl } from '@angular/forms';
 
export class EmailValidator {
 
  static checkEmail(control: FormControl){

    console.log("e-mail check");

    var requiredDomains = ["gmail.com","yahoo.com"];
    var lowercaseValue = control.value.toLowerCase();
    var providedDomain = lowercaseValue.substr(lowercaseValue.indexOf('@')+1);
    var returnVal: any;

    for (var i = 0; i < requiredDomains.length; i++) {
      if(requiredDomains[i] != providedDomain) {
        returnVal =  {"invalid_domain": true};
        i = requiredDomains.length;
      }
    }
    
    return returnVal;
  }
 
}