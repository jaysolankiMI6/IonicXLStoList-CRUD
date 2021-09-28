import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public records: {
    name: String,
    email: String,
    contactno: Number,
    address: String,
    linkedinid: String,
    joindate: String
  }[] = [];

  constructor() {
    this.records.length = 50;
    for (let i = 0; i <= 50; i++) {
      this.records.push({
        name: 'jay',
        email: 'jayzzzsolanki@gmail.com',
        contactno: 7046416652,
        address: 'Orchid Green',
        linkedinid: 'jay@linkedin',
        joindate: '17/02/1996'
      })
    }
    console.log('data ',this.records);
  }
  choosefile() {

  }
}
