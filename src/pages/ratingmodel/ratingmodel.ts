import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ViewreviewsPage } from "../viewreviews/viewreviews";
import {Ionic2RatingModule} from 'ionic2-rating';
import {Appsetting} from "../../providers/appsetting";
import {HomePage} from '../home/home';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, AlertController, LoadingController, ActionSheetController, Events} from 'ionic-angular';

/**
 * Generated class for the RatingmodelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ratingmodel',
  templateUrl: 'ratingmodel.html',
})
export class RatingmodelPage {
data:any=[];
rating:number;
parkingid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public events: Events,
        public toastCtrl: ToastController,
        public appsetting: Appsetting,
        public http: Http,
        public viewCtrl:ViewController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {
     console.log(navParams.get('parkid'));
     this.parkingid = navParams.get('parkid');
   
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingmodelPage');
   
  }

  dismiss() {
      
   this.viewCtrl.dismiss();
   
 }
     onModelChange(number) {
        console.log(number);
        this.rating = number;


    }
 review1(){
     var propic:any;
   console.log(this.data.comment);
      
        var userdata = JSON.parse(localStorage.getItem('UserDetailcustomer'));
        console.log(userdata);
        if(!userdata.profile_pic){
            propic='assets/imgs/user.png';
        }else{
            propic=userdata.profile_pic;
        }
         console.log(propic);
        if((this.data.comment == undefined)||(this.data.comment == "")){
            this.AlertMsg('Please give the comment.')
        }else if(this.rating == undefined){
             this.AlertMsg('Please give the rating')
        }else{
        var postdata = {
            parking_id:this.parkingid,
            user_id: userdata._id,
            review: this.data.comment,
            rating: this.rating,
            reviewer_name:userdata.name,
            reviewer_image:propic
        }
        //alert(this.devicetoken)
        console.log(postdata);
        var Serialized = this.serializeObj(postdata);
        var Loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            cssClass: 'loader',
           
            dismissOnPageChange: true
        });
         let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
         headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({headers: headers});
        Loading.present().then(() => {
            this.http.post(this.appsetting.myGlobalVar + 'users/AddReviewRating', Serialized, options)
                .map(res => res.json()).subscribe(response => {
                console.log(response);
                if (response.status == true) {

                    localStorage.setItem('Parkdetail', JSON.stringify(response.data.parking_space[0]));
                   this.viewCtrl.dismiss({
      
          });
                    
                } else {
                    this.AlertMsg(response.data);
//                    this.navCtrl.push(ReviewsPage);
                }
            
                Loading.dismissAll();
            })
        })
        }
}
AlertMsg(msg) {
        let alert = this.alertCtrl.create({
            title: 'Park Place',
            message: msg,
            buttons: [
                {
                    text: 'ok',
                    role: 'ok',
                    handler: () => {
                        console.log('Continue clicked');

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

}
