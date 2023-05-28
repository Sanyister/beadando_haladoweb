import { Component } from '@angular/core';
import {distinctUntilChanged, Observable, Subject} from "rxjs";
import {StudentModel} from "../store/student.model";
import {select, Store} from "@ngrx/store";
import {SemesterModel} from "../../semester/store/semester.model";
import {selectSemesters} from "../../semester/store/semesters.selectors";
import {debounceTime} from "rxjs/operators";
import {studentDeleteAction, studentsRequestedAction} from "../store/students.actions";
import {Sort} from "@angular/material/sort";
import {selectStudents} from "../store/students.selectors";
import {StudentsService} from "../student.service";

@Component({
  selector: 'app-store-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  displayedColumns: string[] = ['id', 'neptunCode', 'name', 'email', 'major'];
  students$: Observable<StudentModel[]> = this.store.pipe(select(selectStudents));
  semester$: Observable<SemesterModel[]> = this.store.pipe(select(selectSemesters));
  dataSource:StudentModel[];
  semesters:SemesterModel[];
  selectedSemester:string;
  filterSubject: Subject<string> = new Subject<string>();

  constructor(private store: Store,private studentsService: StudentsService) {
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
    this.store.dispatch(studentsRequestedAction());
    this.students$.subscribe(value => {
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
  onDelete(student: StudentModel): void {
    this.store.dispatch(studentDeleteAction({student}));
  }
  applyFilter(filterValue: string) {
    if(filterValue==""){
      this.students$.subscribe(value => {
        this.dataSource=value;
      })
    }else{
      var filtered=[...this.dataSource];
      this.dataSource=filtered.filter((student) => student.name.includes("val"));
    }
  }
  onFilterInput(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }
}
