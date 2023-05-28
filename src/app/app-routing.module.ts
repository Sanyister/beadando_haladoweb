import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'students',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'teachers',
    loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
   // canLoad: [AuthGuard]
  },
  {
    path: 'semesters',
    loadChildren: () => import('./semester/semester.module').then(m => m.SemesterModule),
    // canLoad: [AuthGuard]
  },
  {
    path: 'subjects',
    loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule),
    // canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
