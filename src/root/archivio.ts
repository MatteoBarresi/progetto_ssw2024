import{Libro} from "./libro";
export class Archivio {
    
    collezione:Array<Libro>;

    constructor(collezione:Array<Libro>){
        this.collezione = collezione; //array di oggetti libro
      }

      //metodi di ricerca ecc
      public add(libro: Libro){
        this.collezione.push(libro);

      }
      
}

