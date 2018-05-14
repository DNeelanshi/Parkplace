var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the Appsetting provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var Appsetting = /** @class */ (function () {
    function Appsetting(http, toastCtrl) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.cart = [];
        this.saved = [];
        this.svd = [];
        this.haveparking = 0;
        this.myGlobalVar = 'http://parkplace-env.w2eidiwpex.us-west-1.elasticbeanstalk.com/api/'; //'http://ec2-13-59-151-198.us-east-2.compute.amazonaws.com/api/';//'http://fashapp.io/api/';
        console.log('Hello Appsetting Provider');
        // if(localStorage.getItem('UserInfo')){
        //   console.log(localStorage.getItem('UserInfo'));
        //   this.navCtrl.push(TabsPage);
        // }else{
        //   this.navCtrl.push(SigninPage);
        // }
    }
    Appsetting.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
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
    Appsetting = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            ToastController])
    ], Appsetting);
    return Appsetting;
}());
export { Appsetting };
//# sourceMappingURL=appsetting.js.map