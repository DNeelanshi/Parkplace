var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { MikehousePage } from '../mikehouse/mikehouse';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController, ActionSheetController, MenuController, App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import * as moment from 'moment';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, http, toastCtrl, alertCtrl, app, events, geolocation, menuCtrl, loadingCtrl, appsetting, camera, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.events = events;
        this.geolocation = geolocation;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.data = {};
        this.reviewarry = [];
        this.Rating = 0;
        this.totalvalue = 0;
        this.display = 0;
        this.latlngarray = [];
        this.lattlngarray = [];
        this.Parkingdetails = [];
        this.Sellerdata = [];
        this.totalreviews = 0;
        this.Parkingdetails1 = [];
        this.comparison = false;
        this.geocoder = new google.maps.Geocoder();
        this.starone = 'star-outline';
        this.startwo = 'star-outline';
        this.starthree = 'star-outline';
        this.starfour = 'star-outline';
        this.starfive = 'star-outline';
        this.markers = [];
        this.autocompleteItems = [];
        this.currcircle = [];
        this.menuCtrl.swipeEnable(true);
        //        alert('welcome');
        //        this.initmap();
    }
    HomePage.prototype.ionViewDidLoad = function () {
        //        this.initmap();
    };
    HomePage.prototype.ngOnInit = function () {
        this.lati = '';
        this.longi = '';
        this.daate = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.daate);
        this.time = moment(new Date()).format('HH:mm');
        console.log(this.time);
        this.Userdata = '';
        this.totalreviews = 0;
        this.starone = 'star-outline';
        this.startwo = 'star-outline';
        this.starthree = 'star-outline';
        this.starfour = 'star-outline';
        this.starfive = 'star-outline';
        // alert("neelanshi");
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.initmap();
    };
    HomePage.prototype.changes = function () {
        console.log(this.data.startime);
        var btime = this.data.startime.split(":");
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
    };
    HomePage.prototype.citychange = function () {
        this.data.search = '';
        var temp = this;
        console.log(this.data.city);
        if (this.data.city) {
            console.log(this.data.city);
            this.geocoder.geocode({ 'address': this.data.city }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log("location : " + results[0].geometry.location.lat() + " " + results[0].geometry.location.lng());
                    temp.lati = results[0].geometry.location.lat();
                    temp.longi = results[0].geometry.location.lng();
                }
                else {
                    alert("Something got wrong " + status);
                }
            });
        }
    };
    HomePage.prototype.serachdata = function () {
        var _this = this;
        console.log(this.comparison);
        this.display = 0;
        this.deleteMarkers();
        var details1 = [];
        this.Userdata = '';
        this.totalreviews = 0;
        this.Rating = 0;
        this.totalvalue = 0;
        this.starone = 'star-outline';
        this.startwo = 'star-outline';
        this.starthree = 'star-outline';
        this.starfour = 'star-outline';
        this.starfive = 'star-outline';
        var lattLng = new google.maps.LatLng(this.lat, this.long);
        console.log(this.data.city, this.data.startime, this.data.date);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        console.log(this.lat, this.long);
        if (this.data.startime == undefined) {
            this.data.startime = "";
        }
        if (this.data.date == undefined) {
            this.data.date = "";
        }
        if (this.lat == undefined) {
            this.ToastMsg('Error getting location');
        }
        else {
            console.log('ander agya');
            console.log(moment(this.daate).isSame(moment(this.data.date)));
            if ((moment(this.daate).isSame(moment(this.data.date)) == true) && (this.comparison == true)) {
                console.log('hua check');
                this.AlertMsg1('Time must be greater than current');
            }
            else {
                var Loading = this.loadingCtrl.create({
                    spinner: 'bubbles',
                    cssClass: 'loader',
                    content: "Loading",
                    dismissOnPageChange: true
                });
                Loading.present().then(function () {
                    if ((_this.lati == undefined) || (_this.longi == undefined) || (_this.lati == "")) {
                        _this.lati = _this.lat;
                        _this.longi = _this.long;
                    }
                    console.log('ready to hit');
                    var postdata = {
                        lat: _this.lati,
                        long: _this.longi,
                        date: _this.data.date,
                        opening_time: _this.data.startime
                    };
                    console.log(postdata);
                    var serialized = _this.serializeObj(postdata);
                    _this.http.post(_this.appsetting.myGlobalVar + 'users/Getparkingaccodingtofilters', postdata).map(function (res) { return res.json(); }).subscribe(function (data) {
                        Loading.dismiss();
                        console.log(data);
                        _this.latlngarray = [];
                        _this.lattlngarray = [];
                        _this.Parkingdetails = [];
                        if (data.status == true) {
                            if (data.data.length == 0) {
                                _this.ToastMsg('No data found');
                            }
                            else {
                                _this.Parkingdetails = data.data[0].parking_space;
                                _this.Sellerdata = [];
                                _this.lattlngarray = [];
                                for (var i = 0; i < data.data.length; i++) {
                                    //                        for(var n=0; n < data.data[i].parking_space.length ;n++){
                                    console.log(i);
                                    _this.Sellerdata.push(data.data[i]);
                                    console.log(data.data[i].parking_space.parking_status);
                                    //                            console.log(data.data[i].parking_space.parking_images.length);
                                    if ((data.data[i].parking_space.parking_status == false) || (data.data[i].parking_space.parking_images.length == 0) || (!data.data[i].parking_space.parking_name) || (data.data[i].stripe_info.length == 0)) {
                                        console.log(data.data[i].parking_space.parking_name);
                                    }
                                    else {
                                        _this.display = 1;
                                        details1.push(data.data[i].parking_space);
                                        _this.lattlngarray.push(data.data[i].parking_space.location.coordinates);
                                    }
                                    //                    }
                                }
                                if (_this.infowindow) {
                                    _this.infowindow.close();
                                }
                                //                        console.log(this.lattlngarray);
                                Loading.dismiss();
                                //                        console.log(this.lattlngarray[0][1], this.lattlngarray[0][0]);
                                var infowindow1 = new google.maps.InfoWindow();
                                var infowindow = new google.maps.InfoWindow();
                                var marker, j;
                                var markers1 = [];
                                var temp = _this;
                                console.log(details1[0]);
                                _this.Userdata = details1[0];
                                if (temp.Userdata) {
                                    if (temp.Userdata.review_and_rating) {
                                        temp.totalreviews = temp.Userdata.review_and_rating.length;
                                        console.log(temp.totalreviews);
                                    }
                                    else {
                                        temp.totalreviews = 0;
                                    }
                                    temp.Rating = 0;
                                    temp.reviewarry = temp.Userdata.review_and_rating;
                                    temp.reviewarry.forEach(function (value, key) {
                                        temp.Rating = (temp.Rating + value.rating);
                                        console.log('totalRating:' + temp.Rating);
                                        console.log('totallength' + temp.reviewarry.length);
                                        temp.totalvalue = temp.Rating / temp.reviewarry.length;
                                        temp.totalvalue = Number((temp.totalvalue).toFixed(1));
                                    });
                                    console.log(_this.totalvalue);
                                    if (_this.totalvalue == 1) {
                                        _this.starone = 'star';
                                    }
                                    else if (_this.totalvalue == 2) {
                                        _this.starone = 'star';
                                        _this.startwo = 'star';
                                    }
                                    else if (_this.totalvalue == 3) {
                                        _this.starone = 'star';
                                        _this.startwo = 'star';
                                        _this.starthree = 'star';
                                    }
                                    else if (_this.totalvalue == 4) {
                                        _this.starone = 'star';
                                        _this.startwo = 'star';
                                        _this.starthree = 'star';
                                        _this.starfour = 'star';
                                    }
                                    else if (_this.totalvalue == 5) {
                                        _this.starone = 'star';
                                        _this.startwo = 'star';
                                        _this.starthree = 'star';
                                        _this.starfour = 'star';
                                        _this.starfive = 'star';
                                    }
                                    else if ((1.1 <= _this.totalvalue) && (_this.totalvalue <= 1.5)) {
                                        _this.starone = 'star-half';
                                    }
                                    else if ((1.6 <= _this.totalvalue) && (_this.totalvalue <= 1.9)) {
                                        _this.starone = 'star';
                                        _this.startwo = 'star';
                                    }
                                    else if ((2.1 <= _this.totalvalue) && (_this.totalvalue <= 2.5)) {
                                        _this.starone = 'star';
                                        _this.startwo = 'star';
                                        _this.starthree = 'star-half';
                                    }
                                    else if ((2.6 <= _this.totalvalue) && (_this.totalvalue <= 2.9)) {
                                        _this.starone = 'star';
                                        _this.startwo = 'star';
                                        _this.starthree = 'star';
                                    }
                                    else if ((3.1 <= _this.totalvalue) && (_this.totalvalue <= 3.5)) {
                                        _this.starone = 'star';
                                        _this.startwo = 'star';
                                        _this.starthree = 'star';
                                        _this.starfour = 'star-half';
                                    }
                                    else if ((3.6 <= _this.totalvalue) && (_this.totalvalue <= 3.9)) {
                                        _this.starone = 'star';
                                        _this.startwo = 'star';
                                        _this.starthree = 'star';
                                        _this.starfour = 'star';
                                    }
                                    else if ((4.1 <= _this.totalvalue) && (_this.totalvalue <= 4.5)) {
                                        _this.starone = 'star';
                                        _this.startwo = 'star';
                                        _this.starthree = 'star';
                                        _this.starfour = 'star-half';
                                    }
                                    else if ((4.6 <= _this.totalvalue) && (_this.totalvalue <= 4.9)) {
                                        _this.starone = 'star';
                                        _this.startwo = 'star';
                                        _this.starthree = 'star';
                                        _this.starfour = 'star';
                                        _this.starfive = 'star';
                                    }
                                    //                        console.log(this.lattlngarray);
                                    for (j = 0; j < _this.lattlngarray.length; j++) {
                                        //                       alert(j);
                                        marker = new google.maps.Marker({
                                            position: new google.maps.LatLng(_this.lattlngarray[j][1], _this.lattlngarray[j][0]),
                                            icon: 'assets/imgs/marklogo.png',
                                            map: _this.map
                                        });
                                        //                       console.log(this.Userdata);
                                        //                        console.log(temp.Parkingdetails[0].hourly_rate);
                                        //                        console.log(marker);
                                        markers1.push(marker);
                                        infowindow1.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details1[0].hourly_rate + '.00' + "</span>");
                                        infowindow1.open(_this.map, markers1[0]);
                                        //                        console.log(details);
                                        _this.markers.push(marker);
                                        google.maps.event.addListener(marker, 'click', (function (marker, j) {
                                            return function () {
                                                infowindow1.close();
                                                temp.display = 1;
                                                console.log(j);
                                                temp.Userdata = details1[j];
                                                if (temp.Userdata.review_and_rating.length) {
                                                    temp.totalreviews = temp.Userdata.review_and_rating.length;
                                                    console.log(temp.totalreviews);
                                                }
                                                else {
                                                    temp.totalreviews = 0;
                                                }
                                                temp.Rating = 0;
                                                temp.reviewarry = temp.Userdata.review_and_rating;
                                                temp.reviewarry.forEach(function (value, key) {
                                                    temp.Rating = (temp.Rating + value.rating);
                                                    console.log('totalRating:' + temp.Rating);
                                                    console.log('totallength' + temp.reviewarry.length);
                                                    temp.totalvalue = temp.Rating / temp.reviewarry.length;
                                                    temp.totalvalue = Number((temp.totalvalue).toFixed(1));
                                                });
                                                if (temp.totalvalue == 1) {
                                                    temp.starone = 'star';
                                                }
                                                else if (temp.totalvalue == 2) {
                                                    temp.starone = 'star';
                                                    temp.startwo = 'star';
                                                }
                                                else if (temp.totalvalue == 3) {
                                                    temp.starone = 'star';
                                                    temp.startwo = 'star';
                                                    temp.starthree = 'star';
                                                }
                                                else if (temp.totalvalue == 4) {
                                                    temp.starone = 'star';
                                                    temp.startwo = 'star';
                                                    temp.starthree = 'star';
                                                    temp.starfour = 'star';
                                                }
                                                else if (temp.totalvalue == 5) {
                                                    temp.starone = 'star';
                                                    temp.startwo = 'star';
                                                    temp.starthree = 'star';
                                                    temp.starfour = 'star';
                                                    temp.starfive = 'star';
                                                }
                                                else if ((1.1 <= temp.totalvalue) && (temp.totalvalue <= 1.5)) {
                                                    temp.starone = 'star-half';
                                                }
                                                else if ((1.6 <= temp.totalvalue) && (temp.totalvalue <= 1.9)) {
                                                    temp.starone = 'star';
                                                    temp.startwo = 'star';
                                                }
                                                else if ((2.1 <= temp.totalvalue) && (temp.totalvalue <= 2.5)) {
                                                    temp.starone = 'star';
                                                    temp.startwo = 'star';
                                                    temp.starthree = 'star-half';
                                                }
                                                else if ((2.6 <= temp.totalvalue) && (temp.totalvalue <= 2.9)) {
                                                    temp.starone = 'star';
                                                    temp.startwo = 'star';
                                                    temp.starthree = 'star';
                                                }
                                                else if ((3.1 <= temp.totalvalue) && (temp.totalvalue <= 3.5)) {
                                                    temp.starone = 'star';
                                                    temp.startwo = 'star';
                                                    temp.starthree = 'star';
                                                    temp.starfour = 'star-half';
                                                }
                                                else if ((3.6 <= temp.totalvalue) && (temp.totalvalue <= 3.9)) {
                                                    temp.starone = 'star';
                                                    temp.startwo = 'star';
                                                    temp.starthree = 'star';
                                                    temp.starfour = 'star';
                                                }
                                                else if ((4.1 <= temp.totalvalue) && (temp.totalvalue <= 4.5)) {
                                                    temp.starone = 'star';
                                                    temp.startwo = 'star';
                                                    temp.starthree = 'star';
                                                    temp.starfour = 'star-half';
                                                }
                                                else if ((4.6 <= temp.totalvalue) && (temp.totalvalue <= 4.9)) {
                                                    temp.starone = 'star';
                                                    temp.startwo = 'star';
                                                    temp.starthree = 'star';
                                                    temp.starfour = 'star';
                                                    temp.starfive = 'star';
                                                }
                                                console.log(details1[j]);
                                                infowindow.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details1[j].hourly_rate + '.00' + "</span>");
                                                infowindow.open(temp.map, markers1[j]);
                                                console.log(temp.Userdata);
                                            };
                                        })(marker, j));
                                    }
                                    _this.map.setZoom(14);
                                    //                    this.map.setCenter(latilongi);
                                    _this.map.setCenter(lattLng);
                                }
                                else {
                                    _this.ToastMsg('No data found');
                                }
                            }
                        }
                        else {
                            _this.ToastMsg('No data found');
                        }
                    });
                });
            }
        }
    };
    HomePage.prototype.initmap = function () {
        var _this = this;
        this.lati = '';
        this.longi = '';
        this.data.startime = '';
        this.data.date = '';
        this.data.city = '';
        this.autocompleteItems = [];
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
        Loading.present().then(function () {
            _this.geolocation.getCurrentPosition().then(function (resp) {
                _this.lat = resp.coords.latitude;
                _this.long = resp.coords.longitude;
                console.log(resp.coords.latitude);
                console.log(resp.coords.longitude);
                alert('map');
                var latLng = new google.maps.LatLng(_this.lat, _this.long);
                var mapOptions = {
                    center: latLng,
                    zoom: 14,
                    minZoom: 2,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    disableDefaultUI: true,
                    zoomControl: true
                };
                _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
                _this.infowindow = new google.maps.InfoWindow();
                var cityCircle = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: _this.map,
                    center: latLng,
                    radius: 300
                });
                _this.currcircle.push(cityCircle);
                _this.geocoder.geocode({ 'location': latLng }, (function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results == '') {
                            _this.ToastMsg('Invalid Location');
                            _this.lat = '';
                            _this.long = '';
                            _this.infowindow.setContent('Error');
                            _this.infowindow.open(_this.map, marker1);
                            _this.data.search = '';
                        }
                        else {
                            if (results[0]) {
                                //                                                                alert(results[0].formatted_address);
                                console.log(results[0].place_id);
                                console.log(results[0].formatted_address);
                                _this.data.search = results[0].formatted_address;
                                //this.infowindow.setContent(results[0].formatted_address);
                                ////    
                                //          this.infowindow.open(this.map, marker1);
                            }
                        }
                    }
                }));
                var tem = _this;
                var marker1 = new google.maps.Marker({
                    position: latLng,
                    draggable: false,
                    icon: 'assets/imgs/currentmarker.png',
                    map: _this.map,
                });
                tem.showparkings(latLng);
                _this.markers.push(marker1);
                Loading.dismiss();
            }, function (err) {
                alert(err);
            });
        });
    };
    HomePage.prototype.updateSearch = function () {
        var _this = this;
        console.log('search');
        if (this.data.search == '') {
            this.autocompleteItems = [];
        }
        var config = {
            input: this.data.search,
            componentRestrictions: {}
        };
        this.acService.getPlacePredictions(config, (function (predictions, status) {
            console.log('modal > getPlacePredictions > status > ', status);
            _this.autocompleteItems = [];
            console.log(predictions);
            predictions.forEach((function (prediction) {
                console.log("abc");
                _this.autocompleteItems.push(prediction);
            }));
        }));
        if (this.data.search == '') {
            this.autocompleteItems = ' ';
        }
    };
    HomePage.prototype.chooseItem = function (item) {
        var _this = this;
        console.log(item);
        this.data.search = item.description;
        if (this.infowindow) {
            this.infowindow.close();
        }
        this.geocoder.geocode({ 'placeId': item.place_id }, (function (results, status) {
            if (status === 'OK') {
                if (results == '') {
                    _this.ToastMsg('Invalid Location');
                    _this.lat = '';
                    _this.long = '';
                    _this.infowindow.setContent('Error');
                    _this.infowindow.open(_this.map, marker);
                    _this.data.search = '';
                }
                else {
                    if (results[0]) {
                        console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                        console.log(results[0].place_id);
                        console.log(results[0].formatted_address);
                        _this.data.search = results[0].formatted_address;
                        _this.lat = results[0].geometry.location.lat();
                        _this.long = results[0].geometry.location.lng();
                        //                        alert(this.lat+','+this.long);
                        //                        
                        //          this.map.setCenter(results[0].geometry.location);
                    }
                    _this.infowindow.setContent(results[0].formatted_address);
                    _this.infowindow.open(_this.map, marker);
                    var latlng = new google.maps.LatLng(_this.lat, _this.long);
                    console.log(latlng.lat(), latlng.lng());
                    _this.deleteMarkers();
                    _this.markers = [];
                    var temp = _this;
                    console.log(_this.markers);
                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        icon: 'assets/imgs/currentmarker.png',
                        map: _this.map,
                    });
                    console.log(marker);
                    _this.markers.push(marker);
                    _this.map.setZoom(14);
                    _this.map.setCenter(marker.getPosition());
                    var cityCircle = new google.maps.Circle({
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        map: _this.map,
                        center: results[0].geometry.location,
                        radius: 300
                    });
                    _this.currcircle.push(cityCircle);
                    temp.showparkings(results[0].geometry.location);
                }
            }
        }));
        this.autocompleteItems = [];
    };
    HomePage.prototype.ToastMsg = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    };
    HomePage.prototype.showparkings = function (latilongi) {
        var _this = this;
        this.data.startime = '';
        this.data.date = '';
        this.data.city = '';
        this.display = 0;
        this.Userdata = '';
        this.totalreviews = 0;
        this.Rating = 0;
        this.totalvalue = 0;
        this.starone = 'star-outline';
        this.startwo = 'star-outline';
        this.starthree = 'star-outline';
        this.starfour = 'star-outline';
        this.starfive = 'star-outline';
        var details = [];
        this.lattlngarray = [];
        console.log(latilongi);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
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
        Loading.present().then(function () {
            _this.http.post(_this.appsetting.myGlobalVar + 'users/GetparkingPlace', postdata).map(function (res) { return res.json(); }).subscribe(function (data) {
                Loading.dismiss();
                console.log(data);
                if (data.status == true) {
                    if (data.data.length == 0) { }
                    else {
                        _this.Parkingdetails = data.data[0].parking_space;
                        _this.Sellerdata = [];
                        for (var i = 0; i < data.data.length; i++) {
                            _this.Sellerdata.push(data.data[i]);
                            //                        for(var n=0; n < data.data[i].parking_space.length ;n++){
                            //                            console.log(i,n)
                            console.log(data.data[i].parking_space.parking_images.length);
                            console.log(data.data[i].parking_space.parking_status);
                            if ((data.data[i].parking_space.parking_status == false) || (data.data[i].parking_space.parking_images.length == 0) || (!data.data[i].parking_space.parking_name)) {
                            }
                            else {
                                _this.display = 1;
                                if (data.data[i].stripe_info) {
                                    console.log(data.data[i].stripe_info.length);
                                    if (data.data[i].stripe_info.length == 0) {
                                    }
                                    else {
                                        details.push(data.data[i].parking_space);
                                        _this.lattlngarray.push(data.data[i].parking_space.location.coordinates);
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
                        var markers1 = [];
                        var temp = _this;
                        console.log(_this.Parkingdetails[0]);
                        _this.Userdata = details[0];
                        if (_this.Userdata) {
                            if (_this.Userdata.review_and_rating) {
                                _this.totalreviews = _this.Userdata.review_and_rating.length;
                                console.log(_this.totalreviews);
                            }
                            else {
                                temp.totalreviews = 0;
                            }
                            temp.reviewarry = temp.Userdata.review_and_rating;
                            temp.reviewarry.forEach(function (value, key) {
                                console.log(temp.Rating);
                                temp.Rating = (temp.Rating + value.rating);
                                console.log(temp.Rating);
                                console.log(temp.reviewarry.length);
                                temp.totalvalue = temp.Rating / temp.reviewarry.length;
                                console.log(temp.totalvalue);
                                temp.totalvalue = Number((temp.totalvalue).toFixed(1));
                            });
                            if (temp.totalvalue == 1) {
                                temp.starone = 'star';
                            }
                            else if (temp.totalvalue == 2) {
                                temp.starone = 'star';
                                temp.startwo = 'star';
                            }
                            else if (temp.totalvalue == 3) {
                                temp.starone = 'star';
                                temp.startwo = 'star';
                                temp.starthree = 'star';
                            }
                            else if (temp.totalvalue == 4) {
                                temp.starone = 'star';
                                temp.startwo = 'star';
                                temp.starthree = 'star';
                                temp.starfour = 'star';
                            }
                            else if (temp.totalvalue == 5) {
                                temp.starone = 'star';
                                temp.startwo = 'star';
                                temp.starthree = 'star';
                                temp.starfour = 'star';
                                temp.starfive = 'star';
                            }
                            else if ((1.1 <= temp.totalvalue) && (temp.totalvalue <= 1.5)) {
                                temp.starone = 'star-half';
                            }
                            else if ((1.6 <= temp.totalvalue) && (temp.totalvalue <= 1.9)) {
                                temp.starone = 'star';
                                temp.startwo = 'star';
                            }
                            else if ((2.1 <= temp.totalvalue) && (temp.totalvalue <= 2.5)) {
                                temp.starone = 'star';
                                temp.startwo = 'star';
                                temp.starthree = 'star-half';
                            }
                            else if ((2.6 <= temp.totalvalue) && (temp.totalvalue <= 2.9)) {
                                temp.starone = 'star';
                                temp.startwo = 'star';
                                temp.starthree = 'star';
                            }
                            else if ((3.1 <= temp.totalvalue) && (temp.totalvalue <= 3.5)) {
                                temp.starone = 'star';
                                temp.startwo = 'star';
                                temp.starthree = 'star';
                                temp.starfour = 'star-half';
                            }
                            else if ((3.6 <= temp.totalvalue) && (temp.totalvalue <= 3.9)) {
                                temp.starone = 'star';
                                temp.startwo = 'star';
                                temp.starthree = 'star';
                                temp.starfour = 'star';
                            }
                            else if ((4.1 <= temp.totalvalue) && (temp.totalvalue <= 4.5)) {
                                temp.starone = 'star';
                                temp.startwo = 'star';
                                temp.starthree = 'star';
                                temp.starfour = 'star-half';
                            }
                            else if ((4.6 <= temp.totalvalue) && (temp.totalvalue <= 4.9)) {
                                temp.starone = 'star';
                                temp.startwo = 'star';
                                temp.starthree = 'star';
                                temp.starfour = 'star';
                                temp.starfive = 'star';
                            }
                            console.log(_this.lattlngarray);
                            for (j = 0; j < _this.lattlngarray.length; j++) {
                                //                       alert(j);
                                marker = new google.maps.Marker({
                                    position: new google.maps.LatLng(_this.lattlngarray[j][1], _this.lattlngarray[j][0]),
                                    icon: 'assets/imgs/marklogo.png',
                                    map: _this.map
                                });
                                //                       console.log(this.Userdata);
                                //                        console.log(temp.Parkingdetails[0].hourly_rate);
                                //                        console.log(marker);
                                markers1.push(marker);
                                infowindow2.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details[0].hourly_rate + '.00' + "</span>");
                                infowindow2.open(_this.map, markers1[0]);
                                //                        console.log(details);
                                _this.markers.push(marker);
                                google.maps.event.addListener(marker, 'click', (function (marker, j) {
                                    return function () {
                                        infowindow2.close();
                                        temp.display = 1;
                                        console.log(j);
                                        temp.Userdata = details[j];
                                        if (temp.Userdata.review_and_rating.length) {
                                            temp.totalreviews = temp.Userdata.review_and_rating.length;
                                            console.log(temp.totalreviews);
                                        }
                                        else {
                                            temp.totalreviews = 0;
                                        }
                                        temp.Rating = 0;
                                        temp.reviewarry = temp.Userdata.review_and_rating;
                                        temp.reviewarry.forEach(function (value, key) {
                                            console.log(value.rating);
                                            temp.Rating = (temp.Rating + value.rating);
                                            console.log('totalRating:' + temp.Rating);
                                            console.log('totallength' + temp.reviewarry.length);
                                            temp.totalvalue = temp.Rating / temp.reviewarry.length;
                                            temp.totalvalue = Number((temp.totalvalue).toFixed(1));
                                            console.log('totalaverage' + temp.totalvalue);
                                        });
                                        if (temp.totalvalue == 1) {
                                            temp.starone = 'star';
                                        }
                                        else if (temp.totalvalue == 2) {
                                            temp.starone = 'star';
                                            temp.startwo = 'star';
                                        }
                                        else if (temp.totalvalue == 3) {
                                            temp.starone = 'star';
                                            temp.startwo = 'star';
                                            temp.starthree = 'star';
                                        }
                                        else if (temp.totalvalue == 4) {
                                            temp.starone = 'star';
                                            temp.startwo = 'star';
                                            temp.starthree = 'star';
                                            temp.starfour = 'star';
                                        }
                                        else if (temp.totalvalue == 5) {
                                            temp.starone = 'star';
                                            temp.startwo = 'star';
                                            temp.starthree = 'star';
                                            temp.starfour = 'star';
                                            temp.starfive = 'star';
                                        }
                                        else if ((1.1 <= temp.totalvalue) && (temp.totalvalue <= 1.5)) {
                                            temp.starone = 'star-half';
                                        }
                                        else if ((1.6 <= temp.totalvalue) && (temp.totalvalue <= 1.9)) {
                                            temp.starone = 'star';
                                            temp.startwo = 'star';
                                        }
                                        else if ((2.1 <= temp.totalvalue) && (temp.totalvalue <= 2.5)) {
                                            temp.starone = 'star';
                                            temp.startwo = 'star';
                                            temp.starthree = 'star-half';
                                        }
                                        else if ((2.6 <= temp.totalvalue) && (temp.totalvalue <= 2.9)) {
                                            temp.starone = 'star';
                                            temp.startwo = 'star';
                                            temp.starthree = 'star';
                                        }
                                        else if ((3.1 <= temp.totalvalue) && (temp.totalvalue <= 3.5)) {
                                            temp.starone = 'star';
                                            temp.startwo = 'star';
                                            temp.starthree = 'star';
                                            temp.starfour = 'star-half';
                                        }
                                        else if ((3.6 <= temp.totalvalue) && (temp.totalvalue <= 3.9)) {
                                            temp.starone = 'star';
                                            temp.startwo = 'star';
                                            temp.starthree = 'star';
                                            temp.starfour = 'star';
                                        }
                                        else if ((4.1 <= temp.totalvalue) && (temp.totalvalue <= 4.5)) {
                                            temp.starone = 'star';
                                            temp.startwo = 'star';
                                            temp.starthree = 'star';
                                            temp.starfour = 'star-half';
                                        }
                                        else if ((4.6 <= temp.totalvalue) && (temp.totalvalue <= 4.9)) {
                                            temp.starone = 'star';
                                            temp.startwo = 'star';
                                            temp.starthree = 'star';
                                            temp.starfour = 'star';
                                            temp.starfive = 'star';
                                        }
                                        console.log(details[j]);
                                        infowindow.setContent("<div style='float:left; margin-right:10px;'><img style='float:left' src='assets/imgs/marklogo.png'></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + details[j].hourly_rate + '.00' + "</span>");
                                        infowindow.open(temp.map, markers1[j]);
                                        console.log(temp.Userdata);
                                    };
                                })(marker, j));
                            }
                            _this.map.setZoom(14);
                            //                    this.map.setCenter(latilongi);
                        }
                        else {
                            _this.ToastMsg('No data found');
                        }
                    }
                }
                else {
                    _this.ToastMsg('No data found');
                }
            });
        });
    };
    HomePage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    HomePage.prototype.clearMarkers = function () {
        console.log('clear');
        this.setMapOnAll(null);
    };
    HomePage.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
        for (var i = 0; i < this.currcircle.length; i++) {
            this.currcircle[i].setMap(map);
        }
        console.log(this.markers);
        console.log('setmap');
    };
    HomePage.prototype.deleteMarkers = function () {
        console.log('delete');
        this.clearMarkers();
        this.markers = [];
        this.currcircle = [];
    };
    HomePage.prototype.viewparking = function (parkdata) {
        console.log(parkdata);
        localStorage.setItem('Parkdetail', JSON.stringify(parkdata));
        console.log(this.Sellerdata);
        this.Sellerdata.forEach(function (value, key) {
            if (value.parking_space._id == parkdata._id) {
                localStorage.setItem('sellerparkdetail', JSON.stringify(value));
                return false;
            }
        });
        this.navCtrl.push(MikehousePage);
    };
    HomePage.prototype.AlertMsg1 = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Park Place',
            message: msg,
            buttons: [
                {
                    text: 'OK',
                    role: 'submit',
                    handler: function () {
                        console.log('ok clicked');
                        // this.navCtrl.push(ProcessingformPage);
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], HomePage.prototype, "mapElement", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http,
            ToastController,
            AlertController,
            App,
            Events,
            Geolocation,
            MenuController,
            LoadingController,
            Appsetting,
            Camera,
            ActionSheetController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map