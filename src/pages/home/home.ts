import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { LogPage  } from '../signin/signin';
import { RegisterPage } from '../register/register';
import { CameraPage } from '../camera/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as firebase from 'firebase'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email:any;
  username:any;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,private socialSharing: SocialSharing) {
    
    let selfRef = firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid)
    
        selfRef.on('value',(snapuser:any)=>{
          if(snapuser.val()){
            console.log(snapuser.val());
            this.email = snapuser.val().email;
            this.username = snapuser.val().username;
          }
    
      })

  }
  redirectCamera(){
    this.navCtrl.push(CameraPage);

  }
  shareIt(){
  
    
    // Share via email
    this.socialSharing.share('Body:http://google.com', 'Subject').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });

  }

}
