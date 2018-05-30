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
import { IonicPage, NavController, MenuController, App } from 'ionic-angular';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController } from 'ionic-angular';
// import { MyApp } from '../../app/app.component';
import { GetstartedPage } from '../getstarted/getstarted';
/**
 * Generated class for the ChangepwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChangepwdPage = /** @class */ (function () {
    function ChangepwdPage(navCtrl, toastCtrl, app, http, alertCtrl, menuCtrl, loadingCtrl, appsetting) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.app = app;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.data = '';
        this.ptype = 'password';
        this.iconname = 'eye';
        this.showpass = false;
        this.ptype1 = 'password';
        this.iconname1 = 'eye';
        this.showpass1 = false;
        this.ptype2 = 'password';
        this.iconname2 = 'eye';
        this.showpass2 = false;
        this.menuCtrl.swipeEnable(true);
    }
    ChangepwdPage.prototype.changepassword = function (changepass1) {
        var _this = this;
        console.log(changepass1);
        // this.navCtrl.push('GetstartedPage');//logout from app
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        if (localStorage.getItem('UserDetail')) {
            var userd = JSON.parse(localStorage.getItem('UserDetail'));
            console.log(userd);
            console.log();
            if (changepass1.value.confirmpass == changepass1.value.newpass) {
                var postdata = {
                    email: userd.email,
                    password: changepass1.value.currentpass,
                    newpassword: changepass1.value.newpass
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
                    _this.http.post(_this.appsetting.myGlobalVar + 'users/changepassword', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                        Loading.dismiss();
                        console.log(data);
                        if (data.status == true) {
                            _this.AlertMsg('Password changed successfully.Login again!');
                            localStorage.removeItem('UserDetailseller');
                            localStorage.removeItem('UserDetailcustomer');
                            _this.app.getRootNav().setRoot(GetstartedPage);
                            _this.menuCtrl.close();
                        }
                        else {
                            _this.AlertMsg(data.message);
                        }
                    });
                });
            }
            else {
                this.AlertMsg('New password must match Confirm password');
            }
        }
    };
    ChangepwdPage.prototype.AlertMsg = function (msg) {
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
    ChangepwdPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    ChangepwdPage.prototype.showPassword = function () {
        //    alert('hjj')
        console.log('showpassword');
        this.showpass = !this.showpass;
        if (this.showpass) {
            this.ptype = 'text';
            this.iconname = 'eye-off';
        }
        else {
            this.ptype = 'password';
            this.iconname = 'eye';
        }
    };
    ChangepwdPage.prototype.showPassword1 = function () {
        console.log('showpassword');
        this.showpass1 = !this.showpass1;
        if (this.showpass1) {
            this.ptype1 = 'text';
            this.iconname1 = 'eye-off';
        }
        else {
            this.ptype1 = 'password';
            this.iconname1 = 'eye';
        }
    };
    ChangepwdPage.prototype.showPassword2 = function () {
        console.log('showpassword');
        this.showpass2 = !this.showpass2;
        if (this.showpass2) {
            this.ptype2 = 'text';
            this.iconname2 = 'eye-off';
        }
        else {
            this.ptype2 = 'password';
            this.iconname2 = 'eye';
        }
    };
    ChangepwdPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangepwdPage');
        console.log('Neelanshi');
        console.log(window.navigator.onLine);
        if (window.navigator.onLine == true) {
        }
        else {
            var toast = this.toastCtrl.create({
                message: 'Network connection failed',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
    };
    ChangepwdPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-changepwd',
            templateUrl: 'changepwd.html',
        }),
        __metadata("design:paramtypes", [NavController,
            ToastController,
            App,
            Http,
            AlertController,
            MenuController,
            LoadingController,
            Appsetting])
    ], ChangepwdPage);
    return ChangepwdPage;
}());
export { ChangepwdPage };
//# sourceMappingURL=changepwd.js.map