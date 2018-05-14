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
        this.display = 0;
        this.latlngarray = [];
        this.lattlngarray = [];
        this.Parkingdetails = [];
        this.Sellerdata = [];
        this.Parkingdetails1 = [];
        this.geocoder = new google.maps.Geocoder();
        this.markers = [];
        this.autocompleteItems = [];
        this.currcircle = [];
        //        alert('welcome');
        //        this.initmap();
    }
    HomePage.prototype.ionViewDidLoad = function () {
        //        this.initmap();
    };
    HomePage.prototype.ngOnInit = function () {
        this.daate = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.daate);
        // alert("neelanshi");
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.initmap();
    };
    HomePage.prototype.serachdata = function () {
        var _this = this;
        this.deleteMarkers();
        var details1 = [];
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
            var postdata = {
                lat: this.lat,
                long: this.long,
                date: this.data.date,
                opening_time: this.data.startime
            };
            console.log(postdata);
            var serialized = this.serializeObj(postdata);
            var Loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                cssClass: 'loader',
                content: "Loading",
                dismissOnPageChange: true
            });
            Loading.present().then(function () {
                _this.http.post(_this.appsetting.myGlobalVar + 'users/Getparkingaccodingtofilters', postdata).map(function (res) { return res.json(); }).subscribe(function (data) {
                    Loading.dismiss();
                    console.log(data);
                    _this.latlngarray = [];
                    _this.lattlngarray = [];
                    _this.Parkingdetails = [];
                    if (data.status == true) {
                        _this.Parkingdetails = data.data[0].parking_space;
                        _this.Sellerdata = [];
                        _this.lattlngarray = [];
                        for (var i = 0; i < data.data.length; i++) {
                            //                        for(var n=0; n < data.data[i].parking_space.length ;n++){
                            console.log(i);
                            _this.Sellerdata.push(data.data[i]);
                            //                            console.log(data.data[i].parking_space.parking_images.length);
                            if ((data.data[i].parking_space.parking_images.length == 0) || (!data.data[i].parking_space.parking_name) || (data.data[i].stripe_info.length == 0)) {
                                console.log(data.data[i].parking_space.parking_name);
                            }
                            else {
                                details1.push(data.data[i].parking_space);
                                _this.lattlngarray.push(data.data[i].parking_space.location.coordinates);
                            }
                            //                    }
                        }
                        if (_this.infowindow) {
                            _this.infowindow.close();
                        }
                        console.log(_this.lattlngarray);
                        Loading.dismiss();
                        console.log(_this.lattlngarray[0][1], _this.lattlngarray[0][0]);
                        var infowindow1 = new google.maps.InfoWindow();
                        var infowindow = new google.maps.InfoWindow();
                        var marker, j;
                        var markers1 = [];
                        var temp = _this;
                        console.log(details1[0]);
                        _this.Userdata = details1[0];
                        _this.display = 1;
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
                        _this.ToastMsg(data.msg);
                    }
                });
            });
        }
    };
    HomePage.prototype.initmap = function () {
        var _this = this;
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
                    _this.Parkingdetails = data.data[0].parking_space;
                    _this.Sellerdata = [];
                    for (var i = 0; i < data.data.length; i++) {
                        _this.Sellerdata.push(data.data[i]);
                        //                        for(var n=0; n < data.data[i].parking_space.length ;n++){
                        //                            console.log(i,n)
                        console.log(data.data[i].parking_space.parking_images.length);
                        if ((data.data[i].parking_space.parking_images.length == 0) || (!data.data[i].parking_space.parking_name)) {
                        }
                        else {
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
                    console.log(_this.lattlngarray);
                    Loading.dismiss();
                    console.log(_this.lattlngarray[0][1], _this.lattlngarray[0][0]);
                    var infowindow = new google.maps.InfoWindow();
                    var infowindow2 = new google.maps.InfoWindow();
                    var marker, j;
                    var markers1 = [];
                    var temp = _this;
                    console.log(_this.Parkingdetails[0]);
                    _this.Userdata = details[0];
                    _this.display = 1;
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