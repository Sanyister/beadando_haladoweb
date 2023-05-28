import {Student} from "../../data/student.data";
import {Major} from "../../data/major.data";

export class StudentModel implements Student {
  id: number;
  neptunCode: string;
  name: string;
  email: string;
  major: Major;
  deleted:boolean;
}
