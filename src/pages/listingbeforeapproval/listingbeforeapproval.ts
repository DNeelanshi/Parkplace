import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HometwoPage} from '../hometwo/hometwo';
import {Appsetting} from "../../providers/appsetting";
import {HomePage} from '../home/home';
import {Http, Headers, RequestOptions, RequestMethod, RequestOptionsArgs} from '@angular/http';
import {ToastController, AlertController, LoadingController,MenuController} from 'ionic-angular';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import {MyApp} from '../../app/app.component';
import {ActionSheetController} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
declare var google;
import {InAppBrowser} from '@ionic-native/in-app-browser';
/**
 * Generated class for the ListingbeforeapprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-listingbeforeapproval',
    templateUrl: 'listingbeforeapproval.html',
})
export class ListingbeforeapprovalPage {
    createAuthorizationHeader(arg0: any): any {
        throw new Error("Method not implemented.");
    }
    data: any = {}
    lat: any;
    arr: any = [];
    codee: any;
    stripebutton: Boolean = true;
    blurr: Boolean;
    bit: number = 0;
    imgarr: any = [];
    formattedaddres: any = [];
    citytosend: any;
    streettosend: any;
    statetosend: any;
    ziptosend: any;
    datauser: any;
    long: any;
    srcImage; srcImage1; srcImage2;
    leasingpic: any;
    leasingpicture: any;
    acService: any;
    autocompleteItems: any = [];
    geocoder = new google.maps.Geocoder();
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        public http: Http,
        public alertCtrl: AlertController,
           public menuCtrl: MenuController,
        public iab: InAppBrowser,
        public loadingCtrl: LoadingController,
        public appsetting: Appsetting) {
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
    stripeconnect() {
        var tmp = this;
        var url = "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_CnDxovfAQdcrSndqkA6O5YsSsw0NE54p&scope=read_write";
        var a: any; var b: any; var c: any;
        var target = '_self'
        var options = {location: 'no'};
        var browser = this.iab.create(url, '_blank', {location: 'no'});
        console.log('before');
        browser.on('loadstart').subscribe((e) => {
            console.log(e);
            let url = e.url;

            if (e.url.includes('http://parkpalce-env.brwtkwbdhh.us-west-1.elasticbeanstalk.com/?') == true) {

                if (e.url.includes('code') == true) {
                    var res = url.split("=");
                    var res1 = res[2];
                    tmp.codee = res1;
                    console.log(tmp.codee)
                    var res3 = url.split("?");
                    var res4 = res3[1].split("=");
                    console.log(res4)
                    browser.close();
                    tmp.AlertMsg3('Your stripe account is about to connect', this.codee);
                } else if (res4[0] == 'error') {

                    var res5 = res3[1].split("&");
                    tmp.AlertMsg1(res5[0])
                    browser.close();
                }
                else {
                    browser.close();
                    tmp.AlertMsg1('Your stripe account is not set up yet')
                }

                console.log(res1)
                console.log(browser);
                browser.close();
            }
            //           http://parkpalce-env.brwtkwbdhh.us-west-1.elasticbeanstalk.com/?scope=read_write&code=ac_CnZfswS7ZDZvpIwsgazFMTnAyRYHq6Xd"
        }, err => {
            console.log("InAppBrowser loadstart Event Error: " + err);
        });
        console.log('after');
        console.log(this.codee);

    }
    checkstatus() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({headers: headers});
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
            Loading.present().then(() => {
                this.http.post(this.appsetting.myGlobalVar + 'users/userinfo', serialized, options).map(res => res.json()).subscribe(data => {

                    Loading.dismiss();
                    console.log(data);
                    if (data.status == true) {
                        console.log(data.data.parking_space.length)
                        this.datauser = data.data;
                        if (data.data.parking_space.length == 0) {
                            this.blurr = false;
                            console.log('next false');

                        } else {
                            if (data.data.parking_space[0].status == true) {
                                console.log('true');
                                this.blurr = true;
                            } else {
                                this.blurr = true;
                                console.log('true');
                            }
                        }
                    }
                })
            })
        }
    }
    ngOnInit() {
        // alert("neelanshi");
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
    }
    updateSearch() {
        console.log('search');
        let config = {
            //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
            input: this.data.address,
            componentRestrictions: {}
        }
        this.acService.getPlacePredictions(config, ((predictions, status) => {
            console.log('modal > getPlacePredictions > status > ', status);
            this.autocompleteItems = [];
            console.log(predictions)
            predictions.forEach(((prediction) => {
                console.log("abc")
                this.autocompleteItems.push(prediction);
            })
            );
        })
        );
        if (this.data.address == '') {
            this.autocompleteItems = ' '
        }
    }
    chooseItem(item) {
        console.log(item)
        this.data.address = item.description;


        this.geocoder.geocode({'placeId': item.place_id}, ((results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    console.log(results[0])
                    // for(var i = results[0].address_components.length; i>=0;i--){

                    //   this.ziptosend = results[0].address_components[i].longname
                    //   this.statetosend = results[0].address_components[i-1].longname
                    //   this.citytosend = results[0].address_components[i-2].longname
                    //   this.streettosend = results[0].address_components[(i-i)+1].longname+ +results[0].address_components[i-i].longname+ +results[0].address_components[i-3].longname
                    // }


                }
            }
        }))
        this.autocompleteItems = [];
    }
    uploadagreement() {
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
            targetHeight: 600,
            correctOrientation: true,
            allowEdit: true,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {

            this.leasingpic = 'data:image/jpeg;base64,' + imageData;
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            let options = new RequestOptions({headers: headers});
            var postdata = {
                picture: this.leasingpic
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
                        this.leasingpicture = data.data;
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
    CameraAction() {


        console.log('opening');
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({headers: headers});
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Choose image',
            buttons: [
                {
                    text: 'Camera',
                    role: 'submit',
                    handler: () => {
                        console.log('camera clicked');
                        this.chooseImage1(1);
                    }
                },
                {
                    text: 'Gallery',
                    handler: () => {
                        console.log('Gallery clicked');
                        this.chooseImage1(0);
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
    public chooseImage1(Type) {
        console.log(Type)
        const options: CameraOptions = {
            quality: 10,
            sourceType: Type,
            targetWidth: 800,
            targetHeight: 800,
            correctOrientation: true,
            allowEdit: true,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.bit = this.bit + 1;
            //alert(this.bit);
            if (this.bit > 3) {
                this.AlertMsg1('You cannot upload more than 3 images');
            } else {
                this.arr.push('data:image/jpeg;base64,' + imageData);
                this.imgarr.push(imageData);
                if (this.imgarr.length == 1) {
                    // this.srcImage = this.imgarr[0];
                    // this.srcImage1 = "";
                    // this.srcImage2 = "";
                    this.hitimage(this.imgarr[0]);
                }
                if (this.imgarr.length == 2) {
                    // this.srcImage = this.imgarr[0];
                    // this.srcImage1 = this.imgarr[1];
                    this.hitimage(this.imgarr[1]);
                    // this.srcImage2 = "";
                }
                if (this.imgarr.length == 3) {
                    // this.srcImage = this.imgarr[0];
                    // this.srcImage1 = this.imgarr[1];
                    // this.srcImage2 = this.imgarr[2];
                    this.hitimage(this.imgarr[2]);
                }
                console.log(this.arr.length);

            }
            //console.log(this.base64Image);
        }, (err) => {
            // Handle error
            console.log(err);
        });
    }
    hitimage(IMAGE) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({headers: headers});
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
        Loading.present().then(() => {
            this.http.post(this.appsetting.myGlobalVar + 'users/ImageUploader', postdata).map(res => res.json()).subscribe(data => {
                Loading.dismiss();
                console.log(data)
                //    alert(data.data);
                if (data.status == true) {
                    if (this.bit == 1) {
                        this.srcImage = data.data;
                        //        alert( this.bit+''+this.srcImage);
                    } else if (this.bit == 2) {
                        this.srcImage1 = data.data;
                        //        alert( this.bit+''+this.srcImage1);
                    } else if (this.bit == 3) {
                        this.srcImage2 = data.data;
                        //        alert( this.bit+''+this.srcImage2);
                    }
                    //      alert(this.srcImage+''+this.srcImage1+''+this.srcImage2);
                } else {
                    this.AlertMsg1('Image cannot be uploaded.Please try again later')
                }
            })
        }, (err) => {
            console.log(JSON.stringify(err))
            alert(JSON.stringify(err))
        })
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
//    demo() {
//        this.AlertMsg3('done', 'ac_CngJALR3NayuRnocJjyXDrQvv8mXLxye')
//    }
    AlertMsg3(msg, cod) {
        let alert = this.alertCtrl.create({
            title: 'Park Place',
            message: msg,
            buttons: [
                {
                    text: 'OK',
                    role: 'submit',
                    handler: () => {
                        let headers = new Headers();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                        let options = new RequestOptions({headers: headers});
                        if (localStorage.getItem('UserDetailseller')) {
                            var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
                            console.log(userid);

                            var postdata = {
                                user_id: userid,
                                code: cod
                            };

                            var serialized = this.serializeObj(postdata);
                            console.log(postdata);
                           
                                this.http.post(this.appsetting.myGlobalVar + 'users/StripeConnect', serialized, options).map(res => res.json()).subscribe(data => {
                                    console.log(data);
                                    if (data.status == true) {
                                        this.AlertMsg1(data.message)
                                        this.stripebutton= false;
                                    } else {
                                        this.AlertMsg1(data.message)
                                    }
                                })
                             }
                        }
                    }]
            });
            alert.present();
        }

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



    Addparking(formdetail) {
        var temp = this;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({headers: headers});
        var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
        this.geocoder.geocode({'address': formdetail.value.address}, function (results, status1) {
            if (status1 === "OK") {
                console.log(results[0]);
                this.lat = results[0].geometry.location.lat();
                this.long = results[0].geometry.location.lng();
                console.log(this.lat, this.long)
                var l = parseInt(results[0].address_components.length);
                console.log(l);
                console.log(results[0].address_components[l - 1].long_name);
                this.ziptosend = results[0].address_components[l - 1].long_name;
                this.formattedaddres = results[0].formatted_address.split(',');
                if (this.formattedaddres.length == 4) {
                    this.streettosend = this.formattedaddres[0];
                    this.citytosend = this.formattedaddres[1];
                    this.statetosend = this.formattedaddres[2];
                } else if (this.formattedaddres.length == 5) {
                    this.streettosend = this.formattedaddres[0] + '' + this.formattedaddres[1];
                    this.citytosend = this.formattedaddres[2] + '' + this.formattedaddres[3];
                    this.statetosend = this.formattedaddres[4];
                } else if (this.formattedaddres.length >= 6) {
                    this.streettosend = this.formattedaddres[0] + '' + this.formattedaddres[1];
                    this.citytosend = this.formattedaddres[2] + '' + this.formattedaddres[3];
                    this.statetosend = this.formattedaddres[4] + '' + this.formattedaddres[5];
                }
                console.log(this.formattedaddres);
                console.log(this.streettosend, this.statetosend, this.citytosend, this.ziptosend);
                //      alert(this.streettosend+','+this.statetosend+','+this.citytosend+','+this.ziptosend+','+this.lat+','+this.long);
                setTimeout(() => {
                    temp.finalladd(formdetail, this.streettosend, this.statetosend, this.citytosend, this.ziptosend, this.lat, this.long);
//               temp.finalladd(parkingdata,parkingdata.value.streetaddress,parkingdata.value.state,parkingdata.value.city,parkingdata.value.zip,this.lat,this.long);
                 }, 500)

            } else {
                this.AlertMsg1('There is some error in getting location.');
            }
        });



        //     this.http.post('https://maps.googleapis.com/maps/api/geocode/json?address='+formdetail.value.address+'&key=AIzaSyA1DlP6ydTPDHSNBT_99W80TjfSGEcthhE', options).map(res => res.json()).subscribe(data => {
        //   console.log(data);

        // })
        console.log(formdetail);



    }

    finalladd(formdetail, streettosend, statetosend, citytosend, ziptosend, lat, long) {

        console.log(formdetail);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({headers: headers});
        var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
        
        if ((streettosend == undefined) || (statetosend == undefined) || (citytosend == undefined) || (ziptosend == undefined) || (lat == undefined)) {
            this.AlertMsg1('Please enter specific location');
        } else {
        console.log(this.codee);
            if ((this.codee == undefined)||(this.codee == "")){
                this.AlertMsg1('Please connect with stripe');
            } else {
                  if((this.leasingpicture == undefined)||(this.leasingpicture == "")){
                    this.AlertMsg1('Leasing agreement is required');
                
                  }else if((this.srcImage == undefined)||(this.srcImage == "")){
                    this.AlertMsg1('Aleast 1  parking image is required');
                  }else{
                if((this.srcImage1 == undefined)||(this.srcImage1 == "")){
                  this.srcImage1=""
                }
                if((this.srcImage2 == undefined)||(this.srcImage2 == "")){
                  this.srcImage2=""
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
                      agreement_pic:this.leasingpicture,
                      image_pic0:this.srcImage,
                      image_pic1:this.srcImage1,
                      image_pic2:this.srcImage2,
//                    agreement_pic: "https://legaltemplates.net/wp-content/uploads/2015/03/lease-agreement.png",
//                    image_pic0: "http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
//                    image_pic1: "http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
//                    image_pic2: "http://www.abc.net.au/news/image/5391246-16x9-700x394.jpg",
                    zip_code: ziptosend,
                    // user_id:5accc7a78e39673f13abaf62,
                    lat: lat,
                    long: long,
                    user_id: userid,
                    // parking_space_id:5acf555825b99a4584c4e5f0
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




                    this.http.post(this.appsetting.myGlobalVar + 'users/AddparkPlace', serialized, options).map(res => res.json()).subscribe(data => {

                        Loading.dismiss();
                        console.log(data);
                        if (data.status == true) {
                            this.AlertMsg1('Added successfully');
                            this.blurr = true;
                            this.navCtrl.push(ListingbeforeapprovalPage);
                            // localStorage.setItem('blurr',JSON.stringify(data));
                        } else {
                            this.AlertMsg1(data.message);
                        }
                    })
                })
            }
        }
            }
    }
    DeleteImage(index) {
        var temp = this;
        console.log(index);

        if (index == 2) {

            this.srcImage2 = ''
            this.bit = this.bit - 1;
        }
        if (index == 1) {
            this.srcImage1 = ''
            this.bit = this.bit - 1;
        }
        if (index == 0) {
            this.srcImage = ''
            this.bit = this.bit - 1;
        }
        this.arr.splice(index, 1);
    }
    DeleteImage1() {
        this.leasingpic = ""
        this.leasingpicture = ""
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ListingbeforeapprovalPage');
        console.log('Neelanshi');
        console.log(window.navigator.onLine);
        if (window.navigator.onLine == true) {
        } else {
            let toast = this.toastCtrl.create({
                message: 'Network connection failed',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
    }


}
