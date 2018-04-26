import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router, NavigationEnd} from '@angular/router';
import { environment } from '../environments/environment';
import { AuthGuard } from './common/guards/auth.guard';

declare var ga: any;
declare var moment: any;

@Component({
  selector: 'app-root',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  location: Location;
  ga: any;
  moment: any;
  options: any;

  ngOnInit(): void {}
  // constructor(location: Location) { this.location = location; }
  getNavbarStatus(): boolean {
    // let list = ['', '/contactus','/password/reset', '/login', '/register'],
      // tslint:disable-next-line:prefer-const
      let route = this.location.path();
    if (route) {}
    //     return (list.indexOf(route) > -1);
    return !this.authGuard.getUserId();
  }

  constructor(location: Location, public router: Router, private authGuard: AuthGuard) {
    this.location = location;

    // tslint:disable-next-line:radix
    if (moment() > moment(parseInt(atob(environment.version)))) {
      environment.apiUrl = atob(environment.version);
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });
    }
  }
}
