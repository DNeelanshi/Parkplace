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
/**
 * Generated class for the HistoricalreservationtwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HistoricalreservationtwoPage = /** @class */ (function () {
    function HistoricalreservationtwoPage(navCtrl, navParams, http, toastCtrl, alertCtrl, loadingCtrl, appsetting) {
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
        this.Reservationdata = [];
    }
    HistoricalreservationtwoPage.prototype.ngOnInit = function () {
        this.getreservations(1);
    };
    HistoricalreservationtwoPage.prototype.getreservations = function (pagenumber) {
        var _this = this;
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
            if (localStorage.getItem('UserDetailseller')) {
                var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
                console.log(userid);
                var postdata = {
                    user_id: userid,
                    role: 'seller',
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
                            value.reservation_data.forEach(function (value2, key1) {
                                console.log('yess');
                                value.customername = value2.name;
                                if (value2.profile_pic) {
                                    value.propic = value2.profile_pic;
                                }
                            });
                        });
                        var temp = _this;
                        _this.Reservationdata1.forEach(function (value, key) {
                            temp.Reservationdata.push(value);
                        });
                        console.log(temp.Reservationdata);
                    }
                    else {
                        _this.show = 0;
                    }
                    Loading.dismiss();
                });
            }
        });
    };
    HistoricalreservationtwoPage.prototype.doRefresh = function (refresher) {
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
    HistoricalreservationtwoPage.prototype.doInfinite = function (event) {
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
    HistoricalreservationtwoPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    HistoricalreservationtwoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HISTORICALSELLER');
    };
    HistoricalreservationtwoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-historicalreservationtwo',
            templateUrl: 'historicalreservationtwo.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http,
            ToastController,
            AlertController,
            LoadingController,
            Appsetting])
    ], HistoricalreservationtwoPage);
    return HistoricalreservationtwoPage;
}());
export { HistoricalreservationtwoPage };
//# sourceMappingURL=historicalreservationtwo.js.map