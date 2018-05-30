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
import { EditcarinfoPage } from '../editcarinfo/editcarinfo';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { ToastController, AlertController, LoadingController, ActionSheetController, MenuController, App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Camera } from '@ionic-native/camera';
/**

/**
 * Generated class for the CarlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CarlistPage = /** @class */ (function () {
    function CarlistPage(navCtrl, navParams, http, toastCtrl, alertCtrl, app, events, menuCtrl, loadingCtrl, appsetting, camera, actionSheetCtrl) {
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
    }
    CarlistPage.prototype.getinfo = function () {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        if (localStorage.getItem('UserDetailcustomer')) {
            console.log(JSON.parse(localStorage.getItem('UserDetailcustomer')));
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
                //          content: "Loading",
                dismissOnPageChange: true
            });
            Loading.present().then(function () {
                _this.http.post(_this.appsetting.myGlobalVar + 'users/userinfo', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                    Loading.dismiss();
                    console.log(data);
                    if (data.status == true) {
                        if (data.data.car_details.length > 0) {
                            _this.Userdata = data.data.car_details;
                            _this.show = 1;
                        }
                        else {
                            console.log('no car');
                            _this.show = 0;
                            console.log(_this.show);
                        }
                        //  if (data.data.parking_space.length == 0){
                        ////      alert('no data');
                        //        if(localStorage.getItem('UserDetailseller')){
                        //          // console.log(localStorage.getItem('UserInfo'));
                        //          // console.log(localStorage.getItem('UserInfo'));
                        //          localStorage.removeItem('UserDetailseller');
                        //         }
                        //          this.app.getRootNav().setRoot(GetstartedPage);
                        //        
                        //      this.menuCtrl.close();
                        //  }
                    }
                });
            });
        }
    };
    CarlistPage.prototype.delete = function (datadel) {
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
                        var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
                        var carid = datadel._id;
                        console.log(carid);
                        var headers = new Headers();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                        var body = {
                            user_id: userid,
                            car_id: carid
                        };
                        var options = new RequestOptions({
                            body: body,
                            method: RequestMethod.Delete
                        });
                        var postdata = {};
                        console.log(postdata);
                        var serialized = _this.serializeObj(postdata);
                        _this.http.request(_this.appsetting.myGlobalVar + 'users/delete_car', options).map(function (res) { return res.json(); }).subscribe(function (data) {
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
    CarlistPage.prototype.AlertMsg = function (msg) {
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
    CarlistPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    CarlistPage.prototype.edit = function (dataa) {
        localStorage.setItem('editcar', JSON.stringify(dataa));
        this.navCtrl.push(EditcarinfoPage);
    };
    CarlistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CarlistPage');
    };
    CarlistPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-carlist',
            templateUrl: 'carlist.html',
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
    ], CarlistPage);
    return CarlistPage;
}());
export { CarlistPage };
//# sourceMappingURL=carlist.js.map