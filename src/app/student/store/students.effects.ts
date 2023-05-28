import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { StudentActionTypes, studentsLoadedAction, studentsRequestedAction, studentCreatedAction, studentLoadedAction, studentUpdatedAction } from './students.actions';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import {selectNextStudentId} from "./students.selectors";
import {StudentsService} from "../student.service";

@Injectable()
export class StudentsEffects {

  loadStudents$ = createEffect(() => this.actions$.pipe(
      ofType(StudentActionTypes.studentsRequested),
      mergeMap(() => this.studentsService.getStudents()
        .pipe(
          map(students => (studentsLoadedAction({students}))),
          catchError(() => EMPTY)
        ))
    )
  );
  loadStudent$ = createEffect(() => this.actions$.pipe(
      ofType(StudentActionTypes.studentRequested),
      switchMap((action:any) => this.studentsService.getStudent(action.studentId)
        .pipe(
          map(student => (studentLoadedAction({student}))),
          catchError(() => EMPTY)
        ))
    )
  );

  createStudent$ = createEffect(() => this.actions$.pipe(
    ofType(StudentActionTypes.studentCreate),
    concatLatestFrom(a => this.store.select(selectNextStudentId)),
    switchMap(([action, id]) => {
      return this.studentsService.createStudent(action).pipe(
        map((item: any) => {
          // @ts-ignore
          return studentCreatedAction({student: {
              id,
              // @ts-ignore
              neptunCode: action.neptunCode,
              // @ts-ignore
              name: action.name,
              // @ts-ignore
              email: action.email,
              // @ts-ignore
              major:action.major,
              // @ts-ignore
              deleted: false
            }});
        }),
        catchError(() => EMPTY)
      )
    })
  ))

  updateStudent$ = createEffect(() => this.actions$.pipe(
    ofType(StudentActionTypes.studentUpdate),
    switchMap((action) => {
      return this.studentsService.updateStudent(action).pipe(
        map((item: any) => {
          return studentUpdatedAction({student: {
              // @ts-ignore
              id:action.id,
              // @ts-ignore
              neptunCode: action.neptunCode,
              // @ts-ignore
              name: action.name,
              // @ts-ignore
              email: action.email,
              // @ts-ignore
              position:action.Calibration,
              // @ts-ignore
              deleted: false
            }});
        }),
        catchError(() => EMPTY)
      )
    })
  ))

  /* deleteStudent$ = createEffect(() => this.actions$.pipe(
     ofType(StudentActionTypes.studentDelete),
     switchMap((action) => {
       return this.studentsService.deleteStudent(action.store).pipe(
         map((item: any) => {
             return studentsRequestedAction();
         }),
         catchError((err) => {
           console.error(err);
           return EMPTY;
         })
       )
     })
   ))*/

  constructor(
    private actions$: Actions,
    private studentsService: StudentsService,
    private store: Store
  ) {}
}
