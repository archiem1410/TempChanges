import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../common/guards/auth.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images: any[];

  constructor(private _authGuard:AuthGuard) { }

  ngOnInit() {
    this.images = [
      { src: '1.jpg' },
      { src: '2.jpg' },
      { src: '3.jpg' },
      { src: '4.jpg' },
      { src: '5.jpg' },
      { src: '6.jpg' },
      { src: '7.jpg' }
    ];
  }

  logout(){
    this._authGuard.logout();
  }

}
