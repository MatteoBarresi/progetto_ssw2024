export class Libro {
    autore:string;
    titolo:string;
    posizione:string;
    nominativo:string|undefined;

    constructor(autore:string, titolo:string, posizione:string,nominativo:string|undefined){
        this.autore = autore;
        this.titolo = titolo;
        this.posizione = posizione; 
        this.nominativo = nominativo;
      }
}
