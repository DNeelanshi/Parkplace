
import {MikehousePage} from '../mikehouse/mikehouse';
import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {EditlistingPage} from '../editlisting/editlisting';
import {SignintwoPage} from '../signintwo/signintwo';
import {SigninPage} from '../signin/signin';
import {ForgotpwdPage} from '../forgotpwd/forgotpwd';
import {Appsetting} from "../../providers/appsetting";
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {ToastController, AlertController, LoadingController, ActionSheetController, MenuController, Nav, App} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {MyprofiletwoPage} from '../myprofiletwo/myprofiletwo';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {GetstartedPage} from '../getstarted/getstarted';
import {Geolocation} from '@ionic-native/geolocation';
import * as moment from 'moment';
declare var google;
@Component({
selector: 'page-home',
templateUrl: 'home.html'
})
export class HomePage {
@ViewChild('map') mapElement: ElementRef;
map: any;
lat: any;
daate: any;
time:any;
currentOverlay:any;
circle:any;
public data: any = {}
long: any;
reviewarry:any=[];
Rating:number=0;
totalvalue:number=0;
display: number = 0;
googleapidata:any=[];
googleapilatlong:any=[];
latlngarray: any = [];
lattlngarray: any = [];
Parkingdetails: any = [];
Sellerdata: any = [];
Userdata: any;
totalreviews:any=0;
Parkingdetails1: any = [];
Userdata1: any;
infowindow: any;
comparison:Boolean = false;
geocoder = new google.maps.Geocoder();
acService: any;
starone: any = 'star-outline';
startwo: any = 'star-outline';
starthree: any = 'star-outline';
starfour: any = 'star-outline';
starfive: any = 'star-outline';
markers: any = [];
lati:any;
longi:any;
autocompleteItems: any = [];
currcircle: any = [];
drawingManager:any;
circlearray:any;
xyz:any;
constructor(public navCtrl: NavController, public navParams: NavParams,
public http: Http,
public toastCtrl: ToastController,
public alertCtrl: AlertController,
public app: App,
public events: Events,
private geolocation: Geolocation,
public menuCtrl: MenuController,
public loadingCtrl: LoadingController,
public appsetting: Appsetting,
public camera: Camera,
public actionSheetCtrl: ActionSheetController) {
this.menuCtrl.swipeEnable(true);
//        alert('welcome');
//        this.initmap();
}
ionViewDidLoad() {
//        this.initmap();
}
ngOnInit() {
this.lati=''
this.longi=''
this.daate = moment(new Date()).format('YYYY-MM-DD');
console.log(this.daate); 
this.time = moment(new Date()).format('HH:mm')
console.log(this.time);
this.Userdata=''
this.totalreviews=0;
this.starone = 'star-outline';
this.startwo= 'star-outline';
this.starthree = 'star-outline';
this.starfour = 'star-outline';
this.starfive = 'star-outline';
// alert("neelanshi");
this.acService = new google.maps.places.AutocompleteService();
this.autocompleteItems = [];
this.initmap();
}
changes(){
      
console.log(this.data.startime);
var btime = this.data.startime.split(":")
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
citychange(){
this.data.search=''
var temp = this;
console.log(this.data.city);
if(this.data.city){
console.log(this.data.city);
this.geocoder.geocode({'address':this.data.city}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
console.log("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());  
temp.lati = results[0].geometry.location.lat();
temp.longi = results[0].geometry.location.lng();
} else {
alert("Something got wrong " + status);
}
});
}
}
serachdata() {
this.drawingManager = new google.maps.drawing.DrawingManager({
            
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                google.maps.drawing.OverlayType.CIRCLE]
            },
            circleOptions: {
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                clickable: false,
                editable: true,
                zIndex: 1
            }
        });

this.drawingManager.setMap(this.map);
console.log(this.currcircle)
console.log(this.circlearray);
console.log(this.drawingManager)
 var temp = this;
google.maps.event.addListener(this.drawingManager, 'circlecomplete',function (shape) {
       console.log(shape)

       if (shape == null || (!(shape instanceof google.maps.Circle))){
        
                   return ;
                   
       }

        if (this.circle != null) {
    
            this.circle.setMap(null);
            this.circle = null;
        }

        this.circle = shape;
        this.circlearray = [];
      
      
        console.log('radius', this.circle.getRadius());
        console.log('lat', this.circle.getCenter().lat());
        console.log('lng', this.circle.getCenter().lng());
        temp.lat = this.circle.getCenter().lat();
      
        console.log(temp.lat);
        var raddi =  this.circle.getRadius() * 0.00062137
        temp.circlefilter(raddi,this.circle.getCenter().lat(),this.circle.getCenter().lng())
        temp.events.subscribe('clear',()=>{
            this.circle.setMap(null);
            shape = null;
        });
         });
console.log(this.comparison);
this.display = 0;
this.deleteMarkers();
 this.events.publish('clear');
var details1: any = [];
this.Userdata=''
this.totalreviews=0;
this.Rating=0;
this.totalvalue=0;
this.starone = 'star-outline';
this.startwo= 'star-outline';
this.starthree = 'star-outline';
this.starfour = 'star-outline';
this.starfive = 'star-outline';
let lattLng = new google.maps.LatLng(this.lat, this.long);
console.log(this.data.city, this.data.startime, this.data.date)
let headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
let options = new RequestOptions({headers: headers});
console.log(this.lat, this.long)
        
if (this.data.startime == undefined) {
this.data.startime = ""
}
if (this.data.date == undefined) {
this.data.date = ""
}
if (this.lat == undefined) {
this.ToastMsg('Error getting location')
}else{
console.log('ander agya')
console.log(moment(this.daate).isSame(moment(this.data.date)))
        
       
if((moment(this.daate).isSame(moment(this.data.date)) == true)&&(this.comparison == true)) {
console.log('hua check');
this.AlertMsg1('Time must be greater than current');
}else{
var Loading = this.loadingCtrl.create({
spinner: 'bubbles',
cssClass: 'loader',
content: "Loading",
dismissOnPageChange: true
});
Loading.present().then(() => {
 

if((this.lati == undefined)||(this.longi == undefined)||(this.lati == "")){
this.lati = this.lat;
this.longi = this.long;
}
console.log('ready to hit');
var postdata = {
lat: this.lati,
long: this.longi,
date: this.data.date,
opening_time: this.data.startime
};
var dt = {
bookingdate: this.data.date,
startime: this.data.startime
}
console.log(postdata)
var serialized = this.serializeObj(postdata);
            
this.http.post(this.appsetting.myGlobalVar + 'users/Getparkingaccodingtofilters', postdata).map(res => res.json()).subscribe(data => {
Loading.dismiss();
console.log(data)
this.latlngarray = [];
this.lattlngarray = [];
this.Parkingdetails = [];

if (data.status == true) {
localStorage.setItem('datetimedata',JSON.stringify(dt));
console.log(dt)
if(data.data.length == 0){
                     
					
// var serialized = this.serializeObj(postdata);
// console.log(postdata);

this.http.post('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ this.lati+','+this.longi+'&radius=500&types=parking&sensor=false&key=AIzaSyA1DlP6ydTPDHSNBT_99W80TjfSGEcthhE&libraries=',options).map(res => res.json()).subscribe(data => {
console.log(data);
this.googleapidata=[];
this.googleapilatlong=[];
if(data.results.length == 0){
this.AlertMsg1('Sorry! We cannot find any nearby parking');
}else{
	  
for(var l =0;l< data.results.length;l++){
this.googleapidata.push(data.results[l]);
this.googleapilatlong.push(data.results[l].geometry.location)
}
console.log(this.googleapidata);
console.log(this.googleapilatlong);
var infowindow = new google.maps.InfoWindow();
var infowindow8 = new google.maps.InfoWindow();
var marker, k;
var det:any=[];
var markers1: any = [];
var temp = this;
det=[];
for (k = 0; k < this.googleapilatlong.length; k++) {
			
//                       alert(j);
console.log(this.googleapidata);
det.push(this.googleapidata[k])
console.log(det);
						
marker = new google.maps.Marker({
position: new google.maps.LatLng(this.googleapilatlong[k].lat, this.googleapilatlong[k].lng),
                           
map: this.map
});
					
markers1.push(marker);
console.log(det);
console.log(markers1);

infowindow8.setContent(det[0].name);
infowindow8.open(this.map, markers1[0]);
// console.log(details);
this.markers.push(marker);
infowindow.close();
google.maps.event.addListener(marker, 'click', (function (marker, k) {
return function () {
infowindow8.close();
                            

infowindow.setContent(det[k].name)
infowindow.open(temp.map, markers1[k]);
console.log(markers1[k].position.lat(),markers1[k].position.lng());

}
})(marker, k));
}
this.map.setZoom(18);  }
},(err)=>{
console.log(err);
})
}else{
this.Parkingdetails = data.data[0].parking_space;
                        
this.Sellerdata = [];
this.lattlngarray = [];
for (var i = 0; i < data.data.length; i++) {
//                        for(var n=0; n < data.data[i].parking_space.length ;n++){
console.log(i)
this.Sellerdata.push(data.data[i]);
console.log(data.data[i].parking_space.parking_status);
//                            console.log(data.data[i].parking_space.parking_images.length);
if ((data.data[i].parking_space.parking_status == false)||(data.data[i].parking_space.parking_images.length == 0) || (!data.data[i].parking_space.parking_name) || (data.data[i].stripe_info.length == 0)) {
console.log(data.data[i].parking_space.parking_name);
} else {
this.display = 1;
details1.push(data.data[i].parking_space);
this.lattlngarray.push(data.data[i].parking_space.location.coordinates);
}
//                    }
}
if (this.infowindow) {
this.infowindow.close();
}

//                        console.log(this.lattlngarray);
Loading.dismiss();
//                        console.log(this.lattlngarray[0][1], this.lattlngarray[0][0]);
var infowindow1 = new google.maps.InfoWindow();
var infowindow = new google.maps.InfoWindow();
var marker, j;
var markers1: any = [];
var temp = this;
console.log(details1[0]);
this.Userdata = details1[0];
if(temp.Userdata){
if(temp.Userdata.review_and_rating){
temp.totalreviews =  temp.Userdata.review_and_rating.length;
console.log(temp.totalreviews);
}else{
temp.totalreviews = 0;
}
temp.Rating=0;
temp.reviewarry = temp.Userdata.review_and_rating
temp.reviewarry.forEach(function (value, key) {

temp.Rating = (temp.Rating + value.rating);
console.log('totalRating:'+temp.Rating);
console.log('totallength'+temp.reviewarry.length)
temp.totalvalue = temp.Rating /temp.reviewarry.length
temp.totalvalue = Number((temp.totalvalue).toFixed(1));
})
console.log(this.totalvalue);
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
                
}
                       
//                        console.log(this.lattlngarray);
for (j = 0; j < this.lattlngarray.length; j++) {
//                       alert(j);
marker = new google.maps.Marker({
position: new google.maps.LatLng(this.lattlngarray[j][1], this.lattlngarray[j][0]),
icon: 'assets/imgs/marklogo.png',
map: this.map
});
//                       console.log(this.Userdata);
//                        console.log(temp.Parkingdetails[0].hourly_rate);
//                        console.log(marker);
markers1.push(marker);
infowindow1.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'/></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details1[0].hourly_rate + '.00' + "</span>")
infowindow1.open(this.map, markers1[0]);
//                        console.log(details);
this.markers.push(marker);
google.maps.event.addListener(marker, 'click', (function (marker, j) {
return function () {
infowindow1.close();
temp.display = 1;
console.log(j);
temp.Userdata = details1[j];
if(temp.Userdata.review_and_rating.length){
temp.totalreviews =  temp.Userdata.review_and_rating.length;
console.log(temp.totalreviews);
}else{
temp.totalreviews = 0;
}
temp.Rating=0;
temp.reviewarry = temp.Userdata.review_and_rating
temp.reviewarry.forEach(function (value, key) {

temp.Rating = (temp.Rating + value.rating);
               
console.log('totalRating:'+temp.Rating);
console.log('totallength'+temp.reviewarry.length)
temp.totalvalue = temp.Rating /temp.reviewarry.length
temp.totalvalue = Number((temp.totalvalue).toFixed(1));
})
if(temp.totalvalue  == 1){
temp.starone = 'star'
}
else if(temp.totalvalue  == 2){
temp.starone = 'star'
temp.startwo = 'star'
}
else if(temp.totalvalue == 3){
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
}
else if(temp.totalvalue == 4){
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour = 'star'
}
else if(temp.totalvalue == 5){
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour = 'star'
temp.starfive = 'star'
}  else if((1.1 <= temp.totalvalue)&&(temp.totalvalue <= 1.5)){
           
temp.starone = 'star-half'
                  
}  else if((1.6 <= temp.totalvalue)&&(temp.totalvalue <= 1.9)){
            
temp.starone = 'star'
temp.startwo = 'star'
                
}  else if((2.1 <= temp.totalvalue)&&(temp.totalvalue <= 2.5)){
           
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star-half'
                
}  else if((2.6 <= temp.totalvalue)&&(temp.totalvalue <= 2.9)){
             
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
                
}
else if((3.1<= temp.totalvalue)&&(temp.totalvalue <= 3.5)){
                   
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star-half'
                
}
else if((3.6 <= temp.totalvalue)&&(temp.totalvalue <= 3.9)){
                   
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star'
}
else if((4.1 <= temp.totalvalue)&&(temp.totalvalue <= 4.5)){
            
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star-half'
                
}
else if((4.6 <= temp.totalvalue)&&(temp.totalvalue <= 4.9)){
                   
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star'
temp.starfive='star'
                
}
console.log(details1[j]);
infowindow.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'/></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details1[j].hourly_rate + '.00' + "</span>")
infowindow.open(temp.map, markers1[j]);
console.log(temp.Userdata);

}
})(marker, j));
}

this.map.setZoom(14);
//                    this.map.setCenter(latilongi);
this.map.setCenter(lattLng);
}else{
this.ToastMsg('No data found');
} }} else {
                    
this.ToastMsg('No data found');
}
})
})}
            
}
}

circlefilter(rad,la,lo){
console.log(rad,la,lo);
this.display = 0;
this.deleteMarkers();
var details1: any = [];
this.Userdata=''
this.totalreviews=0;
this.Rating=0;
this.totalvalue=0;
this.starone = 'star-outline';
this.startwo= 'star-outline';
this.starthree = 'star-outline';
this.starfour = 'star-outline';
this.starfive = 'star-outline';
let lattLng = new google.maps.LatLng(la, lo);
let headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
let options = new RequestOptions({headers: headers});
var Loading = this.loadingCtrl.create({
spinner: 'bubbles',
cssClass: 'loader',
content: "Loading",
dismissOnPageChange: true
});
Loading.present().then(() => {

console.log('ready to hit');
var postdata = {
lat: la,
long: lo,
radius: rad
};
console.log(postdata)
var serialized = this.serializeObj(postdata);
            
this.http.post(this.appsetting.myGlobalVar + 'users/GetParkingByRadius', postdata).map(res => res.json()).subscribe(data => {
Loading.dismiss();
console.log(data)
this.latlngarray = [];
this.lattlngarray = [];
this.Parkingdetails = [];

if (data.status == true) {

if(data.data.length == 0){
                     
					
// var serialized = this.serializeObj(postdata);
// console.log(postdata);

this.http.post('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ this.lati+','+this.longi+'&radius=500&types=parking&sensor=false&key=AIzaSyA1DlP6ydTPDHSNBT_99W80TjfSGEcthhE&libraries=',options).map(res => res.json()).subscribe(data => {
console.log(data);
this.googleapidata=[];
this.googleapilatlong=[];
if(data.results.length == 0){
this.AlertMsg1('Sorry! We cannot find any nearby parking');
}else{
	  
for(var l =0;l< data.results.length;l++){
this.googleapidata.push(data.results[l]);
this.googleapilatlong.push(data.results[l].geometry.location)
}
console.log(this.googleapidata);
console.log(this.googleapilatlong);
var infowindow = new google.maps.InfoWindow();
var infowindow8 = new google.maps.InfoWindow();
var marker, k;
var det:any=[];
var markers1: any = [];
var temp = this;
det=[];
for (k = 0; k < this.googleapilatlong.length; k++) {
			
//                       alert(j);
console.log(this.googleapidata);
det.push(this.googleapidata[k])
console.log(det);
						
marker = new google.maps.Marker({
position: new google.maps.LatLng(this.googleapilatlong[k].lat, this.googleapilatlong[k].lng),
                           
map: this.map
});
					
markers1.push(marker);
console.log(det);
console.log(markers1);

infowindow8.setContent(det[0].name);
infowindow8.open(this.map, markers1[0]);
// console.log(details);
this.markers.push(marker);
infowindow.close();
google.maps.event.addListener(marker, 'click', (function (marker, k) {
return function () {
infowindow8.close();
                            

infowindow.setContent(det[k].name)
infowindow.open(temp.map, markers1[k]);
console.log(markers1[k].position.lat(),markers1[k].position.lng());

}
})(marker, k));
}
this.map.setZoom(18);  }
},(err)=>{
console.log(err);
})
}else{
this.Parkingdetails = data.data[0].parking_space;
                        
this.Sellerdata = [];
this.lattlngarray = [];
for (var i = 0; i < data.data.length; i++) {
//                        for(var n=0; n < data.data[i].parking_space.length ;n++){
console.log(i)
this.Sellerdata.push(data.data[i]);
console.log(data.data[i].parking_space.parking_status);
//                            console.log(data.data[i].parking_space.parking_images.length);
if ((data.data[i].parking_space.parking_status == false)||(data.data[i].parking_space.parking_images.length == 0) || (!data.data[i].parking_space.parking_name) || (data.data[i].stripe_info.length == 0)) {
console.log(data.data[i].parking_space.parking_name);
} else {
this.display = 1;
details1.push(data.data[i].parking_space);
this.lattlngarray.push(data.data[i].parking_space.location.coordinates);
}
//                    }
}
if (this.infowindow) {
this.infowindow.close();
}

//                        console.log(this.lattlngarray);
Loading.dismiss();
//                        console.log(this.lattlngarray[0][1], this.lattlngarray[0][0]);
var infowindow1 = new google.maps.InfoWindow();
var infowindow = new google.maps.InfoWindow();
var marker, j;
var markers1: any = [];
var temp = this;
console.log(details1[0]);
this.Userdata = details1[0];
if(temp.Userdata){
if(temp.Userdata.review_and_rating){
temp.totalreviews =  temp.Userdata.review_and_rating.length;
console.log(temp.totalreviews);
}else{
temp.totalreviews = 0;
}
temp.Rating=0;
temp.reviewarry = temp.Userdata.review_and_rating
temp.reviewarry.forEach(function (value, key) {

temp.Rating = (temp.Rating + value.rating);
console.log('totalRating:'+temp.Rating);
console.log('totallength'+temp.reviewarry.length)
temp.totalvalue = temp.Rating /temp.reviewarry.length
temp.totalvalue = Number((temp.totalvalue).toFixed(1));
})
console.log(this.totalvalue);
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
                
}
                       
//                        console.log(this.lattlngarray);
for (j = 0; j < this.lattlngarray.length; j++) {
//                       alert(j);
marker = new google.maps.Marker({
position: new google.maps.LatLng(this.lattlngarray[j][1], this.lattlngarray[j][0]),
icon: 'assets/imgs/marklogo.png',
map: this.map
});
//                       console.log(this.Userdata);
//                        console.log(temp.Parkingdetails[0].hourly_rate);
//                        console.log(marker);
markers1.push(marker);
infowindow1.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'/></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details1[0].hourly_rate + '.00' + "</span>")
infowindow1.open(this.map, markers1[0]);
//                        console.log(details);
this.markers.push(marker);
google.maps.event.addListener(marker, 'click', (function (marker, j) {
return function () {
infowindow1.close();
temp.display = 1;
console.log(j);
temp.Userdata = details1[j];
if(temp.Userdata.review_and_rating.length){
temp.totalreviews =  temp.Userdata.review_and_rating.length;
console.log(temp.totalreviews);
}else{
temp.totalreviews = 0;
}
temp.Rating=0;
temp.reviewarry = temp.Userdata.review_and_rating
temp.reviewarry.forEach(function (value, key) {

temp.Rating = (temp.Rating + value.rating);
               
console.log('totalRating:'+temp.Rating);
console.log('totallength'+temp.reviewarry.length)
temp.totalvalue = temp.Rating /temp.reviewarry.length
temp.totalvalue = Number((temp.totalvalue).toFixed(1));
})
if(temp.totalvalue  == 1){
temp.starone = 'star'
}
else if(temp.totalvalue  == 2){
temp.starone = 'star'
temp.startwo = 'star'
}
else if(temp.totalvalue == 3){
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
}
else if(temp.totalvalue == 4){
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour = 'star'
}
else if(temp.totalvalue == 5){
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour = 'star'
temp.starfive = 'star'
}  else if((1.1 <= temp.totalvalue)&&(temp.totalvalue <= 1.5)){
           
temp.starone = 'star-half'
                  
}  else if((1.6 <= temp.totalvalue)&&(temp.totalvalue <= 1.9)){
            
temp.starone = 'star'
temp.startwo = 'star'
                
}  else if((2.1 <= temp.totalvalue)&&(temp.totalvalue <= 2.5)){
           
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star-half'
                
}  else if((2.6 <= temp.totalvalue)&&(temp.totalvalue <= 2.9)){
             
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
                
}
else if((3.1<= temp.totalvalue)&&(temp.totalvalue <= 3.5)){
                   
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star-half'
                
}
else if((3.6 <= temp.totalvalue)&&(temp.totalvalue <= 3.9)){
                   
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star'
}
else if((4.1 <= temp.totalvalue)&&(temp.totalvalue <= 4.5)){
            
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star-half'
                
}
else if((4.6 <= temp.totalvalue)&&(temp.totalvalue <= 4.9)){
                   
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star'
temp.starfive='star'
                
}
console.log(details1[j]);
infowindow.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'/></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details1[j].hourly_rate + '.00' + "</span>")
infowindow.open(temp.map, markers1[j]);
console.log(temp.Userdata);

}
})(marker, j));
}

this.map.setZoom(14);
//                    this.map.setCenter(latilongi);
this.map.setCenter(lattLng);
}else{
this.ToastMsg('No data found');
} }} else {
                    
this.ToastMsg('No data found');
}
})
})
            

}

initmap() {
        
this.lati=''
this.longi=''
this.data.startime='';
this.data.date=''
this.data.city=''
this.autocompleteItems=[];
if (this.infowindow) {
this.infowindow.close();
}
alert('init');
var Loading = this.loadingCtrl.create({
spinner: 'bubbles',
cssClass: 'loader',
content: "Loading",
dismissOnPageChange: true
});
Loading.present().then(() => {
this.geolocation.getCurrentPosition().then((resp) => {
this.lat = resp.coords.latitude;
this.long = resp.coords.longitude;

console.log(resp.coords.latitude);
console.log(resp.coords.longitude);
alert('map');
let latLng = new google.maps.LatLng(this.lat, this.long);
let mapOptions = {
center: latLng,
zoom: 14,
minZoom: 2,
mapTypeId: google.maps.MapTypeId.ROADMAP,
disableDefaultUI: true,
zoomControl: true,
               
};
        
this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
this.map.setOptions({draggable: true});
this.infowindow = new google.maps.InfoWindow();
        this.drawingManager = new google.maps.drawing.DrawingManager({
            
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                google.maps.drawing.OverlayType.CIRCLE]
            },
            circleOptions: {
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                clickable: false,
                editable: true,
                zIndex: 1
            }
        });

this.drawingManager.setMap(this.map);
console.log(this.currcircle)
console.log(this.circlearray);
console.log(this.drawingManager)
 var temp = this;
google.maps.event.addListener(this.drawingManager, 'circlecomplete',function (shape) {
       console.log(shape)

       if (shape == null || (!(shape instanceof google.maps.Circle))){
      
                   return ;
       }

        if (this.circle != null) {
     
            this.circle.setMap(null);
            this.circle = null;
            
        }

        this.circle = shape;
        this.circlearray = [];
      
      
        console.log('radius', this.circle.getRadius());
        console.log('lat', this.circle.getCenter().lat());
        console.log('lng', this.circle.getCenter().lng());
        temp.lat = this.circle.getCenter().lat();
      
        console.log(temp.lat);
        var raddi = this.circle.getRadius() * 0.00062137;
        temp.circlefilter(raddi,this.circle.getCenter().lat(),this.circle.getCenter().lng())
        temp.events.subscribe('clear',()=>{
            this.circle.setMap(null);
            shape = null;
        });
         });
    
this.geocoder.geocode({'location': latLng}, ((results, status) => {

if (status == google.maps.GeocoderStatus.OK) {
if (results == '') {
this.ToastMsg('Invalid Location')
this.lat = '';
this.long = '';
this.infowindow.setContent('Error');
this.infowindow.open(this.map, marker1);
this.data.search = '';
}
else {
if (results[0]) {
//                                                                alert(results[0].formatted_address);
console.log(results[0].place_id);
console.log(results[0].formatted_address);
this.data.search = results[0].formatted_address;
//this.infowindow.setContent(results[0].formatted_address);
////    
//          this.infowindow.open(this.map, marker1);
}
}
}
}))


var tem = this;

let marker1 = new google.maps.Marker({
position: latLng,
draggable: false,
icon: 'assets/imgs/currentmarker.png',
map: this.map,
                  
}
);
tem.showparkings(latLng);
this.markers.push(marker1);
Loading.dismiss();
}, (err) => {
alert(err);
})
})

}




updateSearch() {
      
console.log('search');
if (this.data.search == '') {
this.autocompleteItems = [];
}
let config = {
input: this.data.search,
componentRestrictions: {}
}
this.acService.getPlacePredictions(config, ((predictions, status) => {
console.log('modal > getPlacePredictions > status > ', status);
this.autocompleteItems = [];
console.log(predictions)
predictions.forEach(((prediction) => {
console.log("abc")
this.autocompleteItems.push(prediction);
})
);
})
);
if (this.data.search == '') {
this.autocompleteItems = ' '
}
}
chooseItem(item) {
console.log(item)
this.data.search = item.description;
          
if (this.infowindow) {
this.infowindow.close();
}

this.geocoder.geocode({'placeId': item.place_id}, ((results, status) => {
if (status === 'OK') {
if (results == '') {
this.ToastMsg('Invalid Location')
this.lat = '';
this.long = '';
this.infowindow.setContent('Error');
this.infowindow.open(this.map, marker);
this.data.search = '';
}
else {
if (results[0]) {
console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());
console.log(results[0].place_id);
console.log(results[0].formatted_address);
this.data.search = results[0].formatted_address;
this.lat = results[0].geometry.location.lat();
this.long = results[0].geometry.location.lng();
//                        alert(this.lat+','+this.long);

//                        
//          this.map.setCenter(results[0].geometry.location);
}
this.infowindow.setContent(results[0].formatted_address);
this.infowindow.open(this.map, marker);
var latlng = new google.maps.LatLng(this.lat, this.long);
console.log(latlng.lat(), latlng.lng())
this.deleteMarkers();
 this.events.publish('clear');
this.markers = [];
var temp = this;
console.log(this.markers);
var marker = new google.maps.Marker({
position: results[0].geometry.location,
icon: 'assets/imgs/currentmarker.png',
map: this.map,
}

);

console.log(marker);
this.markers.push(marker);
this.map.setZoom(14);
this.map.setCenter(marker.getPosition());

temp.showparkings(results[0].geometry.location);
}
}
}))

this.autocompleteItems = [];
}

ToastMsg(msg) {
let toast = this.toastCtrl.create({
message: msg,
duration: 3000,
position: 'middle'
});
toast.present();
}
 onCircleComplete(shape) {
 console.log(shape)
 
var temp = this;


        if (shape == null || (!(shape instanceof google.maps.Circle))){
                   return ;
       }

        if (this.circle != null) {
            this.circle.setMap(null);
            this.circle = null;
        }

        this.circle = shape;
        this.circlearray = [];
this.circlearray.push(this.circle);
        console.log('radius', this.circle.getRadius());
        console.log('lat', this.circle.getCenter().lat());
        console.log('lng', this.circle.getCenter().lng());
        temp.lat = this.circle.getCenter().lat();
        console.log(temp.circlearray);
        console.log(temp.lat);
       
        //
    }
showparkings(latilongi) {
this.lati=''
this.longi=''
var temp = this;
this.data.startime=''
this.data.date=''
this.data.city=''
this.display = 0;
this.Userdata=''
this.totalreviews=0;
this.Rating=0;
this.totalvalue=0;
this.starone = 'star-outline';
this.startwo= 'star-outline';
this.starthree = 'star-outline';
this.starfour = 'star-outline';
this.starfive = 'star-outline';
var details: any = [];
this.lattlngarray = [];
console.log(latilongi);
let headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
let options = new RequestOptions({headers: headers});
var postdata = {
lat: latilongi.lat(),
long: latilongi.lng()
};
var dt = {
bookingdate: this.data.date,
startime: this.data.startime
}
//        this.lattlngarray=[];
//        alert(postdata)
var serialized = this.serializeObj(postdata);
var Loading = this.loadingCtrl.create({
spinner: 'bubbles',
cssClass: 'loader',
content: "Loading",
dismissOnPageChange: true
});
Loading.present().then(() => {
this.http.post(this.appsetting.myGlobalVar + 'users/GetparkingPlace', postdata).map(res => res.json()).subscribe(data => {
Loading.dismiss();
console.log(data)
                
if (data.status == true) {
localStorage.setItem('datetimedata',JSON.stringify(dt));
console.log(dt)
if(data.data.length == 0){
                    
// alert('its noi');
// var serialized = this.serializeObj(postdata);
// console.log(postdata);

this.http.post('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ latilongi.lat()+','+latilongi.lng()+'&radius=500&types=parking&sensor=false&key=AIzaSyA1DlP6ydTPDHSNBT_99W80TjfSGEcthhE&libraries=',options).map(res => res.json()).subscribe(data => {
console.log(data);
this.googleapidata=[];
this.googleapilatlong=[];
if(data.results.length == 0){
this.AlertMsg1('Sorry! We cannot find any nearby parking');
}else{
	  
for(var l =0;l< data.results.length; l++){
this.googleapidata.push(data.results[l]);
this.googleapilatlong.push(data.results[l].geometry.location)
}
console.log(this.googleapidata);
console.log(this.googleapilatlong);
var infowindow = new google.maps.InfoWindow();
var infowindow8 = new google.maps.InfoWindow();
var marker, k;
var det:any=[];
var markers1: any = [];
var temp = this;
det=[];
for (k = 0; k < this.googleapilatlong.length; k++) {
						
console.log(this.googleapidata);
det.push(this.googleapidata[k])
console.log(det);
marker = new google.maps.Marker({
position: new google.maps.LatLng(this.googleapilatlong[k].lat, this.googleapilatlong[k].lng),
                           
map: this.map
});
					
markers1.push(marker);
console.log(det);
console.log(markers1);
infowindow8.setContent(det[0].name);
infowindow8.open(this.map, markers1[0]);
//                        console.log(details);
this.markers.push(marker);
infowindow.close();
google.maps.event.addListener(marker, 'click', (function (marker, k) {
return function () {
infowindow8.close();
                            

infowindow.setContent(det[k].name)
infowindow.open(temp.map, markers1[k]);
console.log(markers1[k].position.lat(),markers1[k].position.lng());

}
})(marker, k));
}
this.map.setZoom(14);  }
},(err)=>{
console.log(err);
})
}else{
this.Parkingdetails = data.data[0].parking_space;
                    
this.Sellerdata = [];

for (var i = 0; i < data.data.length; i++) {
this.Sellerdata.push(data.data[i]);
//                        for(var n=0; n < data.data[i].parking_space.length ;n++){
//                            console.log(i,n)
console.log(data.data[i].parking_space.parking_images.length);
console.log(data.data[i].parking_space.parking_status);
if ((data.data[i].parking_space.parking_status == false)||(data.data[i].parking_space.parking_images.length == 0) || (!data.data[i].parking_space.parking_name)) {
                            
} else {
this.display = 1;
if (data.data[i].stripe_info) {
console.log(data.data[i].stripe_info.length);
if (data.data[i].stripe_info.length == 0) {

} else {
details.push(data.data[i].parking_space);
this.lattlngarray.push(data.data[i].parking_space.location.coordinates);
}
                                
}
}
//                        alert('here');

//                    }
}


//                    console.log(this.lattlngarray);
Loading.dismiss();
//                    console.log(this.lattlngarray[0][1], this.lattlngarray[0][0]);
var infowindow = new google.maps.InfoWindow();
var infowindow2 = new google.maps.InfoWindow();
var marker, j;
var markers1: any = [];
var temp = this;
console.log(this.Parkingdetails[0]);
this.Userdata = details[0];
if(this.Userdata){
if(this.Userdata.review_and_rating){
this.totalreviews =  this.Userdata.review_and_rating.length;
console.log(this.totalreviews);
}else{
temp.totalreviews = 0;
}
temp.reviewarry = temp.Userdata.review_and_rating
temp.reviewarry.forEach(function (value, key) {
console.log(temp.Rating);
temp.Rating = (temp.Rating + value.rating);
console.log(temp.Rating);
console.log(temp.reviewarry.length);
temp.totalvalue = temp.Rating /temp.reviewarry.length
console.log(temp.totalvalue);
temp.totalvalue = Number((temp.totalvalue).toFixed(1));
})
if(temp.totalvalue  == 1){
temp.starone = 'star'
}
else if(temp.totalvalue  == 2){
temp.starone = 'star'
temp.startwo = 'star'
}
else if(temp.totalvalue == 3){
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
}
else if(temp.totalvalue == 4){
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour = 'star'
}
else if(temp.totalvalue == 5){
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour = 'star'
temp.starfive = 'star'
}  else if((1.1 <= temp.totalvalue)&&(temp.totalvalue <= 1.5)){
           
temp.starone = 'star-half'
                  
}  else if((1.6 <= temp.totalvalue)&&(temp.totalvalue <= 1.9)){
            
temp.starone = 'star'
temp.startwo = 'star'
                
}  else if((2.1 <= temp.totalvalue)&&(temp.totalvalue <= 2.5)){
           
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star-half'
                
}  else if((2.6 <= temp.totalvalue)&&(temp.totalvalue <= 2.9)){
             
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
                
}
else if((3.1<= temp.totalvalue)&&(temp.totalvalue <= 3.5)){
                   
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star-half'
                
}
else if((3.6 <= temp.totalvalue)&&(temp.totalvalue <= 3.9)){
                   
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star'
}
else if((4.1 <= temp.totalvalue)&&(temp.totalvalue <= 4.5)){
            
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star-half'
                
}
else if((4.6 <= temp.totalvalue)&&(temp.totalvalue <= 4.9)){
                   
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star'
temp.starfive='star'
                
}
                    
console.log(this.lattlngarray);
for (j = 0; j < this.lattlngarray.length; j++) {
//                       alert(j);
marker = new google.maps.Marker({
position: new google.maps.LatLng(this.lattlngarray[j][1], this.lattlngarray[j][0]),
icon: 'assets/imgs/marklogo.png',
map: this.map
});
//                       console.log(this.Userdata);
//                        console.log(temp.Parkingdetails[0].hourly_rate);
//                        console.log(marker);
markers1.push(marker);
console.log(markers1);
infowindow2.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'/></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details[0].hourly_rate + '.00' + "</span>")
infowindow2.open(this.map, markers1[0]);
//                        console.log(details);
this.markers.push(marker);
google.maps.event.addListener(marker, 'click', (function (marker, j) {
return function () {
infowindow2.close();
temp.display = 1;
console.log(j);
temp.Userdata = details[j];
if(temp.Userdata.review_and_rating.length){
temp.totalreviews =  temp.Userdata.review_and_rating.length;
                    
console.log(temp.totalreviews);
}else{
temp.totalreviews = 0;
}
temp.Rating=0;
temp.reviewarry = temp.Userdata.review_and_rating
temp.reviewarry.forEach(function (value, key) {
console.log(value.rating);
temp.Rating = (temp.Rating + value.rating);
console.log('totalRating:'+temp.Rating);
console.log('totallength'+temp.reviewarry.length)
temp.totalvalue = temp.Rating /temp.reviewarry.length
temp.totalvalue = Number((temp.totalvalue).toFixed(1));
console.log('totalaverage'+temp.totalvalue);
})
if(temp.totalvalue  == 1){
temp.starone = 'star'
}
else if(temp.totalvalue  == 2){
temp.starone = 'star'
temp.startwo = 'star'
}
else if(temp.totalvalue == 3){
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
}
else if(temp.totalvalue == 4){
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour = 'star'
}
else if(temp.totalvalue == 5){
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour = 'star'
temp.starfive = 'star'
}  else if((1.1 <= temp.totalvalue)&&(temp.totalvalue <= 1.5)){
           
temp.starone = 'star-half'
                  
}  else if((1.6 <= temp.totalvalue)&&(temp.totalvalue <= 1.9)){
            
temp.starone = 'star'
temp.startwo = 'star'
                
}  else if((2.1 <= temp.totalvalue)&&(temp.totalvalue <= 2.5)){
           
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star-half'
                
}  else if((2.6 <= temp.totalvalue)&&(temp.totalvalue <= 2.9)){
             
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
                
}
else if((3.1<= temp.totalvalue)&&(temp.totalvalue <= 3.5)){
                   
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star-half'
                
}
else if((3.6 <= temp.totalvalue)&&(temp.totalvalue <= 3.9)){
                   
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star'
}
else if((4.1 <= temp.totalvalue)&&(temp.totalvalue <= 4.5)){
            
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star-half'
                
}
else if((4.6 <= temp.totalvalue)&&(temp.totalvalue <= 4.9)){
                   
temp.starone = 'star'
temp.startwo = 'star'
temp.starthree = 'star'
temp.starfour='star'
temp.starfive='star'
                
}
console.log(details[j]);
infowindow.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'/></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details[j].hourly_rate + '.00' + "</span>")
infowindow.open(temp.map, markers1[j]);
console.log(temp.Userdata);

}
})(marker, j));
}

this.map.setZoom(14);
//                    this.map.setCenter(latilongi);
}else{
this.ToastMsg('No data found');
}}}else{
this.ToastMsg('No data found');
}


})
})
}

serializeObj(obj) {
var result = [];
for (var property in obj)
result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

return result.join("&");
}

clearMarkers() {
console.log('clear');
this.setMapOnAll(null);

}

setMapOnAll(map) {

for (var i = 0; i < this.markers.length; i++) {
this.markers[i].setMap(map);
}
console.log(this.circle);

console.log(this.markers)
console.log('setmap');
}

deleteMarkers() {

this.clearMarkers();
this.markers = [];

}
viewparking(parkdata) {

console.log(parkdata);
localStorage.setItem('Parkdetail', JSON.stringify(parkdata));
console.log(this.Sellerdata);
this.Sellerdata.forEach(function (value, key) {
if (value.parking_space._id == parkdata._id) {
localStorage.setItem('sellerparkdetail', JSON.stringify(value));
return false
}
})
this.navCtrl.push(MikehousePage);
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
}
