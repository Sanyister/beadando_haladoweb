import { createAction, props } from '@ngrx/store';
import {StudentModel} from "./student.model";

export enum StudentActionTypes {
  studentsRequested = '[Students] Students Requested',
  studentsLoaded = '[Students] Students Loaded',
  studentCreate = '[Students] Student Create',
  studentCreated = '[Students] Student Created',
  studentRequested = '[Students] Student Requested',
  studentLoaded = '[Students] Student Loaded',
  studentUpdate = '[Students] Student Update',
  studentUpdated = '[Students] Student Updated',
  studentDelete = '[Students] Student Delete',
  studentDeleted = '[Students] Student Deleted'
}

export const studentsRequestedAction = createAction(
  StudentActionTypes.studentsRequested
);
export const studentsLoadedAction = createAction(
  StudentActionTypes.studentsLoaded,
  props<{students: StudentModel[]}>()
);
export const studentCreateAction = createAction(
  StudentActionTypes.studentCreate,
  props<{student: StudentModel}>()
);
export const studentCreatedAction = createAction(
  StudentActionTypes.studentCreated,
  props<{student: StudentModel}>()
);
export const studentRequestedAction = createAction(
  StudentActionTypes.studentRequested,
  props<{studentId: number}>()
);
export const studentLoadedAction = createAction(
  StudentActionTypes.studentLoaded,
  props<{student: StudentModel}>()
);
export const studentUpdateAction = createAction(
  StudentActionTypes.studentUpdate,
  props<{student: StudentModel}>()
);
export const studentUpdatedAction = createAction(
  StudentActionTypes.studentUpdated,
  props<{student: StudentModel}>()
);
export const studentDeleteAction = createAction(
  StudentActionTypes.studentDelete,
  props<{student: StudentModel}>()
);
export const studentDeletedAction = createAction(
  StudentActionTypes.studentDeleted,
  props<{student: StudentModel}>()
);

/*export const deleteEvent = createAction(
  '[Events] Delete Event',
  props<{eventId}>()
);*/
