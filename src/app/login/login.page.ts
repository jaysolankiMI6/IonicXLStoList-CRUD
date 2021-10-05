import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, public toastCtrl: ToastController,private http: HttpClient,  public formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit() {
  }
  login(){
    this.http.post("http://192.168.1.123:3000/auth", this.loginForm.value).subscribe((response: any) => {
      console.log("response ", response);
      if (response.statuscode == 200) {
        this.presentToast(response.message);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            username: response.name,
            userid: response.userid
          }
        };
        this.router.navigate(['home'], navigationExtras);
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
