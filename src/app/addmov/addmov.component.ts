import { Component, OnInit } from '@angular/core';
import { movie } from '../movies/movie.type';
// import movieList from './../../../JSON/movielist.json';
// import actors from './../../../JSON/actors.json';
// import categories from './../../../JSON/category.json';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ApiService } from '../api-service.service';
interface category {id:string,name:string};
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { actorType, character } from '../actors/actors.type';
@Component({
  selector: 'app-addmov',
  templateUrl: './addmov.component.html',
  styleUrls: ['./addmov.component.scss']
})
export class AddmovComponent implements OnInit {
  imageCount:number = 0;
  checkboxFlag:boolean = false;
  categories:category[] = [];
  selectedCategories:category[] = [];
  categorySettings:IDropdownSettings = {};
  femaleSettings:IDropdownSettings = {};
  maleSettings:IDropdownSettings = {};
  actorsData:actorType =  {male:[],female:[],BMI:[],waist:[],mod:[],ethinicity:[],size:[],group:[]};
  males:character[] = [];
  females:character[] = [];
  currentMovies:movie[] = [];
  selectedFems:character[] = [];
  selectedMens:character[] = [];
  group:Array<{type:string}> = [];
  showError:boolean = false;
  movie:movie = {
    id: "string",
    name: "string",
    type: "string",
    desc: "string",
    url: [""], // image count
    video: "string",
    category: [],
    creamtime: "string",
    group:"",
    cream: "false",
    actors: {
      female: [],
      male: []
    }
  };

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.myForm = this.fb.group({
      id: "",
      name: "",
      type: "",
      loc:"",
      desc: "",
      iform:"",
      imageCount: "",
      video: "",
      category: this.addCategoryControls(),
      group:"",
      creamtime: "",
      cream: "false",
      actors: {
        female: [],
        male: []
      }
    });

    this.movie = {
      id: "",
      name: "",
      type: "",
      desc: "",
      url: [],
      video: "",
      category: [],
      creamtime: "",
      cream: "false",
      group:"",
      actors: {
        female: [],
        male: []
      }
    }
    this.getDataActors();


  }

  getDataActors(){
    this.apiService.getActors().subscribe((data:any)=>{
      this.actorsData = data;
      this.apiService.getMovies().subscribe((datam:any)=>{
        this.currentMovies = datam;
        this.apiService.getCategories().subscribe((datac:any)=>{
          this.categories = datac;
          this.loadData();
        })
      })
    });
  }

  loadData(){
    this.males = this.actorsData.male;
    this.females = this.actorsData.female;
    this.group = this.actorsData.group;
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
    this.femaleSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.maleSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  // toggleCategory(id:any){
  //   let y:any = this.categories.find((x:category) => x.id === id);
  //   // this.movie.category.splice(categories.findIndex(a => a.id === id) , 1);
  //   this.movie.category.push(y);
  // }

  addCategoryControls(){
    const arr = this.categories.map(ele => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  numForm(data:any){
    //00001
    return data.toLocaleString('en-US', {
      minimumIntegerDigits: 5,
      useGrouping: false
    });
  }
  errorMessage = "";
  addJSON(){

    let data = this.myForm.value;
    var URLVAL = [];
    for(let step = 1; step < data.imageCount+1; step++){
      URLVAL.push(data.loc+"/pics/vlcsnap-"+this.numForm(step)+data.iform);
    }
    let idV = this.currentMovies.length +1 +"";
    this.movie = {
      id: idV,
      name: data.name,
      type: data.type,
      desc: data.desc,
      url: URLVAL,
      video: data.video,
      category: this.selectedCategories,
      creamtime: data.creamtime,
      cream: data.cream,
      group:data.group,
      actors: {
        female: this.selectedFems,
        male: this.selectedMens
      }
    }

    this.apiService.postMovies(this.movie).subscribe(
      {
        next: data => {
          this.selectedFems = [];
          this.selectedMens = [];
          this.selectedCategories = [];
          this.myForm.reset();
          this.getDataActors();
        },
        error: error => {
            this.errorMessage = error.error.text;
            this.selectedFems = [];
            this.selectedMens = [];
            this.selectedCategories = [];
            this.myForm.reset();
            this.getDataActors();
            this.showError = true;
            var pic = this;
            setTimeout(function(){ pic.showError = false},3000);
            // console.error('There was an error!', error);
        }
    });
    // this.currentMovies.push(this.movie);
  }

  get categoryArray(){
    return <FormArray>this.myForm.get('category');
  }

  // selectCategories(){
  //   this.selectedCategories = [];
  //   this.categoryArray.controls.forEach((control, i) => {
  //     if(control.value) {
  //       this.selectedCategories.push(this.categories[i]);
  //     }
  //   });
  //   console.log(this.selectedCategories);
  // }
  onSelectAll(event:any){

  }
  onItemSelect(event:any){

  }
}
