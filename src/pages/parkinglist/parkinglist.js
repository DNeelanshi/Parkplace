var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EditlistingPage } from '../editlisting/editlisting';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { ToastController, AlertController, LoadingController, ActionSheetController, MenuController, App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Camera } from '@ionic-native/camera';
import { GetstartedPage } from '../getstarted/getstarted';
/**
 * Generated class for the ParkinglistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ParkinglistPage = /** @class */ (function () {
    function ParkinglistPage(navCtrl, navParams, http, toastCtrl, alertCtrl, app, events, menuCtrl, loadingCtrl, appsetting, camera, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.events = events;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.Userdata = [];
        this.menuCtrl.swipeEnable(true);
        this.getinfo();
        //        alert('welcome');
    }
    ParkinglistPage.prototype.getinfo = function () {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        if (localStorage.getItem('UserDetailseller')) {
            console.log(JSON.parse(localStorage.getItem('UserDetailseller')));
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
                        _this.Userdata = data.data.parking_space;
                        if (data.data.parking_space.length == 0) {
                            //      alert('no data');
                            if (localStorage.getItem('UserDetailseller')) {
                                // console.log(localStorage.getItem('UserInfo'));
                                // console.log(localStorage.getItem('UserInfo'));
                                localStorage.removeItem('UserDetailseller');
                                localStorage.removeItem('Done');
                            }
                            _this.app.getRootNav().setRoot(GetstartedPage);
                            _this.menuCtrl.close();
                        }
                    }
                });
            });
        }
    };
    ParkinglistPage.prototype.delete = function (datadel) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Park Place',
            message: 'Are you sure<br>you want to delete?',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                        // this.navCtrl.push(RegisterPage)
                    }
                },
                {
                    text: 'YES',
                    role: 'submit',
                    handler: function () {
                        console.log(datadel);
                        var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
                        var parkid = datadel._id;
                        console.log(parkid);
                        var headers = new Headers();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                        var body = {
                            user_id: userid,
                            parking_id: parkid
                        };
                        var options = new RequestOptions({
                            body: body,
                            method: RequestMethod.Delete
                        });
                        var postdata = {};
                        console.log(postdata);
                        var serialized = _this.serializeObj(postdata);
                        _this.http.request(_this.appsetting.myGlobalVar + 'users/delete_parking', options).map(function (res) { return res.json(); }).subscribe(function (data) {
                            console.log(data);
                            if (data.status == true) {
                                _this.AlertMsg('Deleted successfully');
                                _this.getinfo();
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    ParkinglistPage.prototype.AlertMsg = function (msg) {
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
    ParkinglistPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    ParkinglistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ParkinglistPage');
    };
    ParkinglistPage.prototype.edit = function (dataa) {
        localStorage.setItem('Editlisting', JSON.stringify(dataa));
        this.navCtrl.push(EditlistingPage);
    };
    ParkinglistPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-parkinglist',
            templateUrl: 'parkinglist.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http,
            ToastController,
            AlertController,
            App,
            Events,
            MenuController,
            LoadingController,
            Appsetting,
            Camera,
            ActionSheetController])
    ], ParkinglistPage);
    return ParkinglistPage;
}());
export { ParkinglistPage };
//# sourceMappingURL=parkinglist.js.map