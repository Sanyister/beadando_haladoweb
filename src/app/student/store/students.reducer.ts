import { createReducer, on, Action } from '@ngrx/store';
import {StudentModel} from "./student.model";
import {studentCreateAction, studentLoadedAction, studentsLoadedAction} from "./students.actions";

export const studentsFeatureKey = 'studentsFeature';

export interface StudentsFeatureState {
  students: Array<StudentModel>;
  loadedStudent: StudentModel;
}

export const initialState: StudentsFeatureState = {
  students: [],
  loadedStudent: null
};

export const studentsReducer = createReducer(
  initialState,
  on(studentsLoadedAction, (state, {students}) => ({...state, students})),
  on(studentLoadedAction, (state, {student}) => ({
    ...state,
    loadedStudent: student
  })),
  on(studentCreateAction, (state) => ({...state}))
)
