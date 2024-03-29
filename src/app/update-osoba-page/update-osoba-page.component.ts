import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, filter } from 'rxjs';
import Mesto from 'src/classes/Mesto';
import Osoba from 'src/classes/Osoba';
import GetMestoService from 'src/services/OsobaService/GetMestoListService';
import ManageObjectService from 'src/services/OsobaService/ManageObjectService';
import UpdateOsobaService from 'src/services/OsobaService/UpdateOsobaService';

@Component({
  selector: 'app-update-osoba-page',
  templateUrl: './update-osoba-page.component.html',
  styleUrls: ['./update-osoba-page.component.scss']
})
export class UpdateOsobaPageComponent implements OnInit,OnDestroy {

  public selectedOsoba!:Osoba;
  private subscription!:Subscription;
  public osobaForm!:FormGroup;
  public resultOsoba!:Osoba; 
  public mestoList!:Mesto[];
  public names:Mesto[]=[];
  public list:Mesto[]=[];
  constructor(
    private manageObjectService:ManageObjectService, 
    private getMestoService:GetMestoService, 
    private updateOsobaService:UpdateOsobaService){
    this.selectedOsoba=new Osoba(0,"","",new Date(),0,"","",0);
    this.subscription= new Subscription();
    this.resultOsoba= new Osoba(0,"","",new Date(),0,"","",0);
    this.subscription.add(
      this.manageObjectService.osoba.subscribe({
        next:(value:Osoba)=>{this.selectedOsoba=value;this.selectedOsoba.datumRodjenja = new Date(this.selectedOsoba.datumRodjenja)}
      })
    );
    this.getMestoService.getMestoList().subscribe({
      next:(data:Mesto[])=>{this.mestoList=data},
      error:(error:any)=>console.log(error)
    })
    this.osobaForm = new FormGroup({
      ime: new FormControl(this.selectedOsoba.ime,[Validators.required,Validators.maxLength(33),Validators.pattern("^[АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ][абвгдђежзијклљмнњопрстћуфхцчџш]+$")]),
      prezime: new FormControl(this.selectedOsoba.prezime,[Validators.required,Validators.maxLength(33),Validators.pattern("^[АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ][абвгдђежзијклљмнњопрстћуфхцчџш]+$")]),
      datumRodjenja: new FormControl(this.getDate(this.selectedOsoba.datumRodjenja),Validators.required),
      jmbg: new FormControl(this.selectedOsoba.jmbg,[Validators.pattern("^[0-9]{13}$"),Validators.required]),
      brojTelefona: new FormControl(this.selectedOsoba.brojTelefona,[Validators.required,Validators.pattern("^\\+381\\([1-9]{2}\\)[0-9]{5,10}$|^\\(0[1-9]{2}\\)[0-9]{5,10}$")]),
      rodnoMesto: new FormControl(this.selectedOsoba.rodnoMesto,Validators.required),
      prebivaliste:new FormControl(this.selectedOsoba.prebivaliste)
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
    });
  }
  
  ngOnInit(): void {

    console.log(this.osobaForm);
    this.osobaForm.controls['rodnoMesto'].setValue(""+this.selectedOsoba.rodnoMesto.m, {onlySelf: true});
    this.osobaForm.controls['prebivaliste'].setValue(""+this.selectedOsoba.prebivaliste.m, {onlySelf: true});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public getData():void{
    this.resultOsoba.o=this.selectedOsoba.o;
    this.subscription.add(
      this.updateOsobaService.updateOsoba(this.resultOsoba).subscribe({
        next:(data:Osoba)=>{this.resultOsoba = data; console.log(data);},
        error:(error:any)=>console.log(error)
      })
    )
  }
  private getDate(date:Date):string{
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate()
    return ""+year+"-"+(month>9?month:("0"+month))+"-"+(day>9?day:"0"+day);
  }
}
