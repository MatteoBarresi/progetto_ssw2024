import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArchivioService } from '../archivio.service';


@Component({
  selector: 'app-inserimento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inserimento.component.html',
  styleUrl: './inserimento.component.css'
})
export class InserimentoComponent implements OnInit {
  
  @Input() pagina: string;
  @Output() eventoCambio = new EventEmitter<string>();
 // @Output() eventoCampi = new EventEmitter<string[]>();
  constructor(private archive : ArchivioService){}
  ngOnInit() {}
  
  togglePaginaInserisci(){
    this.pagina = 'iniziale';
    this.eventoCambio.emit(this.pagina)
  }

  send(){
    let campi : HTMLCollectionOf<HTMLInputElement>;
    let valori: string[] = [];
    campi = document.getElementById("campi").getElementsByTagName("input");
    
    //Array.from(campi).map((item, i)=> console.log(item.value)); //in caso cambi il numero di campi
    
    Array.from(campi).map((item)=> valori.push(item.value)); //mette le stringhe in un array
    //console.log(JSON.stringify(valori));
    
 //   this.archive.setData(JSON.stringify(valori))
  }

}
