import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Appsetting} from "../../providers/appsetting";
import {HomePage} from '../home/home';
import {MikehousePage} from '../mikehouse/mikehouse';
import {Http, Headers, RequestOptions} from '@angular/http';
import {ToastController, AlertController, LoadingController} from 'ionic-angular';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import {MyApp} from '../../app/app.component';
import {ActionSheetController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import * as moment from 'moment';

/**
 * Generated class for the AddcarinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-addcarinfo',
    templateUrl: 'addcarinfo.html',
})
export class AddcarinfoPage {
    public data: any = [];
    carpic: any = '';
    carpicture: any;
    date:any;
    pagenameprevious:any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        public http: Http,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public appsetting: Appsetting) {
           this.pagenameprevious=this.navCtrl.last();
//        console.log("VAL");
           console.log(this.pagenameprevious.component.name);
           this.date = moment(new Date()).format('YYYY-MM-DD');
        console.log(this.date); 
    }
    Addcar(cardata) {
        console.log(cardata.value);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({headers: headers});
        var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
                 if(this.carpicture == undefined){
            this.AlertMsg1('Car picture is required');
        
          }else{
        var postdata = {
            car_maker: cardata.value.carmake,
            model: cardata.value.model,
            year: cardata.value.year,
            licencse_plate: cardata.value.licence,
            user_id: userid,
            car_images:this.carpicture
//            car_images: "https://s.hswstatic.com/gif/hydrogen-vehicle-danger-1.jpg"

        };

        var serialized = this.serializeObj(postdata);
        console.log(postdata);

        var Loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            cssClass: 'loader',
            content: "Loading",
            dismissOnPageChange: true
        });
        Loading.present().then(() => {

            this.http.post(this.appsetting.myGlobalVar + 'users/addCar', serialized, options).map(res => res.json()).subscribe(data => {

                Loading.dismiss();
                console.log(data);
                if(data.status == true){
                    this.AlertMsg1('Car information added succesfully')
                  if(this.pagenameprevious.component.name == 'MikehousePage'){
                    
                    this.navCtrl.push(MikehousePage);
                    }else{
                        this.navCtrl.push(AddcarinfoPage);
                    }
                }
            })
        })
          }
    }
    AlertMsg1(msg) {
        let alert = this.alertCtrl.create({
            title: 'Park Place',
            message: msg,
            buttons: [
                {
                    text: 'OK',
                    role: 'submit',
                    handler: () => {
                        console.log('ok clicked');
                        // this.navCtrl.push(ProcessingformPage);
                    }
                }
            ]
        });
        alert.present();
    }
    carpicupload() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Choose image',
            buttons: [
                {
                    text: 'Camera',
                    role: 'submit',
                    handler: () => {
                        console.log('camera clicked');
                        this.chooseImage(1);
                    }
                },
                {
                    text: 'Gallery',
                    handler: () => {
                        console.log('Gallery clicked');
                        this.chooseImage(0);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    public chooseImage(Type) {
        console.log(Type)
        const options: CameraOptions = {
            quality: 10,
            sourceType: Type,
            targetWidth: 767,
            targetHeight: 100,
            correctOrientation: true,
            allowEdit: true,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {

            this.carpic = 'data:image/jpeg;base64,' + imageData;
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            let options = new RequestOptions({headers: headers});
            var postdata = {
                picture: this.carpic
            };
            //           alert(postdata)
            var serialized = this.serializeObj(postdata);
            var Loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                cssClass: 'loader',
                content: "Loading",
                dismissOnPageChange: true
            });
            Loading.present().then(() => {
                this.http.post(this.appsetting.myGlobalVar + 'users/ImageUploader', postdata).map(res => res.json()).subscribe(data => {
                    Loading.dismiss();
                    console.log(data)
                    //          alert(data.data);
                    if (data.status == true) {
                        this.carpicture = data.data;
                    } else {
                        this.AlertMsg1('Image cannot be uploaded.Please try again later')
                    }



                })
            }, (err) => {
                console.log(JSON.stringify(err))
                alert(JSON.stringify(err))
            })

        }, (err) => {
            console.log(err);
        });
    }
    serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

        return result.join("&");
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad AddcarinfoPage');
    }

}
