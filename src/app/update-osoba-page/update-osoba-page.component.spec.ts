import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateOsobaPageComponent } from './update-osoba-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import UpdateOsobaService from 'src/services/OsobaService/UpdateOsobaService';
import RequestService from 'src/services/HttpClient/RequestService';
import Osoba from 'src/classes/Osoba';
import { Observable } from 'rxjs';
import IRequestService from 'src/services/HttpClient/IRequestService';

describe('UpdateOsobaPageComponent', () => {
  let component: UpdateOsobaPageComponent;
  let fixture: ComponentFixture<UpdateOsobaPageComponent>;
  let updateOsobaService:UpdateOsobaService;
  let requestService:IRequestService<Osoba>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,FormsModule,ReactiveFormsModule],
      providers:[UpdateOsobaService],
      declarations: [UpdateOsobaPageComponent]
    });
    fixture = TestBed.createComponent(UpdateOsobaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    updateOsobaService=TestBed.inject(UpdateOsobaService);
    requestService=TestBed.inject(RequestService);
  });

  it('should create',()=>{
    expect(component).toBeTruthy();
  });
  it('should test UpdateOsobaService',()=>{
    let example =new Osoba(1000,"Никола","Николић",new Date("2000-03-04"),123,"2910394820329","+381(63)3920398",1);
    let mockedRequestService:jasmine.SpyObj<RequestService<Osoba>> = jasmine.createSpyObj(RequestService,['put']);
    mockedRequestService.put.and.returnValue(new Observable(observer=>observer.next(new Osoba(1000,"Ненад","Николић",new Date("2000-03-04"),123,"2910394820329","+381(63)3920398",1))));
    updateOsobaService = new UpdateOsobaService(mockedRequestService);
    updateOsobaService.updateOsoba(example).subscribe((data:Osoba)=>expect(data.ime).not.toEqual(example.ime));
  });
  it('should test put request',()=>{
    let example =new Osoba(1000,"Никола","Николић",new Date("2000-03-04"),123,"2910394820329","+381(63)3920398",1);
    updateOsobaService.updateOsoba(example).subscribe((data:Osoba)=>expect(data).toEqual(example));
  });
});
