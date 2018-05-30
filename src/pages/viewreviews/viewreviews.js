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
import { ToastController, AlertController, LoadingController, MenuController, Events } from 'ionic-angular';
/**
 * Generated class for the ViewreviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewreviewsPage = /** @class */ (function () {
    function ViewreviewsPage(navCtrl, navParams, events, toastCtrl, appsetting, http, alertCtrl, menuCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.appsetting = appsetting;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.data = [];
        this.delshow = false;
        this.parkingdata = [];
        this.reviewarry1 = [];
        this.reviewarry = [];
        this.totalvalue = 0;
        this.Rating = 0;
        this.starone = 'star-outline';
        this.startwo = 'star-outline';
        this.starthree = 'star-outline';
        this.starfour = 'star-outline';
        this.starfive = 'star-outline';
        this.menuCtrl.swipeEnable(true);
        var rdata = JSON.parse(localStorage.getItem('sellerreview'));
        console.log(rdata);
        this.show(rdata);
    }
    ViewreviewsPage.prototype.show = function (daa) {
        var _this = this;
        var parkdata = [];
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var postdata = {
            user_id: daa.sellerid
        };
        //alert(this.devicetoken)
        console.log(postdata);
        var Loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
            dismissOnPageChange: true
        });
        Loading.present().then(function () {
            var Serialized = _this.serializeObj(postdata);
            _this.http.post(_this.appsetting.myGlobalVar + 'users/userinfo', Serialized, options).map(function (res) { return res.json(); }).subscribe(function (response) {
                console.log(response);
                if (response.status == true) {
                    parkdata = response.data.parking_space;
                    console.log(parkdata);
                    for (var j = 0; j < parkdata.length; j++) {
                        if (parkdata[j]._id == daa.parkidd) {
                            _this.parkingdata = parkdata[j];
                            _this.reviewarry = parkdata[j].review_and_rating;
                        }
                    }
                    _this.image = _this.parkingdata.parking_images[0].parking_image;
                    console.log(_this.parkingdata);
                    console.log(_this.image);
                    console.log(_this.reviewarry);
                    _this.userid1 = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
                    var temp = _this;
                    console.log(_this.reviewarry.length);
                    _this.totalreviews = _this.reviewarry.length;
                    if (_this.reviewarry.length > 0) {
                        _this.reviewarry.forEach(function (value, key) {
                            temp.Rating = (temp.Rating + value.rating);
                            console.log(temp.Rating);
                            temp.totalvalue = temp.Rating / temp.reviewarry.length;
                            temp.totalvalue = Number((temp.totalvalue).toFixed(1));
                            if (value.rating == 1) {
                                value.starrone = 'star';
                                value.starrtwo = 'star-outline';
                                value.starrthree = 'star-outline';
                                value.starrfour = 'star-outline';
                                value.starrfive = 'star-outline';
                            }
                            else if (value.rating == 2) {
                                value.starrone = 'star';
                                value.starrtwo = 'star';
                                value.starrthree = 'star-outline';
                                value.starrfour = 'star-outline';
                                value.starrfive = 'star-outline';
                            }
                            else if (value.rating == 3) {
                                value.starrone = 'star';
                                value.starrtwo = 'star';
                                value.starrthree = 'star';
                                value.starrfour = 'star-outline';
                                value.starrfive = 'star-outline';
                            }
                            else if (value.rating == 4) {
                                value.starrone = 'star';
                                value.starrtwo = 'star';
                                value.starrthree = 'star';
                                value.starrfour = 'star';
                                value.starrfive = 'star-outline';
                            }
                            else if (value.rating == 5) {
                                value.starrone = 'star';
                                value.starrtwo = 'star';
                                value.starrthree = 'star';
                                value.starrfour = 'star';
                                value.starrfive = 'star';
                            }
                            else if (value.rating == 1.5) {
                                this.starrone = 'star';
                                value.starrone = 'star-half';
                                value.starrtwo = 'star-outline';
                                value.starrthree = 'star-outline';
                                value.starrfour = 'star-outline';
                                value.starrfive = 'star-outline';
                            }
                            else if (value.rating == 2.5) {
                                value.starrone = 'star';
                                value.starrtwo = 'star';
                                value.starrthree = 'star-half';
                                value.starrfour = 'star-outline';
                                value.starrfive = 'star-outline';
                            }
                            else if (value.rating == 3.5) {
                                value.starrone = 'star';
                                value.starrtwo = 'star';
                                value.starrthree = 'star';
                                value.starrfour = 'star-half';
                                value.starrfive = 'star-outline';
                            }
                            else if (value.rating == 4.5) {
                                value.starrone = 'star';
                                value.starrtwo = 'star';
                                value.starrthree = 'star';
                                value.starrfour = 'star';
                                value.starrfive = 'star-half';
                            }
                        });
                    }
                    if (_this.totalvalue == 1) {
                        _this.starone = 'star';
                    }
                    else if (_this.totalvalue == 2) {
                        _this.starone = 'star';
                        _this.startwo = 'star';
                    }
                    else if (_this.totalvalue == 3) {
                        _this.starone = 'star';
                        _this.startwo = 'star';
                        _this.starthree = 'star';
                    }
                    else if (_this.totalvalue == 4) {
                        _this.starone = 'star';
                        _this.startwo = 'star';
                        _this.starthree = 'star';
                        _this.starfour = 'star';
                    }
                    else if (_this.totalvalue == 5) {
                        _this.starone = 'star';
                        _this.startwo = 'star';
                        _this.starthree = 'star';
                        _this.starfour = 'star';
                        _this.starfive = 'star';
                    }
                    else if ((1.1 <= _this.totalvalue) && (_this.totalvalue <= 1.5)) {
                        _this.starone = 'star-half';
                    }
                    else if ((1.6 <= _this.totalvalue) && (_this.totalvalue <= 1.9)) {
                        _this.starone = 'star';
                        _this.startwo = 'star';
                    }
                    else if ((2.1 <= _this.totalvalue) && (_this.totalvalue <= 2.5)) {
                        _this.starone = 'star';
                        _this.startwo = 'star';
                        _this.starthree = 'star-half';
                    }
                    else if ((2.6 <= _this.totalvalue) && (_this.totalvalue <= 2.9)) {
                        _this.starone = 'star';
                        _this.startwo = 'star';
                        _this.starthree = 'star';
                    }
                    else if ((3.1 <= _this.totalvalue) && (_this.totalvalue <= 3.5)) {
                        _this.starone = 'star';
                        _this.startwo = 'star';
                        _this.starthree = 'star';
                        _this.starfour = 'star-half';
                    }
                    else if ((3.6 <= _this.totalvalue) && (_this.totalvalue <= 3.9)) {
                        _this.starone = 'star';
                        _this.startwo = 'star';
                        _this.starthree = 'star';
                        _this.starfour = 'star';
                    }
                    else if ((4.1 <= _this.totalvalue) && (_this.totalvalue <= 4.5)) {
                        _this.starone = 'star';
                        _this.startwo = 'star';
                        _this.starthree = 'star';
                        _this.starfour = 'star-half';
                    }
                    else if ((4.6 <= _this.totalvalue) && (_this.totalvalue <= 4.9)) {
                        _this.starone = 'star';
                        _this.startwo = 'star';
                        _this.starthree = 'star';
                        _this.starfour = 'star';
                        _this.starfive = 'star';
                        console.log(_this.reviewarry);
                        console.log(temp.userid1);
                        console.log(_this.totalvalue);
                    }
                    Loading.dismissAll();
                }
            });
        });
    };
    ViewreviewsPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    ViewreviewsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ViewreviewsPage');
    };
    ViewreviewsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-viewreviews',
            templateUrl: 'viewreviews.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Events,
            ToastController,
            Appsetting,
            Http,
            AlertController,
            MenuController,
            LoadingController])
    ], ViewreviewsPage);
    return ViewreviewsPage;
}());
export { ViewreviewsPage };
//# sourceMappingURL=viewreviews.js.map