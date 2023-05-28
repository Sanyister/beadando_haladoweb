import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, exhaustMap } from 'rxjs/operators';
import {Semester} from "../data/semester.data";
import {SemesterModel} from "./store/semester.model";

const AUTHOR_URL = 'api/semesters';

@Injectable()
export class SemestersService {

  constructor(private requestService: RequestService) { }

  getSemesters(): Observable<Semester[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.requestService.get<Semester[]>(`${AUTHOR_URL}/?deleted=false`, httpOptions);
  }

  getSemester(semesterId: number): Observable<any>{
    return this.requestService.get(`${AUTHOR_URL}/${semesterId}`);
  }

  createSemester(semester: SemesterModel): Observable<any> {
    return this.requestService.post(`${AUTHOR_URL}/`, semester);
  }

  updateSemester(semester: SemesterModel): Observable<any> {
    return this.requestService.put(`${AUTHOR_URL}/`, semester);
  }

  /*deleteSemester(semester: SemesterModel): Observable<any> {
    return this.booksService.getBooks().pipe(
      exhaustMap(res => {
        if(res.filter(b => b.semesterId === semester.id).length > 0){
          throw new Error('Cannot delete semester!');
        }
        semester = Object.assign({}, semester, {deleted: true});
        return this.updateSemester(semester);
      })
    );
  }*/

}
