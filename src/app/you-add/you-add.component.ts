import { Component, OnInit } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ApiService } from '../api-service.service';
interface category {id:string,name:string};
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { youmovie } from './youtube.type';

@Component({
  selector: 'app-you-add',
  templateUrl: './you-add.component.html',
  styleUrls: ['./you-add.component.scss']
})
export class YouAddComponent implements OnInit {
  categories:category[] = [
    { id:"1", name:"Action"},
    { id:"2", name:"SCi Fi"}
  ];
  selectedCategories:category[] = [];
  idSet = 0;
  categorySettings:IDropdownSettings = {};
  movies:youmovie[] = [];
  movie:youmovie = {
    id: "string",
    name: "string",
    author: "string",
    video: "string",
    category: [],
    img:"string"
  };
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.myForm = this.fb.group({
      id: "",
      video:"",
      categories:[]
    });
  }



  ngOnInit(): void {
    this.categorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.getData();
  }

  addJSON(){
    let data = this.myForm.value;
    console.log(data, this.selectedCategories);
    let idValue = data.video.split('=')[1];


    this.apiService.getYoutubeJSON(idValue).subscribe((value:any) => {
      var mov:any = {
        id: this.idSet,
        author : value.author_name,
        name: value.title,
        video: 'https://www.youtube.com/embed/'+idValue,
        category: this.selectedCategories,
        img: 'https://img.youtube.com/vi/'+idValue+'/0.jpg'
      };
      console.log(mov);
      this.postVideo(mov);
    })
  }

  getData(){
    this.apiService.getYoumovie().subscribe((data:any) =>{
      this.movies = data;
      // console.log('movies', this.movies);
      this.idSet = this.movies.length+1;
    });
  }
  errorMessage = '';
  postVideo(mov:any){
    this.apiService.postYoumovie(mov).subscribe(
      {
        next: data => {
          console.log(data);
          this.myForm.reset();
          this.getData();
        },
        error: error => {
            this.errorMessage = error.error.text;
            this.myForm.reset();
            this.getData();
            // this.showError = true;
            // var pic = this;
            // setTimeout(function(){ pic.showError = false},3000);
        }
    });
  }

  onSelectAll(event:any){

  }
  onItemSelect(event:any){

  }
}
