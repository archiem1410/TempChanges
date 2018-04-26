import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { validator } from '../../common/services/validations.service';

@Component({
  templateUrl: './mlogin.component.html',
  styleUrls: ['./login.component.scss']
})

export class mLoginComponent implements OnInit {
  loading = false;

  login = {
    username:null,
    password:null
  };

  constructor(private _router: Router,
    public vl: validator) { }

  ngOnInit() {
  }

  onSubmit (f: NgForm):void{
    this._router.navigate(['/home']);
  }
}
