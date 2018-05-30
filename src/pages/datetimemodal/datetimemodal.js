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
import { ToastController, AlertController, LoadingController, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the DatetimemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DatetimemodalPage = /** @class */ (function () {
    function DatetimemodalPage(navCtrl, navParams, viewctrl, toastCtrl, http, alertCtrl, appsetting, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewctrl = viewctrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.appsetting = appsetting;
        this.loadingCtrl = loadingCtrl;
        this.datetime = [];
        this.data = [];
        this.flag = 0;
        this.comparison = false;
        var temp = this;
        this.datetime = JSON.parse(localStorage.getItem('Parkdetail'));
        console.log(this.datetime);
        this.parkid = this.datetime._id;
        this.date = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.date);
        this.time = moment(new Date()).format('HH:mm').toString();
        console.log(this.date);
    }
    DatetimemodalPage.prototype.changestime = function () {
        console.log(this.data.start);
        var btime = this.data.start.split(":");
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
    DatetimemodalPage.prototype.changes = function () {
        var tem = this;
        var flag1 = 0;
        var a = [];
        a = moment(this.data.datee).format('LLLL');
        console.log(a);
        a = a.split(',');
        this.datetime.opening_days_and_timings.forEach(function (value, key) {
            if (value.day == a[0]) {
                tem.data.day = a[0];
                console.log(a[0], value.day);
                tem.flag = 1;
            }
        });
        if (this.flag == 1) {
        }
        else {
            this.AlertMsg1('Sorry no service available on this date. Please choose other');
        }
    };
    DatetimemodalPage.prototype.dismiss1 = function () {
        this.viewctrl.dismiss();
    };
    DatetimemodalPage.prototype.dismiss = function () {
        var temp = this;
        if (this.data.day && this.data.datee && this.data.start && this.data.end) {
            this.datetime.opening_days_and_timings.forEach(function (value, key) {
                if (value.day == temp.data.day) {
                    if ((value.opening_time > temp.data.start) || (value.closing_time < temp.data.end)) {
                        temp.AlertMsg1('Sorry no service available at this time. Select some other');
                    }
                    else if ((value.opening_time > temp.data.start) && (value.closing_time < temp.data.end)) {
                        temp.AlertMsg1('Sorry no service available at this time. Select some other');
                    }
                    else {
                        var a = temp.data.start.split(':');
                        var b = temp.data.end.split(':');
                        console.log(b[0], a[0], b[1], a[1]);
                        if (b[0] > a[0]) {
                            console.log(parseInt(b[1]) + 30);
                            console.log((moment(temp.date).isSame(moment(temp.data.datee))));
                            console.log(temp.comparison);
                            console.log(temp.flag);
                            if ((moment(temp.date).isSame(moment(temp.data.datee)) == true) && (temp.comparison == true)) {
                                temp.AlertMsg1('Time must be greater than current');
                            }
                            else {
                                if (temp.flag == 1) {
                                    temp.finalcheck(temp.data.day, temp.data.start, temp.data.end, temp.data.datee);
                                }
                                else {
                                    temp.AlertMsg1('Sorry no service available on this date. Please choose other');
                                }
                            }
                        }
                        else if (b[0] == a[0]) {
                            console.log(parseInt(b[1]) + 30);
                            console.log((moment(temp.date).isSame(moment(temp.data.datee))));
                            console.log(temp.comparison);
                            console.log(temp.flag);
                            if ((a[1] == b[1]) || (parseInt(b[1]) - parseInt(a[1]) < 30)) {
                                temp.AlertMsg1('Minimum parking should be 30 minutes');
                            }
                            else if ((moment(temp.date).isSame(moment(temp.data.datee)) == true) && (temp.comparison == true)) {
                                temp.AlertMsg1('Time must be greater than current');
                            }
                            else {
                                if (temp.flag == 1) {
                                    temp.finalcheck(temp.data.day, temp.data.start, temp.data.end, temp.data.datee);
                                }
                                else {
                                    temp.AlertMsg1('Sorry no service available on this date. Please choose other');
                                }
                            }
                        }
                        else {
                            temp.AlertMsg1('Closing time must be greater than opening time!');
                        }
                    }
                }
            });
        }
        else {
            this.AlertMsg1('Are you sure you selected day,opening and closing time?');
        }
    };
    DatetimemodalPage.prototype.finalcheck = function (fday, fstart, fend, fdate) {
        var _this = this;
        console.log(fdate, fday, fstart, fend);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var postdata = {
            parking_id: this.parkid,
            booking_date: fdate,
            booking_day: fday,
            booking_start_time: fstart,
            booking_end_time: fend
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
            _this.http.post(_this.appsetting.myGlobalVar + 'payments/CheckAvalibillity', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                console.log(data);
                Loading.dismiss();
                if (data.status == true) {
                    _this.viewctrl.dismiss({
                        day: fday,
                        starttime: fstart,
                        endtime: fend,
                        datte: fdate
                    });
                }
                else {
                    _this.AlertMsg1(data.message);
                }
            });
        });
    };
    DatetimemodalPage.prototype.AlertMsg1 = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    DatetimemodalPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    DatetimemodalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DatetimemodalPage');
    };
    DatetimemodalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-datetimemodal',
            templateUrl: 'datetimemodal.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController,
            ToastController, Http,
            AlertController,
            Appsetting,
            LoadingController])
    ], DatetimemodalPage);
    return DatetimemodalPage;
}());
export { DatetimemodalPage };
//# sourceMappingURL=datetimemodal.js.map