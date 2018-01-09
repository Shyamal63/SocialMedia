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
  userId:any;
  public array:any=[];

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,private socialSharing: SocialSharing) {
    
    this.userId=firebase.auth().currentUser.uid;
    let referance=firebase.database().ref('/usersData/' );
        referance.on('value',(snapuser:any)=>{
          if(snapuser.val()){

            let snap=snapuser.val();
            this.array=[];
            console.log(snap);
          //this.email = snapuser.val().email;
          //this.username = snapuser.val().username;
          for(var a in snap){
            this.array.push(snap[a])
            console.log(this.array);
          }
           
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

like(k){
 console.log(k);
 console.log('hello');
 let likePost=firebase.database().ref('/usersData/' + this.userId + /'like'/);

  }

}
