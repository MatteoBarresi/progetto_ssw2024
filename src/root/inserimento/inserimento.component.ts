import { CommonModule, provideImageKitLoader } from '@angular/common';
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

  archivio :Archivio;

  constructor(private as : ArchivioService){}
  ngOnInit() {}
  
  togglePaginaInserisci(){
    this.pagina = 'iniziale';
    this.eventoCambio.emit(this.pagina)
  }

  provaGet(){
    this.archivio = new Archivio([]);
    this.as.getData().subscribe(
      {
        next: (x:AjaxResponse<any>)=> {

          console.log(x.response);
          let foo = (JSON.parse(x.response));
          foo.map((item)=> this.archivio.add(new Libro(item['autore'],item['titolo'],"","")))
          console.log(this.archivio);
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


    //fa la get dal db remoto (ottiene stringa JSON)
    //crea oggetti libro
    //li mette in una variabile che è un oggetto di tipo archivo--> serve a fare i controlli

    //controlla che l'item non ci sia già (o che la posizione non sia occupata)
  }

  send(){ //scarica archivio - check - aggiorna - send
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
      Array.from(campi).map((item)=> valori.push(item.value)); //mette le stringhe in un array[]<string>
      
      //crea libro
      const libro = new Libro(valori[0],valori[1],valori[2],valori[3]);
      
      //va istanziato prima
      this.archivio = new Archivio([libro]);
      console.log(this.archivio.collezione);
      //checkDuplicati(libro);
  
      
      //valori.map((item)=> console.log(JSON.stringify(valori)));
      
      this.as.setData(JSON.stringify(this.archivio.collezione)).subscribe({
        next: (res: AjaxResponse<any>)=> console.log(res.response),
        error: (err: AjaxError)=> console.log(err)
      })
    }
    
  }

}
