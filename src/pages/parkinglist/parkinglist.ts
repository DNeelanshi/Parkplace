
import { EditlistingPage } from '../editlisting/editlisting';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events} from 'ionic-angular';
import { ChangepwdPage } from '../changepwd/changepwd';
import { HometwoPage } from '../hometwo/hometwo';
import { SignintwoPage } from '../signintwo/signintwo';
import {SigninPage} from '../signin/signin';
import {ForgotpwdPage} from '../forgotpwd/forgotpwd';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions ,RequestMethod} from '@angular/http';
import { ToastController, AlertController, LoadingController,ActionSheetController,MenuController,Nav,App} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {MyprofiletwoPage} from '../myprofiletwo/myprofiletwo';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {GetstartedPage} from '../getstarted/getstarted';
/**
 * Generated class for the ParkinglistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parkinglist',
  templateUrl: 'parkinglist.html',
})
export class ParkinglistPage {
  Userdata:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
      public app: App,
    public events: Events,
     public menuCtrl: MenuController,
      public loadingCtrl: LoadingController,
      public appsetting: Appsetting,
      public camera: Camera,
      public actionSheetCtrl:ActionSheetController) {
        this.getinfo();
//        alert('welcome');
  }
getinfo(){
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  let options = new RequestOptions({ headers: headers });
  if(localStorage.getItem('UserDetailseller')){
      console.log(JSON.parse(localStorage.getItem('UserDetailseller')))
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
  this.Userdata = data.data.parking_space;
  if (data.data.parking_space.length == 0){
//      alert('no data');
        if(localStorage.getItem('UserDetailseller')){
          // console.log(localStorage.getItem('UserInfo'));
          // console.log(localStorage.getItem('UserInfo'));
          localStorage.removeItem('UserDetailseller');
          localStorage.removeItem('Done')}
          this.app.getRootNav().setRoot(GetstartedPage);
        
      this.menuCtrl.close();
  }
}

  })
})

}
}
delete(datadel){
   let alert = this.alertCtrl.create({
      title: 'Park Place',
      message: 'Are you sure<br>you want to delete?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            // this.navCtrl.push(RegisterPage)
          }
        },
        {
          text: 'YES',
          role: 'submit',
          handler: () => {
   console.log(datadel)
  var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
   var parkid = datadel._id
  console.log(parkid);
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
var body = {
       user_id: userid,
    parking_id:parkid
      
    };
    let options = new RequestOptions({ 
    body: body,
    method: RequestMethod.Delete
  });
  var postdata = {
   
  };
   console.log(postdata);
  var serialized = this.serializeObj(postdata);
 
  this.http.request(this.appsetting.myGlobalVar +'users/delete_parking',options).map(res => res.json()).subscribe(data => {


console.log(data);
if(data.status == true){
    this.AlertMsg('Deleted succesfully')
  this.getinfo();
}

 
})
          }
        }
      ]
    });
    alert.present();
  
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkinglistPage');
  }

  edit(dataa){
    localStorage.setItem('Editlisting',JSON.stringify(dataa));
  this.navCtrl.push(EditlistingPage);
  }

}
