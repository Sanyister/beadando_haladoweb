import { Semester } from "../../data/semester.data";

export class SemesterModel implements Semester {
  id: number;
  name:string;
  startDate:Date;
  endDate:Date;
  deleted: boolean;
}
