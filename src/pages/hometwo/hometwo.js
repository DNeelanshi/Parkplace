var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController, ActionSheetController, MenuController, App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Camera } from '@ionic-native/camera';
import { ViewreviewsPage } from '../viewreviews/viewreviews';
/**
 * Generated class for the HometwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HometwoPage = /** @class */ (function () {
    function HometwoPage(navCtrl, navParams, http, toastCtrl, alertCtrl, app, events, menuCtrl, loadingCtrl, appsetting, camera, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.events = events;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.latlngarray = [];
        this.Parkingdetails = [];
        this.reviewarry = [];
        this.Rating = 0;
        this.totalvalue = 0;
        this.totalreviews = 0;
        this.starone = 'star-outline';
        this.startwo = 'star-outline';
        this.starthree = 'star-outline';
        this.starfour = 'star-outline';
        this.starfive = 'star-outline';
        this.menuCtrl.swipeEnable(true);
    }
    HometwoPage.prototype.ngOnInit = function () {
        this.getinfo();
    };
    HometwoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HometwoPage');
    };
    HometwoPage.prototype.viewreviews = function (udata) {
        console.log(udata);
        var userid11 = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
        var Post1 = {
            sellerid: userid11,
            parkidd: udata._id
        };
        localStorage.setItem('sellerreview', JSON.stringify(Post1));
        this.navCtrl.push(ViewreviewsPage);
    };
    HometwoPage.prototype.getinfo = function () {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        if (localStorage.getItem('UserDetailseller')) {
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
                dismissOnPageChange: true
            });
            Loading.present().then(function () {
                _this.http.post(_this.appsetting.myGlobalVar + 'users/userinfo', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                    console.log(data);
                    if (data.status == true) {
                        _this.Parkingdetails = data.data.parking_space;
                        for (var i = 0; i < data.data.parking_space.length; i++) {
                            _this.latlngarray.push(data.data.parking_space[i].location.coordinates);
                        }
                        Loading.dismiss();
                        //           Ï  console.log(this.Userdata);
                        console.log(_this.latlngarray);
                        _this.initmap();
                    }
                });
            });
        }
    };
    HometwoPage.prototype.initmap = function () {
        alert('init');
        var latLng = new google.maps.LatLng(this.latlngarray[0][1], this.latlngarray[0][0]);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            minZoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            zoomControl: true
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var infowindow = new google.maps.InfoWindow();
        console.log(this.latlngarray[0][0]);
        var marker, i;
        var markers = [];
        var temp = this;
        this.Userdata = '';
        this.totalreviews = 0;
        this.Rating = 0;
        this.totalvalue = 0;
        this.starone = 'star-outline';
        this.startwo = 'star-outline';
        this.starthree = 'star-outline';
        this.starfour = 'star-outline';
        this.starfive = 'star-outline';
        console.log(this.Parkingdetails[0]);
        this.Userdata = this.Parkingdetails[0];
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
        this.display = 1;
        for (i = 0; i < this.latlngarray.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.latlngarray[i][1], this.latlngarray[i][0]),
                icon: 'assets/imgs/marklogo.png',
                map: this.map
            });
            console.log(marker);
            markers.push(marker);
            infowindow.setContent("<div style='float:left; margin-right: 10px;'><img style='float:left' src='assets/imgs/marklogo.png'></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + temp.Parkingdetails[0].hourly_rate + '.00' + "</span>");
            infowindow.open(this.map, markers[0]);
            //   
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    temp.display = 1;
                    temp.Userdata = temp.Parkingdetails[i];
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
                    //infowindow.setContent('$'+temp.Parkingdetails[i].hourly_rate+'.00');
                    infowindow.setContent("<div style='float:left; margin-right: 10px;'><img style='float:left' src='assets/imgs/marklogo.png'></div>" + "<span style='float: left;margin-top: 6px;'>" + '$' + temp.Parkingdetails[i].hourly_rate + '.00' + "</span>");
                    infowindow.open(temp.map, markers[i]);
                    console.log(temp.Userdata);
                    //          temp.showdetails(temp.Parkingdetails[i]);
                };
            })(marker, i));
        }
    };
    HometwoPage.prototype.showdetails = function (details) {
        var temp = this;
        temp.Userdata = details;
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
        //    alert(this.display);
        console.log(temp.Userdata);
    };
    HometwoPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], HometwoPage.prototype, "mapElement", void 0);
    HometwoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-hometwo',
            templateUrl: 'hometwo.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http,
            ToastController,
            AlertController,
            App,
            Events,
            MenuController,
            LoadingController,
            Appsetting,
            Camera,
            ActionSheetController])
    ], HometwoPage);
    return HometwoPage;
}());
export { HometwoPage };
//# sourceMappingURL=hometwo.js.map