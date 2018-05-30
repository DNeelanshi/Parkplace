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
import { SignuptwoPage } from '../signuptwo/signuptwo';
import { HometwoPage } from '../hometwo/hometwo';
import { ForgotpwdPage } from '../forgotpwd/forgotpwd';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { ListingbeforeapprovalPage } from '../listingbeforeapproval/listingbeforeapproval';
import { ListparkingspacePage } from '../listparkingspace/listparkingspace';
import { GetstartedPage } from '../getstarted/getstarted';
import { FCM } from '@ionic-native/fcm';
/**
 * Generated class for the SignintwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignintwoPage = /** @class */ (function () {
    function SignintwoPage(navCtrl, menuCtrl, navParams, events, http, toastCtrl, fb, fcm, appsetting, alertCtrl, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        this.events = events;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.fcm = fcm;
        this.appsetting = appsetting;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.data = '';
        this.userData = {};
        this.ptype = 'password';
        this.iconname = 'eye';
        this.showpass = false;
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
    SignintwoPage.prototype.getstarted = function () {
        this.navCtrl.push(GetstartedPage);
    };
    SignintwoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignintwoPage');
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
    SignintwoPage.prototype.Login = function (logindata) {
        var _this = this;
        var check;
        var Userdata = [];
        console.log(logindata.value);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var postdata = {
            email: logindata.value.email,
            password: logindata.value.password,
            role: 'seller',
            divice_token: this.devicetoken
        };
        //      alert(this.devicetoken);
        console.log(postdata);
        var Serialized = this.serializeObj(postdata);
        var Loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
            dismissOnPageChange: true
        });
        Loading.present().then(function () {
            _this.http.post(_this.appsetting.myGlobalVar + 'users/loginuser', Serialized, options).map(function (res) { return res.json(); }).subscribe(function (response) {
                console.log(response);
                Loading.dismiss();
                if (response.status == true) {
                    localStorage.setItem('UserDetail', JSON.stringify(response.userinfo));
                    localStorage.setItem('UserDetailseller', JSON.stringify(response.userinfo));
                    if (localStorage.getItem('UserDetailcustomer')) {
                        localStorage.removeItem('UserDetailcustomer');
                    }
                    Userdata = response.userinfo;
                    _this.appsetting.username = response.userinfo.name;
                    _this.appsetting.emailuser = response.userinfo.email;
                    if (response.userinfo.profile_pic) {
                        _this.appsetting.SrcImage = response.userinfo.profile_pic;
                    }
                    if (localStorage.getItem('Done')) {
                        check = true;
                        _this.appsetting.haveparking = 1;
                    }
                    else {
                        if (response.userinfo.parking_space.length > 0) {
                            check = response.userinfo.parking_space[0].status;
                            console.log(check);
                        }
                    }
                    if (check == true) {
                        _this.appsetting.haveparking = 1;
                        console.log(_this.appsetting.haveparking);
                        //      alert('Second large menu');
                        _this.events.publish('seller', 'seller');
                        if (Userdata.first_add == false) {
                            //    alert('here')
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
                else {
                    _this.AlertMsg(response.message);
                }
            });
        });
    };
    SignintwoPage.prototype.showPassword = function () {
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
    SignintwoPage.prototype.AlertMsg = function (msg) {
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
    SignintwoPage.prototype.signup = function () {
        this.navCtrl.push(SignuptwoPage);
    };
    SignintwoPage.prototype.Facebooklogin = function () {
        var _this = this;
        var check;
        var Userdata = [];
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
                    //                alert(this.devicetoken);
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
                                localStorage.setItem('UserDetail', JSON.stringify(response.data));
                                localStorage.setItem('UserDetailseller', JSON.stringify(response.data));
                                if (localStorage.getItem('UserDetailcustomer')) {
                                    localStorage.removeItem('UserDetailcustomer');
                                }
                                _this.appsetting.username = response.data.name;
                                _this.appsetting.emailuser = response.data.email;
                                // this.appsetting.SrcImage = response.userinfo.profile_pic;s
                                Userdata = response.data;
                                if (localStorage.getItem('Done')) {
                                    check = true;
                                    _this.appsetting.haveparking = 1;
                                }
                                else {
                                    if (response.data.parking_space.length > 0) {
                                        check = response.data.parking_space[0].status;
                                        console.log(check);
                                    }
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
    SignintwoPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    // home() {
    //     this.events.publish('seller', 'seller');
    //     this.navCtrl.push(HometwoPage);
    // }
    // facebooklogin(){
    //   this.fb.login(['public_profile', 'user_friends', 'email'])
    //   .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res =>{
    //     console.log(res);
    //   }))
    //   .catch(e => console.log('Error logging into Facebook', e));
    //   // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    // }
    SignintwoPage.prototype.forgot = function () {
        this.navCtrl.push(ForgotpwdPage);
    };
    SignintwoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-signintwo',
            templateUrl: 'signintwo.html',
        }),
        __metadata("design:paramtypes", [NavController,
            MenuController,
            NavParams,
            Events,
            Http,
            ToastController,
            Facebook,
            FCM,
            Appsetting,
            AlertController,
            LoadingController])
    ], SignintwoPage);
    return SignintwoPage;
}());
export { SignintwoPage };
//# sourceMappingURL=signintwo.js.map