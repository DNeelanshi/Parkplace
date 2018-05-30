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
import {TermsPage} from '../pages/terms/terms';
import {Terms2Page} from '../pages/terms2/terms2';
import { SignupPage } from '../pages/signup/signup';
import { MikehousePage } from '../pages/mikehouse/mikehouse';
import { RatingmodelPage } from '../pages/ratingmodel/ratingmodel';
import { ReviewsPage } from '../pages/reviews/reviews';
import { ViewreviewsPage } from '../pages/viewreviews/viewreviews';
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
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Ionic2RatingModule } from 'ionic2-rating';
import * as moment from 'moment';
// import { Device } from '@ionic-native/device';
import{ListingbeforeapprovalPage} from '../pages/listingbeforeapproval/listingbeforeapproval';
import { Stripe } from '@ionic-native/stripe';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    GetstartedPage,
    SigninPage,
    SignupPage,
    ViewreviewsPage,
    MikehousePage,
    ReviewsPage,
    TermsPage,
    Terms2Page,
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
    RatingmodelPage,
    MyprofiletwoPage,
    EditprofiletwoPage,
    ViewreservationtwoPage,
    HistoricalreservationtwoPage,
    ListparkingspacePage,
    AddpaymentPage,
    EditpaymentPage,
    ViewreviewsPage,
    ParkinglistPage,
    EditlistingPage,
    CheckstatusPage,
    
    CarlistPage,
    ListingbeforeapprovalPage
  ],
  imports: [
  
    BrowserModule,
    HttpModule,
   Ionic2RatingModule,
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
     TermsPage,
   Terms2Page,
    MikehousePage,
    ReviewsPage,
    CarlistPage,
    ViewreviewsPage,
    BillinginformationPage,
    ViewreservationPage,
    UpcomingreservationPage,
    HistoricalreservationPage,
    CarinfoPage,
    AddcarinfoPage,
    EditcarinfoPage,
    ProfilePage,
    RatingmodelPage,
    EditprofilePage,
    ChangepwdPage,
    ViewreviewsPage,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
