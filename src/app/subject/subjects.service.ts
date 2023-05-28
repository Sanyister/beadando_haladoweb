import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, exhaustMap } from 'rxjs/operators';
import {Subject} from "../data/subject.data";
import {SubjectModel} from "./store/subject.model";

const AUTHOR_URL = 'api/subjects';

@Injectable()
export class SubjectsService {

  constructor(private requestService: RequestService) { }

  getSubjects(): Observable<Subject[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.requestService.get<Subject[]>(`${AUTHOR_URL}/?deleted=false`, httpOptions);
  }

  getSubject(subjectId: number): Observable<any>{
    return this.requestService.get(`${AUTHOR_URL}/${subjectId}`);
  }

  createSubject(subject: SubjectModel): Observable<any> {
    return this.requestService.post(`${AUTHOR_URL}/`, subject);
  }

  updateSubject(subject: SubjectModel): Observable<any> {
    return this.requestService.put(`${AUTHOR_URL}/`, subject);
  }

  /*deleteSubject(subject: SubjectModel): Observable<any> {
    return this.booksService.getBooks().pipe(
      exhaustMap(res => {
        if(res.filter(b => b.subjectId === subject.id).length > 0){
          throw new Error('Cannot delete subject!');
        }
        subject = Object.assign({}, subject, {deleted: true});
        return this.updateSubject(subject);
      })
    );
  }*/

}
