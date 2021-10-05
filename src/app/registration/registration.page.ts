import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  userForm: FormGroup;
  constructor(public toastCtrl: ToastController,private http: HttpClient, public formBuilder: FormBuilder,private router: Router) { 
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit() {
  }
  register(){
    this.http.post("http://192.168.1.123:3000/registration", this.userForm.value).subscribe((response: any) => {
      console.log("response ", response);
      if (response.statuscode == 200) {
        this.presentToast(response.message);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            userdata: JSON.stringify(response.data)
          }
        };
        this.router.navigateByUrl('/login', navigationExtras);
      }
    });
    // this.router.navigateByUrl('/login');
  }
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
