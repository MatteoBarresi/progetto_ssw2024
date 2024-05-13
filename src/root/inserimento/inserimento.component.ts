import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  constructor(){}
  ngOnInit() {}
  
  toggleInserisci(){
    this.pagina = 'iniziale';
    this.eventoCambio.emit(this.pagina)
  }

/*
  comunica(){
    this.eventoProva.emit("stampa sta cosa");
  }*/

}
