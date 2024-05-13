import { Injectable } from '@angular/core';
import { Archivio } from './archivio';
import { Libro } from './libro';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse, AjaxRequest, AjaxError } from 'rxjs/ajax';


@Injectable({
  providedIn: 'root'
})
export class ArchivioService {
  key:string = 'cda4fc29'; //key db remoto
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

    public setData(jsonstring :string): Observable<AjaxResponse<any>>{
      return ajax({
        method: 'POST',
        url: this.base + '/set' + '?key=' + this.key,
        crossDomain: true,
        body: jsonstring
      });
    }

}
