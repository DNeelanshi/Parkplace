import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {SignuptwoPage} from '../signuptwo/signuptwo';
import {HometwoPage} from '../hometwo/hometwo';
import {ForgotpwdPage} from '../forgotpwd/forgotpwd';
import { SignupPage } from '../signup/signup';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController,MenuController} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import{ListingbeforeapprovalPage} from '../listingbeforeapproval/listingbeforeapproval';
import { MyApp } from '../../app/app.component';
import { ListparkingspacePage } from '../listparkingspace/listparkingspace';
import { GetstartedPage } from '../getstarted/getstarted';
import { FCM } from '@ionic-native/fcm';
/**
 * Generated class for the SignintwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-signintwo',
    templateUrl: 'signintwo.html',
})
export class SignintwoPage {
  public data: any = '';
  devicetoken:any;
  userData:any={};
  public ptype = 'password';
  public iconname = 'eye';
   public showpass:boolean = false;
    constructor(
      public navCtrl: NavController,
       public menuCtrl: MenuController,
      public navParams: NavParams,
      public events: Events,
    public http: Http,
    public toastCtrl: ToastController,
    private fb: Facebook,
     private fcm: FCM,
    public appsetting: Appsetting,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
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
 getstarted(){
      this.navCtrl.push(GetstartedPage);
  }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SignintwoPage');
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
    Login(logindata){
      var check:any;
      var Userdata:any=[];
      console.log(logindata.value);
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
      let options = new RequestOptions({ headers: headers });
      var postdata = {
        email: logindata.value.email,
        password: logindata.value.password,
        role: 'seller',
        divice_token:this.devicetoken
      }
//      alert(this.devicetoken);
      console.log(postdata);
      var Serialized = this.serializeObj(postdata);
          var Loading = this.loadingCtrl.create({
           spinner: 'bubbles',
              cssClass: 'loader',
              content: "Loading",
      dismissOnPageChange:true
          });
          Loading.present().then(() => {
            this.http.post(this.appsetting.myGlobalVar + 'users/loginuser', Serialized, options).map(res => res.json()).subscribe(response => {
              console.log(response)
              Loading.dismiss();
              if(response.status == true){
                localStorage.setItem('UserDetail',JSON.stringify(response.userinfo));
                localStorage.setItem('UserDetailseller',JSON.stringify(response.userinfo));
                  if(localStorage.getItem('UserDetailcustomer')){
            localStorage.removeItem('UserDetailcustomer');
     
            }
                 Userdata = response.userinfo;
                this.appsetting.username = response.userinfo.name;
        this.appsetting.emailuser = response.userinfo.email;
        if(response.userinfo.profile_pic){
         this.appsetting.SrcImage = response.userinfo.profile_pic;}
        if(localStorage.getItem('Done')){
          check = true;
          this.appsetting.haveparking = 1;
                }else{
                    if(response.userinfo.parking_space.length > 0){
       check = response.userinfo.parking_space[0].status;
       console.log(check);
       }
                }
   
if(check == true){
        this.appsetting.haveparking=1;
        console.log(this.appsetting.haveparking);
//      alert('Second large menu');
      this.events.publish('seller', 'seller');
if(Userdata.first_add == false){
//    alert('here')
  this.navCtrl.push(ListparkingspacePage);
}else{
  this.navCtrl.push(HometwoPage);}

    }else{
    this.appsetting.haveparking=0;
    console.log(this.appsetting.haveparking);
      this.events.publish('seller', 'seller');
//      alert('Second small menu');
      this.navCtrl.push(ListingbeforeapprovalPage);

    }
            }else{
              this.AlertMsg(response.message);
            }


            })
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
    signup() {
        this.navCtrl.push(SignuptwoPage);

    }
    Facebooklogin() {
        var check:any;
        var Userdata:any=[];
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
                          regitration_type: 'facebook',
                          divice_token:this.devicetoken,
                          profile_pic: this.userData.picture,
                          password: this.userData.id,
                      }
//                alert(this.devicetoken);
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
                                  localStorage.setItem('UserDetail',JSON.stringify(response.data));
                localStorage.setItem('UserDetailseller',JSON.stringify(response.data));
                  if(localStorage.getItem('UserDetailcustomer')){
            localStorage.removeItem('UserDetailcustomer');
     
            }
                this.appsetting.username = response.data.name;
        this.appsetting.emailuser = response.data.email;
        // this.appsetting.SrcImage = response.userinfo.profile_pic;s
       Userdata = response.data;
        if(localStorage.getItem('Done')){
          check = true;
          this.appsetting.haveparking = 1;
                }else{
                    if(response.data.parking_space.length > 0){
       check = response.data.parking_space[0].status;
       console.log(check);
       }
                }
   
if(check == true){
        this.appsetting.haveparking=1;
        console.log(this.appsetting.haveparking);
//      alert('Second large menu');
      this.events.publish('seller', 'seller');
if(Userdata.first_add == false){
  this.navCtrl.push(ListparkingspacePage);
}else{
  this.navCtrl.push(HometwoPage);}

    }else{
    this.appsetting.haveparking=0;
    console.log(this.appsetting.haveparking);
      this.events.publish('seller', 'seller');
//      alert('Second small menu');
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
    serializeObj(obj) {
      var result = [];
      for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

      return result.join("&");
    }
    // home() {

    //     this.events.publish('seller', 'seller');
    //     this.navCtrl.push(HometwoPage);
    // }
// facebooklogin(){
//   this.fb.login(['public_profile', 'user_friends', 'email'])
//   .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res =>{
//     console.log(res);
//   }))
//   .catch(e => console.log('Error logging into Facebook', e));

//   // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
// }
    forgot() {
        this.navCtrl.push(ForgotpwdPage);
    }

}
