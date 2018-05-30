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
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { ListparkingspacePage } from '../../pages/listparkingspace/listparkingspace';
/**
 * Generated class for the CheckstatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CheckstatusPage = /** @class */ (function () {
    function CheckstatusPage(navCtrl, navParams, http, toastCtrl, fb, events, appsetting, alertCtrl, menuCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.events = events;
        this.appsetting = appsetting;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.blurri = 0;
        this.datauser = [];
        this.menuCtrl.swipeEnable(true);
        this.checkstatus();
    }
    CheckstatusPage.prototype.checkstatus = function () {
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
                    Loading.dismiss();
                    console.log(data);
                    if (data.status == true) {
                        console.log(data.data.parking_space.length);
                        _this.datauser = data.data;
                        if (data.data.parking_space.length == 0) {
                            _this.blurri = 1;
                        }
                        else {
                            if (data.data.parking_space[0].status == true) {
                                console.log('false');
                                _this.blurr = false;
                            }
                            else {
                                _this.blurr = true;
                                console.log('true');
                            }
                        }
                    }
                });
            });
        }
    };
    CheckstatusPage.prototype.newmenu = function () {
        if (this.datauser.parking_space.length > 0) {
            this.appsetting.haveparking = 1;
            //    alert(' large menu');
            this.events.publish('seller', 'seller');
            localStorage.setItem('Done', 'true');
            this.appsetting.haveparking = 1;
            this.navCtrl.push(ListparkingspacePage);
        }
        else {
            this.blurr = true;
        }
    };
    CheckstatusPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    CheckstatusPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CheckstatusPage');
    };
    CheckstatusPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-checkstatus',
            templateUrl: 'checkstatus.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http,
            ToastController,
            Facebook,
            Events,
            Appsetting,
            AlertController,
            MenuController,
            LoadingController])
    ], CheckstatusPage);
    return CheckstatusPage;
}());
export { CheckstatusPage };
//# sourceMappingURL=checkstatus.js.map