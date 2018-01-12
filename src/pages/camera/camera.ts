import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../home/home';
import  { ToastController }  from 'ionic-angular/components/toast/toast-controller';
import * as firebase from 'firebase'
declare var google:any;
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
  base64Image:any;
  latitude:any;
  longitude:any;
  productLocation:any;
  captureDataUrl:any;
  placeComment:any;
  userId:any;
  image:any;
  storageRef:any;
  username:any;
  
  constructor(public navCtrl: NavController,private camera: Camera,  public toastCtrl: ToastController) {
  this.userId=firebase.auth().currentUser.uid;
  console.log('camera page');
console.log(this.userId);
let userdate=firebase.database().ref('/userProfile/' + this.userId);
userdate.on('value',(snapshot:any)=> {
  if(snapshot.val()){
    console.log(snapshot.val());
    this.username=snapshot.val().username;

  }
})

  }
  takePicture(){
    console.log('clicked....')
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.base64Image);
     

    }, (err) => {
     alert('Handle error')
    });
    
  }
    
    upload(base64Image,userId) {
      if(this.base64Image==undefined){
        

       if( this.placeComment.trim()==''|| this.placeComment==undefined){
        let toast = this.toastCtrl.create({
          message: 'please put a comment',
          duration: 3000,
          position: 'top'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
       } 
       else{
         firebase.database().ref('/usersData/').push({
           userId:this.userId,
           username:this.username,
           placeComment:this.placeComment
         })
         this.navCtrl.setRoot(HomePage)
       }

    
      }
    else{
      if(this.placeComment==undefined || this.placeComment.trim()==''){
        let toast = this.toastCtrl.create({
          message: 'please put a comment',
          duration: 3000,
          position: 'top'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
      }

     else { 
      this.storageRef = firebase.storage().ref();
      // Create a timestamp as filename
      const filename = Math.floor(Date.now() / 1000);
  
      // Create a reference to 'images/todays-date.jpg'
      const imageRef = this.storageRef.child(`images/${filename}.jpg`);
      //console.log(imageRef);
  
      imageRef.putString(this.base64Image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
        console.log(snapshot);
        firebase.database().ref('/usersData/').push({
          image:snapshot.downloadURL,
          placeComment:this.placeComment,
          username:this.username
        })
       // Do something here when the data is succesfully uploaded!
      });
      this.navCtrl.setRoot(HomePage);
    }
  }

  }
}
