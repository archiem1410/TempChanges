import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { validator } from '../../common/services/validations.service';
import { GoogleAnalyticsEventsService } from '../../common/services/google-analytics-events.service';
import { WowService } from '../../core/wow.service';

declare var ga:any;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  en: any;
  ga:any;
  
  loading = false;
  errorMsg = null;
  successMsg = null;
  

  contact = {
    "FirstName": null,
    "LastName": null,
    "Email": null,
    "Subject": null,
    "Body": null,
    "Source": "website",
    "IP": "1.1.1.1"
  };

  constructor(public vl: validator,
    private _wowService: WowService,
    public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
    }

  ngOnInit() {
  }

  onSubmit (f: NgForm):void{
    this.submitEvent();

    this.loading = true;
    this.errorMsg = null;
    this.successMsg = null;

    // this._wowService.create(this.contact)
    // .then(data =>{
    //   this.loading = false;
    //   this.successMsg = "Query submitted";

    //   f['_submitted'] = false;
    //   f.reset();
    // })
    // .catch(error => {
    //   this.loading = false;
    //   this.errorMsg = error.message;
    //     console.log("error", error)
    // });
  }

  submitEvent() {
    this.googleAnalyticsEventsService.emitEvent("ContactUs", "ContactUsFormSubmitted", "FormSubmit", 1);
  }

}
