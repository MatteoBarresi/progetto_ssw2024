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
  @Output() eventoCambio = new EventEmitter<string>();
 // @Output() eventoCampi = new EventEmitter<string[]>();

  archivio : Archivio = new Archivio([]);

  constructor(private as : ArchivioService){}
  ngOnInit() {this.getCollection()} //archivio scaricato una volta sola, quando si carica la pagina
  //questo evita anche problemi di timing (es getCollection viene eseguita dopo la set, anche se messa prima nel codice)
  
  togglePaginaInserisci(){
    this.pagina = 'iniziale';
    this.eventoCambio.emit(this.pagina)
  }

  getCollection(){
    //fa la get dal db remoto (ottiene stringa JSON)
    //crea oggetti libro
    //li mette in una variabile che è un oggetto di tipo archivo--> serve a fare i controlli

    this.as.getData().subscribe(
      {
        next: (x:AjaxResponse<any>)=> {

          //console.log(x.response);
          const collezione = (JSON.parse(x.response));
          collezione.map((item)=> this.archivio.add(new Libro(item['autore'],item['titolo'],item['posizione'],item['nominativo'])))
          console.log("archivio appena ottenuto " + this.archivio.collezione);
          this.archivio.collezione.map((item)=> console.log(item));
        },
        error: (err) =>
          console.error('Observer got an error: ' + JSON.stringify(err))
      }
    )
  }

  checkCampiVuoti(campi:HTMLCollectionOf<HTMLInputElement>): boolean{
    //controlla che i campi autore, titolo e posizione non siano vuoti
    if(campi['campoAutore'].value && campi['campoTitolo'].value && campi['campoPosizione'].value !== '')
      return true; //console.log('campi validi');
    else return false; //console.log('campi non validi');


    //alternativa
    //const foo = campi[].value, campi[].value, ecc.
    //foo.every((item)=> {item !== ''})
  }
  

  checkDuplicati(libro:Libro){//riceve il libro appena creato

    this.archivio;
    
    //controlla che l'item non ci sia già (o che la posizione non sia occupata)
  }

  send(){ //check duplicati -> aggiorna (aggiunge Libro all'oggetto) -> send
    
    //this.getCollection(); //se messa qui, dà problemi
    
    //check duplicati

    //fare try-catch
    let campi : HTMLCollectionOf<HTMLInputElement>;
    let valori: string[] = [];
    campi = document.getElementById("campi").getElementsByTagName("input"); //in caso cambi il numero di campi, non li metto uno a uno
    //console.log(campi);
    if(!this.checkCampiVuoti(campi))
    {
      console.log('check FALLITO');
      //scrivere errore su pagina e non continuare
    }else{
      
      //Array.from(campi).map((item)=> valori.push(item.value)); //mette le stringhe in un array[]<string>
      //new Libro(valori[0],valori[1],valori[2],valori[3])

      //crea libro
      const libro = new Libro(
        campi['campoAutore'].value, 
        campi['campoTitolo'].value, 
        campi['campoPosizione'].value, 
        campi['campoNominativo'].value
        );
      
      //checkDuplicati(libro);
      
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
    };
 
  }

}
