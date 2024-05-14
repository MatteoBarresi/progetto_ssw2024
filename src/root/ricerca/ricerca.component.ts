import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArchivioService } from '../archivio.service';
import { AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'app-ricerca',
  standalone: true,
  imports: [CommonModule],
  providers:[ArchivioService],
  templateUrl: './ricerca.component.html',
  styleUrl: './ricerca.component.css'
})
export class RicercaComponent {
  @Input() pagina: string;
  @Output() eventoCambio = new EventEmitter<string>();

  
  constructor(private as : ArchivioService){}

  togglePaginaRicerca(){
    this.pagina = 'iniziale';
    this.eventoCambio.emit(this.pagina)
  }

  getCollection(){
    this.as.getData().subscribe(
      {
        next: (x:AjaxResponse<any>)=> {
          const collezione = (JSON.parse(x.response));
          collezione.map((item)=> console.log(item))
        },
        error: (err) =>
          console.error('Observer got an error: ' + JSON.stringify(err))
      }
    )

  }

  risultati(){
    const query = document.getElementById("barraRicerca") as HTMLInputElement;
    console.log(query.value);
    this.getCollection();
    

  
  }

}
