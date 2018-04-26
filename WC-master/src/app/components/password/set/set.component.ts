import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AlertsService } from "@jaspero/ng2-alerts";
import { Router } from '@angular/router';
import { validator } from '../../../common/services/validations.service';
import { WowService } from '../../../core/wow.service';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {

  loading = false;
  errorMsg = null;
  successMsg = null;

  register = {
    "ResetCode":null,
    "Password":null,
    "ConfirmPassword":null 
  };

  constructor(private _router: Router,
    private _alert: AlertsService,
    public vl: validator,
    public _wowService: WowService) { 
    this.register.ResetCode = 12345678;
  }

  ngOnInit() {
  }

  isPasswordMatch(){
    return (this.register.Password === this.register.ConfirmPassword);
  }

  isValidPattern(){
    return this.vl.validPassword(this.register.Password);
  }

  onSubmit(f:any){

    if(this.isPasswordMatch() &&
    this.isValidPattern()){
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
      // this._alert.create('success', this.vl.msg.msgPasswordSetSuccess);
      f['_submitted'] = false;
      f.reset();
  
      this._router.navigate(['/home']);
    } 
    
  }

}
