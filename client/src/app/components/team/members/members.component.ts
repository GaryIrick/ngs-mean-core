import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor() { }

  teamMembers=[];
  profile;
  @Input() set teamProfile(val){
    if(val){
      this.profile = val;
      this.teamMembers.length = 0;
      this.teamMembers = JSON.parse(JSON.stringify(val.teamMembers));
    }
  }

  handleRemove(obj){
    let index = -1;
    this.teamMembers.forEach((ele, ind) => {
      if(ele.displayName == obj){
        index = ind;
      }
    });
    if(index>-1){
      this.teamMembers.splice(index, 1);
    }
  }

  ngOnInit() {
    // this.teamMembers.length = 0;
  }

  ngOnDestroy(){
    this.teamMembers.length = 0;
  }

}
