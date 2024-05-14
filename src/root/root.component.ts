import { Component, OnInit, VERSION } from '@angular/core';
import {CommonModule } from '@angular/common';
//import { bootstrapApplication } from '@angular/platform-browser';
import { InserimentoComponent } from './inserimento/inserimento.component';
import { ArchivioService } from './archivio.service';
import { AjaxResponse } from 'rxjs/ajax';
import { Libro } from './libro';
import { Archivio } from './archivio';
import { RicercaComponent } from './ricerca/ricerca.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, InserimentoComponent, RicercaComponent],
  providers: [ArchivioService],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent implements OnInit{
  pagina: string='iniziale';
  archivio : Archivio = new Archivio([]);

  cambioPagina(stato:string){
    this.pagina = stato
  }

  getCollection(){
    //fa la get dal db remoto (ottiene stringa JSON)
    //crea oggetti Libro
    //li mette in un un oggetto Archivo--> serve a fare i controlli
    this.as.getData().subscribe(
      {
        next: (x:AjaxResponse<any>)=> {
          const collezione = (JSON.parse(x.response));
          collezione.map((item)=> this.archivio.add(new Libro(item['autore'],item['titolo'],item['posizione'],"")))
          console.log("archivio appena ottenuto " + this.archivio.collezione);
          this.archivio.collezione.map((item)=> console.log(item));
        },
        error: (err) =>
          console.error('Observer got an error: ' + JSON.stringify(err))
      }
    )
  }

  
  constructor(private as: ArchivioService) {}

  ngOnInit(){this.getCollection()} //archivio scaricato una volta sola, quando si carica la pagina
  //questo evita anche problemi di timing (es getCollection viene eseguita dopo la set (in inserimento.ts), anche se messa prima nel codice)
  //inoltre aggiorno this.archivio per sapere lo stato attuale dell'archivio e fare set successivi
}
