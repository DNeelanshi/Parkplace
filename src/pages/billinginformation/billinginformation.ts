import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Stripe} from '@ionic-native/stripe';
import {Appsetting} from "../../providers/appsetting";
import {HomePage} from '../home/home';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import * as moment from 'moment';
import {MikehousePage} from '../mikehouse/mikehouse';
import {AddpaymentPage} from '../addpayment/addpayment';
import {ToastController, AlertController, LoadingController, ActionSheetController, MenuController, Nav, App} from 'ionic-angular';
/**
 * Generated class for the BillinginformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-billinginformation',
    templateUrl: 'billinginformation.html',
})
export class BillinginformationPage {
    public data: any = [];
    date: any;
    Userdata:any=[];
show:number;
paymentdetails:any=[];
	blurr:Boolean=false;
    paymentdata:any=[];
    constructor(private stripe: Stripe, public navCtrl: NavController, public navParams: NavParams,
        public http: Http,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public app: App,
        public menuCtrl: MenuController,
        public loadingCtrl: LoadingController,
        public appsetting: Appsetting,
        public actionSheetCtrl: ActionSheetController) {
         this.menuCtrl.swipeEnable(true);
        this.date = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.date);
        console.log(this.navParams.data);
          if(localStorage.getItem('payinfodata')){
      console.log(JSON.parse(localStorage.getItem('payinfodata')))}
        this.paymentdata = JSON.parse(localStorage.getItem('payinfodata'));
          console.log(this.paymentdata);
           this.getinfo();
    }
    ngOnInit() {

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
      this.navCtrl.push(AddpaymentPage);
  }

}

  })
})

}
}
choose(dats){
this.paymentdetails=[];
console.log(dats);
this.paymentdetails=dats;
}

paymentfinal(){
console.log(this.paymentdetails);
this.Billing1(this.paymentdetails);
}
Billing1(databil) {
		this.blurr = true;
        console.log(databil);
       var str =  databil.expiration_date.split('-');
       var month = str[1];
       var year = str[0];
       console.log(month,year);
        this.stripe.setPublishableKey('pk_test_cMvSt7FAbbUxSm5z0QvX4cWC');
        let card = {
            number: databil.card_number,
            expMonth: month,
            expYear: year,
            cvc: databil.cvv,
            name: databil.card_holder_name,
            address_line1: databil.address,
            address_city: databil.city,
            address_state: databil.state,
            address_country: databil.country,
            postal_code: databil.zip


        };
        this.stripe.createCardToken(card)
            .then(token => {
                console.log(token.id)
                if(token.id){
                this.payment(token.id);}
            },(err)=>{
                this.AlertMsg(err);
            })
            .catch((error) => {
                console.error(error)
                console.log(error);
            this.AlertMsg(error);
            });
    }
    addpayment(){
    this.navCtrl.push(AddpaymentPage);
}
    
    Billing(databil) {
		this.blurr = true;
        console.log(databil.value);
       var str =  databil.value.dateyear.split('-');
       var month = str[1];
       var year = str[0];
       console.log(month,year);
        this.stripe.setPublishableKey('pk_test_cMvSt7FAbbUxSm5z0QvX4cWC');
        let card = {
            number: databil.value.cardnumber,
            expMonth: month,
            expYear: year,
            cvc: databil.value.cvc,
            name: databil.value.firstname,
            address_line1: databil.value.address,
            address_city: databil.value.city,
            address_state: databil.value.state,
            address_country: databil.value.country,
            postal_code: databil.value.zipcode


        };
        this.stripe.createCardToken(card)
            .then(token => {
                console.log(token.id)
                if(token.id){
                this.payment(token.id);}
            },(err)=>{
                this.AlertMsg(err);
            })
            .catch((error) => {
                console.error(error)
                console.log(error);
            this.AlertMsg(error);
            });
    }
   payment(token){
        console.log(this.paymentdata);
        console.log(token)
       let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });     
    
      var postdata = {
   total_amount:this.paymentdata.total_amount,
payment_to:this.paymentdata.payment_to,
token:token,
parking_id:this.paymentdata.parking_id,
payment_from:this.paymentdata.payment_from,
parking_date:this.paymentdata.parking_date,
parking_day:this.paymentdata.parking_day,
parking_start_time: this.paymentdata.parking_start_time,
parking_end_time:this.paymentdata.parking_end_time,
rate_per_hour:this.paymentdata.rate_per_hour,
car_id:this.paymentdata.car_id,
address:this.paymentdata.address,
spacenumber: this.paymentdata.spacenumber
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
    this.http.post(this.appsetting.myGlobalVar +'payments/StripePayment', serialized, options).map(res => res.json()).subscribe(data => {

      console.log(data);
      Loading.dismiss();
      if(data.status == true){
          localStorage.setItem('paymentdetails',JSON.stringify(data));
       console.log('success');
       localStorage.removeItem('payinfodata');
   let alert = this.alertCtrl.create({
      title: '<p><img src="assets/imgs/checkmark.gif"></p>',
      subTitle: 'Payment Successful',
      buttons:   [{
          text: 'Done',
          handler: data => {
            console.log('Done clicked');
			this.blurr = false;
            this.navCtrl.push(HomePage);
			
          }
          }],
      cssClass: 'alertCustomCss',
     
    });
    alert.present();
         
         
      }else{
      this.AlertMsg(data.message)
         console.log(data.message);
          Loading.dismiss();
          this.blurr = false;
      }
      },(err)=>{
      this.AlertMsg(err)
          console.log(err);
           Loading.dismiss();
           this.blurr = false;
      })
      })
      }
        serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
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
           this.blurr = false;
          }
        }
      ]
    });
    alert.present();
  }
    ionViewDidLoad() {
        console.log('ionViewDidLoad BillinginformationPage');
    }

}
