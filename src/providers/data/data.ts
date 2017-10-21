import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }
  limit: number = 30;
  games_api_url = '/games/';
  cors_url="https://cors.io"
  api_key = 'e61f7617a717227258282a6a985c3f05';
  headers = new Headers({ 'user-key': 'e61f7617a717227258282a6a985c3f05' ,'Access-Control-Allow-Origin' :'*'} );
  options = new RequestOptions({ headers: this.headers });

  getGames(genre, offset_num) {
    let genre_id = genre;
    let offset = offset_num;

    return this.http.get(`${this.games_api_url}?fields=name,release_dates&limit=${this.limit}&offset=${offset}&order=release_dates.date:desc&filter[genres][eq]=${genre_id}`,this.options)
      .map(res => res.json());
  }
  getGamesProxy(genre,offset){
    return this.http.get('/assets/game-data.json')
    .map(res => res.json());
  }
}
