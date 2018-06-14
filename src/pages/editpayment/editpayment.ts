import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Stripe} from '@ionic-native/stripe';
import {Appsetting} from "../../providers/appsetting";
import {HomePage} from '../home/home';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import * as moment from 'moment';
import {MikehousePage} from '../mikehouse/mikehouse';
import { CardlistPage } from '../cardlist/cardlist';
import {ToastController, AlertController, LoadingController, ActionSheetController, MenuController, Nav, App} from 'ionic-angular';

/**
 * Generated class for the EditpaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editpayment',
  templateUrl: 'editpayment.html',
})
export class EditpaymentPage {
public data:any=[];
date:any;
cardata:any=[];
cardid:any;

pagenameprevious:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public http: Http,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public menuCtrl: MenuController,
        public loadingCtrl: LoadingController,
        public appsetting: Appsetting,) {
        this.menuCtrl.swipeEnable(true);
         this.pagenameprevious=this.navCtrl.last();
   this.date = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.date);
        this.getdetail();
  }
getdetail(){
       let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    if(localStorage.getItem('editcard')){
    this.cardata = JSON.parse(localStorage.getItem('editcard'));
    console.log( this.cardata);
    this.data.cardholdername = this.cardata.card_holder_name;
    this.data.cardnumbr = this.cardata.card_number;
    this.data.cvc = this.cardata.cvv;
   
    this.data.dateyear = moment(this.cardata.expiration_date).format('YYYY-MM');
    if(this.cardata.address){
    this.data.address = this.cardata.address;}else{
this.data.address ='';
}
if(this.cardata.city){
 this.data.city = this.cardata.city;}else{
 this.data.city = '';}
  if(this.cardata.state){
 this.data.state = this.cardata.state;}else{
  this.data.state = '';
}
  if(this.cardata.zip){
this.data.zipcode = this.cardata.zip
}else{
this.data.zipcode ='';
}
   if(this.cardata.country){
    this.data.country = this.cardata.country;
}else{
 this.data.country = '';}
  
}
this.cardid = this.cardata._id;
  }
  Editbilling(paymentinfo){
console.log(paymentinfo);
let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });     
     var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
      var postdata = {
        card_holder_name:paymentinfo.value.cardholdername,
        card_number:paymentinfo.value.cardnumbr,
        cvv:paymentinfo.value.cvc,
        expiration_date:paymentinfo.value.dateyear,
        address:paymentinfo.value.address,
        city:paymentinfo.value.city,
        state:paymentinfo.value.state,
        zip:paymentinfo.value.zipcode,
        country:paymentinfo.value.country,
        user_id:userid,
        card_id:this.cardid
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
    this.http.post(this.appsetting.myGlobalVar +'users/EditPaymentinfo', serialized, options).map(res => res.json()).subscribe(data => {

      console.log(data);
      Loading.dismiss();
      if(data.status == true){
     this.AlertMsg1('Your card updated successfully')
     this.navCtrl.push(CardlistPage);
        }else{
        this.AlertMsg1(data.message)
        }
        })
        })

}
AlertMsg1(msg) {
        let alert = this.alertCtrl.create({
            title: 'Park Place',
            message: msg,
            buttons: [
                {
                    text: 'OK',
                    role: 'submit',
                    handler: () => {
                        console.log('ok clicked');
                        // this.navCtrl.push(ProcessingformPage);
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
    console.log('ionViewDidLoad EditpaymentPage');
  }

}
