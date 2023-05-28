import { Component } from '@angular/core';
import {Observable} from "rxjs";
import { Store, select } from '@ngrx/store';

import {Sort} from "@angular/material/sort";
import {selectSemesters} from "../store/semesters.selectors";
import {SemesterModel} from "../store/semester.model";
import {SemestersService} from "../semesters.service";
import {semesterDeleteAction, semestersRequestedAction} from "../store/semesters.actions";

@Component({
  selector: 'app-store-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.css']
})
export class SemesterListComponent {
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate'];
  semesters$: Observable<SemesterModel[]> = this.store.pipe(select(selectSemesters));
  dataSource:SemesterModel[];

  constructor(private store: Store,private semestersService: SemestersService) {}
  ngOnInit() {
    this.store.dispatch(semestersRequestedAction());
    this.semesters$.subscribe(value => {
      this.dataSource=value;
    })
  }
  sortData(sort: Sort) {
    const isAsc = sort.direction === 'asc';
    var sorted=[...this.dataSource]
    sorted.sort((a, b) => {
      return this.compare(a[sort.active], b[sort.active], isAsc);
    });
    this.dataSource=sorted;
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  onDelete(semester: SemesterModel): void {
    this.store.dispatch(semesterDeleteAction({semester}));
  }

}
