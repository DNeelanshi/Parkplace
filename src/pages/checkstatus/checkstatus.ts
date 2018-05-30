import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events} from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ForgotpwdPage } from '../forgotpwd/forgotpwd';
import { ToastController, AlertController, LoadingController,MenuController} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { MyApp } from '../../app/app.component';
import { HometwoPage } from '../../pages/hometwo/hometwo';
import { ListparkingspacePage } from '../../pages/listparkingspace/listparkingspace';

/**
 * Generated class for the CheckstatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkstatus',
  templateUrl: 'checkstatus.html',
})
export class CheckstatusPage {
blurr:any;
blurri:any=0;
datauser:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http,
  public toastCtrl: ToastController,
  private fb: Facebook,
  public events: Events,
  public appsetting: Appsetting,
  public alertCtrl: AlertController,
  public menuCtrl: MenuController,
  public loadingCtrl: LoadingController) {
   this.menuCtrl.swipeEnable(true);
    this.checkstatus()

  }
  checkstatus(){
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

    Loading.dismiss();
      console.log(data);
      if(data.status == true){
        console.log(data.data.parking_space.length)
        this.datauser = data.data;
      if(data.data.parking_space.length == 0){
        this.blurri = 1;
      }else{
        if(data.data.parking_space[0].status == true){
          console.log('false');
          this.blurr = false;
       } else{
         this.blurr = true;
         console.log('true');}

      }
      }
    })})
  }}
  newmenu(){
    if( this.datauser.parking_space.length > 0){
      this.appsetting.haveparking=1;
//    alert(' large menu');
    this.events.publish('seller', 'seller');
    localStorage.setItem('Done','true');
    this.appsetting.haveparking = 1;
    this.navCtrl.push(ListparkingspacePage);
  }
    else{
      this.blurr = true
    }
  }
  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckstatusPage');
  }

}
