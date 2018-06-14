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
 flag:Number=0;
date:any;
parkid:any;
time:any;
comparison:Boolean=false;
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
        this.time = moment(new Date()).format('HH:mm').toString();
        console.log(this.date); 
        if(localStorage.getItem('datetimedata'))
   {
     this.data.datee = JSON.parse(localStorage.getItem('datetimedata')).bookingdate;
     var a11:any=[];
    a11=  moment(this.data.datee).format('LLLL');
     console.log(a11);
     a11 = a11.split(',')
     this.datetime.opening_days_and_timings.forEach(function(value,key){
         
         if(value.day == a11[0]){
             temp.data.day = a11[0];
             console.log(a11[0],value.day)
               temp.flag=1;
         } 
     });

     this.data.start = JSON.parse(localStorage.getItem('datetimedata')).startime;
   }
  }
  changestime(){
            
        console.log(this.data.start);
var btime = this.data.start.split(":")
var curtime = this.time.split(":");
var beginningTime = moment({
  h: btime[0],
  s: btime[1]
});
var currentime = moment({
  h: curtime[0],
  s: curtime[1]
});
console.log(beginningTime);
console.log(currentime);
console.log(beginningTime.isBefore(currentime));
this.comparison = beginningTime.isBefore(currentime);
  }
  changes(){
      var tem=this;
      this.flag = 0;
       var flag1=0;
      var a:any=[];
    a=  moment(this.data.datee).format('LLLL');
     console.log(a);
   
     a = a.split(',')
     this.datetime.opening_days_and_timings.forEach(function(value,key){
         
         if(value.day == a[0]){
             tem.data.day = a[0];
             console.log(a[0],value.day)
             tem.flag=1;
         }else{
tem.data.day = a[0];
}

         
     });
     console.log(this.flag);
      if(this.flag == 1){     
             
         }
         else{
               this.AlertMsg1('Sorry no service available on this date. Please choose other');
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
            var f = temp.data.datee.split('-');
            console.log(f[0],f[1],f[2]);
           
            console.log(temp.data.start,temp.data.end);
            var la =  moment([f[0], f[1], f[2], a[0], a[1], 0]);
            var lb =  moment([f[0], f[1], f[2], b[0], b[1], 0])
            var compp = lb.diff(la, 'minutes')
            console.log(compp)
            console.log(b[0],a[0],b[1],a[1])
           
            if(b[0]>a[0]){
                console.log(parseInt(b[1])+60);
              console.log((moment(temp.date).isSame(moment(temp.data.datee))));
              console.log(temp.comparison)
              console.log(temp.flag)
            if((moment(temp.date).isSame(moment(temp.data.datee)) == true)&&(temp.comparison == true)){
       
        temp.AlertMsg1('Time must be greater than current');
        if(compp < 60){
                       temp.AlertMsg1('Minimum parking should be 60 minutes');

     }
        }else{
         if(temp.flag == 1){    
         if(compp < 60){
                       temp.AlertMsg1('Minimum parking should be 60 minutes');

     }else{ 
              temp.finalcheck(temp.data.day,temp.data.start,temp.data.end,temp.data.datee)   }
         }
         else{
               temp.AlertMsg1('Sorry no service available on this date. Please choose other');
         }
            
            }
        } else if(b[0]==a[0]){
              console.log(parseInt(b[1])+60);
              console.log((moment(temp.date).isSame(moment(temp.data.datee))));
              console.log(temp.comparison)
              console.log(temp.flag)
           console.log(compp)
           console.log(a[0],b[0],a[1],b[1]);
               if((a[1] == b[1])||(compp < 60)){
               temp.AlertMsg1('Minimum parking should be 60 minutes');
            }else if((moment(temp.date).isSame(moment(temp.data.datee)) == true)&&(temp.comparison == true)){
       
                     temp.AlertMsg1('Time must be greater than current');
        
        }else{
         if(temp.flag == 1){     
              temp.finalcheck(temp.data.day,temp.data.start,temp.data.end,temp.data.datee)   
         }
         else{
               temp.AlertMsg1('Sorry no service available on this date. Please choose other');
         }
            
            }
                
        }else {
                temp.AlertMsg1('Closing time must be greater than opening time!');
        }
                    }
                }
            })
    
        } else {
            this.AlertMsg1('Details are either wrong or incomplete.');
        }
  
 }
   isReadonly() {
    return this.isReadonly;   //return true/false
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
