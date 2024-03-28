import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import IRequestService from "../HttpClient/IRequestService";
import Osoba from "src/classes/Osoba";
import { Observable } from "rxjs";
import RequestService from "../HttpClient/RequestService";
@Injectable({
    providedIn: 'root',
})
export default class InsertOsobaService{

    constructor(@Inject(RequestService) public requestService:IRequestService<Osoba>){

    }
    public insertOsoba(osoba:Osoba):Observable<Osoba>{
        return this.requestService.post("https://localhost:7196/api/osoba/insert",osoba.toJson());
    }
}