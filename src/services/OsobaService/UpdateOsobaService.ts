import { Inject, Injectable } from "@angular/core";
import RequestService from "../HttpClient/RequestService";
import IRequestService from "../HttpClient/IRequestService";
import Osoba from "src/classes/Osoba";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})
export default class UpdateOsobaService{

    constructor(@Inject(RequestService) private requestService:IRequestService<Osoba>){}

    public updateOsoba(osoba:Osoba):Observable<Osoba>{
        return this.requestService.put("https://localhost:7196/api/Osoba/update",osoba.toJson());
    }
}