import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectListComponent } from './subject-list/subject-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {SubjectsService} from "../subject/subjects.service";
import {SemestersService} from "../semester/semesters.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import * as fromSubjects from "../subject/store/subjects.reducer";
import * as fromSemesters from "../semester/store/semesters.reducer";
import {EffectsModule} from "@ngrx/effects";
import {SubjectEffects} from "../subject/store/subjects.effects";
import {SemestersEffects} from "../semester/store/semesters.effects";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatTableFilterModule} from "mat-table-filter";



@NgModule({
  imports: [
    CommonModule, SubjectRoutingModule, FormsModule, ReactiveFormsModule, RouterModule,
    StoreModule.forFeature(fromSubjects.subjectsFeatureKey, fromSubjects.subjectsReducer),
    StoreModule.forFeature(fromSemesters.semestersFeatureKey, fromSemesters.semestersReducer),
    EffectsModule.forFeature([SubjectEffects]),
    EffectsModule.forFeature([SemestersEffects]),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule, MatSortModule, MatSelectModule,MatTableFilterModule
  ],
  declarations: [
    SubjectListComponent,
    //SubjectComponent
  ],
  providers: [
    SubjectsService,SemestersService
  ]
})
export class SubjectModule { }
