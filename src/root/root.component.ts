import { Component, OnInit, VERSION } from '@angular/core';
import {CommonModule } from '@angular/common';
//import { bootstrapApplication } from '@angular/platform-browser';
import { InserimentoComponent } from './inserimento/inserimento.component';
import { ArchivioService } from './archivio.service';
import { AjaxResponse } from 'rxjs/ajax';
import { Libro } from './libro';
import { Archivio } from './archivio';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, InserimentoComponent],
  providers: [ArchivioService],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent implements OnInit{
  title: string = 'titolo prova';
  pagina: string='iniziale';
  
  inserimento(){
    this.pagina = 'inserimento';
  }
  stampaCollezione(){
    this.archiveService.getData().subscribe({
      next: (x: AjaxResponse<any>) => {
        //const db = JSON.parse(x.response);
        console.log(x.response);
         //creazione oggetti
    /*    let libri = db.map( (item, i)=> new Libro(db[i].autore, db[i].titolo, db[i].posizione, db[i].nominativo) );
        let archivio = new Archivio(libri);
        console.log(archivio)*/
      },
      error: ()=>console.error("asd")
    });
  }
  
  constructor(private archiveService: ArchivioService) {}

  ngOnInit(){}
}
