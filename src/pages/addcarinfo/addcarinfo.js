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
import { MikehousePage } from '../mikehouse/mikehouse';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import * as moment from 'moment';
/**
 * Generated class for the AddcarinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddcarinfoPage = /** @class */ (function () {
    function AddcarinfoPage(navCtrl, navParams, toastCtrl, actionSheetCtrl, camera, http, alertCtrl, loadingCtrl, appsetting) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.data = [];
        this.carpic = '';
        this.pagenameprevious = this.navCtrl.last();
        //        console.log("VAL");
        console.log(this.pagenameprevious.component.name);
        this.date = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.date);
    }
    AddcarinfoPage_1 = AddcarinfoPage;
    AddcarinfoPage.prototype.Addcar = function (cardata) {
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
                car_images: this.carpicture
                //            car_images: "https://s.hswstatic.com/gif/hydrogen-vehicle-danger-1.jpg"
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
                _this.http.post(_this.appsetting.myGlobalVar + 'users/addCar', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                    Loading.dismiss();
                    console.log(data);
                    if (data.status == true) {
                        _this.AlertMsg1('Car information added succesfully');
                        if (_this.pagenameprevious.component.name == 'MikehousePage') {
                            _this.navCtrl.push(MikehousePage);
                        }
                        else {
                            _this.navCtrl.push(AddcarinfoPage_1);
                        }
                    }
                });
            });
        }
    };
    AddcarinfoPage.prototype.AlertMsg1 = function (msg) {
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
    AddcarinfoPage.prototype.carpicupload = function () {
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
    AddcarinfoPage.prototype.chooseImage = function (Type) {
        var _this = this;
        console.log(Type);
        var options = {
            quality: 10,
            sourceType: Type,
            targetWidth: 767,
            targetHeight: 100,
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
    AddcarinfoPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    AddcarinfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddcarinfoPage');
    };
    AddcarinfoPage = AddcarinfoPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-addcarinfo',
            templateUrl: 'addcarinfo.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            ToastController,
            ActionSheetController,
            Camera,
            Http,
            AlertController,
            LoadingController,
            Appsetting])
    ], AddcarinfoPage);
    return AddcarinfoPage;
    var AddcarinfoPage_1;
}());
export { AddcarinfoPage };
//# sourceMappingURL=addcarinfo.js.map