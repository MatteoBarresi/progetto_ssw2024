import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArchivioService } from '../archivio.service';
import { AjaxResponse } from 'rxjs/ajax';
import { Archivio } from '../archivio';
import { Libro } from '../libro';
import { SchedaComponent } from './scheda/scheda.component';

@Component({
  selector: 'app-ricerca',
  standalone: true,
  imports: [CommonModule,SchedaComponent],
  providers:[ArchivioService],
  templateUrl: './ricerca.component.html',
  styleUrl: './ricerca.component.css'
})
export class RicercaComponent {
  @Input() pagina: string;
  @Input() archivio: Archivio;
  @Output() eventoCambio = new EventEmitter<string>();

  corrispondenza: Libro;
  
  constructor(/*private as : ArchivioService*/){}

  togglePaginaRicerca(){
    this.pagina = 'iniziale';
    this.eventoCambio.emit(this.pagina)
  }


  risultati(){
    const query = document.getElementById("barraRicerca") as HTMLInputElement;
    console.log(query.value);
    const riscontro = document.getElementById("riscontro");
    if (query.value != ""){
      let result = this.archivio.ricerca(query.value);
      if(result.length==1){
        //corrisponde solo un libro
        //passa l'oggetto a scheda
        this.corrispondenza = result[0];
        this.pagina='scheda';
        //riscontro.innerHTML = "autore: " + result[0].autore + "<br> titolo: " + result[0].titolo;
        //console.log("autore: " + result[0].autore + "<br> titolo: " + result[0].titolo);
      }
      else if(result.length>1)
        riscontro.innerHTML = "troppi risultati (" + result.length +")";
      //console.log("troppi risultati (" + result.length +")");
    else
        riscontro.innerHTML = "nessun risultato";
    //console.log("nessun risultato");
    }
    else 
      riscontro.innerHTML = "";  
  }


}
