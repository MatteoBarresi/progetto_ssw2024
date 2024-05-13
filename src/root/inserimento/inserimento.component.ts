import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inserimento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inserimento.component.html',
  styleUrl: './inserimento.component.css'
})
export class InserimentoComponent implements OnInit {
  
  @Input() pagina: string;

  constructor(){}
  ngOnInit() {}

}
