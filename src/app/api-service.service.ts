import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { movie } from '../app/movies/movie.type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headerDict:any = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',

  }

  public URLIP:any = "192.168.0.103";

  requestOptions:any = {};
  public heroesUrl = '';
  constructor(private http: HttpClient) {
    this.requestOptions = {
      headers: new Headers(this.headerDict),
    };
    var urlVal = window.location.href;
    this.heroesUrl = urlVal.split(':4200')[0]+":8080/";
    this.URLIP = urlVal.split(':4200')[0];
  }
  public getMovies(){
    return this.http.get(this.heroesUrl+'movies',this.requestOptions);
  }
  public postMovies(data:any){
    return this.http.post(this.heroesUrl+'movies',  JSON.parse(JSON.stringify(data)),this.requestOptions);
  }
  public getActors(){
    return this.http.get(this.heroesUrl+'actors',this.requestOptions);
  }
  public postActorMale(data:any){
    return this.http.post(this.heroesUrl+'actors/male',  JSON.parse(JSON.stringify(data)),this.requestOptions);
  }
  public postActorFemale(data:any){
    return this.http.post(this.heroesUrl+'actors/female',  JSON.parse(JSON.stringify(data)),this.requestOptions);
  }
  public getCategories(){
    return this.http.get(this.heroesUrl+'category',this.requestOptions);
  }
  // public getPositions(){
  //   return this.http.get(this.heroesUrl+'position.json',this.requestOptions);
  // }

  public getYoutubeJSON(id:string){
    return this.http.get('https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v='+id+'&format=json',this.requestOptions);
  }
  public postYoumovie( data:any){
    return this.http.post(this.heroesUrl+'youmov',JSON.parse(JSON.stringify(data)), this.requestOptions);
  }

  public getYoumovie(){
    return this.http.get(this.heroesUrl+'youmov', this.requestOptions);
  }
  public getPos(){
    return this.http.get(this.heroesUrl+'pos', this.requestOptions);
  }
}
