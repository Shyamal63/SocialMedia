import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase'
import  {  RegisterPage } from '../register/register';
@Component({
    selector: 'signin',
    templateUrl: 'signin.html'
  })
  export class LogPage {
      public email:any;
      public password :any;
      public username:any;
      
      
    constructor(public navCtrl: NavController,public alertCtrl: AlertController) {
      
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
}