export interface Subject {
  id: number;
  name: string;
  code: string;
  credit: number;
  department: string;
  deleted:boolean;
}

export class SubjectTable {
  public static subjects: Subject[] = [
    { id: 1, name: 'Web programming', code: 'WEBPRG', credit: 5, department: 'VIRT',deleted:false },
    { id: 2, name: 'Database systems', code: 'DBSYS', credit: 4, department: 'RSZT',deleted:false },
    { id: 3, name: 'Calculus', code: 'CALC', credit: 6, department: 'Mathematics',deleted:false }
  ];
}
