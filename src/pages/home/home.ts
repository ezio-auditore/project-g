import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  games = [];
  genre = { "id": 5, "name": "Shooter" };
  favourites = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams, private _dataProvider: DataProvider,
    public storage: Storage, public _loading: LoadingController) {
    let loader = this._loading.create({
      content: 'Getting games'
    })

    loader.present().then(() => {
      this.storage.get('genre').then(val => {
        if (val) {

          this.genre = { "id": val.id, "name": val.name };
        }
        else {

          this.genre = { "id": 5, "name": "Shooter" };
          this.storage.set('genre', this.genre);
        }

        this._dataProvider.getGames(this.genre.id, 0)
          .subscribe(res => this.games = res);
      });
      this.storage.get('favourites').then(val => {
        if (!val) {
          this.storage.set('favourites', this.favourites);
        }
        else {
          this.favourites = val;
        }
      })
      loader.dismiss();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  favourite(game_id) {
    this.favourites.push(game_id);
    this.favourites = this.favourites.filter(function(item , i ,ar){ return ar.indexOf(item)===i;});
    this.storage.set('favourites',this.favourites);

  }
  removeFavourite(game_id){
    this.favourites = this.favourites.filter(item => {return item !== game_id});
    this.storage.set('favourites',this.favourites);

  }

  openFavorites(){
    this.storage.get('favourites').then(val => {
      this.genre.name = "Favourites";
      if(val.length !=0){
        this._dataProvider.getFavourites(val)
          .subscribe(res => this.games = res);
      }
      else {
        this.games.length = 0;
      }
    })
  }
}
