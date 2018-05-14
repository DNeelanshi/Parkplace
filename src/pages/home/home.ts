
import {MikehousePage} from '../mikehouse/mikehouse';
import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
declare var google;
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

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    lat: any;
    daate: any;
    public data: any = {}
    long: any;
    display: number = 0;
    latlngarray: any = [];
    lattlngarray: any = [];
    Parkingdetails: any = [];
    Sellerdata: any = [];
    Userdata: any;
    Parkingdetails1: any = [];
    Userdata1: any;
    infowindow: any;
    geocoder = new google.maps.Geocoder();
    acService: any;
    markers: any = [];
    autocompleteItems: any = [];
    currcircle: any = [];
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
        //        alert('welcome');
        //        this.initmap();
    }
    ionViewDidLoad() {
        //        this.initmap();
    }
    ngOnInit() {
        this.daate = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.daate); 
        // alert("neelanshi");
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.initmap();
    }
    serachdata() {
        this.deleteMarkers();
        var details1: any = [];
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
        } else {
            var postdata = {
                lat: this.lat,
                long: this.long,
                date: this.data.date,
                opening_time: this.data.startime
            };
            console.log(postdata)
            var serialized = this.serializeObj(postdata);
            var Loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                cssClass: 'loader',
                content: "Loading",
                dismissOnPageChange: true
            });
            Loading.present().then(() => {
                this.http.post(this.appsetting.myGlobalVar + 'users/Getparkingaccodingtofilters', postdata).map(res => res.json()).subscribe(data => {
                    Loading.dismiss();
                    console.log(data)
                    this.latlngarray = [];
                    this.lattlngarray = [];
                    this.Parkingdetails = [];

                    if (data.status == true) {

                        this.Parkingdetails = data.data[0].parking_space;
                        this.Sellerdata = [];
                        this.lattlngarray = [];
                        for (var i = 0; i < data.data.length; i++) {
                            //                        for(var n=0; n < data.data[i].parking_space.length ;n++){
                            console.log(i)
                            this.Sellerdata.push(data.data[i]);
//                            console.log(data.data[i].parking_space.parking_images.length);
                            if ((data.data[i].parking_space.parking_images.length == 0) || (!data.data[i].parking_space.parking_name) || (data.data[i].stripe_info.length == 0)) {
                                console.log(data.data[i].parking_space.parking_name);
                            } else {
                                details1.push(data.data[i].parking_space);
                                this.lattlngarray.push(data.data[i].parking_space.location.coordinates);
                            }
                            //                    }
                        }
                        if (this.infowindow) {
                            this.infowindow.close();
                        }

                        console.log(this.lattlngarray);
                        Loading.dismiss();
                        console.log(this.lattlngarray[0][1], this.lattlngarray[0][0]);
                        var infowindow1 = new google.maps.InfoWindow();
                        var infowindow = new google.maps.InfoWindow();
                        var marker, j;
                        var markers1: any = [];
                        var temp = this;
                        console.log(details1[0]);
                        this.Userdata = details1[0];
                        this.display = 1;
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
                            infowindow1.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details1[0].hourly_rate + '.00' + "</span>")
                            infowindow1.open(this.map, markers1[0]);
                            //                        console.log(details);
                            this.markers.push(marker);
                            google.maps.event.addListener(marker, 'click', (function (marker, j) {
                                return function () {
                                    infowindow1.close();
                                    temp.display = 1;
                                    console.log(j);
                                    temp.Userdata = details1[j];

                                    console.log(details1[j]);
                                    infowindow.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details1[j].hourly_rate + '.00' + "</span>")
                                    infowindow.open(temp.map, markers1[j]);
                                    console.log(temp.Userdata);

                                }
                            })(marker, j));
                        }

                        this.map.setZoom(14);
                        //                    this.map.setCenter(latilongi);
                        this.map.setCenter(lattLng);
                    } else {
                        this.ToastMsg(data.msg)
                    }
                })
            })
        }
    }


    initmap() {
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
                    zoomControl: true
                };

                this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
                this.infowindow = new google.maps.InfoWindow();
                var cityCircle = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: this.map,
                    center: latLng,
                    radius: 300
                });
                this.currcircle.push(cityCircle);
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
                    var cityCircle = new google.maps.Circle({
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        map: this.map,
                        center: results[0].geometry.location,
                        radius: 300
                    });
                    this.currcircle.push(cityCircle);
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

    showparkings(latilongi) {

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
                    this.Parkingdetails = data.data[0].parking_space;
                    this.Sellerdata = [];

                    for (var i = 0; i < data.data.length; i++) {
                        this.Sellerdata.push(data.data[i]);
                        //                        for(var n=0; n < data.data[i].parking_space.length ;n++){
                        //                            console.log(i,n)
                        console.log(data.data[i].parking_space.parking_images.length);
                        if ((data.data[i].parking_space.parking_images.length == 0) || (!data.data[i].parking_space.parking_name)) {
                            
                        } else {
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


                    console.log(this.lattlngarray);
                    Loading.dismiss();
                    console.log(this.lattlngarray[0][1], this.lattlngarray[0][0]);
                    var infowindow = new google.maps.InfoWindow();
                    var infowindow2 = new google.maps.InfoWindow();
                    var marker, j;
                    var markers1: any = [];
                    var temp = this;
                    console.log(this.Parkingdetails[0]);
                    this.Userdata = details[0];
                    this.display = 1;
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
                        infowindow2.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details[0].hourly_rate + '.00' + "</span>")
                        infowindow2.open(this.map, markers1[0]);
                        //                        console.log(details);
                        this.markers.push(marker);
                        google.maps.event.addListener(marker, 'click', (function (marker, j) {
                            return function () {
                                infowindow2.close();
                                temp.display = 1;
                                console.log(j);
                                temp.Userdata = details[j];

                                console.log(details[j]);
                                infowindow.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details[j].hourly_rate + '.00' + "</span>")
                                infowindow.open(temp.map, markers1[j]);
                                console.log(temp.Userdata);

                            }
                        })(marker, j));
                    }

                    this.map.setZoom(14);
                    //                    this.map.setCenter(latilongi);
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
        for (var i = 0; i < this.currcircle.length; i++) {
            this.currcircle[i].setMap(map);

        }

        console.log(this.markers)
        console.log('setmap');
    }
    deleteMarkers() {
        console.log('delete');
        this.clearMarkers();
        this.markers = [];
        this.currcircle = [];


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

}
