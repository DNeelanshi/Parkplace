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
import { MikehousePage } from '../mikehouse/mikehouse';
import { ToastController, AlertController, LoadingController, MenuController, Events } from 'ionic-angular';
/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReviewsPage = /** @class */ (function () {
    function ReviewsPage(navCtrl, navParams, events, toastCtrl, appsetting, http, alertCtrl, menuCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.appsetting = appsetting;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.postshow = false;
        this.data = [];
        this.totalpages = 0;
        this.delshow = false;
        this.parkingdata = [];
        this.reviewarry1 = [];
        this.reviewarry = [];
        this.totalvalue = 0;
        this.Rating = 0;
        this.paginatearray = [];
        this.starone = 'star-outline';
        this.startwo = 'star-outline';
        this.starthree = 'star-outline';
        this.starfour = 'star-outline';
        this.starfive = 'star-outline';
        this.menuCtrl.swipeEnable(true);
        //        alert('new review');
    }
    ReviewsPage_1 = ReviewsPage;
    ReviewsPage.prototype.ngOnInit = function () {
        var rdata = JSON.parse(localStorage.getItem('reviewdata'));
        console.log(rdata);
        this.show(rdata);
    };
    ReviewsPage.prototype.onModelChange = function (number) {
        console.log(number);
        this.rating = number;
    };
    ReviewsPage.prototype.editit = function (dattt) {
        this.postshow = true;
        console.log(dattt);
        this.data.comment = dattt.review;
        if (dattt.rating == 1) {
            this.data.starr = 1;
        }
        else if (dattt.rating == 2) {
            this.data.starr = 2;
        }
        else if (dattt.rating == 3) {
            this.data.starr = 3;
        }
        else if (dattt.rating == 4) {
            this.data.starr = 4;
        }
        else if (dattt.rating == 5) {
            this.data.starr = 5;
        }
        console.log(this.data.starr);
        this.reviewid = dattt._id;
    };
    ReviewsPage.prototype.editpostdata = function () {
        var _this = this;
        var propic;
        console.log('editvala');
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var userdata = JSON.parse(localStorage.getItem('UserDetailcustomer'));
        console.log(userdata);
        if (!userdata.profile_pic) {
            propic = 'assets/imgs/user.png';
        }
        else {
            propic = userdata.profile_pic;
        }
        console.log(propic);
        var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
        if ((this.data.comment == undefined) || (this.data.comment == "")) {
            this.AlertMsg('Please give the comment.');
        }
        else if (this.data.starr == undefined) {
            this.AlertMsg('Please give the rating');
        }
        else {
            var postdata = {
                parking_id: this.parkingdata._id,
                user_id: userid,
                review: this.data.comment,
                rating: this.data.starr,
                review_id: this.reviewid,
                reviewer_name: userdata.name,
                reviewer_image: propic
            };
            console.log(postdata);
            var Serialized = this.serializeObj(postdata);
            var Loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                cssClass: 'loader',
                content: "Loading",
                dismissOnPageChange: true
            });
            Loading.present().then(function () {
                _this.http.post(_this.appsetting.myGlobalVar + 'users/EditReviewRating', Serialized, options).map(function (res) { return res.json(); }).subscribe(function (response) {
                    console.log(response);
                    Loading.dismiss();
                    if (response.status == true) {
                        localStorage.setItem('Parkdetail', JSON.stringify(response.data.parking_space[0]));
                        _this.AlertMsg1('Your review updated successfully');
                    }
                    else {
                        _this.AlertMsg1(response.message);
                    }
                });
            });
        }
    };
    ReviewsPage.prototype.show = function (daa) {
        var _this = this;
        var odd_count = 0;
        var even_count = 0;
        var parkdata = [];
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var postdata = {
            user_id: daa.selid
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
                        if (parkdata[j]._id == daa.parkid) {
                            _this.parkingdata = parkdata[j];
                            _this.reviewarry = parkdata[j].review_and_rating;
                        }
                    }
                    _this.image = _this.parkingdata.parking_images[0].parking_image;
                    console.log(_this.parkingdata);
                    console.log(_this.image);
                    console.log(_this.reviewarry);
                }
                console.log(_this.paginatearray);
                _this.userid1 = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
                var temp = _this;
                console.log(_this.reviewarry.length);
                _this.totalreviews = _this.reviewarry.length;
                _this.totalpages = Math.ceil(_this.reviewarry.length / 3);
                var f = Math.ceil((_this.reviewarry.length / 3) - 1);
                console.log(_this.totalpages);
                var end = 0;
                var start = 0;
                var end = 0;
                var x = 0;
                for (var i = 0; i < _this.reviewarry.length; i++) {
                    console.log(f);
                    while (x <= f) {
                        console.log(x);
                        if (_this.reviewarry.length % 3 == 0) {
                            start = end + x;
                            end = start + 2;
                            console.log(start, end);
                        }
                        else if (Math.ceil(_this.reviewarry.length % 3) == 1) {
                            start = end + x;
                            console.log('start' + start);
                            if (start == _this.reviewarry.length - 1) {
                                end = start;
                                console.log('ye chla');
                            }
                            else {
                                end = start + 2;
                            }
                            console.log('end' + end);
                            console.log('x' + x);
                            console.log(start, end);
                        }
                        else if (Math.ceil(_this.reviewarry.length % 3) == 2) {
                            start = end + x;
                            console.log('start' + start);
                            if (start == _this.reviewarry.length - 2) {
                                end = start + 1;
                                console.log('ye bn chla');
                            }
                            else {
                                end = start + 2;
                            }
                            console.log('end' + end);
                            console.log('x' + x);
                            console.log(start, end);
                        }
                        x++;
                        for (var d = start; d <= end; d++) {
                            _this.paginatearray.push(_this.reviewarry[d]);
                        }
                    }
                }
                console.log(_this.paginatearray);
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
            });
        });
    };
    ReviewsPage.prototype.postdata = function () {
        var _this = this;
        var propic;
        this.postshow = false;
        console.log(this.data.comment);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
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
                parking_id: this.parkingdata._id,
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
                content: "Loading",
                dismissOnPageChange: true
            });
            Loading.present().then(function () {
                _this.http.post(_this.appsetting.myGlobalVar + 'users/AddReviewRating', Serialized, options).map(function (res) { return res.json(); }).subscribe(function (response) {
                    console.log(response);
                    if (response.status == true) {
                        localStorage.setItem('Parkdetail', JSON.stringify(response.data.parking_space[0]));
                        _this.AlertMsg1('Your review added successfully');
                    }
                    else {
                        _this.AlertMsg1(response.data);
                        //                    this.navCtrl.push(ReviewsPage);
                    }
                    Loading.dismissAll();
                });
            });
        }
    };
    ReviewsPage.prototype.gotomike = function () {
        this.navCtrl.push(MikehousePage);
    };
    ReviewsPage.prototype.delete = function (del) {
        var _this = this;
        console.log(del);
        var alert = this.alertCtrl.create({
            title: 'Park Place',
            message: "Are you sure to Delete your review ?",
            buttons: [
                {
                    text: 'cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('cancel clicked');
                    }
                },
                {
                    text: 'ok',
                    role: 'ok',
                    handler: function () {
                        console.log('Continue clicked');
                        var headers = new Headers();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                        var options = new RequestOptions({ headers: headers });
                        var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
                        var postdata = {
                            parking_id: _this.parkingdata._id,
                            review_id: del._id
                        };
                        //alert(this.devicetoken)
                        console.log(postdata);
                        var Serialized = _this.serializeObj(postdata);
                        //        var Loading = this.loadingCtrl.create({
                        //            spinner: 'bubbles',
                        //            cssClass: 'loader',
                        //            content: "Loading",
                        //            dismissOnPageChange: true
                        //        });
                        //        Loading.present().then(() => {
                        _this.http.post(_this.appsetting.myGlobalVar + 'users/DeleteReviewRating', Serialized, options).map(function (res) { return res.json(); }).subscribe(function (response) {
                            console.log(response);
                            //                Loading.dismiss();
                            if (response.status == true) {
                                _this.AlertMsg1('Your review deleted successfully');
                                //                     localStorage.setItem('reviewdata',JSON.stringify(posttreviewdata))
                            }
                            else {
                                _this.AlertMsg(response.data);
                            }
                            //            })
                        });
                    }
                }
            ]
        });
        alert.present();
        //        let headers = new Headers();
        //        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        //        let options = new RequestOptions({headers: headers});
        //        var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
        //        var postdata = {
        //            parking_id: this.parkingdata._id,
        //            review_id: del._id
        //        }
        //        //alert(this.devicetoken)
        //        console.log(postdata);
        //        var Serialized = this.serializeObj(postdata);
        //        var Loading = this.loadingCtrl.create({
        //            spinner: 'bubbles',
        //            cssClass: 'loader',
        //            content: "Loading",
        //            dismissOnPageChange: true
        //        });
        //        Loading.present().then(() => {
        //            this.http.post(this.appsetting.myGlobalVar + 'users/DeleteReviewRating', Serialized, options).map(res => res.json()).subscribe(response => {
        //                console.log(response);
        //                Loading.dismiss();
        //                if (response.status == true) {
        //
        //                    this.AlertMsg1('Your review deleted successfully')
        ////                     localStorage.setItem('reviewdata',JSON.stringify(posttreviewdata))
        //                  
        //                } else {
        //                    this.AlertMsg(response.data)
        //                }
        //            })
        //        })
    };
    ReviewsPage.prototype.AlertMsg1 = function (msg) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Park Place',
            message: msg,
            buttons: [
                {
                    text: 'ok',
                    role: 'ok',
                    handler: function () {
                        console.log('Continue clicked');
                        _this.navCtrl.push(ReviewsPage_1);
                    }
                }
            ]
        });
        alert.present();
    };
    ReviewsPage.prototype.AlertMsg = function (msg) {
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
    ReviewsPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    //            doInfinite(event){
    //        console.log(event);
    //       
    // 
    //                if(this.paginatearray == this.reviewarry.length){
    //                    event.complete();
    //                }
    //          
    //    }
    ReviewsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReviewsPage');
    };
    ReviewsPage = ReviewsPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-reviews',
            templateUrl: 'reviews.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Events,
            ToastController,
            Appsetting,
            Http,
            AlertController,
            MenuController,
            LoadingController])
    ], ReviewsPage);
    return ReviewsPage;
    var ReviewsPage_1;
}());
export { ReviewsPage };
//# sourceMappingURL=reviews.js.map