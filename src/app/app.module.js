var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { Appsetting } from '../providers/appsetting';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { GetstartedPage } from '../pages/getstarted/getstarted';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { MikehousePage } from '../pages/mikehouse/mikehouse';
import { ReviewsPage } from '../pages/reviews/reviews';
import { BillinginformationPage } from '../pages/billinginformation/billinginformation';
import { ViewreservationPage } from '../pages/viewreservation/viewreservation';
import { UpcomingreservationPage } from '../pages/upcomingreservation/upcomingreservation';
import { HistoricalreservationPage } from '../pages/historicalreservation/historicalreservation';
import { CarinfoPage } from '../pages/carinfo/carinfo';
import { AddcarinfoPage } from '../pages/addcarinfo/addcarinfo';
import { CarlistPage } from '../pages/carlist/carlist';
import { DatetimemodalPage } from '../pages/datetimemodal/datetimemodal';
import { EditcarinfoPage } from '../pages/editcarinfo/editcarinfo';
import { ProfilePage } from '../pages/profile/profile';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { ChangepwdPage } from '../pages/changepwd/changepwd';
import { DetailPage } from '../pages/detail/detail';
import { SignintwoPage } from '../pages/signintwo/signintwo';
import { SignuptwoPage } from '../pages/signuptwo/signuptwo';
import { ForgotpwdPage } from '../pages/forgotpwd/forgotpwd';
import { HometwoPage } from '../pages/hometwo/hometwo';
import { MyprofiletwoPage } from '../pages/myprofiletwo/myprofiletwo';
import { EditprofiletwoPage } from '../pages/editprofiletwo/editprofiletwo';
import { HistoricalreservationtwoPage } from '../pages/historicalreservationtwo/historicalreservationtwo';
import { ViewreservationtwoPage } from '../pages/viewreservationtwo/viewreservationtwo';
import { ListparkingspacePage } from '../pages/listparkingspace/listparkingspace';
import { AddpaymentPage } from '../pages/addpayment/addpayment';
import { EditpaymentPage } from '../pages/editpayment/editpayment';
import { ParkinglistPage } from '../pages/parkinglist/parkinglist';
import { EditlistingPage } from '../pages/editlisting/editlisting';
import { CheckstatusPage } from '../pages/checkstatus/checkstatus';
import { Facebook } from '@ionic-native/facebook';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
// import { Device } from '@ionic-native/device';
import { ListingbeforeapprovalPage } from '../pages/listingbeforeapproval/listingbeforeapproval';
import { Stripe } from '@ionic-native/stripe';
import { InAppBrowser } from '@ionic-native/in-app-browser';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                ListPage,
                GetstartedPage,
                SigninPage,
                SignupPage,
                MikehousePage,
                ReviewsPage,
                BillinginformationPage,
                ViewreservationPage,
                UpcomingreservationPage,
                HistoricalreservationPage,
                CarinfoPage,
                AddcarinfoPage,
                EditcarinfoPage,
                ProfilePage,
                EditprofilePage,
                ChangepwdPage,
                DatetimemodalPage,
                DetailPage,
                SignintwoPage,
                SignuptwoPage,
                ForgotpwdPage,
                HometwoPage,
                MyprofiletwoPage,
                EditprofiletwoPage,
                ViewreservationtwoPage,
                HistoricalreservationtwoPage,
                ListparkingspacePage,
                AddpaymentPage,
                EditpaymentPage,
                ParkinglistPage,
                EditlistingPage,
                CheckstatusPage,
                CarlistPage,
                ListingbeforeapprovalPage
            ],
            imports: [
                BrowserModule,
                HttpModule,
                IonicModule.forRoot(MyApp),
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                ListPage,
                GetstartedPage,
                SigninPage,
                DatetimemodalPage,
                SignupPage,
                MikehousePage,
                ReviewsPage,
                CarlistPage,
                BillinginformationPage,
                ViewreservationPage,
                UpcomingreservationPage,
                HistoricalreservationPage,
                CarinfoPage,
                AddcarinfoPage,
                EditcarinfoPage,
                ProfilePage,
                EditprofilePage,
                ChangepwdPage,
                DetailPage,
                SignintwoPage,
                SignuptwoPage,
                ForgotpwdPage,
                HometwoPage,
                MyprofiletwoPage,
                EditprofiletwoPage,
                ViewreservationtwoPage,
                HistoricalreservationtwoPage,
                ListparkingspacePage,
                AddpaymentPage,
                EditpaymentPage,
                ParkinglistPage,
                EditlistingPage,
                CheckstatusPage,
                ListingbeforeapprovalPage
            ],
            providers: [
                StatusBar,
                Facebook,
                FCM,
                Stripe,
                Geolocation,
                Camera,
                InAppBrowser,
                SplashScreen,
                StatusBar,
                SplashScreen,
                Appsetting,
                { provide: ErrorHandler, useClass: IonicErrorHandler }
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map