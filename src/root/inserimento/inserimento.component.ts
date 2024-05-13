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
  @Output() eventoProva = new EventEmitter<any>();
  constructor(){}
  ngOnInit() {}

  comunica(){
    this.eventoProva.emit("stampa sta cosa");
  }

}
