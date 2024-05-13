import { Component, OnInit, VERSION } from '@angular/core';
import {CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent {
  title: string = 'titolo prova';
  pagina: string='';
  inserimento(){
    this.pagina = 'inserimento';
  }
}
