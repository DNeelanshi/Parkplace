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
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/**
 * Generated class for the HistoricalreservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HistoricalreservationPage = /** @class */ (function () {
    function HistoricalreservationPage(navCtrl, navParams, http, toastCtrl, alertCtrl, loadingCtrl, appsetting) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.Reservationdata = [];
        this.Reservationdata1 = [];
        this.Pagetotal = 1;
        this.pagon = 1;
        this.pagein = 1;
        this.getreservations(1);
        this.Reservationdata = [];
    }
    HistoricalreservationPage.prototype.getreservations = function (pagenumber) {
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
                    checkin_status: 2
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
                        _this.Reservationdata1.forEach(function (value, key) {
                            value.reservation_data.forEach(function (value1, key1) {
                                value1.parking_space.forEach(function (value2, key2) {
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
                        //          console.log(this.Reservationdata);
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
    HistoricalreservationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad historical');
    };
    HistoricalreservationPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    HistoricalreservationPage.prototype.doRefresh = function (refresher) {
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
    HistoricalreservationPage.prototype.doInfinite = function (event) {
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
    HistoricalreservationPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-historicalreservation',
            templateUrl: 'historicalreservation.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http,
            ToastController,
            AlertController,
            LoadingController,
            Appsetting])
    ], HistoricalreservationPage);
    return HistoricalreservationPage;
}());
export { HistoricalreservationPage };
//# sourceMappingURL=historicalreservation.js.map