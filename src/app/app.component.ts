import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, Events, MenuController,LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import { CarlistPage } from '../pages/carlist/carlist';
import { CardlistPage } from '../pages/cardlist/cardlist';
import {ListPage} from '../pages/list/list';
import {TermsPage} from '../pages/terms/terms';
import {Terms2Page} from '../pages/terms2/terms2';
import {GetstartedPage} from '../pages/getstarted/getstarted';
import {BillinginformationPage} from '../pages/billinginformation/billinginformation';
import {ViewreservationPage} from '../pages/viewreservation/viewreservation';
import {UpcomingreservationPage} from '../pages/upcomingreservation/upcomingreservation';
import {HistoricalreservationPage} from '../pages/historicalreservation/historicalreservation';
import {CarinfoPage} from '../pages/carinfo/carinfo';
import {AddcarinfoPage} from '../pages/addcarinfo/addcarinfo';
import {EditcarinfoPage} from '../pages/editcarinfo/editcarinfo';
import {ProfilePage} from '../pages/profile/profile';
import {MyprofiletwoPage} from '../pages/myprofiletwo/myprofiletwo';
import {HistoricalreservationtwoPage} from '../pages/historicalreservationtwo/historicalreservationtwo';
import {ViewreservationtwoPage} from '../pages/viewreservationtwo/viewreservationtwo';
import {ListparkingspacePage} from '../pages/listparkingspace/listparkingspace';
import {HometwoPage} from '../pages/hometwo/hometwo';
import {AddpaymentPage} from '../pages/addpayment/addpayment';
import {EditpaymentPage} from '../pages/editpayment/editpayment';
import { ParkinglistPage } from '../pages/parkinglist/parkinglist';
import { CheckstatusPage } from '../pages/checkstatus/checkstatus';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import{ListingbeforeapprovalPage} from '../pages/listingbeforeapproval/listingbeforeapproval';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Appsetting } from "../providers/appsetting";
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    information: any[];

    @ViewChild(Nav) nav: Nav;
    showSubmenu: boolean = false;
    rootPage: any = GetstartedPage;

    pages: any;// Array<{title: string, component: any, icon: string}>;
    subpages: Array<{title: string, component: any, icon: string}>;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public events: Events,
        public menuCtrl: MenuController,
        public http: Http,
        public appsetting: Appsetting,
        public loadingCtrl: LoadingController,
    ) {
    
    alert('Welcome');
    console.log('Welcome.');
        this.initializeApp();
   
        // used for an example of ngFor and navigation
  
        this.events.subscribe('seller', (seller) => {
            console.log(seller);
            

            console.log('seller');
        if(localStorage.getItem('UserDetailseller')){
             
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
          let options = new RequestOptions({ headers: headers });

          var userid = JSON.parse(localStorage.getItem('UserDetailseller'))._id;
          console.log(userid);

          var postdata = {
            user_id: userid
          };

          var serialized = this.serializeObj(postdata);
          console.log(postdata);
          this.http.post(this.appsetting.myGlobalVar +'users/userinfo', serialized, options).map(res => res.json()).subscribe(data => {

            if(data.status == true){
            console.log(data.data);
            this.appsetting.username = data.data.name;
          this.appsetting.emailuser = data.data.email;
          if(data.data.profile_pic){ this.appsetting.SrcImage = data.data.profile_pic;}
          if(data.data.parking_space[0]){
               if(data.data.parking_space[0].length > 0){
         if(data.data.parking_space[0].status == true){
             this.appsetting.haveparking = 1;
         }else{this.appsetting.haveparking =0;}
        }}
          console.log(this.appsetting.haveparking)
         
        }
      })
    }

    console.log(this.appsetting.haveparking)
            if(this.appsetting.haveparking == 0){
              localStorage.setItem('hometype','0');
//              alert('small menu');


              this.pages = [
                {title: 'List Parking Space', component: ListingbeforeapprovalPage, icon: 'assets/imgs/viewreservationsicon.png', subItems: []},
              {title: 'Check Status', component: CheckstatusPage, icon: 'assets/imgs/s-checkstatus.png', subItems: []},
       ];

      }
      else{
            this.pages = [
                {title: 'Home', component: HometwoPage, icon: 'assets/imgs/homeicon.png', subItems: []},
                {title: 'List Parking Space', component: ListparkingspacePage, icon: 'assets/imgs/viewreservationsicon.png', subItems: []},
                {
                    title: 'Reservation', component: '', icon: 'assets/imgs/carinformationicon.png', subItems: [
                        {
                            icon: 'assets/imgs/sviewreservations.png',
                            displayName: `View Reservation`,
                            component: ViewreservationtwoPage,

                        },
                        {
                            icon: 'assets/imgs/historicalreservationsicon.png',
                            displayName: `Historical Reservation`,
                            component: HistoricalreservationtwoPage,

                        }
                    ]
                },

                //                {title: 'View Reservation', component: ViewreservationPage, icon: 'assets/imgs/viewreservationsicon.png'},
                //                {title: 'Historical Reservation', component: HistoricalreservationPage, icon: 'assets/imgs/historicalreservationsicon.png'},

                {title: 'My Profile', component: MyprofiletwoPage, icon: 'assets/imgs/s-myprofile.png', subItems: []},
//                {
//                    title: 'Payment Info', component: '', icon: 'assets/imgs/billingicon.png', subItems: [
//                        {
//                            icon: 'assets/imgs/s-addpaymentinfo.png',
//                            displayName: `Add Payment Info.`,
//                            component: AddpaymentPage,
//
//                        },
//                        {
//                            icon: 'assets/imgs/s-editpaymentinfo.png',
//                            displayName: `Edit Payment Info.`,
//                            component: EditpaymentPage,
//
//                        }
//                    ]
//                },
                //                {title: 'Add Payment Info', component: AddpaymentPage, icon: 'assets/imgs/s-addpaymentinfo.png',subItems: []},
                //                {title: 'Edit Payment Info', component: EditpaymentPage, icon: 'assets/imgs/s-editpaymentinfo.png',subItems: []},
                {title: 'Edit Listing', component: ParkinglistPage, icon: 'assets/imgs/s-editlisting.png', subItems: []},
                {title: 'Terms and conditions', component: TermsPage, icon: 'assets/imgs/s-editlisting.png', subItems: []},

                //      { title: 'Edit Profile', component: ProfilePage,icon: 'assets/imgs/editprofileicon.png' },
                //      { title: 'Billing Information', component: BillinginformationPage,icon: 'assets/imgs/billingicon.png' },
                //      { title: 'View Reservation', component: ViewreservationPage,icon: 'assets/imgs/viewreservationsicon.png' },
                //      { title: 'Upcoming Reservation', component: UpcomingreservationPage,icon: 'assets/imgs/upcomingreservationsicon.png' },
                //      { title: 'Historical Reservation', component: HistoricalreservationPage,icon: 'assets/imgs/historicalreservationsicon.png' },
                //      { title: 'Car Information', component: CarinfoPage,icon: 'assets/imgs/carinformationicon.png' },
                //      { title: 'Add Car Information', component: AddcarinfoPage,icon: 'assets/imgs/addcarinformationicon.png' },
                //      { title: 'Edit Car Information', component: EditcarinfoPage,icon: 'assets/imgs/editcarinformationicon.png' },
                //      { title: 'Home', component: HomePage,icon: 'assets/imgs/homeicon.png' },
                //      { title: 'My Profile', component: MyprofiletwoPage,icon: 'assets/imgs/s-myprofile.png' },

                //      { title: 'Historical Reservation', component: HistoricalreservationtwoPage,icon: 'assets/imgs/historicalreservationsicon.png' },
                //      { title: 'Add Payment Info.', component: AddpaymentPage,icon: 'assets/imgs/s-addpaymentinfo.png' },
                //      { title: 'Edit Payment Info.', component: EditpaymentPage,icon: 'assets/imgs/s-editpaymentinfo.png' },
            ];

          }
            console.log(this.pages);
        })
        
   
        this.events.subscribe('customer', (customer) => {
            console.log(customer);
            if(localStorage.getItem('UserDetailcustomer')){
                  
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
          let options = new RequestOptions({ headers: headers });

          var userid = JSON.parse(localStorage.getItem('UserDetailcustomer'))._id;
          console.log(userid);

          var postdata = {
            user_id: userid
          };

          var serialized = this.serializeObj(postdata);
          console.log(postdata);
          this.http.post(this.appsetting.myGlobalVar +'users/userinfo', serialized, options).map(res => res.json()).subscribe(data => {

            if(data.status == true){
            console.log(data.data);
            this.appsetting.username = data.data.name;
          this.appsetting.emailuser = data.data.email;
          if(data.data.profile_pic){ this.appsetting.SrcImage = data.data.profile_pic;}

        }
      })
    }
//              alert('menu')
            console.log('customer');
            this.pages = [
                //      { title: 'Home', component: HometwoPage,icon: 'assets/imgs/homeicon.png' },
                { title: 'Home', component: HomePage,icon: 'assets/imgs/homeicon.png', subItems: [] },
                { title: 'Edit Profile', component: EditprofilePage,icon: 'assets/imgs/editprofileicon.png', subItems: [] },
            // { title: 'Billing Information', component: BillinginformationPage,icon: 'assets/imgs/billingicon.png', subItems: [] },
                            {title: 'Add Payment Info', component: AddpaymentPage, icon: 'assets/imgs/s-addpaymentinfo.png',subItems: []},
                            
                          {title: 'Edit Payment Info', component: CardlistPage, icon: 'assets/imgs/s-editpaymentinfo.png',subItems: []},
                {
                    title: 'View Reservation', component: '', icon: 'assets/imgs/viewreservationsicon.png', subItems: [
                        {
                            icon: 'assets/imgs/upcomingreservationsicon.png',
                            displayName: `Upcoming Reservation`,
                            component: UpcomingreservationPage,

                        },
                        {
                            icon: 'assets/imgs/historicalreservationsicon.png',
                            displayName: `Historical Reservation`,
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
                            displayName: `Add Car Information`,
                            component: AddcarinfoPage,

                        },
                        {
                            icon: 'assets/imgs/editcarinformationicon.png',
                            displayName: `Edit Car Information`,
                            component: CarlistPage,

                        }
                    ]
                },
                {title: 'Terms and conditions', component: Terms2Page, icon: 'assets/imgs/s-editlisting.png', subItems: []},
                //                {title: 'Add Car Information', component: AddcarinfoPage, icon: 'assets/imgs/addcarinformationicon.png'},
                //                {title: 'Edit Car Information', component: EditcarinfoPage, icon: 'assets/imgs/editcarinformationicon.png'},

                //      {title: 'Payment Info.', component: AddpaymentPage, icon: 'assets/imgs/s-addpay                mentinfo.png'},
                //      {title: 'Add Payment Info.', component: AddpaymentPage, icon: 'assets/imgs/s-addpay                mentinfo.png'},
                //      {title: 'Edit Payment Info.', component: EditpaymentPage, icon: 'assets/imgs/s-editpay                mentinfo.png'},
                //      {title: 'Edit Listing.', component: EditpaymentPage, icon: 'assets/imgs/s-editpaymentinfo.png'},
                //      { title: 'Home', component: HomePage,icon: 'assets/imgs/homeicon.png' },
                //      { title: 'My Profile', component: MyprofiletwoPage,icon: 'assets/imgs/s-myprofile.png' },
                //      { title: 'List Parking Space', component: ListparkingspacePage,icon: 'assets/imgs/viewreservationsicon.png' },
                //      { title: 'View Reservation', component: ViewreservationtwoPage,icon: 'assets/imgs/sviewreservations.png' },
                //      { title: 'Historical Reservation', component: HistoricalreservationtwoPage,icon: 'assets/imgs/historicalreservationsicon.png' },
                //      { title: 'Add Payment Info.', component: AddpaymentPage,icon: 'assets/imgs/s-addpaymentinfo.png' },
                //      { title: 'Edit Payment Info.', component: EditpaymentPage,icon: 'assets/imgs/s-editpaymentinfo.png' },
            ];

        })
        }
       
      // this.getuserdetail();

    getuserdetail(){
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
      let options = new RequestOptions({ headers: headers });
      if(localStorage.getItem('UserDetail')){
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
      dismissOnPageChange:true
          });
          Loading.present().then(() => {
      this.http.post(this.appsetting.myGlobalVar + 'users/userinfo ', serialized, options).map(res => res.json()).subscribe(data => {
         setTimeout(() => {
      Loading.dismiss();
    }, 3000);

        console.log(data);})})

    }
    }
    serializeObj(obj) {
      var result = [];
      for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

      return result.join("&");
    }
    signout(){
      if(localStorage.getItem('UserDetail')){
        // console.log(localStorage.getItem('UserInfo'));
        localStorage.removeItem('UserDetail');}
        if(localStorage.getItem('UserDetailseller')){
          // console.log(localStorage.getItem('UserInfo'));
          // console.log(localStorage.getItem('UserInfo'));
          localStorage.removeItem('UserDetailseller');
          localStorage.removeItem('Done')
         }
          if(localStorage.getItem('UserDetailcustomer')){
            // console.log(localStorage.getItem('UserInfo'));
            // console.log(localStorage.getItem('UserInfo'));
            localStorage.removeItem('UserDetailcustomer');
            }
//      alert('signout');
      this.nav.setRoot(GetstartedPage);
      this.menuCtrl.close();
       this.appsetting.SrcImage=''
      // this.app.getRootNav().setRoot(GetstartedPage);
    }
    initializeApp() {
        this.platform.ready().then(() => {
  
   this.statusBar.overlaysWebView(true);
      this.statusBar.hide();
      this.splashScreen.hide();
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page, i) {
        //alert('openPage');
        console.log(page);
        console.log(this.pages);

        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        console.log(this.pages);
        this.pages[i].open = !this.pages[i].open;

        if ((page.title == "Reservation") || (page.title == "Payment Info") || (page.title == "View Reservation") || (page.title == "Car Information")) {
            // this.menuCtrl.close();
            console.log(page.title)
        } else {
            this.pages.forEach(function (value, key) {
                value.open = false;
            });
            this.menuCtrl.close();
        }
        this.nav.setRoot(page.component);
    }

    toggleSection(page, i) {
        //alert('toggleSection');
        console.log(page);
        console.log(i);
           if(localStorage.getItem('UserDetailcustomer')){
        
             this.events.publish('customer', 'customer');
        }else if(localStorage.getItem('UserDetailseller')){
               this.events.publish('seller', 'seller');
        }
        this.pages[i].open = !this.pages[i].open;
        if ((page.title == "Reservation") || (page.title == "Payment Info") || (page.title == "View Reservation") || (page.title == "Car Information")) {

            console.log(page.title)
        } else {
            this.pages.forEach(function (value, key) {
                value.open = false;
            });
            this.menuCtrl.close();
        }
        this.nav.setRoot(page.component);
        //this.menuCtrl.close();

    }
}
