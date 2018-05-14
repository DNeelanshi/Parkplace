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
import { Http } from '@angular/http';
import { ToastController, AlertController, LoadingController } from 'ionic-angular';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetailPage = /** @class */ (function () {
    function DetailPage(navCtrl, navParams, http, toastCtrl, alertCtrl, loadingCtrl, appsetting) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appsetting = appsetting;
        console.log(this.navParams.data);
        this.details = this.navParams.data;
        var str = this.details.parkingaddress.split(',');
        this.addr1 = str[0] + ',' + str[1];
        this.addr2 = this.details.parkingaddress.substr(this.addr1.length + 1);
        console.log(this.addr1);
        console.log(this.addr2);
    }
    DetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailPage');
    };
    DetailPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-detail',
            templateUrl: 'detail.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Http,
            ToastController,
            AlertController,
            LoadingController,
            Appsetting])
    ], DetailPage);
    return DetailPage;
}());
export { DetailPage };
//# sourceMappingURL=detail.js.map