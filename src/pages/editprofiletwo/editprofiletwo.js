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
import { ChangepwdPage } from '../changepwd/changepwd';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController, ActionSheetController, MenuController, Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { MyprofiletwoPage } from '../myprofiletwo/myprofiletwo';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the EditprofiletwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditprofiletwoPage = /** @class */ (function () {
    function EditprofiletwoPage(navCtrl, navParams, http, toastCtrl, alertCtrl, menuCtrl, loadingCtrl, appsetting, camera, events, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.camera = camera;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.data = [];
        this.profileinfo = [];
        this.menuCtrl.swipeEnable(true);
        this.getuserdetail();
    }
    EditprofiletwoPage.prototype.getpicture = function () {
        var _this = this;
        var actionsheet = this.actionSheetCtrl.create({
            title: "Choose Album",
            buttons: [{
                    text: 'Camera',
                    handler: function () {
                        var options = {
                            quality: 8,
                            sourceType: 1,
                            correctOrientation: true,
                            allowEdit: true,
                            targetWidth: 550,
                            targetHeight: 550,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE
                        };
                        _this.camera.getPicture(options).then(function (imageUri) {
                            _this.srcImage = 'data:image/jpeg;base64,' + imageUri;
                            var headers = new Headers();
                            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                            var options = new RequestOptions({ headers: headers });
                            var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
                            var postdata = {
                                user_id: userid,
                                profile_picture: _this.srcImage
                            };
                            console.log(postdata);
                            var serialized = _this.serializeObj(postdata);
                            var Loading = _this.loadingCtrl.create({
                                spinner: 'bubbles',
                                cssClass: 'loader',
                                content: "Loading",
                                dismissOnPageChange: true
                            });
                            Loading.present().then(function () {
                                _this.http.post(_this.appsetting.myGlobalVar + 'users/user_profile_pic', postdata).map(function (res) { return res.json(); }).subscribe(function (data) {
                                    Loading.dismiss();
                                    // alert(JSON.stringify(data));
                                    console.log(data);
                                    //              alert("saving image")
                                }, function (err) {
                                    alert(JSON.stringify(err));
                                });
                            });
                        }, function (err) {
                            alert(JSON.stringify(err));
                            // this.loading.dismiss();
                            console.log(err);
                        });
                    }
                },
                {
                    text: 'Gallery',
                    handler: function () {
                        console.log("Gallery Clicked");
                        //	alert("get Picture")
                        // this.loading.present();
                        var options = {
                            quality: 10,
                            sourceType: 0,
                            correctOrientation: true,
                            allowEdit: true,
                            targetWidth: 550,
                            targetHeight: 550,
                            destinationType: _this.camera.DestinationType.DATA_URL,
                            encodingType: _this.camera.EncodingType.JPEG,
                            mediaType: _this.camera.MediaType.PICTURE
                        };
                        _this.camera.getPicture(options).then(function (imageData) {
                            _this.srcImage = 'data:image/jpeg;base64,' + imageData;
                            var headers = new Headers();
                            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                            var options = new RequestOptions({ headers: headers });
                            var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
                            var postdata = {
                                user_id: userid,
                                profile_picture: _this.srcImage
                            };
                            //            alert(postdata)
                            var serialized = _this.serializeObj(postdata);
                            var Loading = _this.loadingCtrl.create({
                                spinner: 'bubbles',
                                cssClass: 'loader',
                                content: "Loading",
                                dismissOnPageChange: true
                            });
                            Loading.present().then(function () {
                                _this.http.post(_this.appsetting.myGlobalVar + 'users/user_profile_pic', postdata).map(function (res) { return res.json(); }).subscribe(function (data) {
                                    Loading.dismiss();
                                    console.log(data);
                                    //              alert("saving image")
                                }, function (err) {
                                    console.log(JSON.stringify(err));
                                    alert(JSON.stringify(err));
                                });
                            });
                            //            alert('gallery working');
                        }, function (err) {
                            // this.loading.dismiss();
                            alert(JSON.stringify(err));
                            // Handle error
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                        actionsheet.dismiss();
                    }
                }]
        });
        actionsheet.present();
    };
    EditprofiletwoPage.prototype.getuserdetail = function () {
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
                    _this.profileinfo = data.data;
                    _this.userid = _this.profileinfo._id;
                    _this.data.fullname = _this.profileinfo.name;
                    _this.data.email = _this.profileinfo.email;
                    if (_this.profileinfo.phone_number) {
                        console.log(_this.profileinfo.phone_number.length);
                        var str = _this.profileinfo.phone_number;
                        var res = str.substring(0, 3);
                        var res1 = str.substring(3, 6);
                        var res2 = str.substring(6, 10);
                        console.log(res + '-' + res1 + '-' + res2);
                        // var res2 = str.substring(12,9);
                        _this.data.phone = res + '-' + res1 + '-' + res2;
                    }
                    //      this.data.phone = this.profileinfo.phone_number;
                    _this.srcImage = data.data.profile_pic;
                    console.log(data.data.profile_pic);
                });
            });
        }
    };
    EditprofiletwoPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    EditprofiletwoPage.prototype.phonevalidation4 = function (phn) {
        if (phn.length == 3) {
            this.data.phone = this.data.phone + '-';
        }
        else if (phn.length == 7) {
            this.data.phone = this.data.phone + '-';
        }
    };
    EditprofiletwoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditprofiletwoPage');
    };
    EditprofiletwoPage.prototype.edit = function (editprofile) {
        var _this = this;
        console.log(editprofile.value);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        if (editprofile.value.phone) {
            editprofile.value.phone = editprofile.value.phone.replace(/-/g, "");
        }
        var postdata = {
            user_id: this.userid,
            name: editprofile.value.fullname,
            phone_number: editprofile.value.phone
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
            _this.http.post(_this.appsetting.myGlobalVar + 'users/profileupdate', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                Loading.dismiss();
                console.log(data);
                if (data.status == true) {
                    _this.AlertMsg('Profile updated successfully');
                    localStorage.setItem('UserDetailseller', JSON.stringify(data.data));
                    console.log(data.data);
                    _this.profileinfo = data.data;
                    _this.events.publish('seller', 'seller');
                    // this.navCtrl.pop();
                }
            });
        });
    };
    EditprofiletwoPage.prototype.isReadonl = function () {
        return this.isReadonl; //return true/false
    };
    EditprofiletwoPage.prototype.change = function () {
        if (this.profileinfo.regitration_type == 'facebook') {
            this.AlertMsg('You cannot change password as you logged in from facebook');
        }
        else {
            this.navCtrl.push(ChangepwdPage);
            localStorage.setItem('UserDetail', JSON.stringify(this.profileinfo));
        }
    };
    EditprofiletwoPage.prototype.AlertMsg = function (msg) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Park  Place',
            message: msg,
            buttons: [
                {
                    text: 'OK',
                    role: 'ok',
                    handler: function () {
                        console.log('OK clicked');
                        _this.navCtrl.push(MyprofiletwoPage);
                    }
                }
            ]
        });
        alert.present();
    };
    EditprofiletwoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-editprofiletwo',
            templateUrl: 'editprofiletwo.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http,
            ToastController,
            AlertController,
            MenuController,
            LoadingController,
            Appsetting,
            Camera,
            Events,
            ActionSheetController])
    ], EditprofiletwoPage);
    return EditprofiletwoPage;
}());
export { EditprofiletwoPage };
//# sourceMappingURL=editprofiletwo.js.map