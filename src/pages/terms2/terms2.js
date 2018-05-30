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
import { ToastController, AlertController, LoadingController, MenuController } from 'ionic-angular';
/**
 * Generated class for the Terms2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Terms2Page = /** @class */ (function () {
    function Terms2Page(navCtrl, navParams, http, toastCtrl, alertCtrl, menuCtrl, loadingCtrl, appsetting) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.menuCtrl.swipeEnable(true);
        this.getterms();
    }
    Terms2Page.prototype.getterms = function () {
        var _this = this;
        //    alert('hjgj');
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var postdata = {
            pagename: 'Terms & Condition'
        };
        // alert('hjgj');
        var serialized = this.serializeObj(postdata);
        console.log(postdata);
        var Loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
            dismissOnPageChange: true
        });
        Loading.present().then(function () {
            _this.http.post(_this.appsetting.myGlobalVar + 'static/getstaticpagedata', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                Loading.dismiss();
                console.log(data);
                _this.termdata = data.data[0].pagedata;
            });
        });
    };
    Terms2Page.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    Terms2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Terms2Page');
    };
    Terms2Page = __decorate([
        IonicPage(),
        Component({
            selector: 'page-terms2',
            templateUrl: 'terms2.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Http,
            ToastController,
            AlertController,
            MenuController,
            LoadingController,
            Appsetting])
    ], Terms2Page);
    return Terms2Page;
}());
export { Terms2Page };
//# sourceMappingURL=terms2.js.map