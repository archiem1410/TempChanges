import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
export class PostRegisterComponent implements OnInit {
  en: any;
  moment: any;
  maxpicker = moment().subtract(18, 'years');
  loading = false;
  isAKValid: boolean;
  errorMsg = null;
  successMsg = null;
  message: string;
  pswdValid: boolean;
  pswdMatch: boolean;
  sexCheck: boolean;
  orientationCheck: boolean;
  register = {
    'activation_key': null,
    'first_name': null,
    'last_name': null,
    'email_id': null,
    'sex': null,
    'orientation': null,
    'password': null,
    'ConfirmPassword': null,
    'age': 20,
    'dob': null
  };

  constructor(private _activatedRoute: ActivatedRoute,
    private _alert: AlertsService,
    public vl: validator,
    private _wowService: WowService) {
      this.register.dob = this.maxpicker;
      this.sexCheck = true;
  }

  ngOnInit() {
    if (this._activatedRoute.snapshot.queryParams['fn'] && this._activatedRoute.snapshot.queryParams['ln']
        && this._activatedRoute.snapshot.queryParams['email'] && this._activatedRoute.snapshot.queryParams['ak']) {
          this.register.first_name = this._activatedRoute.snapshot.queryParams['fn'];
          this.register.last_name = this._activatedRoute.snapshot.queryParams['ln'];
          this.register.email_id = this._activatedRoute.snapshot.queryParams['email'];
          this.register.activation_key = this._activatedRoute.snapshot.queryParams['ak'];
          // tslint:disable-next-line:prefer-const
          let reqParams = {
            email_id: this._activatedRoute.snapshot.queryParams['email'],
            activation_key: this._activatedRoute.snapshot.queryParams['ak']
          };
          console.log(reqParams);
          this.checkActivationKey(reqParams);
    } else {
      this.message = 'This page is invalid!!';
    }
    // subscribe to router event
    // this.activatedRoute.params.subscribe((params: Params) => {
    //     let userId = params;
    //     console.log(userId);
    //   });
    // this.pswdValid = this.isValidPattern();
    // this.pswdMatch = this.isPasswordMatch();
  }

  checkActivationKey(reqParams) {
    this.loading = true;
    this._wowService.registerUserStep2(reqParams)
        .then(data => {
          this.loading = false;
          if (data.Status === 'Success') {
            this.isAKValid = data;
          }else {
            this.message = data.Message;
          }
        })
        .catch(error => {
          this.loading = false;
          this.errorMsg = error.message;
        });
  }

  isPasswordMatch() {
    return this.pswdMatch = (this.register.password === this.register.ConfirmPassword);
  }

  isValidPattern() {
    return this.vl.validPassword(this.register.password);
  }

  onSubmit(f: any) {
    this.loading = true;
    this.errorMsg = null;
    this.successMsg = null;
    this._wowService.registerUserStep3(this.register)
      .then(data => {
        this.loading = false;
        this.loading = false;
        this._alert.create('success', this.vl.msg.msgRegSuccessFinal);
        f['_submitted'] = false;
        f.reset();
      })
      .catch(error => {
        this.loading = false;
        this.errorMsg = error.message;
        console.log('error', error);
      });
  }
  buttonCheck() {
    this.sexCheck = this.register.sex;
    this.orientationCheck = this.register.orientation;
  }
}
