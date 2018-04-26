import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss']
})
export class GallaryComponent implements OnInit {
  @Input() images: any[];
  isShowOverlay: boolean; 
  totalImagesLeft: number;
  
  constructor() { }

  ngOnInit() {
    if(this.images && this.images.length > 4){
      this.isShowOverlay = true;
      this.totalImagesLeft = this.images.length - 4;
    }
  }

}
