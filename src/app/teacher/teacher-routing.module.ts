import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeacherListComponent} from "./teacher-list/teacher-list.component";
import {AuthGuard} from "../auth/auth.guard";
import {TeacherComponent} from "./teacher/teacher.component";
import {TeacherSubjectBySemesterComponent} from "./teacher-subject-by-semester/teacher-subject-by-semester.component";

const routes: Routes = [
  {path: 'list', component: TeacherListComponent},
  {path: 'semester', component: TeacherSubjectBySemesterComponent},

  { path: '', component: TeacherComponent, //canActivate: [AuthGuard],
       children: [
         {
           path: 'list',
           component: TeacherListComponent
         },
        /* {
           path: 'edit/:authorId',
           component: AuthorsUpdateComponent
         },
         {
           path: 'create',
           component: AuthorsCreateComponent
         }*/
       ]
  },
  { path: '', redirectTo: 'teachers', pathMatch: 'full'},
  { path: '**', component: TeacherComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
