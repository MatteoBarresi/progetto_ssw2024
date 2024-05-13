import { Component, OnInit, VERSION } from '@angular/core';
import {CommonModule } from '@angular/common';
//import { bootstrapApplication } from '@angular/platform-browser';
import { InserimentoComponent } from './inserimento/inserimento.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, InserimentoComponent],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent implements OnInit{
  title: string = 'titolo prova';
  pagina: string='iniziale';
  inserimento(){
    this.pagina = 'inserimento';
  }
  ngOnInit(){}
}
