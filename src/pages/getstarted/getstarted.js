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
import { SigninPage } from '../signin/signin';
import { SignintwoPage } from '../signintwo/signintwo';
import { HometwoPage } from '../hometwo/hometwo';
import { HomePage } from '../home/home';
import { ListingbeforeapprovalPage } from '../listingbeforeapproval/listingbeforeapproval';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController, LoadingController, MenuController } from 'ionic-angular';
import { ListparkingspacePage } from '../listparkingspace/listparkingspace';
/**
 * Generated class for the GetstartedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GetstartedPage = /** @class */ (function () {
    function GetstartedPage(navCtrl, navParams, events, appsetting, http, alertCtrl, menuCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.appsetting = appsetting;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl.swipeEnable(false);
    }
    GetstartedPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GetstartedPage');
    };
    GetstartedPage.prototype.customer = function () {
        var _this = this;
        if (localStorage.getItem('UserDetailcustomer')) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            var options_1 = new RequestOptions({ headers: headers });
            var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
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
                _this.http.post(_this.appsetting.myGlobalVar + 'users/userinfo', serialized, options_1).map(function (res) { return res.json(); }).subscribe(function (data) {
                    Loading.dismiss();
                    if (data.status == true) {
                        if (localStorage.getItem('UserDetailseller')) {
                            localStorage.removeItem('UserDetailseller');
                            localStorage.removeItem('Done');
                        }
                        console.log(data.data);
                        _this.appsetting.username = data.data.name;
                        _this.appsetting.emailuser = data.data.email;
                        _this.appsetting.SrcImage = data.data.profile_pic;
                    }
                });
            });
            //      alert('customer menu');
            this.navCtrl.push(HomePage);
            this.events.publish('customer', 'customer');
        }
        else {
            this.navCtrl.push(SigninPage);
            //  alert('SIGNIN CUSTOMER FROM GETSTART')
        }
    };
    GetstartedPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    GetstartedPage.prototype.seller = function () {
        var _this = this;
        var check;
        var Userdata = [];
        if (localStorage.getItem('UserDetailseller')) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            var options_2 = new RequestOptions({ headers: headers });
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
                _this.http.post(_this.appsetting.myGlobalVar + 'users/userinfo', serialized, options_2).map(function (res) { return res.json(); }).subscribe(function (data) {
                    if (data.status == true) {
                        if (localStorage.getItem('UserDetailcustomer')) {
                            localStorage.removeItem('UserDetailcustomer');
                        }
                        console.log(data.data);
                        Userdata = data.data;
                        if (localStorage.getItem('Done')) {
                            check = true;
                            _this.appsetting.haveparking = 1;
                            console.log(check);
                        }
                        else {
                            //      alert('here')
                            if (Userdata.parking_space.length > 0) {
                                check = Userdata.parking_space[0].status;
                                console.log(check);
                            }
                        }
                        Loading.dismiss();
                        _this.appsetting.username = data.data.name;
                        _this.appsetting.emailuser = data.data.email;
                        if (data.data.profile_pic) {
                            _this.appsetting.SrcImage = data.data.profile_pic;
                        }
                        if (check == true) {
                            _this.appsetting.haveparking = 1;
                            console.log(_this.appsetting.haveparking);
                            //      alert('Second large menu');
                            _this.events.publish('seller', 'seller');
                            if (Userdata.first_add == false) {
                                _this.navCtrl.push(ListparkingspacePage);
                            }
                            else {
                                _this.navCtrl.push(HometwoPage);
                            }
                        }
                        else {
                            _this.appsetting.haveparking = 0;
                            console.log(_this.appsetting.haveparking);
                            _this.events.publish('seller', 'seller');
                            //      alert('Second small menu');
                            _this.navCtrl.push(ListingbeforeapprovalPage);
                        }
                    }
                });
            });
        }
        else {
            this.navCtrl.push(SignintwoPage);
        }
    };
    GetstartedPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-getstarted',
            templateUrl: 'getstarted.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Events, Appsetting, Http,
            AlertController,
            MenuController,
            LoadingController])
    ], GetstartedPage);
    return GetstartedPage;
}());
export { GetstartedPage };
//# sourceMappingURL=getstarted.js.map