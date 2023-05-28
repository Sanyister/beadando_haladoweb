export interface TeacherSemesterSubject {
  id: number;
  teacher_id : number;
  subject_id : number[];
  semester_id : number;
  deleted: boolean;
}

export class TeacherSemesterSubjectTable {
  public static teacherSemesterSubject: TeacherSemesterSubject[] = [
      { id:1,teacher_id:1,semester_id:1,subject_id:[1,2],deleted:false},
      { id:1,teacher_id:1,semester_id:2,subject_id:[2],deleted:false},
      { id:2,teacher_id:2,semester_id:2,subject_id:[2],deleted:false},
      { id:3,teacher_id:3,semester_id:3,subject_id:[3],deleted:false},
    ];
}
