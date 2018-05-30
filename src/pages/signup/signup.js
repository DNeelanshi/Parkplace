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
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { FCM } from '@ionic-native/fcm';
import 'rxjs/add/operator/map';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, menuCtrl, navParams, events, toastCtrl, fb, appsetting, fcm, http, alertCtrl, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.appsetting = appsetting;
        this.fcm = fcm;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
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
            //     alert(this.devicetoken);
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
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
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
    SignupPage.prototype.validationphone2 = function (phon) {
        console.log(phon);
        console.log(phon.length);
        if (phon.length == 3) {
            this.data.phone = this.data.phone + '-';
        }
        else if (phon.length == 7) {
            this.data.phone = this.data.phone + '-';
        }
    };
    SignupPage.prototype.showPassword = function () {
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
    SignupPage.prototype.showPassword1 = function () {
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
    SignupPage.prototype.Registration1 = function (register) {
        var _this = this;
        console.log(register.value);
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
                role: 'customer',
                divice_token: this.devicetoken,
                phone_number: register.value.phone
                // lat: this.lat,
                // long: this.long,
            };
            //alert(this.devicetoken)
            console.log(postdata);
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
                        localStorage.setItem('UserDetailcustomer', JSON.stringify(response.data));
                        if (localStorage.getItem('UserDetailseller')) {
                            localStorage.removeItem('UserDetailseller');
                            localStorage.removeItem('Done');
                        }
                        _this.events.publish('customer', 'customer');
                        _this.navCtrl.push(HomePage);
                    }
                    else {
                        _this.AlertMsg(response.message);
                    }
                });
            });
        }
    };
    SignupPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    SignupPage.prototype.Facebooklogin = function () {
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
                        role: 'customer',
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
                                localStorage.setItem('UserDetailcustomer', JSON.stringify(response.data));
                                if (localStorage.getItem('UserDetailseller')) {
                                    localStorage.removeItem('UserDetailseller');
                                    localStorage.removeItem('Done');
                                }
                                _this.events.publish('customer', 'customer');
                                _this.navCtrl.push(HomePage);
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
    SignupPage.prototype.AlertMsg = function (msg) {
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
    SignupPage.prototype.signin = function () {
        this.navCtrl.push(SigninPage);
    };
    SignupPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html',
        }),
        __metadata("design:paramtypes", [NavController,
            MenuController,
            NavParams,
            Events,
            ToastController,
            Facebook,
            Appsetting,
            FCM,
            Http,
            AlertController,
            LoadingController])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.js.map