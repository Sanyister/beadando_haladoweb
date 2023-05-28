import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { SemestersService } from '../semesters.service';
import { SemesterActionTypes, semestersLoadedAction, semestersRequestedAction, semesterCreatedAction, semesterLoadedAction, semesterUpdatedAction } from './semesters.actions';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextSemesterId } from '../store/semesters.selectors';

@Injectable()
export class SemestersEffects {

  loadSemesters$ = createEffect(() => this.actions$.pipe(
      ofType(SemesterActionTypes.semestersRequested),
      mergeMap(() => this.semestersService.getSemesters()
        .pipe(
          map(semesters => (semestersLoadedAction({semesters}))),
          catchError(() => EMPTY)
        ))
    )
  );
  loadSemester$ = createEffect(() => this.actions$.pipe(
      ofType(SemesterActionTypes.semesterRequested),
      switchMap((action:any) => this.semestersService.getSemester(action.semesterId)
        .pipe(
          map(semester => (semesterLoadedAction({semester}))),
          catchError(() => EMPTY)
        ))
    )
  );

  createSemester$ = createEffect(() => this.actions$.pipe(
    ofType(SemesterActionTypes.semesterCreate),
    concatLatestFrom(a => this.store.select(selectNextSemesterId)),
    switchMap(([action, id]) => {
      return this.semestersService.createSemester(action).pipe(
        map((item: any) => {
          // @ts-ignore
          return semesterCreatedAction({semester: {
              id,
              // @ts-ignore
              name: action.name,
              // @ts-ignore
              startDate: action.Date,
              // @ts-ignore
              endDate:action.Date,
              // @ts-ignore
              deleted: false
            }});
        }),
        catchError(() => EMPTY)
      )
    })
  ))

  updateSemester$ = createEffect(() => this.actions$.pipe(
    ofType(SemesterActionTypes.semesterUpdate),
    switchMap((action) => {
      return this.semestersService.updateSemester(action).pipe(
        map((item: any) => {
          return semesterUpdatedAction({semester: {
              // @ts-ignore
              id:action.id,
              // @ts-ignore
              name: action.name,
              // @ts-ignore
              startDate: action.Date,
              // @ts-ignore
              endDate:action.Date,
              // @ts-ignore
              deleted: false
            }});
        }),
        catchError(() => EMPTY)
      )
    })
  ))

  /* deleteSemester$ = createEffect(() => this.actions$.pipe(
     ofType(SemesterActionTypes.semesterDelete),
     switchMap((action) => {
       return this.semestersService.deleteSemester(action.semester).pipe(
         map((item: any) => {
             return semestersRequestedAction();
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
    private semestersService: SemestersService,
    private store: Store
  ) {}
}
