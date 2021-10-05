import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileCrudService } from './../services/file-crud.service';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';

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
  imageURI: any;
  imageFileName: any;
  username: any;
  userid: any;
  constructor(private http: HttpClient, public formBuilder: FormBuilder,
    private fileCrudService: FileCrudService,
    private zone: NgZone,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    // private transfer: FileTransfer,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      console.log("params ",params)
      if (params && params.username && params.userid) {
        this.username = params.username;
        this.userid = params.userid;
        console.log("userid ", this.userid);
        console.log("username ", this.username);
      }
      console.log("userid ", this.userid);
      console.log("username ", this.username);
    });
    this.isLastDisable = false;
    // this.records.forEach((element, i) => {
    //   if (i <= this.limit) {
    //     this.recordsplit.push(element);
    //   }
    // });
  }
  getImage() {

  }
  uploadFile() {

  }
  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }
  async submitForm() {
    let formData = new FormData();
    console.log("userid ", this.userid);
    formData.append("userid", this.userid);
    formData.append("file", this.file, this.file.name);
    this.http.post("http://192.168.1.123:3000/upload", formData).subscribe((response: any) => {
      console.log("response ", response);
      if (response.errorcode == 200) {
        console.log('data ', this.records);
        this.records = response.data;
        this.presentToast(response.message);
        this.records.forEach((element, i) => {
          console.log("i "+i+ "limit  " +this.limit);
          if (i < this.limit) {
            this.recordsplit.push(element);
          }
        });
      }
    });
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
      if (i >= limit - 10 && i <= limit) {
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
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
