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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController, AlertController, LoadingController, Events } from 'ionic-angular';
/**
 * Generated class for the RatingmodelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RatingmodelPage = /** @class */ (function () {
    function RatingmodelPage(navCtrl, navParams, events, toastCtrl, appsetting, http, viewCtrl, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.appsetting = appsetting;
        this.http = http;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.data = [];
        console.log(navParams.get('parkid'));
        this.parkingid = navParams.get('parkid');
    }
    RatingmodelPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RatingmodelPage');
    };
    RatingmodelPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    RatingmodelPage.prototype.onModelChange = function (number) {
        console.log(number);
        this.rating = number;
    };
    RatingmodelPage.prototype.review1 = function () {
        var _this = this;
        var propic;
        console.log(this.data.comment);
        var userdata = JSON.parse(localStorage.getItem('UserDetailcustomer'));
        console.log(userdata);
        if (!userdata.profile_pic) {
            propic = 'assets/imgs/user.png';
        }
        else {
            propic = userdata.profile_pic;
        }
        console.log(propic);
        if ((this.data.comment == undefined) || (this.data.comment == "")) {
            this.AlertMsg('Please give the comment.');
        }
        else if (this.rating == undefined) {
            this.AlertMsg('Please give the rating');
        }
        else {
            var postdata = {
                parking_id: this.parkingid,
                user_id: userdata._id,
                review: this.data.comment,
                rating: this.rating,
                reviewer_name: userdata.name,
                reviewer_image: propic
            };
            //alert(this.devicetoken)
            console.log(postdata);
            var Serialized = this.serializeObj(postdata);
            var Loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                cssClass: 'loader',
                dismissOnPageChange: true
            });
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            headers.append('Access-Control-Allow-Origin', '*');
            var options_1 = new RequestOptions({ headers: headers });
            Loading.present().then(function () {
                _this.http.post(_this.appsetting.myGlobalVar + 'users/AddReviewRating', Serialized, options_1)
                    .map(function (res) { return res.json(); }).subscribe(function (response) {
                    console.log(response);
                    if (response.status == true) {
                        localStorage.setItem('Parkdetail', JSON.stringify(response.data.parking_space[0]));
                        _this.viewCtrl.dismiss({});
                    }
                    else {
                        _this.AlertMsg(response.data);
                        //                    this.navCtrl.push(ReviewsPage);
                    }
                    Loading.dismissAll();
                });
            });
        }
    };
    RatingmodelPage.prototype.AlertMsg = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Park Place',
            message: msg,
            buttons: [
                {
                    text: 'ok',
                    role: 'ok',
                    handler: function () {
                        console.log('Continue clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    RatingmodelPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    RatingmodelPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-ratingmodel',
            templateUrl: 'ratingmodel.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Events,
            ToastController,
            Appsetting,
            Http,
            ViewController,
            AlertController,
            LoadingController])
    ], RatingmodelPage);
    return RatingmodelPage;
}());
export { RatingmodelPage };
//# sourceMappingURL=ratingmodel.js.map