import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import {SemesterTable} from "./data/semester.data";
import {TeacherTable} from "./data/teacher.data";
import {SubjectTable} from "./data/subject.data";
import {StudentTable} from "./data/student.data";

@Injectable()
export class InMemoryEventService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const db = {
      teachers: TeacherTable.teachers,
      semesters:SemesterTable.semesters,
      subjects:SubjectTable.subjects,
      students:StudentTable.students
    }
    return db;
  }

}
