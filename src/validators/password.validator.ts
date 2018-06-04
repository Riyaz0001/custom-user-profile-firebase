import { FormControl, FormGroup } from '@angular/forms';
 
export class PasswordValidator {

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

    // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
// static areEqual(formGroup: FormGroup) {

//     // console.log("Password: Not Matched");
    
//     // var firstPassword = formGroup.controls['password'].value;
//     // var secondPassword = formGroup.controls['confirm_password'].value;
    
//     // if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
//     // //   console.log("Password: mismatch");
//     //   formGroup.controls['confirm_password'].setErrors({"pw_mismatch": true});
//     //   return { "pw_mismatch": true };  

//     // } else {
//     //   return null;
//     // }

// 	let val;
// 	let valid = true;

//     console.log("Run - 1");
    
// 	for (let key in formGroup.controls) {
//         console.log("Run - 2");
// 		if (formGroup.controls.hasOwnProperty(key)) {
//             console.log("Run - 3");
// 			let control: FormControl = <FormControl>formGroup.controls[key];
// 			if (val === undefined) {
// 				val = control.value
// 			} else {
//                 console.log("Run - 4");
// 				if (val !== control.value) {
// 					valid = false;
// 					break;
// 				}
// 			}
// 		}
//     }
//     console.log("Run - 5");
// 	if (valid) {
//         console.log("Run - 6");
//         return null;
// 	}
// 	return {
//         areEqual: true
        
// 	}
//  }
 
//   static isMatching(group: FormGroup){

//     console.log("Password: Not Matched");
    
//     var firstPassword = group.controls['password'].value;
//     var secondPassword = group.controls['re_password'].value;
    
//     if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
//       console.log("Password: mismatch");
//       group.controls['re_password'].setErrors({"pw_mismatch": true});
//       return { "pw_mismatch": true };  

//     } else {
//       return null;
//     }
    
//   }
 
}