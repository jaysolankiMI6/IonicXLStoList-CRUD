import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileCrudService } from './../services/file-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userForm: FormGroup;
  private file: File
  currrentpage = 1;
  limit = 10;
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

  constructor(private http: HttpClient, public formBuilder: FormBuilder,
    private fileCrudService: FileCrudService,
    private zone: NgZone,
    private router: Router) {

    this.userForm = this.formBuilder.group({
      name: ['jay'],
      email: ['jay@gmail.com'],
      username: ['jaysolanki01'],
      contactno: ['7046416652'],
      address: ['surat'],
      linkedinid: ['jay01'],
      joindate: ['08/09/2021']
    })
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
      if (i <= this.limit) {
        this.recordsplit.push(element);
      }
    });
  }
  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }
  async submitForm() {
    let formData = new FormData();
    formData.append("photo", this.file, this.file.name);
    this.http.post("http://localhost:5000/upload", formData).subscribe((response) => {
      console.log("file upload ", response);
    });
    this.onSubmit();
  }
  async onSubmit() {
    if (!this.userForm.valid) {
      return false;
    } else {
      this.fileCrudService.createFile(this.userForm.value)
        .subscribe((response) => {
          this.zone.run(() => {
            this.userForm.reset();
            this.router.navigate(['/list']);
          })
        });
    }
  }
  first() {
    this.recordsplit = [];
    this.currrentpage = 1;
    this.isLastDisable = false;
    this.isFirstDisable = true;
    this.records.forEach((element, i) => {
      if (i <= this.limit) {
        this.recordsplit.push(element);
      }
    });
  }
  prev() {
    this.recordsplit = [];
    this.isLastDisable = false;
    this.currrentpage = this.currrentpage - 1;
    let limit = this.limit * this.currrentpage;
    this.records.forEach((element, i) => {
      if (i > limit - 10 && i <= limit) {
        this.recordsplit.push(element);
      }
    });
    if (limit - 10 <= 0) {
      this.isFirstDisable = true;
    } else {
      this.isFirstDisable = false;
    }
  }
  next() {
    this.recordsplit = [];
    this.isFirstDisable = false;
    this.currrentpage = this.currrentpage + 1;
    let limit = this.limit * this.currrentpage;
    this.records.forEach((element, i) => {
      if (i > limit - 10 && i <= limit) {
        this.recordsplit.push(element);
      }
    });
    if (limit >= this.records.length) {
      this.isLastDisable = true;
    } else {
      this.isLastDisable = false;
    }

  }
  last() {
    this.recordsplit = [];
    this.isFirstDisable = false;
    this.isLastDisable = true;
    this.currrentpage = Math.ceil((this.records.length / 10));
    let limit = ((this.currrentpage - 1) * this.limit) + 1;
    this.records.forEach((element, i) => {
      if (limit <= i) {
        this.recordsplit.push(element);
      }
    });
  }
}
