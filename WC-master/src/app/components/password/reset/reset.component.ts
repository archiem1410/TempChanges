import { Component, OnInit } from '@angular/core';
import { validator } from '../../../common/services/validations.service';
import {NgForm} from '@angular/forms';
import { AlertsService } from "@jaspero/ng2-alerts";
import { Router } from '@angular/router';
import { WowService } from '../../../core/wow.service';

declare var moment: any;

@Component({
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  en: any;
  moment:any;  
  today = moment().format('DD-MMM-YYYY');

  loading = false;
  errorMsg = null;
  successMsg = null;

  register = {
    "Email": null
  };

  constructor(private _router: Router,
    private _alert: AlertsService,
    public vl: validator,
    public _wowService: WowService) { 
      
    }

  ngOnInit() {
  }

  onSubmit(f:any){
    this.loading = true;
    this.errorMsg = null;
    this.successMsg = null;

    // this.rService.create(this.register)
    // .then(data =>{
    //   this.loading = false;
    //   // this.successMsg = "Query submitted";
      
    // })
    // .catch(error => {
    //   this.loading = false;
    //   this.errorMsg = error.message;
    //     console.log("error", error)
    // });

    this.loading = false;
    this._alert.create('success', this.vl.msg.msgPasswordResetSuccess);
    f['_submitted'] = false;
    f.reset();

    this._router.navigate(['/password/set/1234567890']);
  }

}
