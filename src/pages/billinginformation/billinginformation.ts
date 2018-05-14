import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Stripe} from '@ionic-native/stripe';
import {Appsetting} from "../../providers/appsetting";
import {HomePage} from '../home/home';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import * as moment from 'moment';
import {MikehousePage} from '../mikehouse/mikehouse';
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
        this.date = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.date);
        console.log(this.navParams.data);
        this.paymentdata = this.navParams.data;
          console.log(this.paymentdata);
    }
    ngOnInit() {

    }
    Billing(databil) {
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
            })
            .catch(error => console.error(error));
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
   let alert = this.alertCtrl.create({
      title: '<p><img src="assets/imgs/checkmark.gif"></p>',
      subTitle: 'Payment Successful',
      buttons:   [{
          text: 'Done',
          handler: data => {
            console.log('Done clicked');
            this.navCtrl.push(HomePage);
          }
          }],
      cssClass: 'alertCustomCss',
     
    });
    alert.present();
         
         
      }else{
         console.log(data.message);
          Loading.dismiss()
      }
      },(err)=>{
          console.log(err);
      })
      })
      }
        serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
 
    ionViewDidLoad() {
        console.log('ionViewDidLoad BillinginformationPage');
    }

}