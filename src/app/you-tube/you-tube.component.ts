import { Component, OnInit } from '@angular/core';
import { youmovie } from '../you-add/youtube.type';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-you-tube',
  templateUrl: './you-tube.component.html',
  styleUrls: ['./you-tube.component.scss']
})
export class YouTubeComponent implements OnInit {
  movies: youmovie[] = [];
  totalItems:number = 10;
  p: number = 1;
  constructor(private apiService: ApiService) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData(){
    this.apiService.getYoumovie().subscribe((data:any) =>{
      this.movies = data;
      // console.log('movies', this.movies);
      // this.idSet = this.movies.length+1;
    });
  }

}
