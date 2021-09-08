import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import actors from './../../../JSON/actors.json';
import { ApiService } from '../api-service.service';
import { movie } from '../movies/movie.type';
// import movies from './../../../JSON/movielist.json';
import { actorType, character } from '../actors/actors.type';
@Component({
  selector: 'app-iactor',
  templateUrl: './iactor.component.html',
  styleUrls: ['./iactor.component.scss']
})
export class IactorComponent implements OnInit {
  id:string = "";
  actorsData:actorType = {male:[],female:[],BMI:[],waist:[],mod:[],ethinicity:[],size:[],group:[]};
  final:character[] = [];
  actors: actorType[] = [];
  hostIP = "192.168.0.105";
  actorDetail: character[] =[];
  movies:movie[] = [];
  urelates:movie[] = [];
  p: number = 1;
  totalItems:number = 8;
  creamTime:number = 0;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: ApiService) {
    this.id = this._Activatedroute.snapshot.paramMap.get("id") + "";
    this.apiService.getActors().subscribe((data:any)=>{
      this.actorsData = data;
      this.apiService.getMovies().subscribe((datam:any)=>{
        this.movies = datam;
        this.loadData();
      })
    });
  }

  loadData(){
    this.final = this.actorsData.female.concat(this.actorsData.male);
    console.log(this.final.length, this.id);
    this.actorDetail = this.final.filter(x => x.id === this.id);
    this.movies.forEach(mov => {
      if(this.actorDetail[0].sex == 'F'){
        mov.actors.female.forEach(f => {
          f.id == this.actorDetail[0].id? this.urelates.push(mov) : function(){};
          if(f.id == this.actorDetail[0].id && Number(mov.creamtime) >= 1){
            this.creamTime += 1;
          }
        })
      }

      if(this.actorDetail[0].sex == 'M'){
        mov.actors.male.forEach(m => {
          m.id == this.actorDetail[0].id? this.urelates.push(mov) : function(){};
        })
      }
    })
  }

  ngOnInit(): void {
    this.hostIP = this.apiService.URLIP;
  }

  mSz(data:any){
    return (data == "small")?"4 inc":(data == "normal")?"5 inc":(data == "big")?"6inc":(data == "huge")?"7 inc":(data == "huge+")?"8 inc +":"";
  }
}
