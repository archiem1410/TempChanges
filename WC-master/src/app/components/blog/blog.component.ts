import { Component, OnInit } from '@angular/core';
import { WowService } from '../../core/wow.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public blogEntries = [];
  constructor(private _blogService: WowService) { }

  ngOnInit() {
    this._blogService.getBlog()
        .then((data) => {
          // console.log('getblogs', data);
          this.blogEntries = data;
        });
  }
}
