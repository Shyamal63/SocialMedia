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
  placeComment:any;
  image:any;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,private socialSharing: SocialSharing) {
    
  
    let referance=firebase.database().ref('/usersData/' + firebase.auth().currentUser.uid + '/userpost/');
        referance.on('value',(snapuser:any)=>{
          if(snapuser.val()){
          //  this.email = snapuser.val().email;
         //   this.username = snapuser.val().username;
            this.placeComment=snapuser.val().image;
            this.image=snapuser.val().placeComment;
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
