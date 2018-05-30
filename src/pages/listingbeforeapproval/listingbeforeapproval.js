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
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the ListingbeforeapprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListingbeforeapprovalPage = /** @class */ (function () {
    function ListingbeforeapprovalPage(navCtrl, navParams, toastCtrl, actionSheetCtrl, camera, http, alertCtrl, menuCtrl, iab, loadingCtrl, appsetting) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.iab = iab;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        this.data = {};
        this.arr = [];
        this.stripebutton = true;
        this.bit = 0;
        this.imgarr = [];
        this.formattedaddres = [];
        this.autocompleteItems = [];
        this.geocoder = new google.maps.Geocoder();
        this.menuCtrl.swipeEnable(true);
        //        alert('latestbuildneww');
        //                  url: "http://parkpalce-env.brwtkwbdhh.us-west-1.elasticbeanstalk.com/?state=state&scope=read_write&code=ac_Cnb4QYIhr01Uouum97SIdGTWfXkvZidQ#/"
        // if(localStorage.getItem('blurr')){
        //   if(localStorage.getItem('UserDetailseller')){
        //     var ID = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
        //        var IDD = JSON.parse(localStorage.getItem('blurr')).data[0]._id
        //        if(ID == IDD){
        //         this.blurr = true;
        //       }
        //        }
        //   }
        this.checkstatus();
        //         alert('uploaded');
    }
    ListingbeforeapprovalPage_1 = ListingbeforeapprovalPage;
    ListingbeforeapprovalPage.prototype.createAuthorizationHeader = function (arg0) {
        throw new Error("Method not implemented.");
    };
    ListingbeforeapprovalPage.prototype.stripeconnect = function () {
        var _this = this;
        var tmp = this;
        var url = "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_CnDxovfAQdcrSndqkA6O5YsSsw0NE54p&scope=read_write";
        var a;
        var b;
        var c;
        var target = '_self';
        var options = { location: 'no' };
        var browser = this.iab.create(url, '_blank', { location: 'no' });
        console.log('before');
        browser.on('loadstart').subscribe(function (e) {
            console.log(e);
            var url = e.url;
            if (e.url.includes('http://parkpalce-env.brwtkwbdhh.us-west-1.elasticbeanstalk.com/?') == true) {
                if (e.url.includes('code') == true) {
                    var res = url.split("=");
                    var res1 = res[2];
                    tmp.codee = res1;
                    console.log(tmp.codee);
                    var res3 = url.split("?");
                    var res4 = res3[1].split("=");
                    console.log(res4);
                    browser.close();
                    tmp.AlertMsg3('Your stripe account is about to connect', _this.codee);
                }
                else if (res4[0] == 'error') {
                    var res5 = res3[1].split("&");
                    tmp.AlertMsg1(res5[0]);
                    browser.close();
                }
                else {
                    browser.close();
                    tmp.AlertMsg1('Your stripe account is not set up yet');
                }
                console.log(res1);
                console.log(browser);
                browser.close();
            }
            //           http://parkpalce-env.brwtkwbdhh.us-west-1.elasticbeanstalk.com/?scope=read_write&code=ac_CnZfswS7ZDZvpIwsgazFMTnAyRYHq6Xd"
        }, function (err) {
            console.log("InAppBrowser loadstart Event Error: " + err);
        });
        console.log('after');
        console.log(this.codee);
    };
    ListingbeforeapprovalPage.prototype.checkstatus = function () {
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
                        console.log(data.data.parking_space.length);
                        _this.datauser = data.data;
                        if (data.data.parking_space.length == 0) {
                            _this.blurr = false;
                            console.log('next false');
                        }
                        else {
                            if (data.data.parking_space[0].status == true) {
                                console.log('true');
                                _this.blurr = true;
                            }
                            else {
                                _this.blurr = true;
                                console.log('true');
                            }
                        }
                    }
                });
            });
        }
    };
    ListingbeforeapprovalPage.prototype.ngOnInit = function () {
        // alert("neelanshi");
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
    };
    ListingbeforeapprovalPage.prototype.updateSearch = function () {
        var _this = this;
        console.log('search');
        var config = {
            //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
            input: this.data.address,
            componentRestrictions: {}
        };
        this.acService.getPlacePredictions(config, (function (predictions, status) {
            console.log('modal > getPlacePredictions > status > ', status);
            _this.autocompleteItems = [];
            console.log(predictions);
            predictions.forEach((function (prediction) {
                console.log("abc");
                _this.autocompleteItems.push(prediction);
            }));
        }));
        if (this.data.address == '') {
            this.autocompleteItems = ' ';
        }
    };
    ListingbeforeapprovalPage.prototype.chooseItem = function (item) {
        console.log(item);
        this.data.address = item.description;
        this.geocoder.geocode({ 'placeId': item.place_id }, (function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    console.log(results[0]);
                    // for(var i = results[0].address_components.length; i>=0;i--){
                    //   this.ziptosend = results[0].address_components[i].longname
                    //   this.statetosend = results[0].address_components[i-1].longname
                    //   this.citytosend = results[0].address_components[i-2].longname
                    //   this.streettosend = results[0].address_components[(i-i)+1].longname+ +results[0].address_components[i-i].longname+ +results[0].address_components[i-3].longname
                    // }
                }
            }
        }));
        this.autocompleteItems = [];
    };
    ListingbeforeapprovalPage.prototype.uploadagreement = function () {
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
    ListingbeforeapprovalPage.prototype.chooseImage = function (Type) {
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
    ListingbeforeapprovalPage.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    ListingbeforeapprovalPage.prototype.CameraAction = function () {
        var _this = this;
        console.log('opening');
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
    ListingbeforeapprovalPage.prototype.chooseImage1 = function (Type) {
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
    ListingbeforeapprovalPage.prototype.hitimage = function (IMAGE) {
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
    ListingbeforeapprovalPage.prototype.AlertMsg1 = function (msg) {
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
    //    demo() {
    //        this.AlertMsg3('done', 'ac_CngJALR3NayuRnocJjyXDrQvv8mXLxye')
    //    }
    ListingbeforeapprovalPage.prototype.AlertMsg3 = function (msg, cod) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Park Place',
            message: msg,
            buttons: [
                {
                    text: 'OK',
                    role: 'submit',
                    handler: function () {
                        var headers = new Headers();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                        var options = new RequestOptions({ headers: headers });
                        if (localStorage.getItem('UserDetailseller')) {
                            var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
                            console.log(userid);
                            var postdata = {
                                user_id: userid,
                                code: cod
                            };
                            var serialized = _this.serializeObj(postdata);
                            console.log(postdata);
                            _this.http.post(_this.appsetting.myGlobalVar + 'users/StripeConnect', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                                console.log(data);
                                if (data.status == true) {
                                    _this.AlertMsg1(data.message);
                                    _this.stripebutton = false;
                                }
                                else {
                                    _this.AlertMsg1(data.message);
                                }
                            });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    //    AlertMsg3(msg, c    od) {
    //        let alert = this.alertCtrl.cre    ate({
    //            title: 'Park Pl    ace',
    //            message:     msg,
    //            butto    ns: [
    //                    {
    //                    text:     'OK',
    //                    role: 'sub    mit',
    //                    handler: ()     => {
    //                        console.log('ok click    ed');
    //                        console.log(    cod);
    //                        let headers = new Heade    rs();
    //                        //headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf    -8');
    //                        headers.append('Access-Control-Allow-Origin',     '*');
    //                       // let options = new RequestOptions({headers: heade    rs});
    //                        headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIO    NS');
    //                        headers.append('cache-control', 'no-cac    he');
    //                        headers.append( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-    8' );
    //                        let options = new RequestOptions( { headers: header    s });
    //                        var postdat    a = {
    //                            client_secret: "sk_test_iejGm9FOlRkRbnZCubIqn    xEu",
    //                            code:     cod,
    //                            grant_type: "authorization_    code"
    //                            };
    //                        //this.addQuestion(postd    ata);
    //                        var serialized = this.serializeObj(postd    ata);
    //                        console.log(postd    ata);
    //                        console.log(opti    ons);
    //                         this.http.connect('https://connect.stripe.com/oauth/token', postdata, opt    ions)
    //                             .map(res => res.js    on())
    //                                 .subscribe(data     => {
    //                              console.log(d    ata);
    //                              this.stripebutton = f    alse;
    //                           })
    //                        }
    //                    }
    //                ]
    //            });
    //        alert.prese    nt();
    //        }
    //    public addQuestion(data:     any){
    // let headers = new Heade    rs();
    // this.createAuthorizationHeader(head    ers);
    //                        //headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf    -8');
    //                        headers.append('Access-Control-Allow-Origin',     '*');
    //                        //let options = new RequestOptions({headers: heade    rs});
    //                        headers.append('Access-Control-Allow-Methods', 'PO    ST');
    //                        headers.append('cache-control', 'no-cac    he');
    //                        headers.append( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-    8' );
    //                        let options = new RequestOptions( { headers: header    s });
    //                        var postdat    a = {
    //                            client_secret: "sk_test_iejGm9FOlRkRbnZCubIqn    xEu",
    //                            code: 'ac_CnanV627Qhct6ncRJhREQBdkcqMxk    ZGF',
    //                            grant_type: "authorization_    code"
    //                            };
    //                        //this.addQuestion(postd    ata);
    //                        var serialized = this.serializeObj(postd    ata);
    //                        console.log(postd    ata);
    //                        console.log(opti    ons);
    //                         this.http.post('https://connect.stripe.com/oauth/token', postdata, opt    ions)
    //                             .map(res => res.js    on())
    //                                 .subscribe(data     => {
    //                              console.log(d    ata);
    //                              this.stripebutton = f    alse;
    //                           })
    //    let headersObj = new Heade    rs();
    //    headersObj.append('Content-Type', 'application/x-www-form-urlencod    ed');
    //    headersObj.append('Access-Control-Allow-Origin',     '*');
    //    let requestArg: RequestOptionsArgs = { headers: headersObj, method: "POS    T"     };
    //
    //    var params = new URLSearchPara    ms();
    //    for(let key of Object.keys(dat    a)){ 
    //      params.set(key,data[k    ey]);
    //            };
    //
    //    this.http.post('https://connect.stripe.com/oauth/token', params.toString(), reques    tArg)
    //    //.map((res: Response) => res.json().d    ata);
    //    .subscribe(data     => {
    //                              console.log(d    ata);
    //                             // this.stripebutton = f    alse;
    //                       })
    ListingbeforeapprovalPage.prototype.Addparking = function (formdetail) {
        var temp = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        headers.append('Access-Control-Allow-Origin', '*');
        var options = new RequestOptions({ headers: headers });
        var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
        this.geocoder.geocode({ 'address': formdetail.value.address }, function (results, status1) {
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
                if (this.formattedaddres.length == 4) {
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
                    temp.finalladd(formdetail, _this.streettosend, _this.statetosend, _this.citytosend, _this.ziptosend, _this.lat, _this.long);
                    //               temp.finalladd(parkingdata,parkingdata.value.streetaddress,parkingdata.value.state,parkingdata.value.city,parkingdata.value.zip,this.lat,this.long);
                }, 500);
            }
            else {
                this.AlertMsg1('There is some error in getting location.');
            }
        });
        //     this.http.post('https://maps.googleapis.com/maps/api/geocode/json?address='+formdetail.value.address+'&key=AIzaSyA1DlP6ydTPDHSNBT_99W80TjfSGEcthhE', options).map(res => res.json()).subscribe(data => {
        //   console.log(data);
        // })
        console.log(formdetail);
    };
    ListingbeforeapprovalPage.prototype.finalladd = function (formdetail, streettosend, statetosend, citytosend, ziptosend, lat, long) {
        var _this = this;
        console.log(formdetail);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
        if ((streettosend == undefined) || (statetosend == undefined) || (citytosend == undefined) || (ziptosend == undefined) || (lat == undefined)) {
            this.AlertMsg1('Please enter specific location');
        }
        else {
            console.log(this.codee);
            if ((this.codee == undefined) || (this.codee == "")) {
                this.AlertMsg1('Please connect with stripe');
            }
            else {
                if ((this.leasingpicture == undefined) || (this.leasingpicture == "")) {
                    this.AlertMsg1('Leasing agreement is required');
                }
                else if ((this.srcImage == undefined) || (this.srcImage == "")) {
                    this.AlertMsg1('Aleast 1  parking image is required');
                }
                else {
                    if ((this.srcImage1 == undefined) || (this.srcImage1 == "")) {
                        this.srcImage1 = "";
                    }
                    if ((this.srcImage2 == undefined) || (this.srcImage2 == "")) {
                        this.srcImage2 = "";
                    }
                    var postdata = {
                        //   parking_name:'',
                        street_address: streettosend,
                        city: citytosend,
                        state: statetosend,
                        // space_number:priyank's_space_does_not have number1,
                        // parking_size:2001,
                        // restriction:no_girls1,
                        // hourly_rate:121,
                        agreement_pic: this.leasingpicture,
                        image_pic0: this.srcImage,
                        image_pic1: this.srcImage1,
                        image_pic2: this.srcImage2,
                        //                    agreement_pic: "https://legaltemplates.net/wp-content/uploads/2015/03/lease-agreement.png",
                        //                    image_pic0: "http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
                        //                    image_pic1: "http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
                        //                    image_pic2: "http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
                        zip_code: ziptosend,
                        // user_id:5accc7a78e39673f13abaf62,
                        lat: lat,
                        long: long,
                        user_id: userid,
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
                        _this.http.post(_this.appsetting.myGlobalVar + 'users/AddparkPlace', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                            Loading.dismiss();
                            console.log(data);
                            if (data.status == true) {
                                _this.AlertMsg1('Added successfully');
                                _this.blurr = true;
                                _this.navCtrl.push(ListingbeforeapprovalPage_1);
                                // localStorage.setItem('blurr',JSON.stringify(data));
                            }
                            else {
                                _this.AlertMsg1(data.message);
                            }
                        });
                    });
                }
            }
        }
    };
    ListingbeforeapprovalPage.prototype.DeleteImage = function (index) {
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
    ListingbeforeapprovalPage.prototype.DeleteImage1 = function () {
        this.leasingpic = "";
        this.leasingpicture = "";
    };
    ListingbeforeapprovalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListingbeforeapprovalPage');
        console.log('Neelanshi');
        console.log(window.navigator.onLine);
        if (window.navigator.onLine == true) {
        }
        else {
            var toast = this.toastCtrl.create({
                message: 'Network connection failed',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
    };
    ListingbeforeapprovalPage = ListingbeforeapprovalPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-listingbeforeapproval',
            templateUrl: 'listingbeforeapproval.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ToastController,
            ActionSheetController,
            Camera,
            Http,
            AlertController,
            MenuController,
            InAppBrowser,
            LoadingController,
            Appsetting])
    ], ListingbeforeapprovalPage);
    return ListingbeforeapprovalPage;
    var ListingbeforeapprovalPage_1;
}());
export { ListingbeforeapprovalPage };
//# sourceMappingURL=listingbeforeapproval.js.map