import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertOsobaPageComponent } from './insert-osoba-page.component';
import GetMestoService from 'src/services/OsobaService/GetMestoListService';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Mesto from 'src/classes/Mesto';
import InsertOsobaService from 'src/services/OsobaService/InsertOosbaService';
import Osoba from 'src/classes/Osoba';
import { Observable, throwError } from 'rxjs';
import RequestService from 'src/services/HttpClient/RequestService';
import { HttpErrorResponse } from '@angular/common/http';

describe('InsertOsobaPageComponent', () => {
  let component: InsertOsobaPageComponent;
  let fixture: ComponentFixture<InsertOsobaPageComponent>;
  let getMestoService:GetMestoService;
  let insertOsobaService:InsertOsobaService;
  let httpMock: HttpTestingController;

  let mestoList:Mesto[] = [
    new Mesto().setM(1).setBrojStanovnika(1029302).setPttBroj("11000").setNaziv("Београд"),
    new Mesto().setM(2).setBrojStanovnika(1029302).setPttBroj("24000").setNaziv("Суботица"),
    new Mesto().setM(3).setBrojStanovnika(1029302).setPttBroj("25000").setNaziv("Сомбор"),
    new Mesto().setM(4).setBrojStanovnika(1029302).setPttBroj("18300").setNaziv("Пирот"),
    new Mesto().setM(5).setBrojStanovnika(1029302).setPttBroj("20000").setNaziv("Призрен"),
    new Mesto().setM(6).setBrojStanovnika(1029302).setPttBroj("21000").setNaziv("Нови Сад")
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,FormsModule,ReactiveFormsModule],
      providers: [GetMestoService],
      declarations: [InsertOsobaPageComponent]
    });
    fixture = TestBed.createComponent(InsertOsobaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    getMestoService=TestBed.inject(GetMestoService);
    insertOsobaService=TestBed.inject(InsertOsobaService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  it('should create',()=>{
    expect(component).toBeTruthy();
  });
  

  it('should get data',()=>{
    expect(component.getData()).toBe(undefined);
  });

  it('should emit data on success', () => {
    const mockOsoba:Osoba= new Osoba(1000,"Никола","Николић",new Date("2000-03-04"),123,"2910394820329","+381(63)3920398",1);

    insertOsobaService.insertOsoba(mockOsoba).subscribe({
      next:(data:Osoba)=>expect(data).toEqual(mockOsoba),
      error:(error)=>expect(error).toThrow(HttpErrorResponse)
    });

    const request = httpMock.expectOne('https://localhost:7196/api/osoba/insert');
    expect(request.request.method).toBe('POST');

    request.flush(mockOsoba); // Simulate successful response
  });

  it('should handle error', () => {
    const mockOsoba:Osoba= new Osoba(1000,"Nikola","Николић",new Date("2000-03-04"),123,"2910394820329","+381(63)3920398",1);

    insertOsobaService.insertOsoba(mockOsoba).subscribe({
      next: () => fail('should not emit next'),
      error: (error: any) => {
        expect(error).toThrow(HttpErrorResponse);
      }
    });

    const request = httpMock.expectOne('https://localhost:7196/api/osoba/insert');
    expect(request.request.method).toBe('POST');
  });
  it('should test valueChanges function',()=>{
    component.osobaForm.patchValue({
      brojTelefona: ""
      });
      const hostElement: HTMLElement = fixture.nativeElement;
      const inputElement: HTMLInputElement |null = hostElement.querySelector('.insertOsobaForm');
      if(inputElement==null)
      return;
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      let formControl= component.osobaForm.get('prezime');
      if(formControl==null)
      return;
      expect(formControl.value).toEqual('');
  })
});

