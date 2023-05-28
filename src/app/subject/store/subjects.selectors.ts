import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import {subjectsFeatureKey, SubjectsFeatureState} from "./subjects.reducer";
import {SubjectModel} from "./subject.model";

export const selectFeature = createFeatureSelector<AppState, SubjectsFeatureState>(subjectsFeatureKey);

export const selectSubjects = createSelector(
  selectFeature,
  (state: SubjectsFeatureState) => {
    console.log(state);
    return state.subjects;
  }
)
export const selectLoadedSubject = createSelector(
  selectFeature,
  (state: SubjectsFeatureState) => {
    return state.loadedSubject;
  }
)
export const selectNextSubjectId = createSelector(
  selectSubjects,
  (subjects: SubjectModel[]) => {
    return subjects.length + 1;
  }
)
