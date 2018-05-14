import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
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
 * Generated class for the UpcomingreservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upcomingreservation',
  templateUrl: 'upcomingreservation.html',
})
export class UpcomingreservationPage {
Reservationdata:any=[];
Reservationdata1:any=[];
 infiniteScroll:any;
    Pagetotal:number=1;
    show:number;
    pagon:number=1;
    pagein:number=1;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      public appsetting: Appsetting) {
      this.getreservations(1);
      this.Reservationdata=[];
  }
  getreservations(pagenumber){
//    alert('hjgj');
       var Loading = this.loadingCtrl.create({
           spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
    dismissOnPageChange:true
        });
        Loading.present().then(() => {
      var imagearray:any=[];
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    if(localStorage.getItem('UserDetailcustomer')){
    var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
    console.log(userid);

    var postdata = {
        user_id: userid,
       role:'customer',
        page:pagenumber,
        checkin_status:0
    };

    var serialized = this.serializeObj(postdata);
    console.log(postdata);
    
    this.http.post(this.appsetting.myGlobalVar +'payments/GetReservation', serialized, options).map(res => res.json()).subscribe(data => {

   
      console.log(data);
      if(data.status == true){
          this.Reservationdata1=[];
           this.Pagetotal = data.Toatalpage;
           this.pagein = data.page;
          this.Reservationdata1 = data.data;
          this.show=1;
          this.Reservationdata1.forEach(function(value,key){
              value.reservation_data.forEach(function(value1,key1){
                  value1.parking_space.forEach(function(value2,key2){
                      if(value.parking_id == value2._id){
                          imagearray=[];
                          for(var i = 0 ; i< value2.parking_images.length;i++)
                          {
                          imagearray.push(value2.parking_images[i].parking_image);
                          }
                          value.imagespark = imagearray;
                          value.parkingname = value2.parking_name;
                          value.spacenumber = value2.space_number;
                          value.restriction = value2.restriction;
                          value.parksize = value2.parking_size;
                          value.sellername = value1.name;
                          value.phonenumber = value1.phone_number;
                          value.parkingaddress = value2.street_address+','+value2.city+','+value2.state+','+value2.zip_code;
                      }
                  })
                 
              })
          })
          var temp=this;
          this.Reservationdata1.forEach(function(value,key){
              temp.Reservationdata.push(value);
          })
//      this.Reservationdata = this.Reservationdata1;
//          console.log(this.Reservationdata);
      }else{
           this.show=0;
      }
       Loading.dismiss();
       console.log('khtm')
    })
 

  }
   })
  }
  changestatus(datta){
      console.log(datta);
       let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    
    var postdata = {
parking_id:datta._id,
checkin_status:2
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
    this.http.post(this.appsetting.myGlobalVar +'payments/ChangeCheckin', serialized, options).map(res => res.json()).subscribe(data => {

   
      console.log(data);
      Loading.dismiss();
      if(data.status == true){
//          this.getreservations(1);
          this.navCtrl.push(UpcomingreservationPage)
      }
      })
      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpcomingreservationPage');
  }
serializeObj(obj) {
  var result = [];
  for (var property in obj)
    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

  return result.join("&");
}
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
//            this.firsthit();
         this.getreservations(1);
         this.Reservationdata=[];
//             this.get();
            console.log('Async operation has ended');
            refresher.complete();
        }, 3000);
    }
        doInfinite(event){
        console.log(event);
         console.log(this.Pagetotal);
          console.log( this.pagon );
          console.log(this.pagein);
        this.infiniteScroll = event;
        if(this.pagon < this.Pagetotal){
            console.log(this.Pagetotal);
        this.pagon++ ; 
        console.log( this.pagon);
       this.getreservations(this.pagon)
       }else if(this.Pagetotal == this.pagein){
             event.complete();
       }else{
           event.complete();
       }
    }
  detail(reservation){
      console.log(reservation)
  this.navCtrl.push(DetailPage,reservation);
  }

}
