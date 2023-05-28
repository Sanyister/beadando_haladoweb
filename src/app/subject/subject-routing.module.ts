import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubjectListComponent} from "./subject-list/subject-list.component";


const routes: Routes = [
  {path: 'list', component: SubjectListComponent},
  { path: '', component: SubjectListComponent, //canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component: SubjectListComponent
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
  { path: '', redirectTo: 'subjects', pathMatch: 'full'},
  { path: '**', component: SubjectListComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
