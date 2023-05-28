import {Calibration} from "./calibration.data";

export interface Teacher {
  id: number;
  neptunCode: string;
  name: string;
  email: string;
  position: Calibration;
  deleted: boolean;
}

export class TeacherTable {
  public static teachers: Teacher[] = [
      { id: 1, neptunCode: 'ABC123', name: 'John Doe', email: 'john.doe@example.com', position: Calibration.Docent,deleted:false },
      { id: 2, neptunCode: 'DEF456', name: 'Jane Smith', email: 'jane.smith@example.com', position: Calibration.Adjunct,deleted:false },
      { id: 3, neptunCode: 'GHI789', name: 'Bob Johnson', email: 'bob.johnson@example.com', position: Calibration.MasterLecturer,deleted:false }
    ];
}
