import { Component, OnInit } from '@angular/core';
import { positionType } from './position.type';
import { ApiService } from '../api-service.service';
import { HostListener } from '@angular/core';
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27
}
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {
  value = 0;
  pos: positionType[] = [];
  showPopup:boolean = false;
  currImg:string = "";
  searchText:string = "";
  title:string = "";
  p: number = 1;
  totalItems:number = 30;
  hostIP = "192.168.0.105";
  constructor(private apiService: ApiService) {
    this.apiService.getPos().subscribe((data: any) => {
      this.pos = data;
      // this.loadData();
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

  loadPopup(index:number) {
    this.showPopup = true;
    this.value = index;
    if(this.pos.length < this.value+1){
      this.value = 0;
    }
    if(this.value < 0){
      this.value = this.pos.length -1;
    }
    this.currImg = this.pos[this.value].image;
    this.title = this.pos[this.value].name;

  }

  closePopup(){
    this.showPopup = false;
  }


  ngOnInit(): void {
    this.hostIP = this.apiService.URLIP;
  }
}
