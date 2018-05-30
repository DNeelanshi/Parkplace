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
import { Appsetting } from "../../providers/appsetting";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController, ActionSheetController, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Camera } from '@ionic-native/camera';
import { ParkinglistPage } from '../parkinglist/parkinglist';
import * as moment from 'moment';
/**
/**
 * Generated class for the EditlistingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditlistingPage = /** @class */ (function () {
    function EditlistingPage(navCtrl, navParams, http, toastCtrl, alertCtrl, events, menuCtrl, loadingCtrl, appsetting, camera, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.userarray = [];
        this.data = {};
        this.arr = [];
        this.bit = 0;
        this.imgarr = [];
        this.senddays = [];
        this.sendopeningtime = [];
        this.sendclosingtime = [];
        this.daytime = [];
        this.geocoder = new google.maps.Geocoder();
        this.menuCtrl.swipeEnable(true);
        this.getinfo();
    }
    EditlistingPage.prototype.getinfo = function () {
        var _this = this;
        var temp = this;
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
                    if (data.status == true) {
                    }
                    if (localStorage.getItem('Editlisting')) {
                        _this.userarray = JSON.parse(localStorage.getItem('Editlisting'));
                        console.log(_this.userarray);
                        _this.data.parkingname = _this.userarray.parking_name;
                        _this.data.spacenumber = _this.userarray.space_number;
                        _this.data.parkingsize = _this.userarray.parking_size;
                        _this.data.restrictions = _this.userarray.restriction;
                        _this.data.rate = _this.userarray.hourly_rate;
                        _this.data.streetaddress = _this.userarray.street_address;
                        _this.data.city = _this.userarray.city;
                        _this.data.state = _this.userarray.state;
                        _this.data.zip = _this.userarray.zip_code;
                        _this.parkid = _this.userarray._id;
                        _this.leasingpic = _this.userarray.agreement_pic;
                        _this.leasingpicture = _this.userarray.agreement_pic;
                        console.log(_this.leasingpicture);
                        for (var e = 0; e < _this.userarray.parking_images.length; e++) {
                            _this.arr.push(_this.userarray.parking_images[e].parking_image);
                        }
                        console.log(_this.arr);
                        if (_this.arr.length == 1) {
                            _this.srcImage = _this.arr[0];
                            _this.bit = 1;
                        }
                        else if (_this.arr.length == 2) {
                            _this.bit = 2;
                            _this.srcImage = _this.arr[0];
                            _this.srcImage1 = _this.arr[1];
                        }
                        else {
                            _this.bit = 3;
                            _this.srcImage = _this.arr[0];
                            _this.srcImage1 = _this.arr[1];
                            _this.srcImage2 = _this.arr[2];
                        }
                        _this.userarray.opening_days_and_timings.forEach(function (value, key) {
                            var c = value.opening_time.split(':');
                            var d = value.closing_time.split(':');
                            if (d[0] > c[0]) {
                                if (c[0] > 11) {
                                    // console.log(timedata.value.openinghours.includes("PM"));
                                    //                value.opening_time = value.opening_time + ' PM';
                                    var g = value.opening_time;
                                    value.opening_time = moment(value.opening_time, "h:mm: A").format("hh:mm A");
                                }
                                else {
                                    //console.log(timedata.value.openinghours.includes("AM"));
                                    //               value.opening_time = value.opening_time + ' AM';
                                    var g = value.opening_time;
                                    value.opening_time = moment(value.opening_time, "h:mm: A").format("hh:mm A");
                                }
                                console.log(value.openinghours);
                                if (d[0] > 11) {
                                    //                value.closing_time = value.closing_time + ' PM';
                                    var h = value.closing_time;
                                    value.closing_time = moment(value.closing_time, "h:mm: A").format("hh:mm A");
                                }
                                else {
                                    //                value.closing_time = value.closing_time + ' AM';
                                    var h = value.closing_time;
                                    value.closing_time = moment(value.closing_time, "h:mm: A").format("hh:mm A");
                                }
                                console.log(value.closing_time);
                                var ott = g.split(' ');
                                var ctt = h.split(' ');
                                temp.daytime.push(value);
                                temp.senddays.push(value.day);
                                temp.sendopeningtime.push(ott[0]);
                                temp.sendclosingtime.push(ctt[0]);
                            }
                        });
                        console.log(temp.daytime);
                        console.log(temp.sendopeningtime);
                        console.log(temp.sendclosingtime);
                        console.log(_this.srcImage, _this.srcImage1, _this.srcImage2);
                    }
                });
            });
        }
    };
    EditlistingPage.prototype.closingtime = function (timedata) {
        var temp = this;
        console.log(timedata.value);
        console.log(timedata.value.day);
        console.log(timedata.value.opening_time);
        console.log(timedata.value.opening_time);
        var c = moment(timedata.value.opening_time, "h:mm: A").format("hh:mm A");
        var z = moment(timedata.value.closing_time, "h:mm: A").format("hh:mm A");
        console.log(z);
        console.log(c);
        if (timedata.value.day && timedata.value.opening_time && timedata.value.closing_time) {
            var a = timedata.value.opening_time.split(':');
            var b = timedata.value.closing_time.split(':');
            if (b[0] > a[0]) {
                if (a[0] > 11) {
                    // console.log(timedata.value.openinghours.includes("PM"));
                    //                timedata.value.opening_time = timedata.value.opening_time + ' PM';
                    timedata.value.opening_time = timedata.value.opening_time;
                }
                else {
                    //console.log(timedata.value.openinghours.includes("AM"));
                    //                timedata.value.opening_time = timedata.value.opening_time + ' AM';
                    timedata.value.opening_time = timedata.value.opening_time;
                }
                console.log(timedata.value.openinghours);
                if (b[0] > 11) {
                    //                timedata.value.closing_time = timedata.value.closing_time + ' PM';
                    timedata.value.closing_time = timedata.value.closing_time;
                }
                else {
                    //                timedata.value.closing_time = timedata.value.closing_time + ' AM';
                    timedata.value.closing_time = timedata.value.closing_time;
                }
                console.log(timedata.value.closing_time);
                var dayOpeningClosing = {
                    day: timedata.value.day,
                    opening_time: timedata.value.opening_time,
                    closing_time: timedata.value.closing_time
                };
                var dayOpeningClosing1 = {
                    day: timedata.value.day,
                    opening_time: c,
                    closing_time: z
                };
                //day,opening time and closing time of data to post on api.
                this.senddays.push(timedata.value.day);
                var ot = timedata.value.opening_time.split(' ');
                var ct = timedata.value.closing_time.split(' ');
                this.sendopeningtime.push(ot[0]);
                this.sendclosingtime.push(ct[0]);
                console.log(this.senddays.join(','));
                console.log(this.sendopeningtime.join(','));
                console.log(this.sendclosingtime.join(','));
                /**** array for display day,opeing time and closing time on html after selection **********/
                this.daytime.push(dayOpeningClosing1);
                console.log(this.daytime);
                this.data.day = '';
                this.data.opening_time = '';
                this.data.closing_time = '';
            }
            else {
                this.AlertMsg1('Closing time must be greater than opening time!');
            }
        }
        else {
            this.AlertMsg1('Are you sure you selected day,opening and closing time?');
        }
    };
    EditlistingPage.prototype.DeleteTimes = function (event, ind) {
        var temp = this;
        console.log(event.day);
        console.log(ind);
        console.log(temp.daytime);
        temp.daytime.splice(ind, 1);
        console.log(this.daytime.length);
        if (this.daytime.length == 0) {
            this.data.day = '';
            this.data.opening_time = '';
            this.data.closing_time = '';
        }
    };
    EditlistingPage.prototype.CameraAction = function () {
        var _this = this;
        console.log('opening');
        console.log(this.bit);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose image',
            buttons: [
                {
                    text: 'Camera',
                    role: 'submit',
                    handler: function () {
                        console.log('camera clicked');
                        _this.chooseImage1(1);
                    }
                },
                {
                    text: 'Gallery',
                    handler: function () {
                        console.log('Gallery clicked');
                        _this.chooseImage1(0);
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
    EditlistingPage.prototype.chooseImage1 = function (Type) {
        var _this = this;
        console.log(Type);
        var options = {
            quality: 10,
            sourceType: Type,
            targetWidth: 800,
            targetHeight: 800,
            correctOrientation: true,
            allowEdit: true,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.bit = _this.bit + 1;
            //alert(this.bit);
            if (_this.bit > 3) {
                _this.AlertMsg1('You cannot upload more than 3 images');
            }
            else {
                _this.arr.push('data:image/jpeg;base64,' + imageData);
                _this.imgarr.push(imageData);
                if (_this.imgarr.length == 1) {
                    // this.srcImage = this.imgarr[0];
                    // this.srcImage1 = "";
                    // this.srcImage2 = "";
                    _this.hitimage(_this.imgarr[0]);
                }
                if (_this.imgarr.length == 2) {
                    // this.srcImage = this.imgarr[0];
                    // this.srcImage1 = this.imgarr[1];
                    _this.hitimage(_this.imgarr[1]);
                    // this.srcImage2 = "";
                }
                if (_this.imgarr.length == 3) {
                    // this.srcImage = this.imgarr[0];
                    // this.srcImage1 = this.imgarr[1];
                    // this.srcImage2 = this.imgarr[2];
                    _this.hitimage(_this.imgarr[2]);
                }
                console.log(_this.arr.length);
            }
            //console.log(this.base64Image);
        }, function (err) {
            // Handle error
            console.log(err);
        });
    };
    EditlistingPage.prototype.hitimage = function (IMAGE) {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var postdata = {
            picture: IMAGE
        };
        //            alert(postdata)
        var serialized = this.serializeObj(postdata);
        var Loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
            dismissOnPageChange: true
        });
        Loading.present().then(function () {
            _this.http.post(_this.appsetting.myGlobalVar + 'users/ImageUploader', postdata).map(function (res) { return res.json(); }).subscribe(function (data) {
                Loading.dismiss();
                console.log(data);
                //    alert(data.data);
                if (data.status == true) {
                    if (_this.bit == 1) {
                        _this.srcImage = data.data;
                        //        alert( this.bit+''+this.srcImage);
                    }
                    else if (_this.bit == 2) {
                        _this.srcImage1 = data.data;
                        //        alert( this.bit+''+this.srcImage1);
                    }
                    else if (_this.bit == 3) {
                        _this.srcImage2 = data.data;
                        //        alert( this.bit+''+this.srcImage2);
                    }
                    //      alert(this.srcImage+''+this.srcImage1+''+this.srcImage2);
                }
                else {
                    _this.AlertMsg1('Image cannot be uploaded.Please try again later');
                }
            });
        }, function (err) {
            console.log(JSON.stringify(err));
            alert(JSON.stringify(err));
        });
    };
    EditlistingPage.prototype.uploadagreement = function () {
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
    EditlistingPage.prototype.chooseImage = function (Type) {
        var _this = this;
        console.log(Type);
        var options = {
            quality: 10,
            sourceType: Type,
            targetWidth: 767,
            targetHeight: 600,
            correctOrientation: true,
            allowEdit: true,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.leasingpic = 'data:image/jpeg;base64,' + imageData;
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            var options = new RequestOptions({ headers: headers });
            var postdata = {
                picture: _this.leasingpic
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
                        _this.leasingpicture = data.data;
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
    EditlistingPage.prototype.Editparking = function (parkingdata) {
        console.log(parkingdata.value);
        var temp = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        headers.append('Access-Control-Allow-Origin', '*');
        var options = new RequestOptions({ headers: headers });
        var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
        var addr = parkingdata.value.streetaddress + '' + parkingdata.value.city + '' + parkingdata.value.state + '' + parkingdata.value.zip;
        this.geocoder.geocode({ 'address': addr }, function (results, status1) {
            var _this = this;
            if (status1 === "OK") {
                console.log(results[0]);
                this.lat = results[0].geometry.location.lat();
                this.long = results[0].geometry.location.lng();
                console.log(this.lat, this.long);
                var l = parseInt(results[0].address_components.length);
                console.log(l);
                console.log(results[0].address_components[l - 1].long_name);
                this.ziptosend = results[0].address_components[l - 1].long_name;
                this.formattedaddres = results[0].formatted_address.split(',');
                if ((this.formattedaddres.length == 4) || (this.formattedaddres.length == 3)) {
                    this.streettosend = this.formattedaddres[0];
                    this.citytosend = this.formattedaddres[1];
                    this.statetosend = this.formattedaddres[2];
                }
                else if (this.formattedaddres.length == 5) {
                    this.streettosend = this.formattedaddres[0] + '' + this.formattedaddres[1];
                    this.citytosend = this.formattedaddres[2] + '' + this.formattedaddres[3];
                    this.statetosend = this.formattedaddres[4];
                }
                else if (this.formattedaddres.length >= 6) {
                    this.streettosend = this.formattedaddres[0] + '' + this.formattedaddres[1];
                    this.citytosend = this.formattedaddres[2] + '' + this.formattedaddres[3];
                    this.statetosend = this.formattedaddres[4] + '' + this.formattedaddres[5];
                }
                console.log(this.formattedaddres);
                console.log(this.streettosend, this.statetosend, this.citytosend, this.ziptosend);
                //      alert(this.streettosend+','+this.statetosend+','+this.citytosend+','+this.ziptosend+','+this.lat+','+this.long);
                setTimeout(function () {
                    //        temp.finalladd(parkingdata,this.streettosend,this.statetosend,this.citytosend,this.ziptosend,this.lat,this.long);
                    temp.finalladd(parkingdata, parkingdata.value.streetaddress, parkingdata.value.state, parkingdata.value.city, parkingdata.value.zip, _this.lat, _this.long);
                }, 500);
            }
            else {
                temp.AlertMsg('There is some error in getting location.');
            }
        });
    };
    EditlistingPage.prototype.AlertMsg = function (msg) {
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
    EditlistingPage.prototype.finalladd = function (formdetail, streettosend, statetosend, citytosend, ziptosend, lat, long) {
        var _this = this;
        var temp = this;
        console.log(formdetail);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
        if ((streettosend == undefined) || (statetosend == undefined) || (citytosend == undefined) || (ziptosend == undefined) || (lat == undefined)) {
            this.AlertMsg2('Please enter specific location');
        }
        else {
            if (this.daytime.length > 0) {
                console.log(this.daytime);
                this.senddays = [];
                this.sendopeningtime = [];
                this.sendclosingtime = [];
                this.daytime.forEach(function (value, key) {
                    console.log(value);
                    value.opening_time = moment(value.opening_time, ["hh:mm A"]).format("HH:mm");
                    value.closing_time = moment(value.closing_time, ["hh:mm A"]).format("HH:mm");
                    console.log(value);
                    temp.senddays.push(value.day);
                    var ot = value.opening_time.split(' ');
                    var ct = value.closing_time.split(' ');
                    temp.sendopeningtime.push(ot[0]);
                    temp.sendclosingtime.push(ct[0]);
                });
                console.log(this.senddays);
                console.log(this.sendopeningtime);
                console.log(this.sendclosingtime);
                console.log(this.leasingpicture);
                console.log(this.srcImage, this.srcImage1, this.srcImage2);
                if ((this.leasingpicture == undefined) || (this.leasingpicture == "")) {
                    this.AlertMsg2('Leasing agreement is required');
                }
                else if ((this.srcImage == undefined) || (this.srcImage == "")) {
                    this.AlertMsg2('Aleast 1  parking image is required');
                    //                    alert('hy')
                }
                else {
                    if ((this.srcImage1 == undefined) || (this.srcImage1 == "")) {
                        this.srcImage1 = "";
                    }
                    if ((this.srcImage2 == undefined) || (this.srcImage2 == "")) {
                        this.srcImage2 = "";
                    }
                    console.log(this.daytime);
                    var postdata = {
                        parking_name: formdetail.value.parkingname,
                        street_address: streettosend,
                        city: citytosend,
                        state: statetosend,
                        space_number: formdetail.value.spacenumber,
                        parking_size: formdetail.value.parkingsize,
                        restriction: formdetail.value.restrictions,
                        hourly_rate: formdetail.value.rate,
                        agreement_pic: this.leasingpicture,
                        image_pic0: this.srcImage,
                        image_pic1: this.srcImage1,
                        image_pic2: this.srcImage2,
                        //agreement_pic:"https://legaltemplates.net/wp-content/uploads/2015/03/lease-agreement.png",
                        //  image_pic0:"http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
                        //  image_pic1:"http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
                        //  image_pic2:"http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
                        zip_code: ziptosend,
                        //   user_id:userid,
                        lat: lat,
                        long: long,
                        user_id: userid,
                        parking_space_id: this.parkid,
                        opening_days: this.senddays.join(','),
                        opening_time: this.sendopeningtime.join(','),
                        closing_time: this.sendclosingtime.join(','),
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
                        _this.http.post(_this.appsetting.myGlobalVar + 'users/EditparkPlace', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                            Loading.dismiss();
                            console.log(data);
                            if (data.status == true) {
                                _this.AlertMsg1('Parking updated successfully');
                                console.log(data.data[0]);
                                localStorage.setItem('UserDetailseller', JSON.stringify(data.data[0]));
                                _this.navCtrl.push(ParkinglistPage);
                            }
                            else {
                                _this.AlertMsg1(data.message);
                            }
                        });
                    });
                }
            }
            else {
                this.AlertMsg1('Please mention Space availability');
            }
        }
    };
    EditlistingPage.prototype.DeleteImage = function (index) {
        var temp = this;
        console.log(index);
        if (index == 2) {
            this.srcImage2 = '';
            this.bit = this.bit - 1;
        }
        if (index == 1) {
            this.srcImage1 = '';
            this.bit = this.bit - 1;
        }
        if (index == 0) {
            this.srcImage = '';
            this.bit = this.bit - 1;
        }
        this.arr.splice(index, 1);
        console.log(this.bit);
        console.log(this.arr);
    };
    EditlistingPage.prototype.DeleteImage1 = function () {
        this.leasingpic = "";
        this.leasingpicture = "";
    };
    EditlistingPage.prototype.AlertMsg1 = function (msg) {
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
    EditlistingPage.prototype.AlertMsg2 = function (msg) {
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
    EditlistingPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    EditlistingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditlistingPage');
    };
    EditlistingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-editlisting',
            templateUrl: 'editlisting.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http,
            ToastController,
            AlertController,
            Events,
            MenuController,
            LoadingController,
            Appsetting,
            Camera,
            ActionSheetController])
    ], EditlistingPage);
    return EditlistingPage;
}());
export { EditlistingPage };
//# sourceMappingURL=editlisting.js.map