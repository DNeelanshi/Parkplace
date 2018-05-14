import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController} from 'ionic-angular';
import { SigninPage } from '../pages/signin/signin';
/*
  Generated class for the Appsetting provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Appsetting {
cart:any=[];
saved:any=[];
public home1:any;
svd:any=[];
cartid:any;
username:any;
haveparking:any=0;
emailuser:any;
SrcImage:any;
 myGlobalVar: string = 'http://parkplace-env.w2eidiwpex.us-west-1.elasticbeanstalk.com/api/';//'http://ec2-13-59-151-198.us-east-2.compute.amazonaws.com/api/';//'http://fashapp.io/api/';
  constructor(
    public http: Http,
    public toastCtrl:ToastController) {
    console.log('Hello Appsetting Provider');
    // if(localStorage.getItem('UserInfo')){
    //   console.log(localStorage.getItem('UserInfo'));
    //   this.navCtrl.push(TabsPage);
    // }else{
    //   this.navCtrl.push(SigninPage);
    // }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    console.log('Neelanshi');
    console.log(window.navigator.onLine);
    if (window.navigator.onLine == true) {
    } else {
      let toast = this.toastCtrl.create({
        message: 'Network connection failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }
}
