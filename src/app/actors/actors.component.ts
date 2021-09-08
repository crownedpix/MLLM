import { Component, OnInit } from '@angular/core';
// import actors from './../../../JSON/actors.json';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api-service.service';
import { actorType, character } from './actors.type';
import { movie } from '../movies/movie.type';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {
  id: string = "";
  searchText:string = "";
  male: character[] = [];
  movies:movie[] = [];
  hostIP = "192.168.0.105";
  female: character[] = [];
  actors: actorType =  {male:[],female:[],BMI:[],waist:[],mod:[],ethinicity:[],size:[],group:[]};
  finalSet: character[] = [];
  p: number = 1;
  totalItems:number = 12;
  constructor(private _Activatedroute:ActivatedRoute,private apiService: ApiService, public router:Router) {
    this.id = this._Activatedroute.snapshot.paramMap.get("id")+"";
    this.p = Number(this._Activatedroute.snapshot.paramMap.get("page"));
    this.apiService.getActors().subscribe((data:any)=>{
      console.log(data);
      this.actors = data;
      this.apiService.getMovies().subscribe((data: any) => {
        this.movies = data;
        this.actors.female.forEach(f => {
          f.count = this.getCount(f.id)[0];
          f.cream = this.getCount(f.id)[1];
        })
        this.loadData();
      });

    });

  }

  ngOnInit(): void {
    this.hostIP = this.apiService.URLIP;
  }

  loadData(){
    if(this.id == 'all'){
      this.finalSet = this.actors.female.concat(this.actors.male);
      this.finalSet.sort(() => Math.random() - 0.5);
      this.finalSet.sort((a,b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      } );
    } else if(this.id == 'female') {
      this.finalSet = this.actors.female;
      this.finalSet.sort((a,b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      } );
    } else if(this.id == 'male') {
      this.finalSet = this.actors.male;
      this.finalSet.sort((a,b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      } );
    }
  }

  getCount(id: any) {
    let test:any = [];
    let com:any = [];
    console.log("happy");
    this.movies.forEach(mov => {
      if (mov.actors.female.filter(fe => fe.id == id).length > 0) {
        test.push(mov);
        if(mov.cream == "true"){
          com.push(mov);
        }

      }
    });
    // this.movies.forEach(mov => {
    //   test = mov.actors.female.filter(m => m.id == id);
      console.log(test);
    // });
    return [test.length+"", com.length+"" ];
  }

  pageChanged(e:any){
    console.log(e);
    this.p = e;
    this.router.navigate(['actors', this.id, e]);
  }

}
