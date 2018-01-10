import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogPage } from '../signin/signin';
import {HomePage} from '../home/home'
import * as firebase from 'firebase'

@Component({
  selector: 'register',
  templateUrl: 'register.html'
})


export class RegisterPage {
  public username:string;
  public email :string;
  public password:any;
  public mobile:number;
  constructor(public navCtrl: NavController) {

  }
  clickhere(){
   
   // this.navCtrl.setRoot(LogPage);
   
      return firebase.auth().createUserWithEmailAndPassword(this.email, this.username)
      .then( newUser => {
        console.log(newUser);

        firebase.database().ref('/userProfile').child(newUser.uid).set({ 
          
          email: this.email,
          username:this.username,
          login:true,
        });
        console.log(newUser.uid);
        alert("registration successfull");
        this.navCtrl.setRoot(LogPage);
      });
      
 }
}