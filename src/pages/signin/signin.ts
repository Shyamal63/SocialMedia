import { Component } from '@angular/core';
import { NavController,AlertController} from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase'
import  {  RegisterPage } from '../register/register';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
@Component({
    selector: 'signin',
    templateUrl: 'signin.html'
  })
  export class LogPage {
      public email:any;
      public password :any;
      public username:any;
      
      
    constructor(public navCtrl: NavController,public alertCtrl: AlertController,private fb: Facebook,private googlePlus: GooglePlus) {
       
    }
    goLogin(){
        console.log(this.email +","+this.username);
    
        return firebase.auth().signInWithEmailAndPassword(this.email, this.password) .then( user => {
          if(user){

            alert("log successfull");
            this.navCtrl.setRoot(HomePage);
          }
        }) .catch((_error) => {
          alert(_error.message)
        })
    
      }
      registered(){
        
        this.navCtrl.push(RegisterPage)
      }
      facebookLogin(){
        this.fb.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => 
        {
          console.log('Logged into Facebook!', res); 
         let provider=firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
         console.log(provider);
         firebase.auth().signInWithCredential(provider)
         .then(response =>{ 
           console.log(response);
           firebase.database().ref('/userProfile').child(response.uid).set({
             email:response.email,
             name:response.displayName,
             login:true,
             Image:response.photoURL
           })
    
         })
        }
       )
        .catch(e => console.log('Error logging into Facebook', e));
      
      }
      gogleLogin(){
        this.googlePlus.login({
          'webClientId': '370442120524-gqt5qp7ukekv03r7svgpnng08jm40jpg.apps.googleusercontent.com',
          'offline': true
        })
        .then(res =>{
           console.log(res);
        
      let credential=firebase.auth.GoogleAuthProvider.credential(res.idToken);
      firebase.auth().signInWithCredential(credential).then(response =>{
        console.log(response);
        firebase.database().ref('/userProfile').child(response.uid).set({
          email:res.email,
          name:response.displayName,
          login:true,
          Image:response.photoURL
        })
    
      })
    
        }
      
      )
        .catch(err => console.error(err));
      }
      forgotPassword() {
        let prompt = this.alertCtrl.create({
          title: 'Login',
          message: "Enter a name for this new album you're so keen on adding",
          inputs: [
            {
              name: 'email',
              placeholder: 'enter your email'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Send',
              handler: data => {
                console.log(data.email);
               return firebase.auth().sendPasswordResetEmail(data.email)
                .then(() => alert("email sent"))
                .catch((error) => alert(error))
              }
            }
          ]
        });
        prompt.present();
      }
}