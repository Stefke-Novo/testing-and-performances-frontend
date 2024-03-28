import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import Osoba from "src/classes/Osoba";

@Injectable({
    providedIn:"root"
})
export default class ManageObjectService{
    public osoba:BehaviorSubject<Osoba> = new BehaviorSubject(new Osoba(0,"","",new Date(),0,"","",0));
}