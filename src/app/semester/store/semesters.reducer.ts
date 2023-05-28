import { createReducer, on, Action } from '@ngrx/store';
import {SemesterModel} from "./semester.model";
import {semesterCreateAction, semesterLoadedAction, semestersLoadedAction} from "./semesters.actions";

export const semestersFeatureKey = 'semestersFeature';

export interface SemestersFeatureState {
  semesters: Array<SemesterModel>;
  loadedSemester: SemesterModel;
}

export const initialState: SemestersFeatureState = {
  semesters: [],
  loadedSemester: null
};

export const semestersReducer = createReducer(
  initialState,
  on(semestersLoadedAction, (state, {semesters}) => ({...state, semesters})),
  on(semesterLoadedAction, (state, {semester}) => ({
    ...state,
    loadedSemester: semester
  })),
  on(semesterCreateAction, (state) => ({...state}))
)
