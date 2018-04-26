import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertsService } from '@jaspero/ng2-alerts';

import { validator } from '../../../common/services/validations.service';
import { WowService } from '../../../core/wow.service';

declare var moment: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../register.component.scss']
})
export class RegisterComponent implements OnInit {
 // en: any; // varun: not used anywhere!
  moment: any;
  today = moment().format('DD-MMM-YYYY');

  loading = false;
  errorMsg = null;
  successMsg = null;

  register = {
    'first_name': null,
    'last_name': null,
    'email_id': null
  };

  constructor(private _alert: AlertsService,
    private _wowService: WowService,
    public vl: validator) {

  }

  ngOnInit() {
  }

  onSubmit(f: any) {
    this.loading = true;
    this.errorMsg = null;
    this.successMsg = null;

    this._wowService.registerUserStep1(this.register)
      .then(data => {
        this.loading = false;
       // this.loading = false; varun: this was used twice
        this._alert.create('success', this.vl.msg.msgRegSuccess);
        f['_submitted'] = false;
        f.reset();
      })
      .catch(error => {
        this.loading = false;
        this.errorMsg = error.message;
        console.log('error', error);
      });
  }
}
