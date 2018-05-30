import {Component,OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Ionic2RatingModule} from 'ionic2-rating';
import {Appsetting} from "../../providers/appsetting";
import {Http, Headers, RequestOptions} from '@angular/http';
import {ToastController, AlertController, LoadingController, ActionSheetController,MenuController, Events} from 'ionic-angular';

/**
 * Generated class for the ViewreviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewreviews',
  templateUrl: 'viewreviews.html',
})
export class ViewreviewsPage {
rating: any;

    data: any = [];
    userid1: any;
    delshow: Boolean = false;
    parkingdata: any = [];
    reviewarry1: any = [];
    reviewarry: any = [];
    totalvalue: any = 0;
    Rating: any = 0;
    totalreviews: any;
    image:any;
    starone: any = 'star-outline';
    startwo: any = 'star-outline';
    starthree: any = 'star-outline';
    starfour: any = 'star-outline';
    starfive: any = 'star-outline';
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public events: Events,
        public toastCtrl: ToastController,
        public appsetting: Appsetting,
        public http: Http,
        public alertCtrl: AlertController,
        public menuCtrl: MenuController,
        public loadingCtrl: LoadingController) {
          this.menuCtrl.swipeEnable(true);
       var rdata = JSON.parse(localStorage.getItem('sellerreview'))
        console.log(rdata);
        this.show(rdata);
  }
  
    show(daa) {
       var parkdata:any=[];
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            let options = new RequestOptions({headers: headers});
             var postdata = {
                  user_id: daa.sellerid
            }
            //alert(this.devicetoken)
            console.log(postdata);
            var Loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
            dismissOnPageChange: true
        });
        Loading.present().then(() => {
            var Serialized = this.serializeObj(postdata);

                this.http.post(this.appsetting.myGlobalVar + 'users/userinfo', Serialized, options).map(res => res.json()).subscribe(response => {
                    console.log(response);
                        if(response.status == true){
                           parkdata= response.data.parking_space
 
                    console.log(parkdata);
                     for(var j=0;j<parkdata.length;j++){
                         if(parkdata[j]._id == daa.parkidd){
                             this.parkingdata = parkdata[j];
                            
                           this.reviewarry = parkdata[j].review_and_rating 
                           }
                     }
                      this.image = this.parkingdata.parking_images[0].parking_image;
                console.log(this.parkingdata);
                 console.log(this.image);
                 console.log(this.reviewarry);
                    this.userid1 = JSON.parse(localStorage.getItem('UserDetailseller'))._id;


                    var temp = this;
                    console.log(this.reviewarry.length);
                    this.totalreviews = this.reviewarry.length;
        if (this.reviewarry.length > 0) {
            this.reviewarry.forEach(function (value, key) {

                temp.Rating = (temp.Rating + value.rating);
                console.log(temp.Rating);
                temp.totalvalue = temp.Rating /temp.reviewarry.length
                temp.totalvalue = Number((temp.totalvalue).toFixed(1));
                                             
                if (value.rating == 1) {
                    value.starrone = 'star'
                     value.starrtwo = 'star-outline'
                    value.starrthree = 'star-outline'
                    value.starrfour = 'star-outline'
                    value.starrfive = 'star-outline'
                    
                }
                else if (value.rating == 2) {
                    value.starrone = 'star'
                    value.starrtwo = 'star'
                    value.starrthree = 'star-outline'
                    value.starrfour = 'star-outline'
                    value.starrfive = 'star-outline'
                }
                else if (value.rating == 3) {
                    value.starrone = 'star'
                    value.starrtwo = 'star'
                    value.starrthree = 'star'
                    value.starrfour = 'star-outline'
                    value.starrfive = 'star-outline'
                }
                else if (value.rating == 4) {
                    value.starrone = 'star'
                    value.starrtwo = 'star'
                    value.starrthree = 'star'
                    value.starrfour = 'star'
                    value.starrfive = 'star-outline'
                }
                else if (value.rating == 5) {
                    value.starrone = 'star'
                    value.starrtwo = 'star'
                    value.starrthree = 'star'
                    value.starrfour = 'star'
                    value.starrfive = 'star'
                } else if (value.rating == 1.5) {
                    this.starrone = 'star'
                    value.starrone = 'star-half'
                    value.starrtwo = 'star-outline'
                    value.starrthree = 'star-outline'
                    value.starrfour = 'star-outline'
                    value.starrfive = 'star-outline'
                } else if (value.rating == 2.5) {

                    value.starrone = 'star'
                    value.starrtwo = 'star'
                    value.starrthree = 'star-half'
                    value.starrfour = 'star-outline'
                    value.starrfive = 'star-outline'
                } else if (value.rating == 3.5) {
                    value.starrone = 'star'
                    value.starrtwo = 'star'
                    value.starrthree = 'star'
                    value.starrfour = 'star-half'
                    value.starrfive = 'star-outline'
                } else if (value.rating == 4.5) {
                    value.starrone = 'star'
                    value.starrtwo = 'star'
                    value.starrthree = 'star'
                    value.starrfour = 'star'
                    value.starrfive = 'star-half'
                }
            })
        }
        if(this.totalvalue  == 1){
                  this.starone = 'star'
              }
              else if(this.totalvalue  == 2){
                   this.starone = 'star'
                  this.startwo = 'star'
              }
              else if(this.totalvalue == 3){
                   this.starone = 'star'
                  this.startwo = 'star'
                  this.starthree = 'star'
              }
              else if(this.totalvalue == 4){
                  this.starone = 'star'
                  this.startwo = 'star'
                  this.starthree = 'star'
                   this.starfour = 'star'
              }
             else if(this.totalvalue == 5){
                 this.starone = 'star'
                  this.startwo = 'star'
                  this.starthree = 'star'
                   this.starfour = 'star'
                  this.starfive = 'star'
             }  else if((1.1 <= this.totalvalue)&&(this.totalvalue <= 1.5)){
           
              this.starone = 'star-half'
                  
              }  else if((1.6 <= this.totalvalue)&&(this.totalvalue <= 1.9)){
            
              this.starone = 'star'
                  this.startwo = 'star'
                
              }  else if((2.1 <= this.totalvalue)&&(this.totalvalue <= 2.5)){
           
              this.starone = 'star'
                  this.startwo = 'star'
                   this.starthree = 'star-half'
                
              }  else if((2.6 <= this.totalvalue)&&(this.totalvalue <= 2.9)){
             
              this.starone = 'star'
                  this.startwo = 'star'
                  this.starthree = 'star'
                
              }
                else if((3.1<= this.totalvalue)&&(this.totalvalue <= 3.5)){
                   
              this.starone = 'star'
                  this.startwo = 'star'
                  this.starthree = 'star'
                   this.starfour='star-half'
                
              }
                else if((3.6 <= this.totalvalue)&&(this.totalvalue <= 3.9)){
                   
              this.starone = 'star'
                  this.startwo = 'star'
                  this.starthree = 'star'
                  this.starfour='star'
              }
           else if((4.1 <= this.totalvalue)&&(this.totalvalue <= 4.5)){
            
              this.starone = 'star'
                  this.startwo = 'star'
                  this.starthree = 'star'
                   this.starfour='star-half'
                
              }
                else if((4.6 <= this.totalvalue)&&(this.totalvalue <= 4.9)){
                   
              this.starone = 'star'
                  this.startwo = 'star'
                  this.starthree = 'star'
                  this.starfour='star'
                  this.starfive='star'
                
              
        console.log(this.reviewarry);
        console.log(temp.userid1);
        console.log(this.totalvalue);
        }
                        Loading.dismissAll();
                        } }) })
    }
     serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

        return result.join("&");
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewreviewsPage');
  }

}
