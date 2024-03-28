import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Osoba from 'src/classes/Osoba';
import IRequestService from '../HttpClient/IRequestService';
import RequestService from '../HttpClient/RequestService';
@Injectable({
  providedIn: 'root',
})
export class ReturnOsobaListService {

  constructor(@Inject(RequestService) private requestService:IRequestService<Osoba[]>) { }

  public getOsobaList(index:number,size:number):Observable<Osoba[]>{
    return this.requestService.get(`https://localhost:7196/api/Osoba/all?index=${index}&size=${size}`);
  }

}