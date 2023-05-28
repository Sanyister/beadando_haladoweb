import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, exhaustMap } from 'rxjs/operators';
import {Teacher} from "../data/teacher.data";
import {TeacherModel} from "./store/teacher.model";

const AUTHOR_URL = 'api/teachers';

@Injectable()
export class TeachersService {

  constructor(private requestService: RequestService) { }

  getTeachers(): Observable<Teacher[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.requestService.get<Teacher[]>(`${AUTHOR_URL}/?deleted=false`, httpOptions);
  }

  getTeacher(teacherId: number): Observable<any>{
    return this.requestService.get(`${AUTHOR_URL}/${teacherId}`);
  }

  createTeacher(teacher: TeacherModel): Observable<any> {
    return this.requestService.post(`${AUTHOR_URL}/`, teacher);
  }

  updateTeacher(teacher: TeacherModel): Observable<any> {
    return this.requestService.put(`${AUTHOR_URL}/`, teacher);
  }

  /*deleteTeacher(teacher: SubjectModel): Observable<any> {
    return this.booksService.getBooks().pipe(
      exhaustMap(res => {
        if(res.filter(b => b.teacherId === teacher.id).length > 0){
          throw new Error('Cannot delete teacher!');
        }
        teacher = Object.assign({}, teacher, {deleted: true});
        return this.updateTeacher(teacher);
      })
    );
  }*/

}
