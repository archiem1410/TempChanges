import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
    static MatchPassword(AC: AbstractControl) {
       // tslint:disable-next-line:prefer-const
       let password = AC.get('password').value; // to get value in input tag
       // tslint:disable-next-line:prefer-const
       let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            console.log('false');
            AC.get('confirmPassword').setErrors( {MatchPassword: true} );
        } else {
            console.log('true');
            return null;
        }
    }

    static validPassword(AC: AbstractControl) {
        // tslint:disable-next-line:prefer-const
        let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        // console.log(regex.test(c.value))
        // return regex.test(c.value);


        // tslint:disable-next-line:prefer-const
        let password = AC.get('name').value; // to get value in input tag
        AC.get('name').setErrors( {MatchPassword: true} );
        if (!regex.test(password.value)) {
            AC.get('name').setErrors( {MatchPassword: true} );
        }
        // let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        //  if(password != confirmPassword) {
        //      console.log('false');
        //      AC.get('confirmPassword').setErrors( {MatchPassword: true} )
        //  } else {
        //      console.log('true');
        //      return null
        //  }
    }
}
