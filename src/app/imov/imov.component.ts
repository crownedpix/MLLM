
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';
// import listFiles from './../../../JSON/movielist.json';
import { ApiService } from '../api-service.service';
import { movie } from '../movies/movie.type';
// import actors from './../../../JSON/actors.json';
import { character, actorType } from '../actors/actors.type';
// import { DOCUMENT } from '@angular/platform-browser';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27
}
@Component({
  selector: 'app-imov',
  templateUrl: './imov.component.html',
  styleUrls: ['./imov.component.scss']
})

export class ImovComponent implements OnInit {
  butTxt = "Dark";
  bgCase = false;
  hostIP = "192.168.0.105";
  value = 0;
  isPlay: boolean = false;
  actorsData:actorType = {male:[],female:[],BMI:[],waist:[],mod:[],ethinicity:[],size:[],group:[]};
  movie:movie[] = [];
  m:movie[] = [];
  id: String = '';
  list:movie[] = [];
  preList:movie[] = [];
  related: movie[] = [];
  urelates: movie[] = [];
  finalSet: character[] = [];
  showPopup:boolean = false;
  currImg:String = "";
  searchText:string = "";
  title:string = "";

  constructor(private _Activatedroute:ActivatedRoute, private apiService: ApiService) {
    this.apiService.getMovies().subscribe((datam:any)=>{
      this.list = datam;
      this.preList = datam;
      this.apiService.getActors().subscribe((data:any)=>{
        this.actorsData = data;
        this.loadData();
      });

    });


  }


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.increment();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.decrement();
    }
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.closePopup();
    }
  }

  increment() {
    this.value++;
    this.loadPopup(this.value);
  }

  decrement() {
    this.value--;
    this.loadPopup(this.value);
  }

  loadData(){
    this.finalSet =  this.actorsData.female.concat(this.actorsData.male);
    this.id = this._Activatedroute.snapshot.paramMap.get("id")+"";
    this.movie = this.list.filter(x=> x.id == this.id);

    console.log(this.movie);
    // this.related = this.movie.filter(x=> {
    //   console.log(x.category);
    // });
    this.movie[0].category.forEach(x =>{
      this.list.forEach(y=>{
        y.category.forEach(z => {
          if(x.name == z.name){
            this.related.push(y);
          }
        })
      })
    });
    this.urelates = [...new Set(this.related)];
    this.urelates.splice(this.urelates.findIndex(a => a.id === this.movie[0].id) , 1);
    this.urelates.sort(() => (Math.random() > .5) ? 1 : -1);
  }
  
  reloadRelated(){
    this.urelates.sort(() => (Math.random() > .5) ? 1 : -1);
  }

  ngOnInit(): void {
    this.hostIP = this.apiService.URLIP;
  }

  makeDark(val:boolean){
    var data = document.getElementById("my-body-id");
    if(!this.bgCase){
      data?.classList.add("specific-class");
      this.butTxt = "Light";
    } else {
      data?.classList.remove("specific-class");
      this.butTxt = "Dark";
    }
    this.bgCase = !val;
    console.log(val);
  }
  playPause() {
    var myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }

  makeBig() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 560;
  }

  makeSmall() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 320;
  }

  makeNormal() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 420;
  }

  skip = function(value: any) {
    let video: any = document.getElementById("my_video_1");
    video.currentTime += value;
  }

  restart() {
    let video: any = document.getElementById("my_video_1");
    video.currentTime = 0;
  }

  getImg(id:any){
    let value:any = this.finalSet.find(z => z.id == id);
    return value.img;
  }
  getName(id:any){
    let value:any = this.finalSet.find(z => z.id == id);
    return value.name;
  }

  loadPopup(index:number) {
    this.showPopup = true;
    this.value = index;
    if(this.movie[0].url.length < this.value+1){
      this.value = 0;
    }
    if(this.value < 0){
      this.value = this.movie[0].url.length -1;
    }
    this.currImg = this.movie[0].url[this.value];
    this.title = this.movie[0].name;
  }

  closePopup(){
    this.showPopup = false;
  }

}
