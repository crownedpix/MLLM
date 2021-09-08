import { Component, OnInit } from '@angular/core';
// import movies from './../../../JSON/movielist.json';
// import actors from './../../../JSON/actors.json';
import { actorType, character } from '../actors/actors.type';
import { movie } from '../movies/movie.type';
import { ApiService } from '../api-service.service';
@Component({
  selector: 'app-spl',
  templateUrl: './spl.component.html',
  styleUrls: ['./spl.component.scss']
})
export class SplComponent implements OnInit {

  actors: actorType = { male: [], female: [], BMI: [], waist: [], mod: [], ethinicity: [], size: [], group: [] };
  movies:movie[] = [];
  real: movie[] = [];
  hostIP = "192.168.0.105";
  actorA: character = {id: "",
  name: "",
  img: "",
  sex: "",
  eyeColor: "",
  hairColor: "",
  size: "",
  Height: "",
  weight: "",
  BMI: "",
  waist: "",
  mod: "",
  ethinicity: "",
  country: "",
  cups: "",
  startYear:"",
    DOB: "",
    count:""
};
  actorB: character =  {id: "",
  name: "",
  img: "",
  sex: "",
  eyeColor: "",
  hairColor: "",
  size: "",
  Height: "",
  weight: "",
  BMI: "",
  waist: "",
  mod: "",
  ethinicity: "",
  country: "",
  cups: "",
  startYear:"",
    DOB: "",
  count:""
};
  constructor(private apiService: ApiService) {
    this.hostIP = this.apiService.URLIP;
    this.apiService.getMovies().subscribe((data:any)=>{
      this.movies = data;

      this.real = this.movies.filter(movie => movie.cream == "true");
      // this.articles = data['articles'];
      this.apiService.getActors().subscribe((data:any)=>{
      this.actors = data;
      // this.articles = data['articles'];
      this.actorA = this.actors.female[this.getRandomInt(this.actors.female.length)];
      this.actorB = this.actors.female[this.getRandomInt(this.actors.female.length)];
      this.actorA.count = this.getCount(this.actorA.id)[0];
      this.actorA.cream = this.getCount(this.actorA.id)[1];
      this.actorB.count = this.getCount(this.actorB.id)[0];
      this.actorB.cream = this.getCount(this.actorB.id)[1];
    });
    });
  }

  ngOnInit(): void {

  }
  // putData(){
  //   this.apiService.putCategories().subscribe((data:any)=>{
  //     console.log(data);
  //     // this.articles = data['articles'];
  //   });;
  // }
  getRandomInt(max:any) {
    return Math.floor(Math.random() * max);
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
}
