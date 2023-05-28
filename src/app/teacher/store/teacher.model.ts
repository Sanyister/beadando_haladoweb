import {Calibration} from "../../data/calibration.data";
import {Teacher} from "../../data/teacher.data";
export class TeacherModel implements Teacher {
  id: number;
  neptunCode: string;
  name: string;
  email: string;
  position: Calibration;
  deleted: boolean;
}
