import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currrentpage = 1;
  limit = 10;
  lastlimit: any = 0;
  isFirstDisable = true;
  isLastDisable = false;
  public records: {
    id: Number,
    name: String,
    email: String,
    contactno: Number,
    address: String,
    linkedinid: String,
    joindate: String
  }[] = [];
  public recordsplit = [];

  constructor() {
    for (let i = 0; i <= 99; i++) {
      this.records.push({
        id: i,
        name: 'jay',
        email: 'jayzzzsolanki@gmail.com',
        contactno: 7046416652,
        address: 'Orchid Green',
        linkedinid: 'jay@linkedin',
        joindate: '17/02/1996'
      })
    }
    console.log('data ', this.records);
    this.isLastDisable = false;
    this.records.forEach((element, i) => {     
      if(i <= this.limit) {
        this.recordsplit.push(element);
      }
    });
  }
  choosefile() {

  }
  first() {
    this.recordsplit = [];
    // this.limit = 10;
    this.currrentpage = 1;
    this.isLastDisable = false;
    this.isFirstDisable = true;
    this.records.forEach((element, i) => {     
      if(i <= this.limit) {
        this.recordsplit.push(element);
      }
    });
  }
  prev() {
    this.recordsplit = [];
    this.isLastDisable = false;
    this.currrentpage = this.currrentpage - 1;
    let limit = this.limit * this.currrentpage;
    this.lastlimit = limit - 10;
    console.log("limit ",limit);
    console.log("lastlimit ",this.lastlimit);
    this.records.forEach((element, i) => {     
      if(i > this.lastlimit  && i <= limit) {
        this.recordsplit.push(element);
      }
    });
    if(this.lastlimit <= 0){
      this.isFirstDisable = true;
    }else{
      this.isFirstDisable = false;
    }
  }
  next() {
    this.recordsplit = [];
    this.isFirstDisable = false;
    this.currrentpage = this.currrentpage + 1;
    let limit = this.limit * this.currrentpage;    
    this.lastlimit = this.lastlimit + 10;
    this.records.forEach((element, i) => {     
      if(i > this.lastlimit  && i <= limit) {
        this.recordsplit.push(element);
      }
    });
    if(limit >= this.records.length){
      this.isLastDisable = true;
    }else{
      this.isLastDisable = false;
    }
   
  }
  last() {
    this.recordsplit = [];
    this.isFirstDisable = false;
    this.isLastDisable = true;
    console.log("total ",this.records.length);
    this.currrentpage = Math.ceil((this.records.length / 10));
    console.log("last currentpage ",this.currrentpage);
    this.limit = ((this.currrentpage-1) * this.limit) + 1;
    console.log("limit ",this.limit);
    this.records.forEach((element, i) => {     
      if(this.limit <= i) {
        console.log(i);
        this.recordsplit.push(element);
      }
    });
    console.log("records ",this.recordsplit);
  }
}
