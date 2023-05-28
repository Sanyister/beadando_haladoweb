import {Major} from "./major.data";

export interface Student {
  id: number;
  neptunCode: string;
  name: string;
  email: string;
  major: Major;
  deleted:boolean;
}


export class StudentTable {
  public static students: Student[] =  [
    {
      id:1,
      neptunCode: "ABC123",
      name: "Kovács Anna",
      email: "kovacs.anna@example.com",
      major: Major.BachelorOfScienceInBusinessInformatics,
      deleted:false
    },
    {
      id:2,
      neptunCode: "DEF456",
      name: "Nagy Péter",
      email: "nagy.peter@example.com",
      major: Major.MasterOfScienceInComputerEngineering,
      deleted:false
    },
    {
      id:3,
      neptunCode: "GHI789",
      name: "Kiss Tamás",
      email: "kiss.tamas@example.com",
      major: Major.BachelorOfScienceInSoftwareEngineering,
      deleted:false
    }
  ];
  /*public static books: Book[] = BookTable._books.map(book =>  {
    const author = AuthorTable.authors.find(a => a.id === book.authorId);
    book.authorName = author.name;
    return book;
  });*/
}
