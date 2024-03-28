import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Mesto from 'src/classes/Mesto';
import GetMestoService from 'src/services/OsobaService/GetMestoListService';
import { Subscription, filter } from 'rxjs';
import Osoba from 'src/classes/Osoba';
import InsertOsobaService from 'src/services/OsobaService/InsertOosbaService';

@Component({
  selector: 'app-insert-osoba-page',
  templateUrl: './insert-osoba-page.component.html',
  styleUrls: ['./insert-osoba-page.component.scss']
})
export class InsertOsobaPageComponent implements OnInit {

  public osobaForm!:FormGroup;
  private resultOsoba:Osoba = new Osoba(0,"","",new Date(),0,"","",0);
  private subscription:Subscription = new Subscription();
  constructor(private getMestoService:GetMestoService, private insertOsobaService:InsertOsobaService){

  }
  public mestoList!:Mesto[];
  ngOnInit(): void {
    this.getMestoService.getMestoList().subscribe({
      next:(data:Mesto[])=>{this.mestoList=data},
      error:(error:any)=>console.log(error)
    })
    this.osobaForm = new FormGroup({
      ime: new FormControl("",[Validators.required,Validators.maxLength(33),Validators.pattern("^[АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ][абвгдђежзијклљмнњопрстћуфхцчџш]+$")]),
      prezime: new FormControl("",[Validators.required,Validators.maxLength(33),Validators.pattern("^[АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ][абвгдђежзијклљмнњопрстћуфхцчџш]+$")]),
      datumRodjenja: new FormControl("",Validators.required),
      jmbg: new FormControl("",[Validators.pattern("^[0-9]{13}$"),Validators.required]),
      brojTelefona: new FormControl("",[Validators.required,Validators.pattern("^\\+381\\([1-9]{2}\\)[0-9]{5,10}$|^\\(0[1-9]{2}\\)[0-9]{5,10}$")]),
      rodnoMesto: new FormControl("",Validators.required),
      prebivaliste:new FormControl("")
    });
    this.osobaForm.valueChanges
    .pipe(filter(()=>this.osobaForm.valid))
    .subscribe((data)=>{
      this.resultOsoba.ime = data.ime;
      this.resultOsoba.prezime= data.prezime;
      this.resultOsoba.datumRodjenja=new Date(data.datumRodjenja);
      this.resultOsoba.jmbg=""+data.jmbg;
      this.resultOsoba.brojTelefona=data.brojTelefona;
      this.resultOsoba.rodnoMesto=this.mestoList.filter(m=>m.m==+data.rodnoMesto)[0];
      this.resultOsoba.prebivaliste=data.prebivaliste==""?new Mesto():this.mestoList.filter(m=>m.m==+data.prebivaliste)[0];
    })
  }

  public getData(){
    console.log(this.resultOsoba.toJson());
    this.subscription.add(
      this.insertOsobaService.insertOsoba(this.resultOsoba).subscribe({
        next:(data:Osoba)=>{this.resultOsoba = data; console.log(data);},
        error:(error:any)=>console.log(error)
      })
    )
  }
}
