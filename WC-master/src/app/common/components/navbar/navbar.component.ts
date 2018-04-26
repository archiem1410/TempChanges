import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navList = null; 

  constructor(private router: Router,
    private authGuard: AuthGuard) { }

  ngOnInit() {
    let user = this.authGuard.getUser(); 
  }

  logout(){
    this.authGuard.logout();
  }
}