import { Injectable } from '@angular/core';
import { Libro } from './libro';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse, AjaxError } from 'rxjs/ajax';


@Injectable({
  providedIn: 'root'
})
export class ArchivioService {
  key:string = "d617d54f"; //key db remoto
  base:string = 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint'; //url db remoto
  
  constructor() { }
  
  //funzioni per interagire con il db remoto: set e get (Observable)

  //ottiene tutta la collezione dal db remoto
    public getData() : Observable<AjaxResponse<any>>{ //parsare ulteriormente??
      return ajax({
        method: 'GET',
        url: this.base + '/get' + '?key=' + this.key,
        crossDomain: true,
      });
    }

    //lo lascio per fare subscribe diverse 
    private set(jsonstring :string): Observable<AjaxResponse<any>>{ 
      return ajax({
        method: 'POST',
        url: this.base + '/set' + '?key=' + this.key,
        crossDomain: true,
        body: jsonstring
      });
    }

    //subscribe che va bene in tutti i casi usati
    public setData(arr: Libro[]){
      this.set(JSON.stringify(arr)).subscribe({
        next: (res: AjaxResponse<any>)=> {
          console.log(res.response); 
          console.log("stringa mandata " + JSON.stringify(arr));
        },
        error: (err: AjaxError)=> console.log(err)
      })

    }

}
