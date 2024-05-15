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
  show(){
    console.log(this.corrispondenza)
  }

  prestito(){
    //aggiorna libro e fa la post
    const nominativo=document.getElementById("nome") as HTMLInputElement;
    this.archivio.aggiorna(this.corrispondenza, nominativo.value);

    this.as.setData(JSON.stringify(this.archivio.collezione)).subscribe({
      next: (res:AjaxResponse<any>)=> {console.log(res.response);
        console.log("stringa mandata " + JSON.stringify(this.archivio.collezione));
      }, 
      error: (err: AjaxError)=> console.log(err)
    });
    this.togglePaginaScheda();
  }
  rimuovi(){
    //toglie il libro da this.archivio e fa la post
  }

}
