import { CommonModule} from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArchivioService } from '../archivio.service';
import { Libro } from '../libro';
import { AjaxError, AjaxResponse } from 'rxjs/ajax';
import { Archivio } from '../archivio';


@Component({
  selector: 'app-inserimento',
  standalone: true,
  imports: [CommonModule],
  providers: [ArchivioService],
  templateUrl: './inserimento.component.html',
  styleUrl: './inserimento.component.css'
})
export class InserimentoComponent implements OnInit {
  
  @Input() pagina: string;
  @Input() archivio: Archivio;
  @Output() eventoCambio = new EventEmitter<string>();


  constructor(private as : ArchivioService){}
  ngOnInit() {} 
  
  togglePaginaInserisci(){
    this.pagina = 'iniziale';
    this.eventoCambio.emit(this.pagina)
  }


  checkCampiVuoti(campi:HTMLCollectionOf<HTMLInputElement>): boolean{
    return Array.from(campi).every((item)=>item.value !=='');
  }
  

  checkPosizione(libro:Libro): boolean{//riceve il libro appena creato
    //controlla che la posizione non sia occupata
    return this.archivio.collezione.every((item)=> item.posizione !== libro.posizione);    
  }

  send(){ //crea libro -> check duplicati -> aggiorna (aggiunge Libro all'oggetto) -> send
    
    //fare try-catch
    let campi : HTMLCollectionOf<HTMLInputElement>;
    campi = document.getElementById("campi").getElementsByTagName("input"); //in caso cambi il numero di campi, non li metto uno a uno
    if(!this.checkCampiVuoti(campi))
    {
      console.log('Riempire i campi vuoti');
    }else{

      //crea libro
      const libro = new Libro(
        campi['campoAutore'].value, 
        campi['campoTitolo'].value, 
        campi['campoPosizione'].value, 
        ""
        );
      
      if(this.checkPosizione(libro)){
        this.archivio.add(libro);
      
        console.log("archivio aggiornato " + this.archivio.collezione);
        
        //trasforma oggetto in stringa + POST
        this.as.setData(this.archivio.collezione);
      }
      else{
        console.log("posizione già occupata");
      }   
    };
    this.togglePaginaInserisci();
  }
}
