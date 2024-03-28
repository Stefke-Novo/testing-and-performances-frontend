import { Inject, Injectable } from "@angular/core";
import RequestService from "../HttpClient/RequestService";
import Osoba from "src/classes/Osoba";
import { Observable } from "rxjs";
import IRequestService from "../HttpClient/IRequestService";

@Injectable({
    providedIn:"root"
})
export default class DeleteOsobaService{

    constructor(@Inject(RequestService) private requestService:IRequestService<Osoba>){}
    
    public deleteOsoba(osoba:Osoba):Observable<Osoba>{
        return this.requestService.post("https://localhost:7196/api/Osoba/delete",osoba);
    }

}