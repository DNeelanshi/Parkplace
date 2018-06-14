import { Component } from '@angular/core';
import { EditpaymentPage } from '../editpayment/editpayment';
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
 * Generated class for the CardlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cardlist',
  templateUrl: 'cardlist.html',
})
export class CardlistPage {
Userdata:any=[];
show:number;
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
       this.menuCtrl.swipeEnable(true);
      this.getinfo();
  }
getinfo(){
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  let options = new RequestOptions({ headers: headers });
  if(localStorage.getItem('UserDetailcustomer')){
      console.log(JSON.parse(localStorage.getItem('UserDetailcustomer')))
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
//          content: "Loading",
  dismissOnPageChange:true
      });
      Loading.present().then(() => {
  this.http.post(this.appsetting.myGlobalVar +'users/userinfo', serialized, options).map(res => res.json()).subscribe(data => {

  Loading.dismiss();
console.log(data);
if(data.status == true){
    if(data.data.card_details.length > 0){
  this.Userdata = data.data.card_details;
  this.show = 1;
  }else{
  console.log('no card');
      this.show = 0;
      console.log( this.show);
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
  var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
   var cardid = datadel._id
  console.log(cardid);
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
var body = {
      card_id:cardid,
       user_id:userid
      
    };
    let options = new RequestOptions({ 
    body: body,
    method: RequestMethod.Delete
  });
  var postdata = {

  };
   console.log(postdata);
  var serialized = this.serializeObj(postdata);
 
  this.http.request(this.appsetting.myGlobalVar +'users/DeletePaymentinfo',options).map(res => res.json()).subscribe(data => {


console.log(data);
if(data.status == true){
    this.AlertMsg('Deleted successfully')
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

  edit(dataa){
    localStorage.setItem('editcard',JSON.stringify(dataa));
  this.navCtrl.push(EditpaymentPage);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CardlistPage');
  }

}
