import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController,ActionSheetController,MenuController} from 'ionic-angular';
import * as moment from 'moment';
/**
 * Generated class for the ViewreservationtwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewreservationtwo',
  templateUrl: 'viewreservationtwo.html',
})
export class ViewreservationtwoPage {

 Reservationdata: any = [];
    Reservationdata1: any = [];
    infiniteScroll: any;
    Pagetotal: number = 1;
    pagon: number = 1;
    pagein: number = 1;
    show:number;
    parkdetails:any=[];
    
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
     public menuCtrl: MenuController,
      public loadingCtrl: LoadingController,
      public appsetting: Appsetting) {
       this.menuCtrl.swipeEnable(true);
//      alert('new');
   this.Reservationdata = [];
        this.parkdetails=[];
         this.getuserdetail(1);
  }
  ngOnInit() {
        
       
    }
    getuserdetail(pg){
//    alert('hjgj');
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    if(localStorage.getItem('UserDetailseller')){
    var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
    console.log(userid);

    var postdata = {
      user_id: userid
    };
// alert('hjgj');
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

    Loading.dismiss();
      console.log(data);
      if(data.status == true)
            {
//                 alert('hjgj');
                this.parkdetails = data.data.parking_space;
                console.log(this.parkdetails);
                this.getreservations(pg);
            }      
    })
  })

  }
  }

      getreservations(pagenumber){
       
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
    if(localStorage.getItem('UserDetailseller')){
    var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
    console.log(userid);

    var postdata = {
        user_id: userid,
       role:'seller',
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

         var temp = this;

                    console.log(data);

//                        this.parkdetails.forEach(function(value3,key3){
                        for(var y = 0; y<this.parkdetails.length; y++){
                        this.Reservationdata1.forEach(function (value, key) {
                            value.reservation_data.forEach(function (value2, key1) {
                              value.parking_start_time = moment(value.parking_start_time,"hh:mm: A").format("hh:mm A");
                               value.parking_end_time = moment(value.parking_end_time,"hh:mm: A").format("hh:mm A");
                               console.log(value.parking_start_time);
                                 console.log(value.parking_end_time);
                          
                                value.customername = value2.name;
                                if (value2.profile_pic) {
                                    value.propic = value2.profile_pic;
                                }
                               if(temp.parkdetails[y]._id == value.parking_id){
                                   
                                   value.parkingname = temp.parkdetails[y].parking_name;
                               }
                            })
                        })
                        }
//})
                         console.log(this.Reservationdata1)
                        var temp = this;
                        this.Reservationdata1.forEach(function (value, key) {
                            temp.Reservationdata.push(value);
                        })
                        console.log(temp.Reservationdata)
                    }else{
                    
                        this.show=0;
                    }
           
        })


    }   
    Loading.dismiss(); 
        })
    }
      doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
//            this.firsthit();
         this.getuserdetail(1);
            this.Reservationdata = [];
             this.parkdetails=[];
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
      this.getuserdetail(this.pagon);
       }else if(this.Pagetotal == this.pagein){
             event.complete();
       }else{
           event.complete();
       }
    }
serializeObj(obj) {
  var result = [];
  for (var property in obj)
    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

  return result.join("&");
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewreservationtwoPage');
  }

}
