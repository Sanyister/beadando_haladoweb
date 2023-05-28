import { createAction, props } from '@ngrx/store';
import {SemesterModel} from "./semester.model";

export enum SemesterActionTypes {
  semestersRequested = '[Semesters] Semesters Requested',
  semestersLoaded = '[Semesters] Semesters Loaded',
  semesterCreate = '[Semesters] Semester Create',
  semesterCreated = '[Semesters] Semester Created',
  semesterRequested = '[Semesters] Semester Requested',
  semesterLoaded = '[Semesters] Semester Loaded',
  semesterUpdate = '[Semesters] Semester Update',
  semesterUpdated = '[Semesters] Semester Updated',
  semesterDelete = '[Semesters] Semester Delete',
  semesterDeleted = '[Semesters] Semester Deleted'
}

export const semestersRequestedAction = createAction(
  SemesterActionTypes.semestersRequested
);
export const semestersLoadedAction = createAction(
  SemesterActionTypes.semestersLoaded,
  props<{semesters: SemesterModel[]}>()
);
export const semesterCreateAction = createAction(
  SemesterActionTypes.semesterCreate,
  props<{semester: SemesterModel}>()
);
export const semesterCreatedAction = createAction(
  SemesterActionTypes.semesterCreated,
  props<{semester: SemesterModel}>()
);
export const semesterRequestedAction = createAction(
  SemesterActionTypes.semesterRequested,
  props<{semesterId: number}>()
);
export const semesterLoadedAction = createAction(
  SemesterActionTypes.semesterLoaded,
  props<{semester: SemesterModel}>()
);
export const semesterUpdateAction = createAction(
  SemesterActionTypes.semesterUpdate,
  props<{semester: SemesterModel}>()
);
export const semesterUpdatedAction = createAction(
  SemesterActionTypes.semesterUpdated,
  props<{semester: SemesterModel}>()
);
export const semesterDeleteAction = createAction(
  SemesterActionTypes.semesterDelete,
  props<{semester: SemesterModel}>()
);
export const semesterDeletedAction = createAction(
  SemesterActionTypes.semesterDeleted,
  props<{semester: SemesterModel}>()
);

/*export const deleteEvent = createAction(
  '[Events] Delete Event',
  props<{eventId}>()
);*/
