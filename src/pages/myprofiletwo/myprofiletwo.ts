import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditprofiletwoPage } from '../editprofiletwo/editprofiletwo';
import { HometwoPage } from '../hometwo/hometwo';
import { SignintwoPage } from '../signintwo/signintwo';
import {SigninPage} from '../signin/signin';
import {ForgotpwdPage} from '../forgotpwd/forgotpwd';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FCM } from '@ionic-native/fcm';
import 'rxjs/add/operator/map';
/**
 * Generated class for the MyprofiletwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myprofiletwo',
  templateUrl: 'myprofiletwo.html',
})
export class MyprofiletwoPage {
profileinfo:any=[];
username:any;
email:any;
srcimage:any;
public dataa:any= { };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
  public toastCtrl: ToastController,
  private fb: Facebook,
  private fcm: FCM,
  public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public appsetting: Appsetting) {
    this.getuserdetail();
  }
  getuserdetail(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    if(localStorage.getItem('UserDetailseller')){
    var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
    console.log(userid);

    var postdata = {
      user_id: userid
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
    this.http.post(this.appsetting.myGlobalVar +'users/userinfo', serialized, options).map(res => res.json()).subscribe(data => {




      console.log(data);
      this.profileinfo= data.data;
      this.username = data.data.name;
      this.dataa.emaill = data.data.email;
this.srcimage = data.data.profile_pic;
console.log(data.data.profile_pic);
Loading.dismiss();


    })
  })

  }
  }
  // isReadonly(){
  //   return this.isReadonly;
  // }
  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofiletwoPage');
  }

  edit(){
  this.navCtrl.push(EditprofiletwoPage);
  }


}
