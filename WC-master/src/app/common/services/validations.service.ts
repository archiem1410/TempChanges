import { Injectable } from '@angular/core';

@Injectable()
// tslint:disable-next-line:class-name
export class validator {
    pattern: any;
    msg: any;
    fn: any;

    constructor() {
        this.initPattern();
        this.initMsg();
    }

    initPattern() {
        this.pattern = {
            email: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$',
            name: '[A-Za-z ]+$',
            // tslint:disable-next-line:quotemark
            details: "[a-zA-Z0-9\s,.%; '-]+$",
            password: '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$'
            // email: '^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$'
          };
    }

    initMsg() {
        this.msg = {
            invalidname: 'Please enter valid name',
            invalidemail: 'Please enter valid email',
            invalidsubject: 'Please enter valid subject',
            invalidquery: 'Please enter valid query',
            invalidpassword: 'Please enter password',
            invalidgender: 'Please select gender',
            invalidorientation: 'Please select orientation',
            passworderror: 'Password should contain min 8 characters including uppercase, lowercase and number',
            passwordmatcherror: 'Password didn\'t match!',
            msgRegSuccess: 'The activation link is sent to your email. Please click on it to activate.',
            msgRegSuccessFinal: 'Registration done!!',
            msgPasswordResetSuccess: 'The reset link is sent to your email. Please click on it to reset.',
            msgPasswordSetSuccess: 'Password is set successfully, please login to continue!'
        };
    }


    validPassword(value) {
        // tslint:disable-next-line:prefer-const
        let regex = new RegExp('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$');
        // console.log(regex.test(c.value))
        return regex.test(value);
    }
}

