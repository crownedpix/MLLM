import { Component, OnInit } from '@angular/core';
// import actors from './../../../JSON/actors.json';
import { actorType, character } from '../actors/actors.type';
import { ApiService } from '../api-service.service';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-addactor',
  templateUrl: './addactor.component.html',
  styleUrls: ['./addactor.component.scss']
})
export class AddactorComponent implements OnInit {
  actors:actorType = {male:[],female:[],BMI:[],waist:[],mod:[],ethinicity:[],size:[],group:[]};
  male:character[] = [];
  female:character[] = [];
  BMI:{id:string,type:string}[] = [];
  waist:{id:string,type:string}[] = [];
  mod:{id:string,type:string}[] = [];
  ethinicity:{id:string,type:string}[] = [];
  size:{id:string,type:string}[] = [];
  categorySettings:IDropdownSettings = {};
  // char:character = {
  //   id: "string",
  //   name: "string",
  //   img: "string",
  //   sex: "string",
  //   eyeColor: "string",
  //   hairColor: "string",
  //   size: "string",
  //   Height: "string",
  //   weight: "string",
  //   BMI: "string",
  //   waist: "string",
  //   mod: "string",
  //   ethinicity: "string",
  //   country: "string",
  //   startYear:"string",
  //   DOB:"string"
  // };
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.myForm = this.fb.group({
      id: "",
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
      startYear:"",
      DOB:""
    });
    this.getData();
  }

  getData(){
    this.apiService.getActors().subscribe((data:any)=>{
      console.log(data);
      this.actors = data;
      this.loadData();
    });
  }

  loadData(){

  this.male = this.actors.male;
  this.female = this.actors.female;
  this.BMI = this.actors.BMI;
  this.waist = this.actors.waist;
  this.mod = this.actors.mod;
  this.ethinicity = this.actors.ethinicity;
  this.size = this.actors.size;
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
  }
  errorMessage = "";
  showError:boolean = false;
  addJSONf(){
    let count = this.actors.female.length+1;
    let data = this.myForm.value;
    data.id = count+1+"f";
    data.img = "act/"+data.img
    this.apiService.postActorFemale(data).subscribe(
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
            this.showError = true;
            var pic = this;
            setTimeout(function(){ pic.showError = false},3000);
        }
    });
  }

  addJSONm(){
    let count = this.actors.male.length;
    let data = this.myForm.value;
    data.id = count+1+"m";
    data.img = "act/"+data.img
    this.apiService.postActorMale(data).subscribe(
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
            this.showError = true;
            var pic = this;
            setTimeout(function(){ pic.showError = false},3000);
        }
    });
  }

}
