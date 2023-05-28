import { Component } from '@angular/core';
import {distinctUntilChanged, Observable, Subject} from "rxjs";
import {SubjectModel} from "../../subject/store/subject.model";
import {select, Store} from "@ngrx/store";
import {selectSubjects} from "../../subject/store/subjects.selectors";
import {SemesterModel} from "../../semester/store/semester.model";
import {selectSemesters} from "../../semester/store/semesters.selectors";
import {SubjectsService} from "../../subject/subjects.service";
import {debounceTime} from "rxjs/operators";
import {Sort} from "@angular/material/sort";
import {subjectDeleteAction, subjectsRequestedAction} from "../store/subjects.actions";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent {
  displayedColumns: string[] = ['id', 'name', 'code', 'credit', 'department'];
  subjects$: Observable<SubjectModel[]> = this.store.pipe(select(selectSubjects));
  semester$: Observable<SemesterModel[]> = this.store.pipe(select(selectSemesters));
  dataSource:SubjectModel[];
  semesters:SemesterModel[];
  selectedSemester:string;
  filterSubject: Subject<string> = new Subject<string>();

  constructor(private store: Store,private subjectsService: SubjectsService) {
    this.filterSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(filter => {
        this.applyFilter(filter);
      });
  }
  ngOnInit() {
    this.store.dispatch(subjectsRequestedAction());
    this.subjects$.subscribe(value => {
      this.dataSource=value;
    })
    this.semester$.subscribe(value => {
      this.semesters=value;
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
  onDelete(subject: SubjectModel): void {
    this.store.dispatch(subjectDeleteAction({subject}));
  }
  applyFilter(filterValue: string) {
    if(filterValue==""){
      this.subjects$.subscribe(value => {
        this.dataSource=value;
      })
    }else{
      var filtered=[...this.dataSource];
      this.dataSource=filtered.filter((subject) => subject.name.includes("val"));
    }
  }
  onFilterInput(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }
}
