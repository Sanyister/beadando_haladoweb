import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import {semestersFeatureKey, SemestersFeatureState} from "./semesters.reducer";
import {SemesterModel} from "./semester.model";

export const selectFeature = createFeatureSelector<AppState, SemestersFeatureState>(semestersFeatureKey);

export const selectSemesters = createSelector(
  selectFeature,
  (state: SemestersFeatureState) => {
    console.log(state.semesters);
    return state.semesters;
  }
)
export const selectLoadedSemester = createSelector(
  selectFeature,
  (state: SemestersFeatureState) => {
    return state.loadedSemester;
  }
)
export const selectNextSemesterId = createSelector(
  selectSemesters,
  (semesters: SemesterModel[]) => {
    return semesters.length + 1;
  }
)
