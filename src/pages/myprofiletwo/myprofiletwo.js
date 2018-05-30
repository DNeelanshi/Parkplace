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
import { EditprofiletwoPage } from '../editprofiletwo/editprofiletwo';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { FCM } from '@ionic-native/fcm';
import 'rxjs/add/operator/map';
/**
 * Generated class for the MyprofiletwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyprofiletwoPage = /** @class */ (function () {
    function MyprofiletwoPage(navCtrl, navParams, http, toastCtrl, fb, fcm, alertCtrl, menuCtrl, loadingCtrl, appsetting) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.fcm = fcm;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.profileinfo = [];
        this.dataa = {};
        this.menuCtrl.swipeEnable(true);
        this.getuserdetail();
    }
    MyprofiletwoPage.prototype.getuserdetail = function () {
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
                    _this.profileinfo = data.data;
                    _this.username = data.data.name;
                    _this.dataa.emaill = data.data.email;
                    _this.srcimage = data.data.profile_pic;
                    console.log(data.data.profile_pic);
                    Loading.dismiss();
                });
            });
        }
    };
    // isReadonly(){
    //   return this.isReadonly;
    // }
    MyprofiletwoPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    MyprofiletwoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyprofiletwoPage');
    };
    MyprofiletwoPage.prototype.edit = function () {
        this.navCtrl.push(EditprofiletwoPage);
    };
    MyprofiletwoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-myprofiletwo',
            templateUrl: 'myprofiletwo.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http,
            ToastController,
            Facebook,
            FCM,
            AlertController,
            MenuController,
            LoadingController,
            Appsetting])
    ], MyprofiletwoPage);
    return MyprofiletwoPage;
}());
export { MyprofiletwoPage };
//# sourceMappingURL=myprofiletwo.js.map