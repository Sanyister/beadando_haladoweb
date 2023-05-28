import { createReducer, on, Action } from '@ngrx/store';
import {TeacherModel} from "./teacher.model";
import {teacherCreateAction, teacherLoadedAction, teachersLoadedAction} from "./teacher.actions";

export const teachersFeatureKey = 'teachersFeature';

export interface TeachersFeatureState {
  teachers: Array<TeacherModel>;
  loadedTeacher: TeacherModel;
}

export const initialState: TeachersFeatureState = {
  teachers: [],
  loadedTeacher: null
};

export const teachersReducer = createReducer(
  initialState,
  on(teachersLoadedAction, (state, {teachers}) => ({...state, teachers})),
  on(teacherLoadedAction, (state, {teacher}) => ({
    ...state,
    loadedTeacher: teacher
  })),
  on(teacherCreateAction, (state) => ({...state}))
)
