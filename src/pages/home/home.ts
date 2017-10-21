import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController} from 'ionic-angular';
import {DataProvider} from '../../providers/data/data';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
games = [];
genre :any;
favourites =[];
  constructor(public navCtrl: NavController,
     public navParams: NavParams ,private _dataProvider :DataProvider,
     public storage :Storage,public _loading :LoadingController) {
       let loader = this._loading.create({
         content : 'Getting games'
       })

       loader.present().then(() => {
         this.storage.get('genre').then(val =>{
           if(val)
            {

              this.genre = {"id":val.id,"name":val.name};
            }
            else{

              this.genre = {"id":5,"name":"Shooter Games"};
              this.storage.set('genre',this.genre);
            }

            this._dataProvider.getGames(this.genre.id,0)
              .subscribe(res => this.games = res);
         });
         this.storage.get('favourites').then(val => {
           if(!val){
             this.storage.set('favourites',this.favourites);
           }
           else{
             this.favourites = val;
           }
         })
         loader.dismiss();
       });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
