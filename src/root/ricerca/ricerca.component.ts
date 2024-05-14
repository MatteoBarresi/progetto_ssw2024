import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArchivioService } from '../archivio.service';

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

  risultati(){
    let query = document.getElementById("barraRicerca") as HTMLInputElement;
    console.log(query.value);

    

  }

}
