import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangepwdPage } from '../changepwd/changepwd';
import { HometwoPage } from '../hometwo/hometwo';
import { SignintwoPage } from '../signintwo/signintwo';
import {SigninPage} from '../signin/signin';
import {ForgotpwdPage} from '../forgotpwd/forgotpwd';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController,ActionSheetController,MenuController,Events} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {MyprofiletwoPage} from '../myprofiletwo/myprofiletwo';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the EditprofiletwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofiletwo',
  templateUrl: 'editprofiletwo.html',
})
export class EditprofiletwoPage {
public data:any= [];
srcImage:any;
public profileinfo:any=[];
userid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
      public loadingCtrl: LoadingController,
      public appsetting: Appsetting,
      public camera: Camera,
      public events: Events,
      public actionSheetCtrl:ActionSheetController,) {
       this.menuCtrl.swipeEnable(true);
this.getuserdetail();
  }
  getpicture(){
    let actionsheet = this.actionSheetCtrl.create({
      title: "Choose Album",
      buttons: [{
        text: 'Camera',
        handler: () => {
          const options: CameraOptions = {
            quality: 8,
            sourceType: 1,
            correctOrientation: true,
            allowEdit:true,
            targetWidth:550,
            targetHeight:550,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

          this.camera.getPicture(options).then((imageUri) => {
            this.srcImage = 'data:image/jpeg;base64,' + imageUri;
                let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            let options = new RequestOptions({ headers: headers });
            var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
             var postdata = {
              user_id: userid,
              profile_picture:this.srcImage
            };
            console.log(postdata);

            var serialized = this.serializeObj(postdata);
                 var Loading = this.loadingCtrl.create({
        spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
    dismissOnPageChange:true
     });
     Loading.present().then(() => {
this.http.post(this.appsetting.myGlobalVar +'users/user_profile_pic', postdata).map(res => res.json()).subscribe(data => {
               Loading.dismiss();

// alert(JSON.stringify(data));
              console.log(data)
//              alert("saving image")
            },(err)=>{
              alert(JSON.stringify(err))
            })
     })


          }, (err) => {
            alert(JSON.stringify(err));
            // this.loading.dismiss();
            console.log(err);
          });
        }
      },
      {
        text: 'Gallery',
        handler: () => {
          console.log("Gallery Clicked");
          //	alert("get Picture")
          // this.loading.present();
          const options: CameraOptions = {
            quality: 10,
            sourceType: 0,
            correctOrientation: true,
            allowEdit:true,
            targetWidth:550,
            targetHeight:550,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }
          this.camera.getPicture(options).then((imageData) => {
            this.srcImage = 'data:image/jpeg;base64,' + imageData;
                let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            let options = new RequestOptions({ headers: headers });
            var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
             var postdata = {
              user_id: userid,
              profile_picture:this.srcImage
            };
//            alert(postdata)
            var serialized = this.serializeObj(postdata);
     var Loading = this.loadingCtrl.create({
        spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
    dismissOnPageChange:true
     });
     Loading.present().then(() => {
            this.http.post(this.appsetting.myGlobalVar +'users/user_profile_pic', postdata).map(res => res.json()).subscribe(data => {
              Loading.dismiss();
              console.log(data)
//              alert("saving image")
            },(err)=>{
              console.log(JSON.stringify(err))
              alert(JSON.stringify(err))
            })
     })
//            alert('gallery working');
          }, (err) => {
            // this.loading.dismiss();
            alert(JSON.stringify(err));
            // Handle error
          });
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          actionsheet.dismiss();

        }
      }]
    });

    actionsheet.present();
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

    Loading.dismiss();


      console.log(data);
      this.profileinfo= data.data;
      this.userid =  this.profileinfo._id;
      this.data.fullname =  this.profileinfo.name;
      this.data.email = this.profileinfo.email;
      if(this.profileinfo.phone_number){
 console.log(this.profileinfo.phone_number.length);

    var str = this.profileinfo.phone_number;
    var res = str.substring(0, 3);
     var res1 = str.substring(3, 6);
      var res2 = str.substring(6,10);
       console.log(res+'-'+res1+'-'+res2);
        // var res2 = str.substring(12,9);
    this.data.phone=res+'-'+res1+'-'+res2;
   }
//      this.data.phone = this.profileinfo.phone_number;
      this.srcImage = data.data.profile_pic;
      console.log(data.data.profile_pic);

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
 phonevalidation4(phn){
if(phn.length==3){
  this.data.phone= this.data.phone +'-';
} else if(phn.length==7){
 this.data.phone=this.data.phone+'-';
}
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofiletwoPage');
  }
  edit(editprofile){
console.log(editprofile.value);
let headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
let options = new RequestOptions({ headers: headers });
if(editprofile.value.phone){
  editprofile.value.phone= editprofile.value.phone.replace(/-/g,"");
  }
var postdata = {
  user_id: this.userid,
  name :editprofile.value.fullname,
  phone_number:editprofile.value.phone
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
this.http.post(this.appsetting.myGlobalVar +'users/profileupdate', serialized, options).map(res => res.json()).subscribe(data => {

Loading.dismiss();
  console.log(data);
  if(data.status == true){
    this.AlertMsg('Profile updated successfully');
    localStorage.setItem('UserDetailseller',JSON.stringify(data.data));
    console.log(data.data);
    this.profileinfo=data.data;
    this.events.publish('seller', 'seller');
      // this.navCtrl.pop();

  }
})
})
  }
  isReadonl() {
    return this.isReadonl;   //return true/false
  }
   change(){
     if(this.profileinfo.regitration_type == 'facebook'){
      this.AlertMsg('You cannot change password as you logged in from facebook');
     }else{
  this.navCtrl.push(ChangepwdPage);
  localStorage.setItem('UserDetail',JSON.stringify(this.profileinfo));}
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
            this.navCtrl.push(MyprofiletwoPage);
          }
        }
      ]
    });
    alert.present();
  }
}
