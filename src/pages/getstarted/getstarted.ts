import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { SignintwoPage } from '../signintwo/signintwo';
import { HometwoPage } from '../hometwo/hometwo';
import { HomePage } from '../home/home';
import{ListingbeforeapprovalPage} from '../listingbeforeapproval/listingbeforeapproval';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController,MenuController} from 'ionic-angular';
import { ListparkingspacePage } from '../listparkingspace/listparkingspace';

/**
 * Generated class for the GetstartedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-getstarted',
  templateUrl: 'getstarted.html',
})
export class GetstartedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, public appsetting: Appsetting,public http: Http,
    public alertCtrl: AlertController,
      public menuCtrl: MenuController,
      public loadingCtrl: LoadingController,) {

this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetstartedPage');
  }
  customer(){
    if(localStorage.getItem('UserDetailcustomer')){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({ headers: headers });

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
          if(data.status == true){
          console.log(data.data);
          this.appsetting.username = data.data.name;
        this.appsetting.emailuser = data.data.email;
        this.appsetting.SrcImage = data.data.profile_pic;

      }

        })
      })
//      alert('customer menu');
      this.navCtrl.push(HomePage);
      this.events.publish('customer', 'customer');
    }else{
  this.navCtrl.push(SigninPage);
//  alert('SIGNIN CUSTOMER FROM GETSTART')
}

}
serializeObj(obj) {
  var result = [];
  for (var property in obj)
    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

  return result.join("&");
}
 seller(){
   var check:any;
  var Userdata:any=[];
  if(localStorage.getItem('UserDetailseller')){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });

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
     
      if(data.status == true){
      console.log(data.data);
      Userdata = data.data;
      if(localStorage.getItem('Done')){       
check = true;
this.appsetting.haveparking = 1;
 console.log(check);
      }else{
//      alert('here')
          if(Userdata.parking_space.length > 0){
       check = Userdata.parking_space[0].parking_status;
       console.log(check);
       }
          
      }
 Loading.dismiss();
      this.appsetting.username = data.data.name;
    this.appsetting.emailuser = data.data.email;
    if(data.data.profile_pic){this.appsetting.SrcImage = data.data.profile_pic;}
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
  }


   
  })
})
  }else{
  this.navCtrl.push(SignintwoPage);}


}


}
