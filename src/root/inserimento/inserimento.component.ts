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
    //let valori: string[] = [];
    campi = document.getElementById("campi").getElementsByTagName("input"); //in caso cambi il numero di campi, non li metto uno a uno
    //console.log(campi);
    if(!this.checkCampiVuoti(campi))
    {
      console.log('Riempire i campi vuoti');
    }else{
      
      //Array.from(campi).map((item)=> valori.push(item.value)); //mette le stringhe in un array[]<string>
      //new Libro(valori[0],valori[1],valori[2],valori[3])

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
        
        //trasforma oggetto in stringa e fa la set
        this.as.setData(JSON.stringify(this.archivio.collezione)).subscribe({
          next: (res: AjaxResponse<any>)=> {
            console.log(res.response); 
            console.log("stringa mandata " + JSON.stringify(this.archivio.collezione));
          },
          error: (err: AjaxError)=> console.log(err)
        })
      }
      else{
        console.log("posizione già occupata");
      }   
    };
  }
}
