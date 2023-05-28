import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, exhaustMap } from 'rxjs/operators';
import {Student} from "../data/student.data";
import {StudentModel} from "./store/student.model";

const AUTHOR_URL = 'api/students';

@Injectable()
export class StudentsService {

  constructor(private requestService: RequestService) { }

  getStudents(): Observable<Student[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.requestService.get<Student[]>(`${AUTHOR_URL}/?deleted=false`, httpOptions);
  }

  getStudent(studentId: number): Observable<any>{
    return this.requestService.get(`${AUTHOR_URL}/${studentId}`);
  }

  createStudent(student: StudentModel): Observable<any> {
    return this.requestService.post(`${AUTHOR_URL}/`, student);
  }

  updateStudent(student: StudentModel): Observable<any> {
    return this.requestService.put(`${AUTHOR_URL}/`, student);
  }

  /*deleteStudent(store: SubjectModel): Observable<any> {
    return this.booksService.getBooks().pipe(
      exhaustMap(res => {
        if(res.filter(b => b.studentId === store.id).length > 0){
          throw new Error('Cannot delete store!');
        }
        store = Object.assign({}, store, {deleted: true});
        return this.updateStudent(store);
      })
    );
  }*/

}
