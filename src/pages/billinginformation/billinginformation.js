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
import { Stripe } from '@ionic-native/stripe';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as moment from 'moment';
import { ToastController, AlertController, LoadingController, ActionSheetController, MenuController, App } from 'ionic-angular';
/**
 * Generated class for the BillinginformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BillinginformationPage = /** @class */ (function () {
    function BillinginformationPage(stripe, navCtrl, navParams, http, toastCtrl, alertCtrl, app, menuCtrl, loadingCtrl, appsetting, actionSheetCtrl) {
        this.stripe = stripe;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.actionSheetCtrl = actionSheetCtrl;
        this.data = [];
        this.paymentdata = [];
        this.menuCtrl.swipeEnable(true);
        this.date = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.date);
        console.log(this.navParams.data);
        this.paymentdata = this.navParams.data;
        console.log(this.paymentdata);
    }
    BillinginformationPage.prototype.ngOnInit = function () {
    };
    BillinginformationPage.prototype.Billing = function (databil) {
        var _this = this;
        console.log(databil.value);
        var str = databil.value.dateyear.split('-');
        var month = str[1];
        var year = str[0];
        console.log(month, year);
        this.stripe.setPublishableKey('pk_test_cMvSt7FAbbUxSm5z0QvX4cWC');
        var card = {
            number: databil.value.cardnumber,
            expMonth: month,
            expYear: year,
            cvc: databil.value.cvc,
            name: databil.value.firstname,
            address_line1: databil.value.address,
            address_city: databil.value.city,
            address_state: databil.value.state,
            address_country: databil.value.country,
            postal_code: databil.value.zipcode
        };
        this.stripe.createCardToken(card)
            .then(function (token) {
            console.log(token.id);
            if (token.id) {
                _this.payment(token.id);
            }
        }, function (err) {
            _this.AlertMsg(err);
        })
            .catch(function (error) {
            console.error(error);
            console.log(error);
            _this.AlertMsg(error);
        });
    };
    BillinginformationPage.prototype.payment = function (token) {
        var _this = this;
        console.log(this.paymentdata);
        console.log(token);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var postdata = {
            total_amount: this.paymentdata.total_amount,
            payment_to: this.paymentdata.payment_to,
            token: token,
            parking_id: this.paymentdata.parking_id,
            payment_from: this.paymentdata.payment_from,
            parking_date: this.paymentdata.parking_date,
            parking_day: this.paymentdata.parking_day,
            parking_start_time: this.paymentdata.parking_start_time,
            parking_end_time: this.paymentdata.parking_end_time,
            rate_per_hour: this.paymentdata.rate_per_hour,
            car_id: this.paymentdata.car_id,
            address: this.paymentdata.address,
            spacenumber: this.paymentdata.spacenumber
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
            _this.http.post(_this.appsetting.myGlobalVar + 'payments/StripePayment', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                console.log(data);
                Loading.dismiss();
                if (data.status == true) {
                    localStorage.setItem('paymentdetails', JSON.stringify(data));
                    console.log('success');
                    var alert_1 = _this.alertCtrl.create({
                        title: '<p><img src="assets/imgs/checkmark.gif"></p>',
                        subTitle: 'Payment Successful',
                        buttons: [{
                                text: 'Done',
                                handler: function (data) {
                                    console.log('Done clicked');
                                    _this.navCtrl.push(HomePage);
                                }
                            }],
                        cssClass: 'alertCustomCss',
                    });
                    alert_1.present();
                }
                else {
                    _this.AlertMsg(data.message);
                    console.log(data.message);
                    Loading.dismiss();
                }
            }, function (err) {
                _this.AlertMsg(err);
                console.log(err);
                Loading.dismiss();
            });
        });
    };
    BillinginformationPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    BillinginformationPage.prototype.AlertMsg = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Park  Place',
            message: msg,
            buttons: [
                {
                    text: 'OK',
                    role: 'ok',
                    handler: function () {
                        console.log('OK clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    BillinginformationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BillinginformationPage');
    };
    BillinginformationPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-billinginformation',
            templateUrl: 'billinginformation.html',
        }),
        __metadata("design:paramtypes", [Stripe, NavController, NavParams,
            Http,
            ToastController,
            AlertController,
            App,
            MenuController,
            LoadingController,
            Appsetting,
            ActionSheetController])
    ], BillinginformationPage);
    return BillinginformationPage;
}());
export { BillinginformationPage };
//# sourceMappingURL=billinginformation.js.map