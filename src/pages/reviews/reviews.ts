import {Component,OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Ionic2RatingModule} from 'ionic2-rating';
import {Appsetting} from "../../providers/appsetting";
import {HomePage} from '../home/home';
import {Http, Headers, RequestOptions} from '@angular/http';
import {MikehousePage} from '../mikehouse/mikehouse';
import {ToastController, AlertController, LoadingController, ActionSheetController,MenuController, Events} from 'ionic-angular';
/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-reviews',
    templateUrl: 'reviews.html',
})
export class ReviewsPage {
    postshow:Boolean=false;
    rating: any;
    data: any = [];
    userid1: any;
    totalpages:Number=0;
    delshow: Boolean = false;
    parkingdata: any = [];
    reviewarry1: any = [];
    reviewarry: any = [];
    totalvalue: any = 0;
    Rating: any = 0;
    totalreviews: any;
    image:any;
    reviewid:any;
    paginatearray:any=[];
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
//        alert('new review');

    }
    ngOnInit() {
        var rdata = JSON.parse(localStorage.getItem('reviewdata'))
        console.log(rdata);
        this.show(rdata);
    }
    onModelChange(number) {
        console.log(number);
        this.rating = number;


    }
    editit(dattt){ 
        this.postshow = true;
        console.log(dattt)
        this.data.comment = dattt.review;
        if (dattt.rating == 1) {
                    this.data.starr = 1
                }
                else if (dattt.rating == 2) {
                    this.data.starr = 2
                }
                else if (dattt.rating == 3) {
                    this.data.starr = 3
                }
                else if (dattt.rating == 4) {
                    this.data.starr = 4
                }
                else if (dattt.rating == 5) {
                    this.data.starr = 5
                } 
                console.log(this.data.starr)
           this.reviewid = dattt._id;   
    }
      editpostdata(){
          var propic:any;
          console.log('editvala')
             let headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                let options = new RequestOptions({headers: headers});
                        var userdata = JSON.parse(localStorage.getItem('UserDetailcustomer'));
        console.log(userdata);
        if(!userdata.profile_pic){
        
            propic=''
        }else{
            propic=userdata.profile_pic;
        }
         console.log(propic);
                var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
                if((this.data.comment == undefined)||(this.data.comment == "")){
                    this.AlertMsg('Please give the comment.')
                }else if( this.data.starr == undefined){
                     this.AlertMsg('Please give the rating')
                }else{
                var postdata = {
                    parking_id: this.parkingdata._id,
                    user_id: userid,
                    review: this.data.comment,
                    rating:  this.data.starr,
                    review_id:this.reviewid,
                    reviewer_name:userdata.name,
            reviewer_image:propic

                }
                console.log(postdata);
                var Serialized = this.serializeObj(postdata);
                var Loading = this.loadingCtrl.create({
                    spinner: 'bubbles',
                    cssClass: 'loader',
                    content: "Loading",
                    dismissOnPageChange: true
                });
                Loading.present().then(() => {
                    this.http.post(this.appsetting.myGlobalVar + 'users/EditReviewRating', Serialized, options).map(res => res.json()).subscribe(response => {
                        console.log(response);
                        Loading.dismiss();
                        if(response.status == true){
                         localStorage.setItem('Parkdetail', JSON.stringify(response.data.parking_space[0]));
                    this.AlertMsg1('Your review updated successfully');}else{
                            this.AlertMsg1(response.message);
                    }
                        })
                        })
                        }
      }
    show(daa) {
        var odd_count:any = 0;
	var even_count:any = 0;
       var parkdata:any=[];
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            let options = new RequestOptions({headers: headers});
             var postdata = {
                  user_id: daa.selid
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
                     for(var j=0;j< parkdata.length;j++){
                         if(parkdata[j]._id == daa.parkid){
                             this.parkingdata = parkdata[j];
                            
                           this.reviewarry = parkdata[j].review_and_rating 
                           }
                           
                     }
                      this.image = this.parkingdata.parking_images[0].parking_image;
                    console.log(this.parkingdata);
                     console.log(this.image);
                     console.log(this.reviewarry);
                    
                }
               console.log(this.paginatearray);
                    this.userid1 = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;

                    var temp = this;
                    console.log(this.reviewarry.length);
                    this.totalreviews = this.reviewarry.length;
                    this.totalpages = Math.ceil(this.reviewarry.length/3);
                     var f = Math.ceil((this.reviewarry.length/3)-1);
                    console.log(this.totalpages);
                    var end=0;
                    var start =0;
                    var end=0;
                    var x:any=0;
                    for(var i=0; i< this.reviewarry.length;i++){ 
                       console.log(f);
                        while(x<=f){
                          console.log(x);
                        if( this.reviewarry.length % 3 == 0 ){
                           start = end + x;
                           end = start+2;

                          console.log(start,end);
                    }
                    else if(Math.ceil(this.reviewarry.length % 3) == 1){
                     start = end + x;
                      console.log('start'+start)
                      if(start == this.reviewarry.length-1){
                           end = start;
                          console.log('ye chla');  
                      }else{
                       end = start+2;
                      
                      }
                     
                      console.log('end'+end)
                        console.log('x'+x)             
                      console.log(start,end);
                    }
                    else if(Math.ceil(this.reviewarry.length % 3) == 2){
                     start = end + x;
                       console.log('start'+start)
                      if(start == this.reviewarry.length-2){
                         end = start+1;
                          console.log('ye bn chla')
                      }else{
                      end = start+2;
                   
                      }
                   console.log('end'+end)
                   console.log('x'+x) 
                      console.log(start,end);
                    }
                     x++;
                     for(var d= start;d<=end;d++){
                    this.paginatearray.push(this.reviewarry[d]);}
                  }
              
                }
                console.log(this.paginatearray);
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
                         }) })
    }
    postdata() {
        var propic:any;
         this.postshow = false;
        console.log(this.data.comment);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({headers: headers});
        var userdata = JSON.parse(localStorage.getItem('UserDetailcustomer'));
        console.log(userdata);
        if(!userdata.profile_pic){
            propic='';
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
            parking_id: this.parkingdata._id,
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
            content: "Loading",
            dismissOnPageChange: true
        });
        Loading.present().then(() => {
            this.http.post(this.appsetting.myGlobalVar + 'users/AddReviewRating', Serialized, options).map(res => res.json()).subscribe(response => {
                console.log(response);
                if (response.status == true) {

                    localStorage.setItem('Parkdetail', JSON.stringify(response.data.parking_space[0]));
                    this.AlertMsg1('Your review added successfully');
                    
                } else {
                    this.AlertMsg1(response.data);
//                    this.navCtrl.push(ReviewsPage);
                }
            
                Loading.dismissAll();
            })
        })
        }
    }
    gotomike() {
        this.navCtrl.push(MikehousePage);
    }
    delete(del) {
        console.log(del);
        let alert = this.alertCtrl.create({
            title: 'Park Place',
            message: "Are you sure to Delete your review ?",
            buttons: [
            {
                    text: 'cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('cancel clicked');

                    }
                },
                {
                    text: 'ok',
                    role: 'ok',
                    handler: () => {
                        console.log('Continue clicked');
                        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({headers: headers});
        var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
        var postdata = {
            parking_id: this.parkingdata._id,
            review_id: del._id
        }
        //alert(this.devicetoken)
        console.log(postdata);
        var Serialized = this.serializeObj(postdata);
//        var Loading = this.loadingCtrl.create({
//            spinner: 'bubbles',
//            cssClass: 'loader',
//            content: "Loading",
//            dismissOnPageChange: true
//        });
//        Loading.present().then(() => {
            this.http.post(this.appsetting.myGlobalVar + 'users/DeleteReviewRating', Serialized, options).map(res => res.json()).subscribe(response => {
                console.log(response);
//                Loading.dismiss();
                if (response.status == true) {
 localStorage.setItem('Parkdetail', JSON.stringify(response.data[0].parking_space));
                    this.AlertMsg1('Your review deleted successfully')
//                     localStorage.setItem('reviewdata',JSON.stringify(posttreviewdata))
                  
                } else {
                    this.AlertMsg(response.data)
                }
//            })
        })

                    }
                }
                 
            ]
        });
        alert.present();
//        let headers = new Headers();
//        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
//        let options = new RequestOptions({headers: headers});
//        var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
//        var postdata = {
//            parking_id: this.parkingdata._id,
//            review_id: del._id
//        }
//        //alert(this.devicetoken)
//        console.log(postdata);
//        var Serialized = this.serializeObj(postdata);
//        var Loading = this.loadingCtrl.create({
//            spinner: 'bubbles',
//            cssClass: 'loader',
//            content: "Loading",
//            dismissOnPageChange: true
//        });
//        Loading.present().then(() => {
//            this.http.post(this.appsetting.myGlobalVar + 'users/DeleteReviewRating', Serialized, options).map(res => res.json()).subscribe(response => {
//                console.log(response);
//                Loading.dismiss();
//                if (response.status == true) {
//
//                    this.AlertMsg1('Your review deleted successfully')
////                     localStorage.setItem('reviewdata',JSON.stringify(posttreviewdata))
//                  
//                } else {
//                    this.AlertMsg(response.data)
//                }
//            })
//        })
    }
        AlertMsg1(msg) {
        let alert = this.alertCtrl.create({
            title: 'Park Place',
            message: msg,
            buttons: [
                {
                    text: 'ok',
                    role: 'ok',
                    handler: () => {
                        console.log('Continue clicked');
                        this.navCtrl.push(ReviewsPage);

                    }
                }
            ]
        });
        alert.present();
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
//            doInfinite(event){
//        console.log(event);
//       
// 
//                if(this.paginatearray == this.reviewarry.length){
//                    event.complete();
//                }
//          
//    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ReviewsPage');
    }

}
