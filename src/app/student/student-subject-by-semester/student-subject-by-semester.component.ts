import { Component } from '@angular/core';
import {distinctUntilChanged, empty, filter, find, Observable, Subject} from "rxjs";
import {select, Store} from "@ngrx/store";
import {SemesterModel} from "../../semester/store/semester.model";
import {selectSemesters} from "../../semester/store/semesters.selectors";
import {debounceTime} from "rxjs/operators";
import {Sort} from "@angular/material/sort";
import {SubjectModel} from "../../subject/store/subject.model";
import {SubjectsService} from "../../subject/subjects.service";
import {selectSubjects} from "../../subject/store/subjects.selectors";
import {semesterRequestedAction, semestersRequestedAction} from "../../semester/store/semesters.actions";
import {subjectsRequestedAction} from "../../subject/store/subjects.actions";
import {StudentSemesterSubject, StudentSemesterSubjectTable} from "../../data/StudentSemesterSubject.data";
import {StudentModel} from "../store/student.model";
import {selectStudents} from "../store/students.selectors";
import {studentDeleteAction, studentsRequestedAction} from "../store/students.actions";

@Component({
  selector: 'app-store-subject-by-semester',
  templateUrl: './student-subject-by-semester.component.html',
  styleUrls: ['./student-subject-by-semester.component.css']
})
export class StudentSubjectBySemesterComponent {
  displayedColumns: string[] = ['id', 'name', 'code', 'credit', 'department'];
  students$: Observable<StudentModel[]> = this.store.pipe(select(selectStudents));
  semester$: Observable<SemesterModel[]> = this.store.pipe(select(selectSemesters));
  subject$: Observable<SubjectModel[]> = this.store.pipe(select(selectSubjects));
  studentSemesterSubject:StudentSemesterSubject[]=StudentSemesterSubjectTable.studentSemesterSubjects;

  dataSourceStudent:StudentModel[];
  dataSourceSemester:SemesterModel[];
  dataSource:SubjectModel[];
  selectedStudent:number;
  selectedSemester:number;
  filterSubject: Subject<string> = new Subject<string>();

  constructor(private store: Store,private studentsService: SubjectsService) {
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
    this.store.dispatch(semestersRequestedAction());
    this.store.dispatch(subjectsRequestedAction());
    this.students$.subscribe(value => {
      this.dataSourceStudent=value;
    });

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
      this.onSemesterSelection();
    }else{
      var filtered=[...this.dataSource];
      this.dataSource=filtered.filter((subject) => subject.name.includes(filterValue));
    }
  }
  onFilterInput(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }
  onStudentSelection() {
    this.dataSource=null;
    var foundStudent=Array.from(this.studentSemesterSubject.values()).filter((item) => item.student_id === this.selectedStudent);
    this.semester$.subscribe(value => {
      this.dataSourceSemester=value;
    });
    var tempArr=[];
    for (let i = 0; i < foundStudent.length; i++) {
        tempArr.push(foundStudent[i].semester_id);
    }
    this.dataSourceSemester=this.dataSourceSemester.filter((semester) => {
      if(tempArr.includes(semester.id)){
        return true;
      }
      return false;
    });
  }
  onSemesterSelection() {
    this.dataSource=null;
    var foundSemester:StudentSemesterSubject[]=Array.from(this.studentSemesterSubject.values()).filter((item) => item.semester_id === this.selectedSemester);
    this.subject$.subscribe(value => {
      this.dataSource=value;
    });
    var tempArr=[];
    for (let i = 0; i < foundSemester.length; i++) {
      for (let j = 0; j < foundSemester[i].subject_id.length;j++) {
        tempArr.push(foundSemester[i].subject_id[j]);
      }
    }
    this.dataSource=this.dataSource.filter((subject,index) => {
      if(tempArr.includes(subject.id)){
        return true;
      }
      return false;
    });
  }
}
