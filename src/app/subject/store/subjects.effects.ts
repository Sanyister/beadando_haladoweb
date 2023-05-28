import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { SubjectsService } from '../subjects.service';
import { SubjectActionTypes, subjectsLoadedAction, subjectsRequestedAction, subjectCreatedAction, subjectLoadedAction, subjectUpdatedAction } from './subjects.actions';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextSubjectId } from './subjects.selectors';

@Injectable()
export class SubjectEffects {

  loadSubjects$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectActionTypes.subjectsRequested),
    mergeMap(() => this.subjectsService.getSubjects()
      .pipe(
        map(subjects => (subjectsLoadedAction({subjects}))),
        catchError(() => EMPTY)
      ))
    )
  );
  loadSubject$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectActionTypes.subjectRequested),
    switchMap((action:any) => this.subjectsService.getSubject(action.subjectId)
      .pipe(
        map(subject => (subjectLoadedAction({subject}))),
        catchError(() => EMPTY)
      ))
    )
  );

  createSubject$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectActionTypes.subjectCreate),
    concatLatestFrom(a => this.store.select(selectNextSubjectId)),
    switchMap(([action, id]) => {
      return this.subjectsService.createSubject(action).pipe(
        map((item: any) => {
            // @ts-ignore
          return subjectCreatedAction({subject: {
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

  updateSubject$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectActionTypes.subjectUpdate),
    switchMap((action) => {
      return this.subjectsService.updateSubject(action).pipe(
        map((item: any) => {
            return subjectUpdatedAction({subject: {
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

 /* deleteSubject$ = createEffect(() => this.actions$.pipe(
    ofType(SubjectActionTypes.subjectDelete),
    switchMap((action) => {
      return this.subjectsService.deleteSubject(action.subject).pipe(
        map((item: any) => {
            return subjectsRequestedAction();
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
    private subjectsService: SubjectsService,
    private store: Store
  ) {}
}
