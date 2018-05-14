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
import { ToastController, AlertController, LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the ListparkingspacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListparkingspacePage = /** @class */ (function () {
    function ListparkingspacePage(navCtrl, navParams, toastCtrl, actionSheetCtrl, camera, http, alertCtrl, loadingCtrl, appsetting) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.data = {};
        this.arr = [];
        this.userarray = [];
        this.bit = 0;
        this.imgarr = [];
        this.senddays = [];
        this.sendopeningtime = [];
        this.sendclosingtime = [];
        this.daytime = [];
        this.geocoder = new google.maps.Geocoder();
        this.getuserinfo();
    }
    ListparkingspacePage_1 = ListparkingspacePage;
    ListparkingspacePage.prototype.getuserinfo = function () {
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
                    if (data.status == true) {
                        if (data.data.first_add == false) {
                            _this.userarray = data.data.parking_space[0];
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
                            console.log(_this.srcImage, _this.srcImage1, _this.srcImage2);
                        }
                        else {
                            _this.parkid = "";
                        }
                    }
                });
            });
        }
    };
    ListparkingspacePage.prototype.closingtime = function (timedata) {
        var temp = this;
        console.log(timedata.value);
        console.log(timedata.value.day);
        console.log(timedata.value.startime);
        console.log(timedata.value.endtime);
        if (timedata.value.day && timedata.value.startime && timedata.value.endtime) {
            var a = timedata.value.startime.split(':');
            var b = timedata.value.endtime.split(':');
            if (b[0] > a[0]) {
                if (a[0] > 11) {
                    // console.log(timedata.value.openinghours.includes("PM"));
                    timedata.value.startime = timedata.value.startime + ' PM';
                }
                else {
                    //console.log(timedata.value.openinghours.includes("AM"));
                    timedata.value.startime = timedata.value.startime + ' AM';
                }
                console.log(timedata.value.openinghours);
                if (b[0] > 11) {
                    timedata.value.endtime = timedata.value.endtime + ' PM';
                }
                else {
                    timedata.value.endtime = timedata.value.endtime + ' AM';
                }
                console.log(timedata.value.endtime);
                var dayOpeningClosing = {
                    day: timedata.value.day,
                    startime: timedata.value.startime,
                    endtime: timedata.value.endtime
                };
                //day,opening time and closing time of data to post on api.
                this.senddays.push(timedata.value.day);
                var ot = timedata.value.startime.split(' ');
                var ct = timedata.value.endtime.split(' ');
                this.sendopeningtime.push(ot[0]);
                this.sendclosingtime.push(ct[0]);
                console.log(this.senddays.join(','));
                console.log(this.sendopeningtime.join(','));
                console.log(this.sendclosingtime.join(','));
                /**** array for display day,opeing time and closing time on html after selection **********/
                this.daytime.push(dayOpeningClosing);
                console.log(this.daytime);
                this.data.day = '';
                this.data.startime = '';
                this.data.endtime = '';
            }
            else {
                this.AlertMsg1('Closing time must be greater than opening time!');
            }
        }
        else {
            this.AlertMsg1('Are you sure you selected day,opening and closing time?');
        }
    };
    ListparkingspacePage.prototype.DeleteTimes = function (event, ind) {
        var temp = this;
        console.log(event.day);
        console.log(ind);
        /**** pop a value from array by index ************/
        console.log(temp.daytime);
        temp.daytime.splice(ind, 1);
        console.log(this.daytime.length);
        if (this.daytime.length == 0) {
            this.data.day = '';
            this.data.startime = '';
            this.data.endtime = '';
        }
    };
    ListparkingspacePage.prototype.CameraAction = function () {
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
    ListparkingspacePage.prototype.chooseImage1 = function (Type) {
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
    ListparkingspacePage.prototype.hitimage = function (IMAGE) {
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
    ListparkingspacePage.prototype.AlertMsg1 = function (msg) {
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
    ListparkingspacePage.prototype.uploadagreement = function () {
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
    ListparkingspacePage.prototype.chooseImage = function (Type) {
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
    ListparkingspacePage.prototype.Addparking = function (parkingdata) {
        console.log(parkingdata.value);
        var temp = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        headers.append('Access-Control-Allow-Origin', '*');
        var options = new RequestOptions({ headers: headers });
        var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
        var addr = parkingdata.value.streetaddress + '' + parkingdata.value.city + '' + parkingdata.value.state + '' + parkingdata.value.zip;
        this.ziptosend = '';
        this.streettosend = '';
        this.citytosend = '';
        this.statetosend = '';
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
                    temp.finalladd(parkingdata, _this.streettosend, _this.statetosend, _this.citytosend, _this.ziptosend, _this.lat, _this.long);
                }, 500);
            }
            else {
                this.AlertMsg1('There is some error in getting location.');
            }
        });
    };
    ListparkingspacePage.prototype.finalladd = function (formdetail, streettosend, statetosend, citytosend, ziptosend, lat, long) {
        var _this = this;
        console.log(formdetail);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
        console.log(this.daytime);
        if ((streettosend == undefined) || (statetosend == undefined) || (citytosend == undefined) || (ziptosend == undefined) || (lat == undefined)) {
            this.AlertMsg2('Please enter specific location');
        }
        else {
            if (this.daytime.length > 0) {
                console.log(this.leasingpicture);
                console.log(this.srcImage, this.srcImage1, this.srcImage2);
                if ((this.leasingpicture == undefined) || (this.leasingpicture == "")) {
                    this.AlertMsg2('Leasing agreement is required');
                }
                else if ((this.srcImage == undefined) || (this.srcImage == "")) {
                    this.AlertMsg2('Aleast 1  parking image is required');
                }
                else {
                    if ((this.srcImage1 == undefined) || (this.srcImage1 == "")) {
                        this.srcImage1 = "";
                    }
                    if ((this.srcImage2 == undefined) || (this.srcImage2 == "")) {
                        this.srcImage2 = "";
                    }
                    var postdata = {};
                    if (this.parkid == "") {
                        postdata = {
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
                            //  parking_space_id: this.parkid,
                            opening_days: this.senddays.join(','),
                            opening_time: this.sendopeningtime.join(','),
                            closing_time: this.sendclosingtime.join(','),
                        };
                    }
                    else {
                        postdata = {
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
                    }
                    var serialized = this.serializeObj(postdata);
                    console.log(postdata);
                    var Loading = this.loadingCtrl.create({
                        spinner: 'bubbles',
                        cssClass: 'loader',
                        content: "Loading",
                        dismissOnPageChange: true
                    });
                    Loading.present().then(function () {
                        _this.http.post(_this.appsetting.myGlobalVar + 'users/AddparkPlace', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                            Loading.dismiss();
                            console.log(data);
                            if (data.status == true) {
                                _this.AlertMsg1('Added succesfully');
                                localStorage.setItem('UserDetailseller', JSON.stringify(data.data[0]));
                                _this.navCtrl.push(ListparkingspacePage_1);
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
    ListparkingspacePage.prototype.AlertMsg2 = function (msg) {
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
    ListparkingspacePage.prototype.DeleteImage = function (index) {
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
    };
    ListparkingspacePage.prototype.DeleteImage1 = function () {
        this.leasingpic = "";
        this.leasingpicture = "";
    };
    ListparkingspacePage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    ListparkingspacePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListparkingspacePage');
    };
    ListparkingspacePage = ListparkingspacePage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-listparkingspace',
            templateUrl: 'listparkingspace.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            ToastController,
            ActionSheetController,
            Camera,
            Http,
            AlertController,
            LoadingController,
            Appsetting])
    ], ListparkingspacePage);
    return ListparkingspacePage;
    var ListparkingspacePage_1;
}());
export { ListparkingspacePage };
//# sourceMappingURL=listparkingspace.js.map