import { Component, OnInit } from '@angular/core';
// import listFiles from './../../../JSON/movielist.json';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from '../api-service.service';
import { movie } from './movie.type'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  id:string = "";
  list:movie[] = [];
  m:movie[] = [];
  p: number = 1;
  totalItems:number = 10;
  hostIP = "192.168.0.105";
  movies:movie[] = [];
  constructor(private _Activatedroute:ActivatedRoute, private apiService: ApiService, public router:Router) {
    // http://127.0.0.1:8080/json/movielist.json
    // this.m = this.movies;
    this.apiService.getMovies().subscribe((data:any)=>{
      console.log(data);
      this.m = data;
      this.loadData();
    });
    this.id = this._Activatedroute.snapshot.paramMap.get("id")+"";
    this.p = Number(this._Activatedroute.snapshot.paramMap.get("page"));
  }

  loadData(){
    if(this.id == 'all'){
      this.list = this.m;
    } else if(this.id != '999'){
      this.m.forEach(x =>{
        x.category.forEach(y=>{
          if(y.id === this.id){
            this.list.push(x);
          }
        })
      });
    } else if(this.id == '999'){
      this.m.forEach(x =>{
          if(x["star"] === true){
            this.list.push(x);
          }
      });
    }
  }
  ngOnInit(): void {
    this.hostIP = this.apiService.URLIP;
  }

  callURL(data:any){
    console.log(data);
  }

  getGroup(grp:any) {
    if(grp.group == 'anl'){
      return "anal.png";
    } else
    if(grp.group == 'crm'){
      return "cream.png";
    } else
    if(grp.group == 'cute'){
      return "cute.png";
    } else
    if(grp.group == 'facial'){
      return "facial.png";
    } else
    if(grp.group == 'puss'){
      return "pussy.png";
    } else
    {
      return ""
    }
  }

  pageChanged(e:any){
    console.log(e);
    this.p = e;
    this.router.navigate(['movies', this.id, e]);
  }

}
