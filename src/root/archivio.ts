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
          for (let x in libro){
            if(x=='titolo' || x=='autore'){
              if (libro[x].split(" ").join("").toLowerCase().includes(query.toLowerCase())) //per unire stringhe con stringhe separate da spazi
              return libro; //mette l'oggetto Libro nell'array di risultati
            }
          }
        });
        return result;
      }

      aggiornaPrestito(libro:Libro, nominativo:string){
        const lend = this.collezione.find((item)=> item===libro);
        lend.nominativo= nominativo;
      }

      rimuovi(libro:Libro){
        const posizione = this.collezione.indexOf(libro);
        this.collezione.splice(posizione,1);
      }

      
}