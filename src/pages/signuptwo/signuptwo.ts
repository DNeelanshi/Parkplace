import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HometwoPage } from '../hometwo/hometwo';
import { SignintwoPage } from '../signintwo/signintwo';
import {SigninPage} from '../signin/signin';
import {ForgotpwdPage} from '../forgotpwd/forgotpwd';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController,MenuController} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FCM } from '@ionic-native/fcm';
import 'rxjs/add/operator/map';
import{ListingbeforeapprovalPage} from '../listingbeforeapproval/listingbeforeapproval';
/**
 * Generated class for the SignuptwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signuptwo',
  templateUrl: 'signuptwo.html',
})
export class SignuptwoPage {
public data:any=[];
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
     public menuCtrl: MenuController,
    public navParams: NavParams,
    public events: Events,
    public http: Http,
  public toastCtrl: ToastController,
  private fb: Facebook,
  private fcm: FCM,
  public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public appsetting: Appsetting

      ) {
        this.menuCtrl.swipeEnable(false);
  fcm.getToken().then(token=>{
     this.devicetoken = token;
     })
     fcm.onNotification().subscribe(data=>{
  if(data.wasTapped){
    console.log("Received in background");
  } else {
    console.log("Received in foreground");
  };
})     
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignuptwoPage');
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
 validationphone1(phnn){
        console.log(phnn);
  console.log(phnn.length);
if(phnn.length==3){
  this.data.phone= this.data.phone +'-';
} else if(phnn.length==7){
 this.data.phone=this.data.phone+'-';
}

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
                        role: 'seller',
                        regitration_type:'facebook',
                        divice_token:this.devicetoken,
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
              localStorage.setItem('UserDetailseller',JSON.stringify(response.data));
              if(response.data.status == true ){
//                alert('sign up se small menu');
                this.appsetting.haveparking = 0 ;
                this.events.publish('seller', 'seller');
                this.navCtrl.push(ListingbeforeapprovalPage);
              }
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
  Registration(register){

    console.log(register.value);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    if(register.value.password != register.value.cpassword){
    this.AlertMsg('Passwords must match')
    }else{
    if(register.value.phone){
  register.value.phone= register.value.phone.replace(/-/g,"");
  }
    var postdata = {
      name: register.value.firstname,
      email: register.value.email,
      password: register.value.password,
      regitration_type: 'simple_registration',
      role: 'seller',
      divice_token:this.devicetoken,
      phone_number:register.value.phone
      // lat: this.lat,
      // long: this.long,
    }
    console.log(postdata);
//    alert(this.devicetoken);
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
              localStorage.setItem('UserDetailseller',JSON.stringify(response.data));
                                if(localStorage.getItem('UserDetailcustomer')){
            localStorage.removeItem('UserDetailcustomer');
     
            }
                 if(response.data.status == true ){
//                alert('sign up se small menu');
                this.appsetting.haveparking = 0 ;
                this.events.publish('seller', 'seller');
                this.navCtrl.push(ListingbeforeapprovalPage);
              }
            }else{
            this.AlertMsg(response.message);
            }
          })
        })
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


signin(){
  this.navCtrl.push(SignintwoPage);
}

}
