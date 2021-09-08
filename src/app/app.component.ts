import { Component } from '@angular/core';
// import listFiles from './../../JSON/movielist.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movieLister';
  // public list:{name:string, url:string, image:string, category:number}[] = listFiles;
  constructor(){

  }
}
