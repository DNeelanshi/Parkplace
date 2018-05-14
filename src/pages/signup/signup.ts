import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {SigninPage} from '../signin/signin';
import {SignuptwoPage} from '../signuptwo/signuptwo';
import {HometwoPage} from '../hometwo/hometwo';
import {ForgotpwdPage} from '../forgotpwd/forgotpwd';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FCM } from '@ionic-native/fcm';
import 'rxjs/add/operator/map';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {
  public data:any='';
  userData:any={};
  devicetoken:any;
  public ptype = 'password';
  public iconname = 'eye';
   public showpass:boolean = false;
    public ptype1 = 'password';
  public iconname1 = 'eye';
   public showpass1:boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
  public toastCtrl: ToastController,
  private fb: Facebook,
  public appsetting: Appsetting,
     private fcm: FCM,
  public http: Http,
  public alertCtrl: AlertController,
  public loadingCtrl: LoadingController
  ) {
//
           
  }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
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
    showPassword() {
      // alert('hjj')
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

    Registration1(register){
console.log(register.value);
console.log(register.value);
let headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
let options = new RequestOptions({ headers: headers });
if(register.value.password != register.value.cpassword){
this.AlertMsg('Passwords must match')
}else{
var postdata = {
  name: register.value.firstname,
  email: register.value.email,
  password: register.value.password,
  regitration_type: 'simple_registration',
  role: 'customer',
  divice_token:this.devicetoken,
  phone_number:register.value.phone
  // lat: this.lat,
  // long: this.long,
}
//alert(this.devicetoken)
console.log(postdata);
var Serialized = this.serializeObj(postdata);
    var Loading = this.loadingCtrl.create({
     spinner: 'bubbles',
        cssClass: 'loader',
        content: "Loading",
dismissOnPageChange:true
    });
    Loading.present().then(() => {
      this.http.post(this.appsetting.myGlobalVar + 'users/registration', Serialized, options).map(res => res.json()).subscribe(response => {
        console.log(response);
        Loading.dismiss();
        if(response.status == true){
          this.appsetting.username = response.data.name;
          this.appsetting.emailuser = response.data.email;
          localStorage.setItem('UserDetail',JSON.stringify(response.data));
          localStorage.setItem('UserDetailcustomer',JSON.stringify(response.data));
          this.events.publish('customer', 'customer');
          this.navCtrl.push(HomePage);
        }else{
        this.AlertMsg(response.message);
        }
      })
    })
  }
    }
    serializeObj(obj) {
      var result = [];
      for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

      return result.join("&");
    }
    Facebooklogin() {
      this.fb.login(['public_profile', 'user_friends', 'email'])
          .then((res: FacebookLoginResponse) => {
              console.log('Logged into Facebook!', JSON.stringify(res))
              let userId = res.authResponse.userID;
              let accesstoken = res.authResponse.accessToken;
              console.log(accesstoken);
              console.log(userId);
              this.fb.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
                  this.userData = {
                      id: profile['id'],
                      email: profile['email'],
                      first_name: profile['first_name'],
                      last_name: profile['last_name'],
                      picture: profile['picture_large']['data']['url'],
                      username: profile['name']
                  }
                  console.log('User profile');
                  console.log(this.userData);
                  console.log('User profile stringify');
                  console.log(JSON.stringify(this.userData));
                  console.log('neelanshi');
                  console.log(window.navigator.onLine);
                  if (window.navigator.onLine == true) {
                    let headers = new Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    let options = new RequestOptions({ headers: headers });
                      var postdata = {
                          fb_id: this.userData.id,
                          name: this.userData.first_name+''+this.userData.last_name,
                          email: this.userData.email,
                          role: 'customer',
                          regitration_type: 'facebook',
                          divice_token: this.devicetoken,
                          profile_pic: this.userData.picture,
                          password: this.userData.id,
                      }
//                    alert(this.devicetoken);
                      console.log(postdata);
                      var Serialized = this.serializeObj(postdata);
                      var Loading = this.loadingCtrl.create({
                        spinner: 'bubbles',
                        cssClass: 'loader',
                        content: "Loading",
                dismissOnPageChange:true
                      });
                      Loading.present().then(() => {
                          this.http.post(this.appsetting.myGlobalVar + 'users/fbregistration', Serialized, options).map(res => res.json()).subscribe(response => {
                              console.log(response);
                              Loading.dismiss();
                              if (response.status == true) {
     this.appsetting.username = response.data.name;
          this.appsetting.emailuser = response.data.email;
          localStorage.setItem('UserDetail',JSON.stringify(response.data));
          localStorage.setItem('UserDetailcustomer',JSON.stringify(response.data));
          this.events.publish('customer', 'customer');
          this.navCtrl.push(HomePage);
                              } else {
                                  //alert('fail facebook');
                                  this.AlertMsg(response.message);
                              }


                          })
                      })

                      //}).catch((error: any) => console.log(error));
                  } else {
                      let toast = this.toastCtrl.create({
                          message: 'Check your internet connection',
                          duration: 3000,
                          position: 'bottom'
                      });

                      toast.onDidDismiss(() => {
                          console.log('Dismissed toast');
                      });

                      toast.present();
                  }
              });

          })
          .catch(e => {
              console.log('Error logging into Facebook', JSON.stringify(e))
          });
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
    signin() {
        this.navCtrl.push(SigninPage);
    }

}
