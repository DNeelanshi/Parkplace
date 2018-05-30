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
import { ReviewsPage } from '../reviews/reviews';
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController, MenuController, App, ModalController } from 'ionic-angular';
import { AddcarinfoPage } from '../addcarinfo/addcarinfo';
import { DatetimemodalPage } from '../datetimemodal/datetimemodal';
import { Stripe } from '@ionic-native/stripe';
import { BillinginformationPage } from '../billinginformation/billinginformation';
import { HomePage } from '../home/home';
import * as moment from 'moment';
/**
 * Generated class for the MikehousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MikehousePage = /** @class */ (function () {
    function MikehousePage(navCtrl, navParams, http, toastCtrl, alertCtrl, app, menuCtrl, modalCtrl, loadingCtrl, appsetting, stripe) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.menuCtrl = menuCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.stripe = stripe;
        this.parkdetail = [];
        this.parkdetail1 = [];
        this.selldetail = [];
        this.Cardata = [];
        this.images = [];
        this.datedata = [];
        this.userdetail = [];
        this.reviewarry = [];
        this.Rating = 0;
        this.totalvalue = 0;
        this.totalreviews = 0;
        this.starone = 'star-outline';
        this.startwo = 'star-outline';
        this.starthree = 'star-outline';
        this.starfour = 'star-outline';
        this.starfive = 'star-outline';
        this.menuCtrl.swipeEnable(true);
        this.getdetail();
        console.log(this.navCtrl.last().component.name);
        //        console.log(typeof(this.navParams.data))
        //        if(typeof(this.navParams.data) == "string"){
        //           
        //        }
    }
    MikehousePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MikehousePage');
    };
    MikehousePage.prototype.gotohome = function () {
        this.navCtrl.push(HomePage);
    };
    MikehousePage.prototype.getdetail = function () {
        var _this = this;
        var temp = this;
        this.parkdetail = JSON.parse(localStorage.getItem('Parkdetail'));
        this.selldetail = JSON.parse(localStorage.getItem('sellerparkdetail'));
        console.log(this.parkdetail);
        this.parkdetail.opening_days_and_timings.forEach(function (value, key) {
            value.opening_time = moment(value.opening_time, "h:mm: A").format("hh:mm A");
            value.closing_time = moment(value.closing_time, "h:mm: A").format("hh:mm A");
        });
        this.parkdetail1 = this.parkdetail;
        console.log(this.parkdetail1);
        if (temp.parkdetail.review_and_rating.length) {
            temp.totalreviews = temp.parkdetail.review_and_rating.length;
            console.log(temp.totalreviews);
        }
        else {
            temp.totalreviews = 0;
        }
        temp.Rating = 0;
        temp.reviewarry = temp.parkdetail.review_and_rating;
        temp.reviewarry.forEach(function (value, key) {
            temp.Rating = (temp.Rating + value.rating);
            console.log('totalRating:' + temp.Rating);
            console.log('totallength' + temp.reviewarry.length);
            temp.totalvalue = temp.Rating / temp.reviewarry.length;
            temp.totalvalue = Number((temp.totalvalue).toFixed(1));
            console.log('totalaverage' + temp.totalvalue);
        });
        if (temp.totalvalue == 1) {
            temp.starone = 'star';
        }
        else if (temp.totalvalue == 2) {
            temp.starone = 'star';
            temp.startwo = 'star';
        }
        else if (temp.totalvalue == 3) {
            temp.starone = 'star';
            temp.startwo = 'star';
            temp.starthree = 'star';
        }
        else if (temp.totalvalue == 4) {
            temp.starone = 'star';
            temp.startwo = 'star';
            temp.starthree = 'star';
            temp.starfour = 'star';
        }
        else if (temp.totalvalue == 5) {
            temp.starone = 'star';
            temp.startwo = 'star';
            temp.starthree = 'star';
            temp.starfour = 'star';
            temp.starfive = 'star';
        }
        else if ((1.1 <= temp.totalvalue) && (temp.totalvalue <= 1.5)) {
            temp.starone = 'star-half';
        }
        else if ((1.6 <= temp.totalvalue) && (temp.totalvalue <= 1.9)) {
            temp.starone = 'star';
            temp.startwo = 'star';
        }
        else if ((2.1 <= temp.totalvalue) && (temp.totalvalue <= 2.5)) {
            temp.starone = 'star';
            temp.startwo = 'star';
            temp.starthree = 'star-half';
        }
        else if ((2.6 <= temp.totalvalue) && (temp.totalvalue <= 2.9)) {
            temp.starone = 'star';
            temp.startwo = 'star';
            temp.starthree = 'star';
        }
        else if ((3.1 <= temp.totalvalue) && (temp.totalvalue <= 3.5)) {
            temp.starone = 'star';
            temp.startwo = 'star';
            temp.starthree = 'star';
            temp.starfour = 'star-half';
        }
        else if ((3.6 <= temp.totalvalue) && (temp.totalvalue <= 3.9)) {
            temp.starone = 'star';
            temp.startwo = 'star';
            temp.starthree = 'star';
            temp.starfour = 'star';
        }
        else if ((4.1 <= temp.totalvalue) && (temp.totalvalue <= 4.5)) {
            temp.starone = 'star';
            temp.startwo = 'star';
            temp.starthree = 'star';
            temp.starfour = 'star-half';
        }
        else if ((4.6 <= temp.totalvalue) && (temp.totalvalue <= 4.9)) {
            temp.starone = 'star';
            temp.startwo = 'star';
            temp.starthree = 'star';
            temp.starfour = 'star';
            temp.starfive = 'star';
        }
        console.log(this.selldetail);
        this.images = this.parkdetail.parking_images;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        if (localStorage.getItem('UserDetailcustomer')) {
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
                content: "Loading",
                dismissOnPageChange: true
            });
            Loading.present().then(function () {
                _this.http.post(_this.appsetting.myGlobalVar + 'users/userinfo', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                    console.log(data.data);
                    _this.userdetail = data.data;
                });
            });
        }
    };
    MikehousePage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    MikehousePage.prototype.reservepay = function () {
        var _this = this;
        console.log(this.userdetail);
        if (this.userdetail.car_details.length == 0) {
            this.navCtrl.push(AddcarinfoPage);
        }
        else {
            var alert_1 = this.alertCtrl.create();
            alert_1.setTitle('Choose your vehicle');
            for (var s = 0; s < this.userdetail.car_details.length; s++) {
                alert_1.addInput({
                    type: 'radio',
                    label: this.userdetail.car_details[s].car_maker + ' ' + this.userdetail.car_details[s].model,
                    value: this.userdetail.car_details[s],
                    checked: false
                });
            }
            alert_1.addButton('Cancel');
            alert_1.addButton({
                text: 'OK',
                handler: function (cardata) {
                    console.log(cardata);
                    if (cardata == undefined) {
                    }
                    else {
                        console.log(cardata);
                        //           this.Cardata = cardata;
                        var dateModal = _this.modalCtrl.create(DatetimemodalPage);
                        dateModal.onDidDismiss(function (data1) {
                            console.log(data1);
                            if ((data1.endtime == undefined) || (data1.starttime == undefined) || (data1.day == undefined) || (data1.datte == undefined)) {
                                var toast = _this.toastCtrl.create({
                                    message: 'Invalid date time selections',
                                    duration: 2000,
                                    position: 'top'
                                });
                                toast.present();
                            }
                            else {
                                //     this.datedata = data1;
                                _this.amount = (parseInt(data1.endtime) - parseInt(data1.starttime)) * _this.parkdetail.hourly_rate;
                                console.log(_this.amount);
                                var postdata1 = {
                                    total_amount: _this.amount,
                                    payment_to: _this.selldetail._id,
                                    parking_id: _this.parkdetail._id,
                                    payment_from: _this.userdetail._id,
                                    parking_date: data1.datte,
                                    parking_day: data1.day,
                                    parking_start_time: data1.starttime,
                                    parking_end_time: data1.endtime,
                                    rate_per_hour: _this.parkdetail.hourly_rate,
                                    car_id: cardata._id,
                                    spacenumber: _this.parkdetail.space_number,
                                    address: _this.parkdetail.street_address + ',' + _this.parkdetail.city + ',' + _this.parkdetail.state + ',' + _this.parkdetail.zip_code
                                };
                                _this.navCtrl.push(BillinginformationPage, postdata1);
                                //     if(this.navParams.data.length == undefined){
                                //         console.log('not done');
                                //     }else{
                                // console.log("done"+''+this.navParams.data)
                                //         let headers = new Headers();
                                //    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                                //    let options = new RequestOptions({ headers: headers });
                                //    
                                //
                                //    var serialized = this.serializeObj(postdata);
                                //    console.log(postdata);
                                ////     var Loading = this.loadingCtrl.create({
                                ////           spinner: 'bubbles',
                                ////            cssClass: 'loader',
                                ////            content: "Loading",
                                ////    dismissOnPageChange:true
                                ////        });
                                ////        Loading.present().then(() => {
                                ////    this.http.post(this.appsetting.myGlobalVar +'users/', serialized, options).map(res => res.json()).subscribe(data => {
                                ////
                                ////      console.log(data.data);
                                ////      this.userdetail=data.data;
                                ////      })
                                ////      })
                                ////     }
                                //
                                //   
                                //      }
                            }
                        });
                        dateModal.present();
                    }
                }
            });
            alert_1.present();
        }
    };
    // payment(){
    //     console.log(this.Cardata);
    //       let headers = new Headers();
    //    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    //    let options = new RequestOptions({ headers: headers });     
    //    
    //      var postdata = {
    //  total_amount:this.amount,
    //payment_to:this.selldetail._id,
    //token:this.navParams.data,
    //parking_id:this.parkdetail._id,
    //payment_from:this.userdetail._id,
    ////payment_to:
    //parking_date: this.datedata.datte,
    //parking_day: this.datedata.day,
    //parking_start_time: this.datedata.starttime,
    //parking_end_time: this.datedata.endtime,
    ////actul_end_time:
    //rate_per_hour:this.parkdetail.hourly_rate,
    //car_id: this.Cardata._id
    ////checkin_status:
    //    };
    //
    //    var serialized = this.serializeObj(postdata);
    //    console.log(postdata);
    //      }
    //  
    MikehousePage.prototype.review = function (reviewdata) {
        console.log(reviewdata);
        var posttreviewdata = {
            parkid: reviewdata._id,
            selid: this.selldetail._id
        };
        localStorage.setItem('reviewdata', JSON.stringify(posttreviewdata));
        this.navCtrl.push(ReviewsPage);
    };
    MikehousePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-mikehouse',
            templateUrl: 'mikehouse.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http,
            ToastController,
            AlertController,
            App,
            MenuController,
            ModalController,
            LoadingController,
            Appsetting, Stripe])
    ], MikehousePage);
    return MikehousePage;
}());
export { MikehousePage };
//# sourceMappingURL=mikehouse.js.map