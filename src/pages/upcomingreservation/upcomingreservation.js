var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController, MenuController, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { RatingmodelPage } from '../ratingmodel/ratingmodel';
import * as moment from 'moment';
/**
 * Generated class for the UpcomingreservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UpcomingreservationPage = /** @class */ (function () {
    function UpcomingreservationPage(navCtrl, navParams, http, toastCtrl, alertCtrl, menuCtrl, modalCtrl, loadingCtrl, appsetting) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.Reservationdata = [];
        this.Reservationdata1 = [];
        this.Pagetotal = 1;
        this.pagon = 1;
        this.pagein = 1;
        this.exists = 0;
        this.menuCtrl.swipeEnable(true);
        this.getreservations(1);
        this.Reservationdata = [];
    }
    UpcomingreservationPage_1 = UpcomingreservationPage;
    UpcomingreservationPage.prototype.getreservations = function (pagenumber) {
        var _this = this;
        //    alert('hjgj');
        var Loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
            dismissOnPageChange: true
        });
        Loading.present().then(function () {
            var imagearray = [];
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            var options = new RequestOptions({ headers: headers });
            if (localStorage.getItem('UserDetailcustomer')) {
                var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
                console.log(userid);
                var postdata = {
                    user_id: userid,
                    role: 'customer',
                    page: pagenumber,
                    checkin_status: 0
                };
                var serialized = _this.serializeObj(postdata);
                console.log(postdata);
                _this.http.post(_this.appsetting.myGlobalVar + 'payments/GetReservation', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                    console.log(data);
                    if (data.status == true) {
                        _this.Reservationdata1 = [];
                        _this.Pagetotal = data.Toatalpage;
                        _this.pagein = data.page;
                        _this.Reservationdata1 = data.data;
                        _this.show = 1;
                        var temp = _this;
                        _this.Reservationdata1.forEach(function (value, key) {
                            value.reservation_data.forEach(function (value1, key1) {
                                value1.parking_space.forEach(function (value2, key2) {
                                    value.parking_start_time = moment(value.parking_start_time, "h:mm: A").format("hh:mm A");
                                    value.parking_end_time = moment(value.parking_end_time, "h:mm: A").format("hh:mm A");
                                    if (value.parking_id == value2._id) {
                                        imagearray = [];
                                        for (var i = 0; i < value2.parking_images.length; i++) {
                                            imagearray.push(value2.parking_images[i].parking_image);
                                        }
                                        value.imagespark = imagearray;
                                        value.parkingname = value2.parking_name;
                                        value.spacenumber = value2.space_number;
                                        value.restriction = value2.restriction;
                                        value.parksize = value2.parking_size;
                                        value.sellername = value1.name;
                                        value.phonenumber = value1.phone_number;
                                        value.parkingaddress = value2.street_address + ',' + value2.city + ',' + value2.state + ',' + value2.zip_code;
                                    }
                                });
                            });
                        });
                        var temp = _this;
                        _this.Reservationdata1.forEach(function (value, key) {
                            temp.Reservationdata.push(value);
                        });
                        //      this.Reservationdata = this.Reservationdata1;
                        console.log(_this.Reservationdata);
                    }
                    else {
                        _this.show = 0;
                    }
                    Loading.dismiss();
                    console.log('khtm');
                });
            }
        });
    };
    UpcomingreservationPage.prototype.changestatus = function (datta) {
        var _this = this;
        this.exists = 0;
        var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
        var temp = this;
        console.log(datta);
        datta.reservation_data.forEach(function (value1, key1) {
            value1.parking_space.forEach(function (value2, key2) {
                value2.review_and_rating.forEach(function (value3, key3) {
                    if (value3.user_id == userid) {
                        temp.exists = 1;
                        return false;
                    }
                });
            });
        });
        console.log(this.exists);
        if (this.exists == 0) {
            var rateModal = this.modalCtrl.create(RatingmodelPage, { parkid: datta.parking_id });
            rateModal.onDidDismiss(function (data1) {
                var headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                var options = new RequestOptions({ headers: headers });
                var postdata = {
                    parking_id: datta._id,
                    checkin_status: 2
                };
                var serialized = _this.serializeObj(postdata);
                console.log(postdata);
                var Loading = _this.loadingCtrl.create({
                    spinner: 'bubbles',
                    cssClass: 'loader',
                    content: "Loading",
                    dismissOnPageChange: true
                });
                Loading.present().then(function () {
                    _this.http.post(_this.appsetting.myGlobalVar + 'payments/ChangeCheckin', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                        console.log(data);
                        Loading.dismiss();
                        if (data.status == true) {
                            _this.navCtrl.push(UpcomingreservationPage_1);
                        }
                    });
                });
            });
            rateModal.present();
        }
        else {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            var options_1 = new RequestOptions({ headers: headers });
            var postdata = {
                parking_id: datta._id,
                checkin_status: 2
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
                _this.http.post(_this.appsetting.myGlobalVar + 'payments/ChangeCheckin', serialized, options_1).map(function (res) { return res.json(); }).subscribe(function (data) {
                    console.log(data);
                    Loading.dismiss();
                    if (data.status == true) {
                        _this.navCtrl.push(UpcomingreservationPage_1);
                    }
                });
            });
        }
        //          this.getreservations(1);
        //
    };
    UpcomingreservationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UpcomingreservationPage');
    };
    UpcomingreservationPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    UpcomingreservationPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            //            this.firsthit();
            _this.getreservations(1);
            _this.Reservationdata = [];
            //             this.get();
            console.log('Async operation has ended');
            refresher.complete();
        }, 3000);
    };
    UpcomingreservationPage.prototype.doInfinite = function (event) {
        console.log(event);
        console.log(this.Pagetotal);
        console.log(this.pagon);
        console.log(this.pagein);
        this.infiniteScroll = event;
        if (this.pagon < this.Pagetotal) {
            console.log(this.Pagetotal);
            this.pagon++;
            console.log(this.pagon);
            this.getreservations(this.pagon);
        }
        else if (this.Pagetotal == this.pagein) {
            event.complete();
        }
        else {
            event.complete();
        }
    };
    UpcomingreservationPage.prototype.detail = function (reservation) {
        console.log(reservation);
        this.navCtrl.push(DetailPage, reservation);
    };
    UpcomingreservationPage = UpcomingreservationPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-upcomingreservation',
            templateUrl: 'upcomingreservation.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http,
            ToastController,
            AlertController,
            MenuController,
            ModalController,
            LoadingController,
            Appsetting])
    ], UpcomingreservationPage);
    return UpcomingreservationPage;
    var UpcomingreservationPage_1;
}());
export { UpcomingreservationPage };
//# sourceMappingURL=upcomingreservation.js.map