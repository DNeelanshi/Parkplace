import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { ChangepwdPage } from '../changepwd/changepwd';
import { HometwoPage } from '../hometwo/hometwo';
import { SignintwoPage } from '../signintwo/signintwo';
import {SigninPage} from '../signin/signin';
import {ForgotpwdPage} from '../forgotpwd/forgotpwd';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController,ActionSheetController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {MyprofiletwoPage} from '../myprofiletwo/myprofiletwo';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  public data:any= { };
  srcImage:any;
  public profileinfo:any=[];
  userid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public events: Events,
      public loadingCtrl: LoadingController,
      public appsetting: Appsetting,
      public camera: Camera,
      public actionSheetCtrl:ActionSheetController) {
        this.getuserdetail();
  }
  getuserdetail(){
//    alert('hjgj');
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    if(localStorage.getItem('UserDetailcustomer')){
    var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
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
      this.data.firstname =  this.profileinfo.name;
      this.data.email = this.profileinfo.email;
      this.data.phone = this.profileinfo.phone_number;
      this.srcImage = data.data.profile_pic;
console.log(this.profileinfo.phone_number)
    })
  })

  }
  }
  getpicture1(){
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
            var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
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
            var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
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
  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  isReadonly() {
    return this.isReadonly;   //return true/false
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }
  edit(editprofile){
    console.log(editprofile.value.name)
    let headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
let options = new RequestOptions({ headers: headers });
var postdata = {
  user_id: this.userid,
  name:editprofile.value.firstname,
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
    this.AlertMsg('Profile updated Succesfully');
    localStorage.setItem('UserDetailcustomer',JSON.stringify(data.data));
    this.events.publish('customer', 'customer');
this.profileinfo = data.data;
      // this.navCtrl.pop();

  }
})
})
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
   change(){
    if(this.profileinfo.regitration_type == 'facebook'){
      this.AlertMsg('You cannot change password as you logged in from facebook');
    }else{
  this.navCtrl.push(ChangepwdPage);
  localStorage.setItem('UserDetail',JSON.stringify(this.profileinfo));
  }
   }
}
