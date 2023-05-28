import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SemesterListComponent} from "./semester-list/semester-list.component";

const routes: Routes = [
  {path: 'list', component: SemesterListComponent},
  { path: '', redirectTo: '/semesters', pathMatch: 'full'},
  { path: '**', component: SemesterListComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SemesterRoutingModule { }
