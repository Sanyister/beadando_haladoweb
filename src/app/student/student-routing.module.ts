import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentListComponent} from "./student-list/student-list.component";
import {StudentSubjectBySemesterComponent} from "./student-subject-by-semester/student-subject-by-semester.component";
import {StudentComponent} from "./student/student.component";

const routes: Routes = [
  {path: 'list', component: StudentListComponent},
  {path: 'semester', component: StudentSubjectBySemesterComponent},

  { path: '', component: StudentComponent, //canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component: StudentListComponent
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
  { path: '**', component: StudentComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
