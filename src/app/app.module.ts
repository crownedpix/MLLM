import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { SplComponent } from './spl/spl.component';
import { ActorsComponent } from './actors/actors.component';
import { MoviesComponent } from './movies/movies.component';
import { IactorComponent } from './iactor/iactor.component';
import { AddmovComponent } from './addmov/addmov.component';
import { ImovComponent } from './imov/imov.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddactorComponent } from './addactor/addactor.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FilterDataPipe } from './filter-data.pipe';
import { YouTubeComponent } from './you-tube/you-tube.component';
import { YouAddComponent } from './you-add/you-add.component';
import { YouViewComponent } from './you-view/you-view.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { PositionComponent } from './position/position.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    SplComponent,
    ActorsComponent,
    MoviesComponent,
    IactorComponent,
    AddmovComponent,
    ImovComponent,
    AddactorComponent,
    FilterDataPipe,
    YouTubeComponent,
    YouAddComponent,
    YouViewComponent,
    SafeUrlPipe,
    PositionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
