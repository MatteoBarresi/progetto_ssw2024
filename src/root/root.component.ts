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

  cambioPagina(stato:string){
    this.pagina = stato
  }

  
  constructor(private archiveService: ArchivioService) {}

  ngOnInit(){}
}
