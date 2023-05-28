import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentListComponent } from './student-list/student-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import * as fromStudents from "../student/store/students.reducer";
import * as fromSemesters from "../semester/store/semesters.reducer";
import {EffectsModule} from "@ngrx/effects";
import {SemestersEffects} from "../semester/store/semesters.effects";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatTableFilterModule} from "mat-table-filter";

import {SemestersService} from "../semester/semesters.service";
import {StudentRoutingModule} from "./student-routing.module";
import {StudentsEffects} from "./store/students.effects";
import {StudentSubjectBySemesterComponent} from "./student-subject-by-semester/student-subject-by-semester.component";
import {StudentsService} from "./student.service";
import {StudentComponent} from "./student/student.component";


@NgModule({
  imports: [
    CommonModule, StudentRoutingModule, FormsModule, ReactiveFormsModule, RouterModule,
    StoreModule.forFeature(fromStudents.studentsFeatureKey, fromStudents.studentsReducer),
    StoreModule.forFeature(fromSemesters.semestersFeatureKey, fromSemesters.semestersReducer),
    EffectsModule.forFeature([StudentsEffects]),
    EffectsModule.forFeature([SemestersEffects]),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule, MatSortModule, MatSelectModule,MatTableFilterModule
  ],
  declarations: [
    StudentListComponent,
    StudentComponent,
    StudentSubjectBySemesterComponent
  ],
  providers: [
    StudentsService,SemestersService
  ]
})
export class StudentModule { }
