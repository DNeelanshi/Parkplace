import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Appsetting} from "../../providers/appsetting";
import {HomePage} from '../home/home';
import {Http, Headers, RequestOptions} from '@angular/http';
import {ToastController, AlertController, LoadingController, ActionSheetController} from 'ionic-angular';
/**
 * Generated class for the HistoricalreservationtwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-historicalreservationtwo',
    templateUrl: 'historicalreservationtwo.html',
})
export class HistoricalreservationtwoPage {

    Reservationdata: any = [];
    Reservationdata1: any = [];
    infiniteScroll: any;
    Pagetotal: number = 1;
    pagon: number = 1;
    pagein: number = 1;
    show:number;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public http: Http,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public appsetting: Appsetting) {

        this.Reservationdata = [];
    }
    ngOnInit() {
        this.getreservations(1);
    }
    getreservations(pagenumber) {
        var Loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
            dismissOnPageChange: true
        });
        Loading.present().then(() => {

            var imagearray: any = [];
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            let options = new RequestOptions({headers: headers});
            if (localStorage.getItem('UserDetailseller')) {
                var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
                console.log(userid);

                var postdata = {
                    user_id: userid,
                    role: 'seller',
                    page: pagenumber,
                    checkin_status: 2
                };

                var serialized = this.serializeObj(postdata);
                console.log(postdata);

                this.http.post(this.appsetting.myGlobalVar + 'payments/GetReservation', serialized, options).map(res => res.json()).subscribe(data => {


                    console.log(data);
                    if (data.status == true) {
                        this.Reservationdata1 = [];
                        this.Pagetotal = data.Toatalpage;
                        this.pagein = data.page;
                        this.Reservationdata1 = data.data;
                        this.show=1;
                        this.Reservationdata1.forEach(function (value, key) {
                            value.reservation_data.forEach(function (value2, key1) {
                                console.log('yess');
                                value.customername = value2.name;
                                if (value2.profile_pic) {
                                    value.propic = value2.profile_pic;
                                }

                            })
                        })
                        var temp = this;
                        this.Reservationdata1.forEach(function (value, key) {
                            temp.Reservationdata.push(value);
                        })
                        console.log(temp.Reservationdata)
                    }else{
                        this.show=0;
                    }
                    Loading.dismiss();
                })


            }
        })
    }
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
            //            this.firsthit();
            this.getreservations(1);
            this.Reservationdata = [];
            //             this.get();
            console.log('Async operation has ended');
            refresher.complete();
        }, 3000);
    }
    doInfinite(event) {
        console.log(event);
        console.log(this.Pagetotal);
        console.log(this.pagon);
        console.log(this.pagein);
        this.infiniteScroll = event;
        if (this.pagon < this.Pagetotal) {
            console.log(this.Pagetotal);
            this.pagon++;
            console.log(this.pagon);
            this.getreservations(this.pagon)
        } else if (this.Pagetotal == this.pagein) {
            event.complete();
        } else {
            event.complete();
        }
    }
    serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

        return result.join("&");
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad HISTORICALSELLER');
    }


}
