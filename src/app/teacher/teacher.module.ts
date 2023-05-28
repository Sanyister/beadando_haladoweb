import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import * as fromTeachers from './store/teachers.reducer';
import {TeachersService} from "./teachers.service";
import {EffectsModule} from "@ngrx/effects";
import {TeacherEffects} from "./store/teachers.effects";
import {MatSortModule} from "@angular/material/sort";
import { TeacherComponent } from './teacher/teacher.component';
import {MatSelectModule} from "@angular/material/select";
import * as fromSemesters from "../semester/store/semesters.reducer";
import {SemestersService} from "../semester/semesters.service";
import {SemestersEffects} from "../semester/store/semesters.effects";
import {MatTableFilterModule} from "mat-table-filter";
import {TeacherSubjectBySemesterComponent} from "./teacher-subject-by-semester/teacher-subject-by-semester.component";
import { CreateEditComponent } from './create-edit/create-edit.component';


@NgModule({
  imports: [
    CommonModule, TeacherRoutingModule, FormsModule, ReactiveFormsModule, RouterModule,
    StoreModule.forFeature(fromTeachers.teachersFeatureKey, fromTeachers.teachersReducer),
    StoreModule.forFeature(fromSemesters.semestersFeatureKey, fromSemesters.semestersReducer),
    EffectsModule.forFeature([TeacherEffects]),
    EffectsModule.forFeature([SemestersEffects]),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule, MatSortModule, MatSelectModule,MatTableFilterModule
  ],
  declarations: [
    TeacherListComponent,
    TeacherComponent,
    TeacherSubjectBySemesterComponent,
    CreateEditComponent
  ],
  providers: [
    TeachersService,SemestersService
  ]
})
export class TeacherModule { }
