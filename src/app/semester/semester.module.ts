import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SemesterRoutingModule } from './semester-routing.module';
import { SemesterListComponent } from './semester-list/semester-list.component';
import { MatTableModule } from '@angular/material/table'
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {StoreModule} from "@ngrx/store";
import * as fromBooks from './store/semesters.reducer';
import {EffectsModule} from "@ngrx/effects";
import * as fromSemesters from "../semester/store/semesters.reducer";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
//import {SemesterComponent} from "../semester/semester/semester.component";
import {SemestersEffects} from "./store/semesters.effects";
import {SemestersService} from "./semesters.service";

@NgModule({
  imports: [
    CommonModule, SemesterRoutingModule, FormsModule, ReactiveFormsModule, RouterModule,
    StoreModule.forFeature(fromSemesters.semestersFeatureKey, fromSemesters.semestersReducer),
    EffectsModule.forFeature([SemestersEffects]),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule, MatSortModule, MatSelectModule
  ],
  declarations: [
    SemesterListComponent,
    //SemesterComponent
  ],
  providers: [
    SemestersService
  ]
})
export class SemesterModule { }
