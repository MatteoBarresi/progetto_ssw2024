import { ParseSourceFile } from "@angular/compiler";
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
      public ricerca(query:string): Array<Libro>{
        const result = this.collezione.filter((libro)=>{
          //const attrCheck = [value['autore'], value['titolo']];
          for (let x in libro){
            if(x=='titolo' || x=='autore'){
              if (libro[x].split(" ").join("").toLowerCase().includes(query.toLowerCase())) //per unire stringhe con stringhe separate da spazi
              return libro; //include l'oggetto Libro nell'array di risultati
            }
          }
/*          attrCheck.map((attr)=>{
            if (attr.split(" ").join("").toLowerCase().includes(query.toLowerCase())) //per unire stringhe con stringhe separate da spazi
              return value; //include l'oggetto Libro nell'array di risultati
          })*/
        });
        return result;
      }
      
}