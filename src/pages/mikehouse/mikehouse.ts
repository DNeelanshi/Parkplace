import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReviewsPage } from '../reviews/reviews';
import {Appsetting} from "../../providers/appsetting";
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {ToastController, AlertController, LoadingController, ActionSheetController, MenuController, Nav, App,ModalController} from 'ionic-angular';
import { AddcarinfoPage } from '../addcarinfo/addcarinfo';
import { AddpaymentPage } from '../addpayment/addpayment';
import { DatetimemodalPage } from '../datetimemodal/datetimemodal';
import { Stripe } from '@ionic-native/stripe';
import { BillinginformationPage } from '../billinginformation/billinginformation';
import { HomePage } from '../home/home';
import * as moment from 'moment';
/**
 * Generated class for the MikehousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mikehouse',
  templateUrl: 'mikehouse.html',
})
export class MikehousePage {
parkdetail:any=[];
parkdetail1:any=[];
selldetail:any=[];
amount:any;
Cardata:any=[];
images:any=[];
datedata:any=[];
userdetail:any=[];
 reviewarry:any=[];
   Rating:number=0;
   totalvalue:number=0;
   Userdata:any;
   totalreviews:any=0;
   starone: any = 'star-outline';
    startwo: any = 'star-outline';
    starthree: any = 'star-outline';
    starfour: any = 'star-outline';
    starfive: any = 'star-outline';
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public http: Http,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public app: App,
        public menuCtrl: MenuController,
        public modalCtrl: ModalController,
        public loadingCtrl: LoadingController,
        public appsetting: Appsetting,private stripe: Stripe) {
          this.menuCtrl.swipeEnable(true);
        this.getdetail();
        console.log(this.navCtrl.last().component.name);
//        console.log(typeof(this.navParams.data))
//        if(typeof(this.navParams.data) == "string"){
//           
//        }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MikehousePage');
  }
  gotohome(){
      this.navCtrl.push(HomePage)
  }
getdetail(){
    var temp=this;
    this.parkdetail = JSON.parse(localStorage.getItem('Parkdetail'))
    this.selldetail = JSON.parse(localStorage.getItem('sellerparkdetail'))
    console.log(this.parkdetail);
    this.parkdetail.opening_days_and_timings.forEach(
    function(value,key){
        value.opening_time= moment(value.opening_time,"h:mm: A").format("hh:mm A");
         value.closing_time= moment(value.closing_time,"h:mm: A").format("hh:mm A");
    })
    this.parkdetail1= this.parkdetail;
    console.log(this.parkdetail1);
     if(temp.parkdetail.review_and_rating){
                    temp.totalreviews =  temp.parkdetail.review_and_rating.length;
                    
                    console.log(temp.totalreviews);
                    }else{
                        temp.totalreviews = 0;
                    }
                    temp.Rating=0;
                    temp.reviewarry = temp.parkdetail.review_and_rating
                    temp.reviewarry.forEach(function (value, key) {
                temp.Rating = (temp.Rating + value.rating);
                
                console.log('totalRating:'+temp.Rating);
                console.log('totallength'+temp.reviewarry.length)
                temp.totalvalue = temp.Rating /temp.reviewarry.length
                temp.totalvalue = Number((temp.totalvalue).toFixed(1));
                console.log('totalaverage'+temp.totalvalue);
                })
                 if(temp.totalvalue  == 1){
                  temp.starone = 'star'
              }
              else if(temp.totalvalue  == 2){
                   temp.starone = 'star'
                  temp.startwo = 'star'
              }
              else if(temp.totalvalue == 3){
                   temp.starone = 'star'
                  temp.startwo = 'star'
                  temp.starthree = 'star'
              }
              else if(temp.totalvalue == 4){
                  temp.starone = 'star'
                  temp.startwo = 'star'
                  temp.starthree = 'star'
                   temp.starfour = 'star'
              }
             else if(temp.totalvalue == 5){
                 temp.starone = 'star'
                  temp.startwo = 'star'
                  temp.starthree = 'star'
                   temp.starfour = 'star'
                  temp.starfive = 'star'
             }  else if((1.1 <= temp.totalvalue)&&(temp.totalvalue <= 1.5)){
           
              temp.starone = 'star-half'
                  
              }  else if((1.6 <= temp.totalvalue)&&(temp.totalvalue <= 1.9)){
            
              temp.starone = 'star'
                  temp.startwo = 'star'
                
              }  else if((2.1 <= temp.totalvalue)&&(temp.totalvalue <= 2.5)){
           
              temp.starone = 'star'
                  temp.startwo = 'star'
                   temp.starthree = 'star-half'
                
              }  else if((2.6 <= temp.totalvalue)&&(temp.totalvalue <= 2.9)){
             
              temp.starone = 'star'
                  temp.startwo = 'star'
                  temp.starthree = 'star'
                
              }
                else if((3.1<= temp.totalvalue)&&(temp.totalvalue <= 3.5)){
                   
              temp.starone = 'star'
                  temp.startwo = 'star'
                  temp.starthree = 'star'
                   temp.starfour='star-half'
                
              }
                else if((3.6 <= temp.totalvalue)&&(temp.totalvalue <= 3.9)){
                   
              temp.starone = 'star'
                  temp.startwo = 'star'
                  temp.starthree = 'star'
                  temp.starfour='star'
              }
           else if((4.1 <= temp.totalvalue)&&(temp.totalvalue <= 4.5)){
            
              temp.starone = 'star'
                  temp.startwo = 'star'
                  temp.starthree = 'star'
                   temp.starfour='star-half'
                
              }
                else if((4.6 <= temp.totalvalue)&&(temp.totalvalue <= 4.9)){
                   
              temp.starone = 'star'
                  temp.startwo = 'star'
                  temp.starthree = 'star'
                  temp.starfour='star'
                  temp.starfive='star'
                
              }
              
  console.log(this.selldetail);
    this.images=this.parkdetail.parking_images;
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

      console.log(data.data);
      this.userdetail=data.data;
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
  
  reservepay(){
      
      console.log(this.userdetail);
      if(this.userdetail.car_details.length == 0){
          this.navCtrl.push(AddcarinfoPage)
      }else{
          let alert = this.alertCtrl.create();
    alert.setTitle('Choose your vehicle');
for(var s=0; s< this.userdetail.car_details.length; s++){
    alert.addInput({
      type: 'radio',
      label: this.userdetail.car_details[s].car_maker+' '+this.userdetail.car_details[s].model,
      value: this.userdetail.car_details[s],
      checked: false
    });
}
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: cardata => {
           console.log(cardata);
           if(cardata == undefined){
               
           }else{
           console.log(cardata)
//           this.Cardata = cardata;
let dateModal = this.modalCtrl.create(DatetimemodalPage);

   dateModal.onDidDismiss(data1 => {
     console.log(data1);
     
     if((data1.endtime == undefined)||(data1.starttime == undefined)||(data1.day == undefined)||(data1.datte == undefined)){
         let toast = this.toastCtrl.create({
    message: 'Invalid date time selections',
    duration: 2000,
    position: 'top'
  });
  toast.present();
     }else{
//     this.datedata = data1;
     this.amount = (parseInt(data1.endtime) - parseInt(data1.starttime))*this.parkdetail.hourly_rate;
     console.log(this.amount);
      var postdata1 = {
  total_amount:this.amount,
payment_to:this.selldetail._id,
parking_id:this.parkdetail._id,
payment_from:this.userdetail._id,
parking_date:data1.datte,
parking_day:data1.day,
parking_start_time:data1.starttime,
parking_end_time:data1.endtime,
rate_per_hour:this.parkdetail.hourly_rate,
car_id:cardata._id,
spacenumber: this.parkdetail.space_number,
address:this.parkdetail.street_address+','+this.parkdetail.city+','+this.parkdetail.state+','+this.parkdetail.zip_code
    };
     localStorage.setItem('payinfodata',JSON.stringify(postdata1))
    if(this.userdetail.card_details.length == 0){
         this.navCtrl.push(AddpaymentPage);
}else{
     this.navCtrl.push(BillinginformationPage,postdata1);}
     

//     if(this.navParams.data.length == undefined){
//         console.log('not done');
//     }else{
// console.log("done"+''+this.navParams.data)
//         let headers = new Headers();
//    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
//    let options = new RequestOptions({ headers: headers });
//    
     
//
//    var serialized = this.serializeObj(postdata);
//    console.log(postdata);
////     var Loading = this.loadingCtrl.create({
////           spinner: 'bubbles',
////            cssClass: 'loader',
////            content: "Loading",
////    dismissOnPageChange:true
////        });
////        Loading.present().then(() => {
////    this.http.post(this.appsetting.myGlobalVar +'users/', serialized, options).map(res => res.json()).subscribe(data => {
////
////      console.log(data.data);
////      this.userdetail=data.data;
////      })
////      })
////     }
//
//   
//      }
      }
      
    });
    dateModal.present();
    }
   
  }
      });
      alert.present(); }}
     
          
               
// payment(){
//     console.log(this.Cardata);
//       let headers = new Headers();
//    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
//    let options = new RequestOptions({ headers: headers });     
//    
//      var postdata = {
//  total_amount:this.amount,
//payment_to:this.selldetail._id,
//token:this.navParams.data,
//parking_id:this.parkdetail._id,
//payment_from:this.userdetail._id,
////payment_to:
//parking_date: this.datedata.datte,
//parking_day: this.datedata.day,
//parking_start_time: this.datedata.starttime,
//parking_end_time: this.datedata.endtime,
////actul_end_time:
//rate_per_hour:this.parkdetail.hourly_rate,
//car_id: this.Cardata._id
////checkin_status:
//    };
//
//    var serialized = this.serializeObj(postdata);
//    console.log(postdata);
//      }
//  
  review(reviewdata){
      console.log(reviewdata);
      var posttreviewdata = {
         parkid:reviewdata._id,
         selid:this.selldetail._id
      };
      localStorage.setItem('reviewdata',JSON.stringify(posttreviewdata))
   this.navCtrl.push(ReviewsPage);
  }

}
