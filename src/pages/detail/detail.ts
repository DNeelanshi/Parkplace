import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController,ActionSheetController,MenuController} from 'ionic-angular';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
details:any;
addr1:any;
addr2:any;
Phonenumber:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
      public menuCtrl: MenuController,
      public loadingCtrl: LoadingController,
      public appsetting: Appsetting) {
      
        this.menuCtrl.swipeEnable(true);
      console.log(this.navParams.data);
      this.details = this.navParams.data;
      var str = this.details.parkingaddress.split(',');
      this.addr1 = str[0]+','+str[1];
      this.addr2 = this.details.parkingaddress.substr(this.addr1.length+1);
      console.log(this.addr1);
       console.log(this.addr2);
           if(this.details.phonenumber){
 console.log(this.details.phonenumber.length);

    var str = this.details.phonenumber;
    var res = str.substring(0, 3);
     var res1 = str.substring(3, 6);
      var res2 = str.substring(6,10);
       console.log(res+'-'+res1+'-'+res2);
        // var res2 = str.substring(12,9);
    this.Phonenumber=res+'-'+res1+'-'+res2;
    console.log(this.Phonenumber);
    
   }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
