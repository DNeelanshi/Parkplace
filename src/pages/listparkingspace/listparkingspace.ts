import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController,MenuController} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { MyApp } from '../../app/app.component';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
declare var google;
import * as moment from 'moment';
/**
 * Generated class for the ListparkingspacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listparkingspace',
  templateUrl: 'listparkingspace.html',
})
export class ListparkingspacePage {
data:any={ }
lat:any;
arr:any=[];
userarray:any=[];
leasingpic:any;
bit: number = 0;
imgarr:any=[];
leasingpicture:any;
srcImage;srcImage1;srcImage2;
senddays:any=[];
sendopeningtime:any=[];
sendclosingtime:any=[];
daytime:any=[];
daytime1:any=[];
citytosend:any;
streettosend:any;
statetosend:any;
ziptosend:any;
parkid:any;
geocoder = new google.maps.Geocoder();
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public toastCtrl: ToastController,
  public actionSheetCtrl: ActionSheetController,
      private camera: Camera,
      public http: Http,
      public alertCtrl: AlertController,
       public menuCtrl: MenuController,
        public loadingCtrl: LoadingController,
        public appsetting: Appsetting) {
         this.menuCtrl.swipeEnable(true);
        this.getuserinfo();
  }
getuserinfo(){
    let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
         if(localStorage.getItem('UserDetailseller')){
        var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
        console.log(userid);

        var postdata = {
          user_id: userid
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
        this.http.post(this.appsetting.myGlobalVar +'users/userinfo', serialized, options).map(res => res.json()).subscribe(data => {

        Loading.dismiss();
          console.log(data);
          if(data.status == true){
              if(data.data.first_add == false){
                  this.userarray = data.data.parking_space[0];
                  this.data.streetaddress =  this.userarray.street_address;

                  this.parkid = this.userarray._id;
                  this.leasingpic = this.userarray.agreement_pic;
                  this.leasingpicture = this.userarray.agreement_pic;
                 console.log(this.leasingpicture);
                  for (var e = 0; e <this.userarray.parking_images.length; e++){
                      this.arr.push(this.userarray.parking_images[e].parking_image);
                  }
                console.log(this.arr);
                if(this.arr.length == 1){
                    this.srcImage = this.arr[0];
                    this.bit = 1
                }else if(this.arr.length == 2){
                this.bit = 2
                this.srcImage = this.arr[0];
                    this.srcImage1 = this.arr[1]
                }else{
                 this.bit = 3;
                    this.srcImage = this.arr[0];
                    this.srcImage1 = this.arr[1];
                    this.srcImage2 = this.arr[2]
                }
                 console.log(this.srcImage,this.srcImage1,this.srcImage2);
              } else {this.parkid="";}

          }
          
      
 })})
      }
}
closingtime(timedata) {
        var temp = this;
        console.log(timedata.value);
        console.log(timedata.value.day);
        console.log(timedata.value.startime);
        console.log(timedata.value.endtime);
        var c = moment(timedata.value.startime,"h:mm: A").format("hh:mm A");
        var z = moment(timedata.value.endtime,"h:mm: A").format("hh:mm A");
        console.log(z);
          console.log(c);
        if (timedata.value.day && timedata.value.startime && timedata.value.endtime) {
            var a = timedata.value.startime.split(':');
            var b = timedata.value.endtime.split(':');
            if(b[0]>a[0]){
            if (a[0] > 11) {
                // console.log(timedata.value.openinghours.includes("PM"));
//                timedata.value.startime = timedata.value.startime + ' PM';
                timedata.value.startime = timedata.value.startime
            } else {
                //console.log(timedata.value.openinghours.includes("AM"));
//                timedata.value.startime = timedata.value.startime + ' AM';
            timedata.value.startime = timedata.value.startime
            }
            console.log(timedata.value.openinghours);
            if (b[0] > 11) {
//                timedata.value.endtime = timedata.value.endtime + ' PM';
                timedata.value.endtime = timedata.value.endtime
            } else {
//                timedata.value.endtime = timedata.value.endtime + ' AM';
            timedata.value.endtime = timedata.value.endtime
            }
            console.log(timedata.value.endtime);
            var dayOpeningClosing1 = {
                day: timedata.value.day,
                startime: c,
                endtime: z
            }
            var dayOpeningClosing = {
                day: timedata.value.day,
                startime: timedata.value.startime,
                endtime: timedata.value.endtime
            }
            //day,opening time and closing time of data to post on api.
            this.senddays.push(timedata.value.day);
            var ot = timedata.value.startime.split(' ');
            var ct = timedata.value.endtime.split(' ');
            this.sendopeningtime.push(ot[0]);
            this.sendclosingtime.push(ct[0]);
            console.log(this.senddays.join(','));
            console.log(this.sendopeningtime.join(','));
            console.log(this.sendclosingtime.join(','));

            /**** array for display day,opeing time and closing time on html after selection **********/
            this.daytime.push(dayOpeningClosing1);
//             this.daytime1.push(dayOpeningClosing);
            console.log(this.daytime);
            this.data.day = '';
            this.data.startime = '';
            this.data.endtime = '';
        } else {
                this.AlertMsg3('Closing time must be greater than opening time!');
        }
        } else {
            this.AlertMsg3('Are you sure you selected day,opening and closing time?');
        }
    }
      DeleteTimes(event, ind) {
        var temp = this;
        console.log(event.day);
        console.log(ind);
        /**** pop a value from array by index ************/
        console.log(temp.daytime);
        temp.daytime.splice(ind, 1);
//        temp.daytime1.splice(ind, 1);
        console.log(this.daytime.length);
//          console.log(this.daytime1.length);
        if (this.daytime.length == 0) {
            this.data.day = '';
            this.data.startime = '';
            this.data.endtime = '';
        }
//         if (this.daytime1.length == 0) {
//            this.data.day = '';
//            this.data.startime = '';
//            this.data.endtime = '';
//        }
    }
CameraAction(){


  console.log('opening');
  console.log(this.bit);
   let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
          let options = new RequestOptions({ headers: headers });
  let actionSheet = this.actionSheetCtrl.create({
          title: 'Choose image',
          buttons: [
              {
                  text: 'Camera',
                  role: 'submit',
                  handler: () => {
                      console.log('camera clicked');
                      this.chooseImage1(1);
                  }
              },
              {
                  text: 'Gallery',
                  handler: () => {
                      console.log('Gallery clicked');
                      this.chooseImage1(0);
                  }
              },
              {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                      console.log('Cancel clicked');
                  }
              }
          ]
      });
      actionSheet.present();

}
public chooseImage1(Type) {
  console.log(Type)
      const options: CameraOptions = {
       quality: 10,
      sourceType:Type,
       targetWidth:800,
      targetHeight:800,
      correctOrientation: true,
      allowEdit:true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

  this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.bit = this.bit + 1;
      //alert(this.bit);
      if (this.bit > 3) {
          this.AlertMsg3('You cannot upload more than 3 images');
      } else {
           this.arr.push('data:image/jpeg;base64,' + imageData);
          this.imgarr.push(imageData);
          if(this.imgarr.length == 1){
              // this.srcImage = this.imgarr[0];
              // this.srcImage1 = "";
              // this.srcImage2 = "";
              this.hitimage(this.imgarr[0]);
          }
      if(this.imgarr.length == 2){
              // this.srcImage = this.imgarr[0];
              // this.srcImage1 = this.imgarr[1];
              this.hitimage(this.imgarr[1]);
              // this.srcImage2 = "";
          }
           if(this.imgarr.length == 3){
              // this.srcImage = this.imgarr[0];
              // this.srcImage1 = this.imgarr[1];
              // this.srcImage2 = this.imgarr[2];
            this.hitimage(this.imgarr[2]);
          }
          console.log(this.arr.length);

      }
      //console.log(this.base64Image);
  }, (err) => {
      // Handle error
      console.log(err);
  });
}
hitimage(IMAGE){

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  let options = new RequestOptions({ headers: headers });
   var postdata = {
    picture:IMAGE
  };
//            alert(postdata)
  var serialized = this.serializeObj(postdata);
var Loading = this.loadingCtrl.create({
spinner: 'bubbles',
  cssClass: 'loader',
  content: "Loading",
dismissOnPageChange:true
});
Loading.present().then(() => {
  this.http.post(this.appsetting.myGlobalVar +'users/ImageUploader', postdata).map(res => res.json()).subscribe(data => {
    Loading.dismiss();
    console.log(data)
//    alert(data.data);
    if(data.status == true){
      if(this.bit == 1){
        this.srcImage = data.data;
//        alert( this.bit+''+this.srcImage);
      }else if(this.bit == 2){
        this.srcImage1 = data.data;
//        alert( this.bit+''+this.srcImage1);
      }else if(this.bit == 3){
        this.srcImage2 = data.data;
//        alert( this.bit+''+this.srcImage2);
      }
//      alert(this.srcImage+''+this.srcImage1+''+this.srcImage2);
      }else{
        this.AlertMsg3('Image cannot be uploaded.Please try again later')
      }
  })
  },(err)=>{
    console.log(JSON.stringify(err))
    alert(JSON.stringify(err))
  })
}
AlertMsg3(msg){
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
   uploadagreement(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose image',
      buttons: [
          {
              text: 'Camera',
              role: 'submit',
              handler: () => {
                  console.log('camera clicked');
                  this.chooseImage(1);
              }
          },
          {
              text: 'Gallery',
              handler: () => {
                  console.log('Gallery clicked');
                  this.chooseImage(0);
              }
          },
          {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                  console.log('Cancel clicked');
              }
          }
      ]
  });
  actionSheet.present();
   }

   public chooseImage(Type) {
    console.log(Type)
        const options: CameraOptions = {
         quality: 10,
        sourceType:Type,
         targetWidth:767,
        targetHeight:600,
        correctOrientation: true,
        allowEdit:true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

    this.camera.getPicture(options).then((imageData) => {

            this.leasingpic = 'data:image/jpeg;base64,' + imageData;
            let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
         var postdata = {
          picture:this.leasingpic
        };
//           alert(postdata)
        var serialized = this.serializeObj(postdata);
 var Loading = this.loadingCtrl.create({
    spinner: 'bubbles',
        cssClass: 'loader',
        content: "Loading",
dismissOnPageChange:true
 });
 Loading.present().then(() => {
        this.http.post(this.appsetting.myGlobalVar +'users/ImageUploader', postdata).map(res => res.json()).subscribe(data => {
          Loading.dismiss();
          console.log(data)
//          alert(data.data);
          if(data.status == true){
          this.leasingpicture = data.data;
        }else{
            this.AlertMsg3('Image cannot be uploaded.Please try again later')
          }



        })
        },(err)=>{
          console.log(JSON.stringify(err))
          alert(JSON.stringify(err))
        })

    }, (err) => {
        console.log(err);
    });
}
Addparking(parkingdata){
    console.log(parkingdata.value)
    var temp = this;
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  headers.append('Access-Control-Allow-Origin','*');
  let options = new RequestOptions({ headers: headers });
  var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
  var addr = parkingdata.value.streetaddress+''+parkingdata.value.city+''+parkingdata.value.state+''+parkingdata.value.zip;
 this.ziptosend=''
  this.streettosend = ''
        this.citytosend = ''
        this.statetosend=''
       this.geocoder.geocode({'address': addr}, function (results, status1) {
    if(status1 === "OK"){
     console.log(results[0]);
      this.lat = results[0].geometry.location.lat();
      this.long = results[0].geometry.location.lng();
      console.log(this.lat,this.long)
      var l = parseInt(results[0].address_components.length);
      console.log(l);
      console.log(results[0].address_components[l-1].long_name);
      this.ziptosend = results[0].address_components[l-1].long_name;
      this.formattedaddres = results[0].formatted_address.split(',');
      if((this.formattedaddres.length == 4)||(this.formattedaddres.length == 3)){
        this.streettosend = this.formattedaddres[0];
        this.citytosend = this.formattedaddres[1];
        this.statetosend = this.formattedaddres[2];
      }else if(this.formattedaddres.length == 5){
        this.streettosend = this.formattedaddres[0]+''+this.formattedaddres[1];
        this.citytosend = this.formattedaddres[2]+''+this.formattedaddres[3];
        this.statetosend = this.formattedaddres[4];
      }else if(this.formattedaddres.length >= 6){
        this.streettosend = this.formattedaddres[0]+''+this.formattedaddres[1];
        this.citytosend = this.formattedaddres[2]+''+this.formattedaddres[3];
        this.statetosend = this.formattedaddres[4]+''+this.formattedaddres[5];
      }
      console.log(this.formattedaddres);
      console.log(this.streettosend,this.statetosend,this.citytosend,this.ziptosend);
//      alert(this.streettosend+','+this.statetosend+','+this.citytosend+','+this.ziptosend+','+this.lat+','+this.long);
      setTimeout (() => {
//        temp.finalladd(parkingdata,this.streettosend,this.statetosend,this.citytosend,this.ziptosend,this.lat,this.long);
     temp.finalladd(parkingdata,parkingdata.value.streetaddress,parkingdata.value.state,parkingdata.value.city,parkingdata.value.zip,this.lat,this.long);
       }, 500)

    }else{
      temp.AlertMsg3('There is some error in getting location.');
    }
});

}
finalladd(formdetail,streettosend,statetosend,citytosend,ziptosend,lat,long){
  console.log(formdetail);
  var temp=this;
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  let options = new RequestOptions({ headers: headers });
  var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
   console.log(this.daytime);
  
  if((streettosend == undefined)||(statetosend == undefined)||(citytosend == undefined)||(ziptosend == undefined)||(lat == undefined)){
      this.AlertMsg2('Please enter specific location');
  }else{
        if (this.daytime.length > 0) {
             console.log(this.daytime);
               
        this.senddays=[]
        this.sendopeningtime=[]
        this.sendclosingtime=[]
        this.daytime.forEach(function(value,key){
            console.log(value)
            value.startime = moment( value.startime,["hh:mm A"]).format("HH:mm");
            value.endtime = moment( value.endtime,["hh:mm A"]).format("HH:mm");
              console.log(value)
             temp.senddays.push(value.day);
            var ot = value.startime.split(' ');
            var ct = value.endtime.split(' ');
            temp.sendopeningtime.push(ot[0]);
            temp.sendclosingtime.push(ct[0]);
        })
        console.log(this.senddays)
        console.log(this.sendopeningtime)
        console.log(this.sendclosingtime)
            console.log(this.leasingpicture);
             console.log(this.srcImage,this.srcImage1,this.srcImage2);
if((this.leasingpicture == undefined)||(this.leasingpicture == "")){
                    this.AlertMsg2('Leasing agreement is required');
                
                  }else if((this.srcImage == undefined)||(this.srcImage == "")){
                    this.AlertMsg2('Aleast 1  parking image is required');
                  }else{
                if((this.srcImage1 == undefined)||(this.srcImage1 == "")){
                  this.srcImage1=""
                }
                if((this.srcImage2 == undefined)||(this.srcImage2 == "")){
                  this.srcImage2=""
                }
             var postdata:any={ }
             if( this.parkid == ""){
postdata = {
     parking_name:formdetail.value.parkingname,
  street_address:streettosend,
  city:citytosend,
  state:statetosend,
   space_number:formdetail.value.spacenumber,
   parking_size:formdetail.value.parkingsize,
   restriction:formdetail.value.restrictions,
   hourly_rate:formdetail.value.rate,
  agreement_pic:this.leasingpicture,
  image_pic0:this.srcImage,
  image_pic1:this.srcImage1,
  image_pic2:this.srcImage2,
//agreement_pic:"https://legaltemplates.net/wp-content/uploads/2015/03/lease-agreement.png",
//  image_pic0:"http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
//  image_pic1:"http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
//  image_pic2:"http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
  zip_code:ziptosend,
//   user_id:userid,
  lat:lat,
  long:long,
  user_id:userid,

//  parking_space_id: this.parkid,
opening_days:this.senddays.join(','),
opening_time:this.sendopeningtime.join(','),
closing_time:this.sendclosingtime.join(','),
  };
  }
  else{
  
 postdata = {
     parking_name:formdetail.value.parkingname,
  street_address:streettosend,
  city:citytosend,
  state:statetosend,
   space_number:formdetail.value.spacenumber,
   parking_size:formdetail.value.parkingsize,
   restriction:formdetail.value.restrictions,
   hourly_rate:formdetail.value.rate,
  agreement_pic:this.leasingpicture,
  image_pic0:this.srcImage,
  image_pic1:this.srcImage1,
  image_pic2:this.srcImage2,
//agreement_pic:"https://legaltemplates.net/wp-content/uploads/2015/03/lease-agreement.png",
//  image_pic0:"http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
//  image_pic1:"http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
//  image_pic2:"http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
  zip_code:ziptosend,
//   user_id:userid,
  lat:lat,
  long:long,
  user_id:userid,

  parking_space_id: this.parkid,
opening_days:this.senddays.join(','),
opening_time:this.sendopeningtime.join(','),
closing_time:this.sendclosingtime.join(','),
  };
  }
  var serialized = this.serializeObj(postdata);
  console.log(postdata);

   var Loading = this.loadingCtrl.create({
         spinner: 'bubbles',
          cssClass: 'loader',
          content: "Loading",
  dismissOnPageChange:true
      });
      Loading.present().then(() => {




  this.http.post(this.appsetting.myGlobalVar +'users/AddparkPlace', serialized, options).map(res => res.json()).subscribe(data => {

  Loading.dismiss();
    console.log(data);
    if(data.status == true){
      this.AlertMsg3('Added successfully');
      localStorage.setItem('UserDetailseller',JSON.stringify(data.data[0]));
     this.navCtrl.push(ListparkingspacePage);
    }else{
      this.AlertMsg3(data.message);
      }
  })
    })
  } 
  }else{
            this.AlertMsg3('Please mention Space availability')
        }
  }
}
AlertMsg2(msg){
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
 DeleteImage(index){
     var temp = this;
     console.log(index);
      
     if(index == 2){
        
     this.srcImage2=''
     this.bit= this.bit - 1;
     }
     if(index == 1){
         this.srcImage1=''
         this.bit = this.bit-1;
     }
      if(index == 0){
         this.srcImage=''
         this.bit = this.bit-1;
     }
     this.arr.splice(index,1);
 }
 DeleteImage1(){
     this.leasingpic=""
     this.leasingpicture=""
 }
serializeObj(obj) {
  var result = [];
  for (var property in obj)
    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

  return result.join("&");
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListparkingspacePage');
  }

}
