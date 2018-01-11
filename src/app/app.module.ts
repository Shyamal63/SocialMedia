import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LogPage  } from '../pages/signin/signin';
import { CameraPage  } from '../pages/camera/camera';
import  {  RegisterPage } from '../pages/register/register';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import  { ToastController }  from 'ionic-angular/components/toast/toast-controller';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase'
var config = {
  apiKey: "AIzaSyCqrVDzXxxeslQYhFtL1IJ9j_7GSyiK0pM",
  authDomain: "sidemenu-f3023.firebaseapp.com",
  databaseURL: "https://sidemenu-f3023.firebaseio.com",
  projectId: "sidemenu-f3023",
  storageBucket: "sidemenu-f3023.appspot.com",
  messagingSenderId: "370442120524"
};
firebase.initializeApp(config);
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LogPage,
    CameraPage,
    RegisterPage,
    

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LogPage,
    CameraPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    SocialSharing,
    Facebook,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
