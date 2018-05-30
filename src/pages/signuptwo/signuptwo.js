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
import { SignintwoPage } from '../signintwo/signintwo';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { FCM } from '@ionic-native/fcm';
import 'rxjs/add/operator/map';
import { ListingbeforeapprovalPage } from '../listingbeforeapproval/listingbeforeapproval';
/**
 * Generated class for the SignuptwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignuptwoPage = /** @class */ (function () {
    function SignuptwoPage(navCtrl, menuCtrl, navParams, events, http, toastCtrl, fb, fcm, alertCtrl, loadingCtrl, appsetting) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        this.events = events;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.fcm = fcm;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.data = [];
        this.userData = {};
        this.ptype = 'password';
        this.iconname = 'eye';
        this.showpass = false;
        this.ptype1 = 'password';
        this.iconname1 = 'eye';
        this.showpass1 = false;
        this.menuCtrl.swipeEnable(false);
        fcm.getToken().then(function (token) {
            _this.devicetoken = token;
            //    alert(this.devicetoken);
        });
        fcm.onNotification().subscribe(function (data) {
            if (data.wasTapped) {
                console.log("Received in background");
            }
            else {
                console.log("Received in foreground");
            }
            ;
        });
    }
    SignuptwoPage.prototype.showPassword = function () {
        // alert('hjj')
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
    SignuptwoPage.prototype.showPassword1 = function () {
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
    SignuptwoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignuptwoPage');
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
    SignuptwoPage.prototype.validationphone1 = function (phnn) {
        console.log(phnn);
        console.log(phnn.length);
        if (phnn.length == 3) {
            this.data.phone = this.data.phone + '-';
        }
        else if (phnn.length == 7) {
            this.data.phone = this.data.phone + '-';
        }
    };
    SignuptwoPage.prototype.Facebooklogin = function () {
        var _this = this;
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            console.log('Logged into Facebook!', JSON.stringify(res));
            var userId = res.authResponse.userID;
            var accesstoken = res.authResponse.accessToken;
            console.log(accesstoken);
            console.log(userId);
            _this.fb.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then(function (profile) {
                _this.userData = {
                    id: profile['id'],
                    email: profile['email'],
                    first_name: profile['first_name'],
                    last_name: profile['last_name'],
                    picture: profile['picture_large']['data']['url'],
                    username: profile['name']
                };
                console.log('User profile');
                console.log(_this.userData);
                console.log('User profile stringify');
                console.log(JSON.stringify(_this.userData));
                console.log('neelanshi');
                console.log(window.navigator.onLine);
                if (window.navigator.onLine == true) {
                    var headers = new Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    var options_1 = new RequestOptions({ headers: headers });
                    var postdata = {
                        fb_id: _this.userData.id,
                        name: _this.userData.first_name + '' + _this.userData.last_name,
                        email: _this.userData.email,
                        role: 'seller',
                        regitration_type: 'facebook',
                        divice_token: _this.devicetoken,
                        profile_pic: _this.userData.picture,
                        password: _this.userData.id,
                    };
                    //                    alert(this.devicetoken);
                    console.log(postdata);
                    var Serialized = _this.serializeObj(postdata);
                    var Loading = _this.loadingCtrl.create({
                        spinner: 'bubbles',
                        cssClass: 'loader',
                        content: "Loading",
                        dismissOnPageChange: true
                    });
                    Loading.present().then(function () {
                        _this.http.post(_this.appsetting.myGlobalVar + 'users/fbregistration', Serialized, options_1).map(function (res) { return res.json(); }).subscribe(function (response) {
                            console.log(response);
                            Loading.dismiss();
                            if (response.status == true) {
                                _this.appsetting.username = response.data.name;
                                _this.appsetting.emailuser = response.data.email;
                                localStorage.setItem('UserDetail', JSON.stringify(response.data));
                                localStorage.setItem('UserDetailseller', JSON.stringify(response.data));
                                if (response.data.status == true) {
                                    //                alert('sign up se small menu');
                                    _this.appsetting.haveparking = 0;
                                    _this.events.publish('seller', 'seller');
                                    _this.navCtrl.push(ListingbeforeapprovalPage);
                                }
                            }
                            else {
                                //alert('fail facebook');
                                _this.AlertMsg(response.message);
                            }
                        });
                    });
                    //}).catch((error: any) => console.log(error));
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: 'Check your internet connection',
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.onDidDismiss(function () {
                        console.log('Dismissed toast');
                    });
                    toast.present();
                }
            });
        })
            .catch(function (e) {
            console.log('Error logging into Facebook', JSON.stringify(e));
        });
    };
    SignuptwoPage.prototype.Registration = function (register) {
        var _this = this;
        console.log(register.value);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        if (register.value.password != register.value.cpassword) {
            this.AlertMsg('Passwords must match');
        }
        else {
            if (register.value.phone) {
                register.value.phone = register.value.phone.replace(/-/g, "");
            }
            var postdata = {
                name: register.value.firstname,
                email: register.value.email,
                password: register.value.password,
                regitration_type: 'simple_registration',
                role: 'seller',
                divice_token: this.devicetoken,
                phone_number: register.value.phone
                // lat: this.lat,
                // long: this.long,
            };
            console.log(postdata);
            //    alert(this.devicetoken);
            var Serialized = this.serializeObj(postdata);
            var Loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                cssClass: 'loader',
                content: "Loading",
                dismissOnPageChange: true
            });
            Loading.present().then(function () {
                _this.http.post(_this.appsetting.myGlobalVar + 'users/registration', Serialized, options).map(function (res) { return res.json(); }).subscribe(function (response) {
                    console.log(response);
                    Loading.dismiss();
                    if (response.status == true) {
                        _this.appsetting.username = response.data.name;
                        _this.appsetting.emailuser = response.data.email;
                        localStorage.setItem('UserDetail', JSON.stringify(response.data));
                        localStorage.setItem('UserDetailseller', JSON.stringify(response.data));
                        if (localStorage.getItem('UserDetailcustomer')) {
                            localStorage.removeItem('UserDetailcustomer');
                        }
                        if (response.data.status == true) {
                            //                alert('sign up se small menu');
                            _this.appsetting.haveparking = 0;
                            _this.events.publish('seller', 'seller');
                            _this.navCtrl.push(ListingbeforeapprovalPage);
                        }
                    }
                    else {
                        _this.AlertMsg(response.message);
                    }
                });
            });
        }
    };
    SignuptwoPage.prototype.AlertMsg = function (msg) {
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
    SignuptwoPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    SignuptwoPage.prototype.signin = function () {
        this.navCtrl.push(SignintwoPage);
    };
    SignuptwoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-signuptwo',
            templateUrl: 'signuptwo.html',
        }),
        __metadata("design:paramtypes", [NavController,
            MenuController,
            NavParams,
            Events,
            Http,
            ToastController,
            Facebook,
            FCM,
            AlertController,
            LoadingController,
            Appsetting])
    ], SignuptwoPage);
    return SignuptwoPage;
}());
export { SignuptwoPage };
//# sourceMappingURL=signuptwo.js.map