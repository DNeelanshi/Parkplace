import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,App } from 'ionic-angular';
import {SignuptwoPage} from '../signuptwo/signuptwo';
import {HometwoPage} from '../hometwo/hometwo';
import {ForgotpwdPage} from '../forgotpwd/forgotpwd';
import { SignupPage } from '../signup/signup';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
// import { MyApp } from '../../app/app.component';
import { GetstartedPage } from '../getstarted/getstarted';

/**
 * Generated class for the ChangepwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepwd',
  templateUrl: 'changepwd.html',
})
export class ChangepwdPage {
public data:any=''
public ptype = 'password';
  public iconname = 'eye';
   public showpass:boolean = false;
    public ptype1 = 'password';
  public iconname1 = 'eye';
   public showpass1:boolean = false;
    public ptype2 = 'password';
  public iconname2 = 'eye';
   public showpass2:boolean = false;
  constructor( public navCtrl: NavController,
  public toastCtrl: ToastController,
  public app : App,
  public http: Http,
  public alertCtrl: AlertController,
  public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public appsetting: Appsetting) {
  }
  changepassword(changepass1){
    console.log(changepass1);
    // this.navCtrl.push('GetstartedPage');//logout from app
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    if(localStorage.getItem('UserDetail')){
      var userd = JSON.parse(localStorage.getItem('UserDetail'));
      console.log(userd);
      console.log();
      if(changepass1.value.confirmpass == changepass1.value.newpass){
    var postdata = {
      email:userd.email,
      password:changepass1.value.currentpass,
      newpassword:changepass1.value.newpass
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
    this.http.post(this.appsetting.myGlobalVar +'users/changepassword', serialized, options).map(res => res.json()).subscribe(data => {

    Loading.dismiss();
      console.log(data);
    if(data.status == true){
this.AlertMsg('Password changed Succesfully.Login again!')
localStorage.removeItem('UserDetailseller');
localStorage.removeItem('UserDetailcustomer');
this.app.getRootNav().setRoot(GetstartedPage);
this.menuCtrl.close();
    }else{
      this.AlertMsg(data.message);
    }
  })
})}else{
  this.AlertMsg('New password must match Confirm password');
}
    }
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
  showPassword() {
//    alert('hjj')
    console.log('showpassword');
     this.showpass = !this.showpass;
      if(this.showpass){
        this.ptype = 'text';
            this.iconname = 'eye-off';
              } else {
                this.ptype = 'password';
                   this.iconname = 'eye';    }
                    }


    showPassword1() {
    console.log('showpassword');
     this.showpass1 = !this.showpass1;
      if(this.showpass1){
        this.ptype1 = 'text';
            this.iconname1 = 'eye-off';
              } else {
                this.ptype1 = 'password';
                   this.iconname1 = 'eye';    }
                    }



      showPassword2() {
    console.log('showpassword');
     this.showpass2 = !this.showpass2;
      if(this.showpass2){
        this.ptype2 = 'text';
            this.iconname2 = 'eye-off';
              } else {
                this.ptype2 = 'password';
                   this.iconname2 = 'eye';    }
                   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepwdPage');
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
