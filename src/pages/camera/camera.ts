import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
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
  constructor(public navCtrl: NavController,private camera: Camera,) {

  }
  takePicture(){
    console.log('clicked....')
    const options: CameraOptions = {
      quality: 100,
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
}