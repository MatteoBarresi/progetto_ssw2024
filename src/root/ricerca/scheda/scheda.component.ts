import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Libro } from '../../libro';
import { CommonModule } from '@angular/common';
import { ArchivioService } from '../../archivio.service';
import { Archivio } from '../../archivio';
import { AjaxError, AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'app-scheda',
  standalone: true,
  imports: [CommonModule],
  providers: [ArchivioService],
  templateUrl: './scheda.component.html',
  styleUrl: './scheda.component.css'
})
export class SchedaComponent {
  @Input() corrispondenza:Libro;
  @Input() archivio:Archivio;
  @Input() pagina: string;
  @Output() eventoCambio = new EventEmitter<string>();
  
  constructor(private as : ArchivioService){}
  
  togglePaginaScheda(){
    this.pagina = 'iniziale';
    this.eventoCambio.emit(this.pagina)
  }

  aggiornaStato(){
    this.as.setData(this.archivio.collezione);
    this.togglePaginaScheda();
  }

  prestito(){
    //aggiorna libro e fa la post
    const nominativo=document.getElementById("nome") as HTMLInputElement;
    this.archivio.aggiornaPrestito(this.corrispondenza, nominativo.value);
    this.aggiornaStato();    
  }
  rimuovi(){
    //toglie il libro da this.archivio e fa la post
    this.archivio.rimuovi(this.corrispondenza);
    this.aggiornaStato();
  }
  restituzione(){
    this.archivio.aggiornaPrestito(this.corrispondenza, '');
    this.aggiornaStato();
  }

}
