import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SplComponent } from './spl/spl.component';
import { ActorsComponent } from './actors/actors.component';
import { MoviesComponent } from './movies/movies.component';
import { IactorComponent } from './iactor/iactor.component';
import { AddmovComponent } from './addmov/addmov.component';
import { ImovComponent } from './imov/imov.component';
import { AddactorComponent } from './addactor/addactor.component';
import { YouTubeComponent } from './you-tube/you-tube.component';
import { YouAddComponent } from './you-add/you-add.component';
import { YouViewComponent } from './you-view/you-view.component';
import { PositionComponent } from './position/position.component';

const routes: Routes = [
  { path:'', component:ListComponent },
  { path:'spl', component:SplComponent },
  { path:'actors/:id/:page', component:ActorsComponent },
  { path:'movies/:id/:page', component: MoviesComponent},
  { path:'iact/:id', component:IactorComponent},
  { path:'add', component:AddmovComponent },
  { path:'addactor', component:AddactorComponent },
  { path:'imov/:id', component:ImovComponent },
  { path:'you', component:YouTubeComponent },
  { path:'youadd', component: YouAddComponent },
  { path:'yview/:id', component:YouViewComponent },
  { path:'pos', component:PositionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
