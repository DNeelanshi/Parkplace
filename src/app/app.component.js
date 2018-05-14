var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { CarlistPage } from '../pages/carlist/carlist';
import { GetstartedPage } from '../pages/getstarted/getstarted';
import { UpcomingreservationPage } from '../pages/upcomingreservation/upcomingreservation';
import { HistoricalreservationPage } from '../pages/historicalreservation/historicalreservation';
import { AddcarinfoPage } from '../pages/addcarinfo/addcarinfo';
import { MyprofiletwoPage } from '../pages/myprofiletwo/myprofiletwo';
import { HistoricalreservationtwoPage } from '../pages/historicalreservationtwo/historicalreservationtwo';
import { ViewreservationtwoPage } from '../pages/viewreservationtwo/viewreservationtwo';
import { ListparkingspacePage } from '../pages/listparkingspace/listparkingspace';
import { HometwoPage } from '../pages/hometwo/hometwo';
import { AddpaymentPage } from '../pages/addpayment/addpayment';
import { EditpaymentPage } from '../pages/editpayment/editpayment';
import { ParkinglistPage } from '../pages/parkinglist/parkinglist';
import { CheckstatusPage } from '../pages/checkstatus/checkstatus';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { ListingbeforeapprovalPage } from '../pages/listingbeforeapproval/listingbeforeapproval';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Appsetting } from "../providers/appsetting";
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, events, menuCtrl, http, appsetting, loadingCtrl) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.events = events;
        this.menuCtrl = menuCtrl;
        this.http = http;
        this.appsetting = appsetting;
        this.loadingCtrl = loadingCtrl;
        this.showSubmenu = false;
        this.rootPage = GetstartedPage;
        alert('Welcome to Park Place app');
        console.log('Welcome to park place');
        this.initializeApp();
        this.menuCtrl.swipeEnable(false);
        // used for an example of ngFor and navigation
        this.events.subscribe('seller', function (seller) {
            console.log(seller);
            console.log('seller');
            if (localStorage.getItem('UserDetailseller')) {
                var headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                var options = new RequestOptions({ headers: headers });
                var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
                console.log(userid);
                var postdata = {
                    user_id: userid
                };
                var serialized = _this.serializeObj(postdata);
                console.log(postdata);
                _this.http.post(_this.appsetting.myGlobalVar + 'users/userinfo', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                    if (data.status == true) {
                        console.log(data.data);
                        _this.appsetting.username = data.data.name;
                        _this.appsetting.emailuser = data.data.email;
                        if (data.data.profile_pic) {
                            _this.appsetting.SrcImage = data.data.profile_pic;
                        }
                        if (data.data.parking_space[0]) {
                            if (data.data.parking_space[0].length > 0) {
                                if (data.data.parking_space[0].parking_status == true) {
                                    _this.appsetting.haveparking = 1;
                                }
                                else {
                                    _this.appsetting.haveparking = 0;
                                }
                            }
                        }
                        console.log(_this.appsetting.haveparking);
                    }
                });
            }
            console.log(_this.appsetting.haveparking);
            if (_this.appsetting.haveparking == 0) {
                localStorage.setItem('hometype', '0');
                //              alert('small menu');
                _this.pages = [
                    { title: 'List Parking Space', component: ListingbeforeapprovalPage, icon: 'assets/imgs/viewreservationsicon.png', subItems: [] },
                    { title: 'Check Status', component: CheckstatusPage, icon: 'assets/imgs/s-checkstatus.png', subItems: [] },
                ];
            }
            else {
                _this.pages = [
                    { title: 'Home', component: HometwoPage, icon: 'assets/imgs/homeicon.png', subItems: [] },
                    { title: 'List Parking Space', component: ListparkingspacePage, icon: 'assets/imgs/viewreservationsicon.png', subItems: [] },
                    {
                        title: 'Reservation', component: '', icon: 'assets/imgs/carinformationicon.png', subItems: [
                            {
                                icon: 'assets/imgs/sviewreservations.png',
                                displayName: "View Reservation",
                                component: ViewreservationtwoPage,
                            },
                            {
                                icon: 'assets/imgs/historicalreservationsicon.png',
                                displayName: "Historical Reservation",
                                component: HistoricalreservationtwoPage,
                            }
                        ]
                    },
                    //                {title: 'View Reservation', component: ViewreservationPage, icon: 'assets/imgs/viewreservationsicon.png'},
                    //                {title: 'Historical Reservation', component: HistoricalreservationPage, icon: 'assets/imgs/historicalreservationsicon.png'},
                    { title: 'My Profile', component: MyprofiletwoPage, icon: 'assets/imgs/s-myprofile.png', subItems: [] },
                    {
                        title: 'Payment Info', component: '', icon: 'assets/imgs/billingicon.png', subItems: [
                            {
                                icon: 'assets/imgs/s-addpaymentinfo.png',
                                displayName: "Add Payment Info.",
                                component: AddpaymentPage,
                            },
                            {
                                icon: 'assets/imgs/s-editpaymentinfo.png',
                                displayName: "Edit Payment Info.",
                                component: EditpaymentPage,
                            }
                        ]
                    },
                    //                {title: 'Add Payment Info', component: AddpaymentPage, icon: 'assets/imgs/s-addpaymentinfo.png',subItems: []},
                    //                {title: 'Edit Payment Info', component: EditpaymentPage, icon: 'assets/imgs/s-editpaymentinfo.png',subItems: []},
                    { title: 'Edit Listing', component: ParkinglistPage, icon: 'assets/imgs/s-editlisting.png', subItems: [] },
                ];
            }
            console.log(_this.pages);
        });
        this.events.subscribe('customer', function (customer) {
            console.log(customer);
            if (localStorage.getItem('UserDetailcustomer')) {
                var headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                var options = new RequestOptions({ headers: headers });
                var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
                console.log(userid);
                var postdata = {
                    user_id: userid
                };
                var serialized = _this.serializeObj(postdata);
                console.log(postdata);
                _this.http.post(_this.appsetting.myGlobalVar + 'users/userinfo', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                    if (data.status == true) {
                        console.log(data.data);
                        _this.appsetting.username = data.data.name;
                        _this.appsetting.emailuser = data.data.email;
                        if (data.data.profile_pic) {
                            _this.appsetting.SrcImage = data.data.profile_pic;
                        }
                    }
                });
            }
            //              alert('menu')
            console.log('customer');
            _this.pages = [
                //      { title: 'Home', component: HometwoPage,icon: 'assets/imgs/homeicon.png' },
                { title: 'Home', component: HomePage, icon: 'assets/imgs/homeicon.png', subItems: [] },
                { title: 'Edit Profile', component: EditprofilePage, icon: 'assets/imgs/editprofileicon.png', subItems: [] },
                //                { title: 'Billing Information', component: BillinginformationPage,icon: 'assets/imgs/billingicon.png', subItems: [] },
                {
                    title: 'View Reservation', component: '', icon: 'assets/imgs/viewreservationsicon.png', subItems: [
                        {
                            icon: 'assets/imgs/upcomingreservationsicon.png',
                            displayName: "Upcoming Reservation",
                            component: UpcomingreservationPage,
                        },
                        {
                            icon: 'assets/imgs/historicalreservationsicon.png',
                            displayName: "Historical Reservation",
                            component: HistoricalreservationPage,
                        }
                    ]
                },
                //                {title: 'Upcoming Reservation', component: UpcomingreservationPage, icon: 'assets/imgs/upcomingreservationsicon.png'},
                //                {title: 'Historical Reservation', component: HistoricalreservationPage, icon: 'assets/imgs/historicalreservationsicon.png'},
                {
                    title: 'Car Information', component: '', icon: 'assets/imgs/carinformationicon.png', subItems: [
                        {
                            icon: 'assets/imgs/addcarinformationicon.png',
                            displayName: "Add Car Information",
                            component: AddcarinfoPage,
                        },
                        {
                            icon: 'assets/imgs/editcarinformationicon.png',
                            displayName: "Edit Car Information",
                            component: CarlistPage,
                        }
                    ]
                },
            ];
        });
        // this.getuserdetail();
    }
    MyApp.prototype.getuserdetail = function () {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        var options = new RequestOptions({ headers: headers });
        if (localStorage.getItem('UserDetail')) {
            var userid = JSON.parse(localStorage.getItem('UserDetail'))._id;
            console.log(userid);
            var postdata = {
                id: userid
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
                _this.http.post(_this.appsetting.myGlobalVar + 'users/userinfo ', serialized, options).map(function (res) { return res.json(); }).subscribe(function (data) {
                    setTimeout(function () {
                        Loading.dismiss();
                    }, 3000);
                    console.log(data);
                });
            });
        }
    };
    MyApp.prototype.serializeObj = function (obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        return result.join("&");
    };
    MyApp.prototype.signout = function () {
        if (localStorage.getItem('UserDetail')) {
            // console.log(localStorage.getItem('UserInfo'));
            localStorage.removeItem('UserDetail');
        }
        if (localStorage.getItem('UserDetailseller')) {
            // console.log(localStorage.getItem('UserInfo'));
            // console.log(localStorage.getItem('UserInfo'));
            localStorage.removeItem('UserDetailseller');
            localStorage.removeItem('Done');
        }
        if (localStorage.getItem('UserDetailcustomer')) {
            // console.log(localStorage.getItem('UserInfo'));
            // console.log(localStorage.getItem('UserInfo'));
            localStorage.removeItem('UserDetailcustomer');
        }
        //      alert('signout');
        this.nav.setRoot(GetstartedPage);
        this.menuCtrl.close();
        this.appsetting.SrcImage = '';
        // this.app.getRootNav().setRoot(GetstartedPage);
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page, i) {
        //alert('openPage');
        console.log(page);
        console.log(this.pages);
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        console.log(this.pages);
        this.pages[i].open = !this.pages[i].open;
        if ((page.title == "Reservation") || (page.title == "Payment Info") || (page.title == "View Reservation") || (page.title == "Car Information")) {
            // this.menuCtrl.close();
            console.log(page.title);
        }
        else {
            this.pages.forEach(function (value, key) {
                value.open = false;
            });
            this.menuCtrl.close();
        }
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.toggleSection = function (page, i) {
        //alert('toggleSection');
        console.log(page);
        console.log(i);
        this.pages[i].open = !this.pages[i].open;
        if ((page.title == "Reservation") || (page.title == "Payment Info") || (page.title == "View Reservation") || (page.title == "Car Information")) {
            console.log(page.title);
        }
        else {
            this.pages.forEach(function (value, key) {
                value.open = false;
            });
            this.menuCtrl.close();
        }
        this.nav.setRoot(page.component);
        //this.menuCtrl.close();
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform,
            StatusBar,
            SplashScreen,
            Events,
            MenuController,
            Http,
            Appsetting,
            LoadingController])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map