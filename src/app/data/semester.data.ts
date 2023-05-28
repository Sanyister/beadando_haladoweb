export interface Semester {
  id: number;
  name:string;
  startDate:Date;
  endDate:Date;
  deleted: boolean;
}

export class SemesterTable {
  public static semesters: Semester[] = [
    { id: 1, name: '2021/2022 - I. félév', startDate: new Date(2021, 8, 1), endDate: new Date(2022, 0, 31),deleted:false },
    { id: 2, name: '2021/2022 - II. félév', startDate: new Date(2022, 1, 1), endDate: new Date(2022, 5, 30),deleted:false }
  ];
}
