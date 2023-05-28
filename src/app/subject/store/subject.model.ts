import {Subject} from "../../data/subject.data";
export class SubjectModel implements Subject {
  id: number;
  name: string;
  code: string;
  credit: number;
  department: string;
  deleted:boolean;
}
