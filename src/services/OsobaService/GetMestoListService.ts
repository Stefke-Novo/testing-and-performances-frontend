import { Inject, Injectable } from "@angular/core";
import RequestService from "../HttpClient/RequestService";
import IRequestService from "../HttpClient/IRequestService";
import Mesto from "src/classes/Mesto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export default class GetMestoService{

    constructor(@Inject(RequestService) private requestService:IRequestService<Mesto[]>){

    }
    public getMestoList():Observable<Mesto[]>{
        return this.requestService.get("https://localhost:7196/api/Mesto/all");
    }
}