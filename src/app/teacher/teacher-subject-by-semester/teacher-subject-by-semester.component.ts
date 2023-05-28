import { Component } from '@angular/core';
import {distinctUntilChanged, empty, filter, find, Observable, Subject} from "rxjs";
import {TeacherModel} from "../store/teacher.model";
import {select, Store} from "@ngrx/store";
import {selectTeachers} from "../store/teachers.selectors";
import {SemesterModel} from "../../semester/store/semester.model";
import {selectSemesters} from "../../semester/store/semesters.selectors";
import {TeachersService} from "../teachers.service";
import {debounceTime} from "rxjs/operators";
import {teacherDeleteAction, teachersRequestedAction} from "../store/teacher.actions";
import {Sort} from "@angular/material/sort";
import {SubjectModel} from "../../subject/store/subject.model";
import {SubjectsService} from "../../subject/subjects.service";
import {selectSubjects} from "../../subject/store/subjects.selectors";
import {TeacherSemesterSubjectTable} from "../../data/TeacherSemesterSubject.data";
import {semesterRequestedAction, semestersRequestedAction} from "../../semester/store/semesters.actions";
import {subjectsRequestedAction} from "../../subject/store/subjects.actions";

@Component({
  selector: 'app-teacher-subject-by-semester',
  templateUrl: './teacher-subject-by-semester.component.html',
  styleUrls: ['./teacher-subject-by-semester.component.css']
})
export class TeacherSubjectBySemesterComponent {
  displayedColumns: string[] = ['id', 'name', 'code', 'credit', 'department'];
  teachers$: Observable<TeacherModel[]> = this.store.pipe(select(selectTeachers));
  semester$: Observable<SemesterModel[]> = this.store.pipe(select(selectSemesters));
  subject$: Observable<SubjectModel[]> = this.store.pipe(select(selectSubjects));
  teacherSemesterSubject=TeacherSemesterSubjectTable.teacherSemesterSubject;

  dataSourceTeacher:TeacherModel[];
  dataSourceSemester:SemesterModel[];
  dataSource:SubjectModel[];
  selectedTeacher:number;
  selectedSemester:number;
  filterSubject: Subject<string> = new Subject<string>();

  constructor(private store: Store,private teachersService: SubjectsService) {
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
    this.store.dispatch(teachersRequestedAction());
    this.store.dispatch(semestersRequestedAction());
    this.store.dispatch(subjectsRequestedAction());
    this.teachers$.subscribe(value => {
      this.dataSourceTeacher=value;
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
  onDelete(teacher: TeacherModel): void {
    this.store.dispatch(teacherDeleteAction({teacher}));
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
  onTeacherSelection() {
    this.dataSource=null;
    var foundTeacher=Array.from(this.teacherSemesterSubject.values()).filter((item) => item.teacher_id === this.selectedTeacher);
    this.semester$.subscribe(value => {
      this.dataSourceSemester=value;
    });
    var tempArr=[];
    for (let i = 0; i < foundTeacher.length; i++) {
        tempArr.push(foundTeacher[i].semester_id);
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
    var foundSemester=Array.from(this.teacherSemesterSubject.values()).filter((item) => item.semester_id === this.selectedSemester);
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
