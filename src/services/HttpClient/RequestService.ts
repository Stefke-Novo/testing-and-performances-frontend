import { Injectable } from "@angular/core";
import IRequestService from "./IRequestService";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root',
  })
export default class RequestService<T> implements IRequestService<T>{

    constructor(private httpClient:HttpClient){}
    get(path: string): Observable<T> {
        return this.httpClient.get<T>(path);
    }
    post(path: string, value: object): Observable<T> {
        return this.httpClient.post<T>(path,value);
    }
    put(path:string,value:object):Observable<T>{
        return this.httpClient.put<T>(path,value);
    }

}