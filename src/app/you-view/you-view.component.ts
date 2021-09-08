import { Component, OnInit } from '@angular/core';
import { youmovie } from '../you-add/youtube.type';
import { ApiService } from '../api-service.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-you-view',
  templateUrl: './you-view.component.html',
  styleUrls: ['./you-view.component.scss']
})
export class YouViewComponent implements OnInit {
  movies: youmovie[] = [];
  id:string = "";
  movie:youmovie[] = [];
  constructor(private _Activatedroute:ActivatedRoute, private apiService: ApiService, private sanitizer:DomSanitizer) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData(){
    this.apiService.getYoumovie().subscribe((data:any) =>{
      this.movies = data;
      this.id = this._Activatedroute.snapshot.paramMap.get("id")+"";
      this.movie = this.movies.filter(x=> x.id == this.id);
      console.log(this.movie[0].video);
      // console.log('movies', this.movies);
      // this.idSet = this.movies.length+1;
    });
  }

  cleanURL(oldURL:any ) {
    return   this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

}
