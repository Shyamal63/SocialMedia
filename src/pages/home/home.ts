import { Component } from '@angular/core';
import { NavController,AlertController, LoadingController } from 'ionic-angular';
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
  count:number;
  

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,private socialSharing: SocialSharing,public loadingCtrl: LoadingController) {
   
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      loading.present();
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
            console.log(a);
          snap[a].colorFlag=false;
           snap[a].uid=a;
           console.log(snap[a]);
           

          this.count=0; 
            let likeResponse=snap[a].like;
            console.log(likeResponse);
            for(var b in likeResponse){
              console.log(b);
              this.count=this.count+1;
              snap[a].like[b].likeuser=b;
              if(b==this.userId){
                snap[a].colorFlag=true;
              }
              else{
                snap[a].colorFlag=false;
              }

            }
            snap[a].likeCount=this.count;
            this.array.push(snap[a]);
            
          }
          console.log(this.array);  
          }
      })
      loading.dismiss();
      
  }
  redirectCamera(){
    this.navCtrl.push(CameraPage);

  }
  shareIt(l){
    // Share via email
    console.log(l);
    this.socialSharing.share(this.array[l].image, 'Subject').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  like(k){
  console.log(k);
  console.log(this.array[k].like);
  /* let likePost=firebase.database().ref('/usersData/' + this.array[k].uid + '/like/' + this.userId ).set ({
      like:true
  })*/
  // console.log(likePost);
      if(this.array[k].like != undefined){
        for(let key in this.array[k].like){
          this.array[k].like[key].likeuser=key
           console.log(this.array[k].like[key]);
           if(key == this.userId){
            //  alert("already liked");
            let likedUser=firebase.database().ref('/usersData/' +this.array[k].uid+ '/like/' +this.userId).remove()
            this.array[k].colorFlag=false;

           }else{
            let likePost=firebase.database().ref('/usersData/' + this.array[k].uid + '/like/' + this.userId ).set ({
              like:true,  
                 
          })
          this.array[k].colorFlag=true;
           }
        }
      }else{
          let likePost=firebase.database().ref('/usersData/' + this.array[k].uid + '/like/' + this.userId ).set ({
            like:true
        })
        this.array[k].colorFlag=true;
      }
  }
  logout(){
    this.navCtrl.setRoot(LogPage);
   
    return firebase.auth().signOut();
     //console.log("hello");
    
     
   }
   
}

