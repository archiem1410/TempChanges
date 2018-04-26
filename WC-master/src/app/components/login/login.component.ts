import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { validator } from '../../common/services/validations.service';
import { AuthGuard } from '../../common/guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  location: Location;

  login = {
    username:null,
    password:null
  };

  constructor(private _location: Location,
    private _router: Router,
    public vl: validator,
    private _authGuard:AuthGuard) {
      this.location = _location;
    }

  ngOnInit() {
  }

  onSubmit (f: NgForm):void{
    this._authGuard.setUser({userid:12345});
    this._router.navigate(['/home']);
  }

  isLoginPage(){
    let route = this.location.path();
    return (route == '/login');
  }
}
