import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignuptwoPage} from '../signuptwo/signuptwo';
import {HometwoPage} from '../hometwo/hometwo';
import { SignupPage } from '../signup/signup';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController,MenuController} from 'ionic-angular';
/**
 * Generated class for the ForgotpwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpwd',
  templateUrl: 'forgotpwd.html',
})
export class ForgotpwdPage {
public daa:any = '' ;

  constructor(public navCtrl: NavController,
  public menuCtrl: MenuController,
    public navParams: NavParams,
  public toastCtrl: ToastController,
  public http: Http,
  public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public appsetting: Appsetting) {
     this.menuCtrl.swipeEnable(false);
  }
  forgot(frdata){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    var postdata = {
      email: frdata.value.email
    };

    var serialized = this.serializeObj(postdata);
    console.log(postdata);
     var Loading = this.loadingCtrl.create({
           spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
    dismissOnPageChange:true
        });
        Loading.present().then(() => {
    this.http.post(this.appsetting.myGlobalVar +'users/forgetpassword', serialized, options).map(res => res.json()).subscribe(data => {

    Loading.dismiss();
    console.log(data);
    if(data.status == true){
this.AlertMsg('Please check your email to reset password');
    }else{
      this.AlertMsg(data.message);
    }
    })})
  }
  AlertMsg(msg){
    let alert = this.alertCtrl.create({
      title: 'Park  Place',
      message: msg,
      buttons: [

        {
          text: 'OK',
          role: 'ok',
          handler: () => {
            console.log('OK clicked');
            // this.navCtrl.push(MyprofiletwoPage);
          }
        }
      ]
    });
    alert.present();
  }
  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpwdPage');
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
