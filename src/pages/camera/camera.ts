import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../home/home';
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
  
  constructor(public navCtrl: NavController,private camera: Camera,) {
  this.userId=firebase.auth().currentUser.uid;
  console.log('camera page');
console.log(this.userId);

  }
  takePicture(){
    console.log('clicked....')
    const options: CameraOptions = {
      quality: 2,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     // console.log(this.base64Image);
     

    }, (err) => {
     alert('Handle error')
    });
    
  
    }
    upload() {
      this.storageRef = firebase.storage().ref();
      // Create a timestamp as filename
      const filename = Math.floor(Date.now() / 1000);
  
      // Create a reference to 'images/todays-date.jpg'
      const imageRef = this.storageRef.child(`images/${filename}.jpg`);
      //console.log(imageRef);
  
      imageRef.putString(this.base64Image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
        console.log(snapshot);
        firebase.database().ref('/usersData/').set({
          image:snapshot.downloadURL,
          placeComment:this.placeComment

        })
       // Do something here when the data is succesfully uploaded!
      });
      this.navCtrl.setRoot(HomePage);

  }
}
