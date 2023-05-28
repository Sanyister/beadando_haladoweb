export interface StudentSemesterSubject {
  id: number;
  student_id : number;
  subject_id : number[];
  semester_id : number;
  deleted: boolean;
}

export class StudentSemesterSubjectTable {
  public static studentSemesterSubjects: StudentSemesterSubject[] = [
    { id:1,student_id:1,semester_id:1,subject_id:[1,2],deleted:false},
    { id:2,student_id:2,semester_id:2,subject_id:[2],deleted:false},
    { id:3,student_id:3,semester_id:3,subject_id:[3],deleted:false},
  ];
}
