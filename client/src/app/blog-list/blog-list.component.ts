import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentfulService } from '../contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})

export class BlogListComponent implements OnInit {
  perColumn: number = 3;
  blogs: Entry<any>[]=[];
  constructor( private router:Router, private contentfulService:ContentfulService) { }
  rows: any []=[];
  categories:any[]
  ngOnInit() {
    this.contentfulService.getCategories().then(res=>{
      this.categories = res;
    });

    this.contentfulService.getBlogs().then(
      res => { 
        this.createMyDisplay(res);
      });
  }

  selection:string = '';

  updateDisplay(val){
    val = val.value
    console.log('val', val);
    if(val == 'all'){
      console.log('in the all if')
      this.selection = val;
      this.contentfulService.getBlogs().then(
        res => {
          this.createMyDisplay(res);
        });
    }else if (val !== this.selection){
      console.log('in the if')
      this.selection = val;
      this.contentfulService.getBlogs({ 'links_to_entry': this.selection }).then(
      res => {
        this.createMyDisplay(res);
      });
    }else{
      console.log('did nothing');
      //do nothing
    }
 
  }

  createMyDisplay(dat) {
    if (!this.perColumn) {
      this.perColumn = 3;
    }
    this.rows = [];
    if (dat != undefined && dat.length > 0) {
      if (dat.length > this.perColumn) {
        let temparr = [];
        for (var i = 0; i < dat.length; i++) {
          if (i>0 && i % this.perColumn == 0) {
            this.rows.push(temparr);
            temparr = [];
          }
          temparr.push(dat[i]);
        }
        if(temparr.length>0){
          this.rows.push(temparr);
        }
      } else {
        this.rows.push(dat);
      }
    } else {
      this.rows = [];
    }
  }


  goToBlogPage(blog){
    this.contentfulService.cacheBlog(blog);
    this.router.navigate(['/blog', blog.sys.id]);
  }

}
