import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appsetting } from "../../providers/appsetting";
import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController, LoadingController,MenuController} from 'ionic-angular';
/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

termdata:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,

    public http: Http,
  public toastCtrl: ToastController,
 public menuCtrl: MenuController,
  public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public appsetting: Appsetting) {
    this.menuCtrl.swipeEnable(true);
      this.getterms()
  }
    getterms(){
//    alert('hjgj');
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let options = new RequestOptions({ headers: headers });
    var postdata = {
      pagename:'Terms & Condition(seller)'
    };
// alert('hjgj');
    var serialized = this.serializeObj(postdata);
    console.log(postdata);
     var Loading = this.loadingCtrl.create({
           spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
    dismissOnPageChange:true
        });
        Loading.present().then(() => {
    this.http.post(this.appsetting.myGlobalVar +'static/getstaticpagedata', serialized, options).map(res => res.json()).subscribe(data => {

    Loading.dismiss();
      console.log(data);
      this.termdata = data.data[0].pagedata;
    })
  })

 
  }
         serializeObj(obj) {
          var result = [];
          for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

          return result.join("&");
        }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
  }

}
