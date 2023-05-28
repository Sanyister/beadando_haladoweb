import {Component, ViewChild} from '@angular/core';
import {TeacherModel} from "../store/teacher.model";
import {distinctUntilChanged, Observable, Subject} from "rxjs";
import {selectTeachers} from "../store/teachers.selectors";
import {TeachersService} from "../teachers.service";
import { Store, select } from '@ngrx/store';
import {teacherDeleteAction, teachersRequestedAction} from "../store/teacher.actions";
import {Sort} from "@angular/material/sort";
import {SemesterModel} from "../../semester/store/semester.model";
import {selectSemesters} from "../../semester/store/semesters.selectors";
import {debounceTime} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {neptonCodeValidator} from "../../validators/neptunCode.validator";

@Component({
  selector: 'app-store-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent {
  displayedColumns: string[] = ['id', 'neptunCode', 'name', 'email', 'position'];
  teachers$: Observable<TeacherModel[]> = this.store.pipe(select(selectTeachers));
  semester$: Observable<SemesterModel[]> = this.store.pipe(select(selectSemesters));
  dataSource:TeacherModel[];
  semesters:SemesterModel[];
  selectedSemester:string;
  filterSubject: Subject<string> = new Subject<string>();

  form = new FormGroup({
    "neptunCode": new FormControl("", Validators.required,neptonCodeValidator),
    "name": new FormControl("", Validators.required),
    "email": new FormControl("", Validators.required),
    "position": new FormControl("", Validators.required),
    "deleted": new FormControl()
  });
  constructor(private store: Store,private teachersService: TeachersService,private router: Router) {
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
    this.teachers$.subscribe(value => {
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
  onDelete(teacher: TeacherModel): void {
    this.store.dispatch(teacherDeleteAction({teacher}));
  }
  applyFilter(filterValue: string) {
    if(filterValue==""){
      this.teachers$.subscribe(value => {
        this.dataSource=value;
      })
    }else{
      var filtered=[...this.dataSource];
      this.dataSource=filtered.filter((teacher) => teacher.name.includes("val"));
    }
  }
  onFilterInput(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }
  editNavigation(teacherId:string){
    this.router.navigate(['/teachers/edit', { id: teacherId }]);
  }
}
