export class Libro {
    autore:string;
    titolo:string;
    posizione:string;
    nominativo:string;

    constructor(autore:string, titolo:string, posizione:string,nominativo:string){
        this.autore = autore;
        this.titolo = titolo;
        this.posizione = posizione; //deve essere sempre diversa (si può inserire un controllo)
        this.nominativo = nominativo;
      }
}
