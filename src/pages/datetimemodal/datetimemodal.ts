import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ToastController, AlertController, LoadingController,ViewController} from 'ionic-angular';
import * as moment from 'moment';
import {Appsetting} from "../../providers/appsetting";
import {HomePage} from '../home/home';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
/**
 * Generated class for the DatetimemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datetimemodal',
  templateUrl: 'datetimemodal.html',
})
export class DatetimemodalPage {
datetime:any=[];
public data:any=[];
startime:any;
endtime:any;
date:any;
parkid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewctrl: ViewController
      ,public toastCtrl:ToastController, public http: Http,
        public alertCtrl: AlertController,
          public appsetting: Appsetting,
        public loadingCtrl: LoadingController,) {
      var temp=this;
    this.datetime =  JSON.parse(localStorage.getItem('Parkdetail'));
    console.log(this.datetime);
    this.parkid =  this.datetime._id
   this.date = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.date);    
  }
  changes(){
      var tem=this;
      var flag=0;
       var flag1=0;
      var a:any=[];
    a=  moment(this.data.datee).format('LLLL');
     console.log(a);
     a = a.split(',')
     this.datetime.opening_days_and_timings.forEach(function(value,key){
         
         if(value.day == a[0]){
             tem.data.day = a[0];
             console.log(a[0],value.day)
             flag=1;
         }
         
     });
     if(flag == 1){        
         }
         else{
               tem.AlertMsg1('Sorry no service available on this date. Please choose other');
         }
  }
dismiss1() {
   this.viewctrl.dismiss();
 }
 dismiss() {
   var temp = this;
 
        if (this.data.day && this.data.datee && this.data.start && this.data.end) {
            this.datetime.opening_days_and_timings.forEach(function(value,key){
                if(value.day == temp.data.day){
                    if((value.opening_time > temp.data.start)||(value.closing_time < temp.data.end)){
                        temp.AlertMsg1('Sorry no service available at this time. Select some other');
                    }else if((value.opening_time > temp.data.start)&&(value.closing_time < temp.data.end)){
                         temp.AlertMsg1('Sorry no service available at this time. Select some other');
                    }else{
                                var a = temp.data.start.split(':');
            var b = temp.data.end.split(':');
            console.log(b[0],a[0],b[1],a[1])
           
            if(b[0]>a[0]){
    temp.finalcheck(temp.data.day,temp.data.start,temp.data.end,temp.data.datee)
        } else if(b[0]==a[0]){
              console.log(parseInt(b[1])+30);
               if((a[1]==b[1])||(parseInt(b[1])-parseInt(a[1]) < 30)){
               temp.AlertMsg1('Minimum parking should be 30 minutes');
            }else{
             temp.finalcheck(temp.data.day,temp.data.start,temp.data.end,temp.data.datee)
            }
                
        }else {
                temp.AlertMsg1('Closing time must be greater than opening time!');
        }
                    }
                }
            })
    
        } else {
            this.AlertMsg1('Are you sure you selected day,opening and closing time?');
        }
  
 }
 finalcheck(fday,fstart,fend,fdate){
     console.log(fdate,fday,fstart,fend);
     let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers }); 
     var postdata = {
        parking_id: this.parkid,
      booking_date:fdate,
      booking_day:fday,
      booking_start_time:fstart,
      booking_end_time:fend
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
    this.http.post(this.appsetting.myGlobalVar +'payments/CheckAvalibillity', serialized, options).map(res => res.json()).subscribe(data => {

      console.log(data);
      Loading.dismiss();
      if(data.status == true){
         this.viewctrl.dismiss({
         day:fday,
         starttime:fstart,
         endtime:fend,
         datte:fdate
          });
      }else{
          this.AlertMsg1(data.message);
      }
      })
      })
 }
     AlertMsg1(msg){
  let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
}
        serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DatetimemodalPage');
  }

}
