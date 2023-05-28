import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { TeachersService } from '../teachers.service';
import { TeacherActionTypes, teachersLoadedAction, teachersRequestedAction, teacherCreatedAction, teacherLoadedAction, teacherUpdatedAction } from './teacher.actions';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextTeacherId } from '../store/teachers.selectors';

@Injectable()
export class TeacherEffects {

  loadTeachers$ = createEffect(() => this.actions$.pipe(
    ofType(TeacherActionTypes.teachersRequested),
    mergeMap(() => this.teachersService.getTeachers()
      .pipe(
        map(teachers => (teachersLoadedAction({teachers}))),
        catchError(() => EMPTY)
      ))
    )
  );
  loadTeacher$ = createEffect(() => this.actions$.pipe(
    ofType(TeacherActionTypes.teacherRequested),
    switchMap((action:any) => this.teachersService.getTeacher(action.teacherId)
      .pipe(
        map(teacher => (teacherLoadedAction({teacher}))),
        catchError(() => EMPTY)
      ))
    )
  );

  createTeacher$ = createEffect(() => this.actions$.pipe(
    ofType(TeacherActionTypes.teacherCreate),
    concatLatestFrom(a => this.store.select(selectNextTeacherId)),
    switchMap(([action, id]) => {
      return this.teachersService.createTeacher(action).pipe(
        map((item: any) => {
            // @ts-ignore
          return teacherCreatedAction({teacher: {
              id,
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

  updateTeacher$ = createEffect(() => this.actions$.pipe(
    ofType(TeacherActionTypes.teacherUpdate),
    switchMap((action) => {
      return this.teachersService.updateTeacher(action).pipe(
        map((item: any) => {
            return teacherUpdatedAction({teacher: {
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

 /* deleteTeacher$ = createEffect(() => this.actions$.pipe(
    ofType(TeacherActionTypes.teacherDelete),
    switchMap((action) => {
      return this.teachersService.deleteTeacher(action.teacher).pipe(
        map((item: any) => {
            return teachersRequestedAction();
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
    private teachersService: TeachersService,
    private store: Store
  ) {}
}
