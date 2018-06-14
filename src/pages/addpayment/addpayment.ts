import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Stripe} from '@ionic-native/stripe';
import {Appsetting} from "../../providers/appsetting";
import {HomePage} from '../home/home';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import * as moment from 'moment';
import { BillinginformationPage } from '../billinginformation/billinginformation';
import {MikehousePage} from '../mikehouse/mikehouse';
import {ToastController, AlertController, LoadingController, ActionSheetController, MenuController, Nav, App} from 'ionic-angular';

/**
 * Generated class for the AddpaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpayment',
  templateUrl: 'addpayment.html',
})
export class AddpaymentPage {
public data:any=[];
date:any;
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
         console.log( this.pagenameprevious.component.name)
   this.date = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.date);
  }
Billing(paymentinfo){
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
        user_id:userid
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
    this.http.post(this.appsetting.myGlobalVar +'users/SavePaymentinfo', serialized, options).map(res => res.json()).subscribe(data => {

      console.log(data);
      Loading.dismiss();
      if(data.status == true){
     this.AlertMsg1('Your card added successfully')
     if(this.pagenameprevious.component.name == 'MikehousePage'){ 
                   this.navCtrl.push(BillinginformationPage);
                    }else if(this.pagenameprevious.component.name == 'BillinginformationPage'){
                        this.navCtrl.push(BillinginformationPage);
                        }else{
                        this.navCtrl.push(AddpaymentPage);
                    }
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
    console.log('ionViewDidLoad AddpaymentPage');
  }

}
