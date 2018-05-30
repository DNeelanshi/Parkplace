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
import { ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { CarlistPage } from '../carlist/carlist';
import * as moment from 'moment';
/**
 * Generated class for the EditcarinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditcarinfoPage = /** @class */ (function () {
    function EditcarinfoPage(navCtrl, navParams, toastCtrl, actionSheetCtrl, camera, http, alertCtrl, menuCtrl, loadingCtrl, appsetting) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.data = [];
        this.carpic = '';
        this.cardata = [];
        this.menuCtrl.swipeEnable(true);
        this.date = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.date);
        this.getdetail();
    }
    EditcarinfoPage.prototype.getdetail = function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        if (localStorage.getItem('editcar')) {
            this.cardata = JSON.parse(localStorage.getItem('editcar'));
            console.log(this.cardata);
            this.data.carmake = this.cardata.car_maker;
            this.data.model = this.cardata.model;
            this.data.licence = this.cardata.licencse_plate;
            this.data.year = JSON.stringify(this.cardata.year);
            console.log(moment(this.cardata.year).format('YYYY'));
            this.carpic = this.cardata.car_images;
            this.carpicture = this.cardata.car_images;
            this.carid = this.cardata._id;
        }
    };
    EditcarinfoPage.prototype.Editcar = function (cardata) {
        var _this = this;
        console.log(cardata.value);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
        if (this.carpicture == undefined) {
            this.AlertMsg1('Car picture is required');
        }
        else {
            var postdata = {
                car_maker: cardata.value.carmake,
                model: cardata.value.model,
                year: cardata.value.year,
                licencse_plate: cardata.value.licence,
                user_id: userid,
                car_images: this.carpicture,
                car_id: this.carid
            };
            //        return false;
            var serialized = this.serializeObj(postdata);
            console.log(postdata);
            var Loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                cssClass: 'loader',
                content: "Loading",
                dismissOnPageChange: true
            });
            Loading.present().then(function () {
                _this.http.post(_this.appsetting.myGlobalVar + 'users/Editcar', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                    Loading.dismiss();
                    console.log(data);
                    if (data.status == true) {
                        _this.AlertMsg1('Car information updated successfully');
                        _this.navCtrl.push(CarlistPage);
                    }
                });
            });
        }
    };
    EditcarinfoPage.prototype.AlertMsg1 = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Park Place',
            message: msg,
            buttons: [
                {
                    text: 'OK',
                    role: 'submit',
                    handler: function () {
                        console.log('ok clicked');
                        // this.navCtrl.push(ProcessingformPage);
                    }
                }
            ]
        });
        alert.present();
    };
    EditcarinfoPage.prototype.carpicupload = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose image',
            buttons: [
                {
                    text: 'Camera',
                    role: 'submit',
                    handler: function () {
                        console.log('camera clicked');
                        _this.chooseImage(1);
                    }
                },
                {
                    text: 'Gallery',
                    handler: function () {
                        console.log('Gallery clicked');
                        _this.chooseImage(0);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    EditcarinfoPage.prototype.chooseImage = function (Type) {
        var _this = this;
        console.log(Type);
        var options = {
            quality: 10,
            sourceType: Type,
            targetWidth: 600,
            targetHeight: 600,
            correctOrientation: true,
            allowEdit: true,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.carpic = 'data:image/jpeg;base64,' + imageData;
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            var options = new RequestOptions({ headers: headers });
            var postdata = {
                picture: _this.carpic
            };
            //           alert(postdata)
            var serialized = _this.serializeObj(postdata);
            var Loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                cssClass: 'loader',
                content: "Loading",
                dismissOnPageChange: true
            });
            Loading.present().then(function () {
                _this.http.post(_this.appsetting.myGlobalVar + 'users/ImageUploader', postdata).map(function (res) { return res.json(); }).subscribe(function (data) {
                    Loading.dismiss();
                    console.log(data);
                    //          alert(data.data);
                    if (data.status == true) {
                        _this.carpicture = data.data;
                    }
                    else {
                        _this.AlertMsg1('Image cannot be uploaded.Please try again later');
                    }
                });
            }, function (err) {
                console.log(JSON.stringify(err));
                alert(JSON.stringify(err));
            });
        }, function (err) {
            console.log(err);
        });
    };
    EditcarinfoPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    EditcarinfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditcarinfoPage');
    };
    EditcarinfoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-editcarinfo',
            templateUrl: 'editcarinfo.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            ToastController,
            ActionSheetController,
            Camera,
            Http,
            AlertController,
            MenuController,
            LoadingController,
            Appsetting])
    ], EditcarinfoPage);
    return EditcarinfoPage;
}());
export { EditcarinfoPage };
//# sourceMappingURL=editcarinfo.js.map