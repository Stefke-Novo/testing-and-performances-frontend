import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Osoba from 'src/classes/Osoba';
import { ReturnOsobaListService } from 'src/services/OsobaService/ReturnOsobaList.service';
import ManageObjectService from 'src/services/OsobaService/ManageObjectService';
import DeleteOsobaService from 'src/services/OsobaService/DeleteOsobaService';
//import RequestService from 'src/services/HttpClient/RequestService';
import IRequestService from 'src/services/HttpClient/IRequestService';
import RequestService from 'src/services/HttpClient/RequestService';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  //let httpTestingController:HttpTestingController;
  let returnOsobaListService:ReturnOsobaListService;
  let manageOsobaService:ManageObjectService;
  let deleteOsobaService:DeleteOsobaService;
  let mockOsobaList:Osoba[] = [
    new Osoba(1000,"Никола","Николић",new Date("2000-03-04"),123,"2910394820329","+381(63)3920398",1),
    new Osoba(1001,"Ненад","Борисављевић",new Date("1860-05-24"),123,"3820193830212","+381(63)3920398",3),
    new Osoba(1002,"Марко","Недељковић",new Date("2000-08-21"),123,"2920492820392","+381(63)1233453",6),
    new Osoba(1003,"Марко","Недељковић",new Date("2000-08-21"),123,"2920492820392","+381(63)1233453",6),
    new Osoba(1004,"Марко","Недељковић",new Date("2000-08-21"),123,"2920492820392","+381(63)1233453",6),
    new Osoba(1005,"Марко","Недељковић",new Date("2000-08-21"),123,"2920492820392","+381(63)1233453",6),
    new Osoba(1006,"Марко","Недељковић",new Date("2000-08-21"),123,"2920492820392","+381(63)1233453",6),
    new Osoba(1007,"Марко","Недељковић",new Date("2000-08-21"),123,"2920492820392","+381(63)1233453",6),
    new Osoba(1008,"Марко","Недељковић",new Date("2000-08-21"),123,"2920492820392","+381(63)1233453",6),
    new Osoba(1009,"Марко","Недељковић",new Date("2000-08-21"),123,"2920492820392","+381(63)1233453",6),
    new Osoba(1010,"Марко","Недељковић",new Date("2000-08-21"),123,"2920492820392","+381(63)1233453",6),
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,FormsModule,ReactiveFormsModule],
      providers:[ReturnOsobaListService,ManageObjectService,DeleteOsobaService],
      declarations: [MainPageComponent]
    });
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //httpTestingController=TestBed.inject(HttpTestingController);
    returnOsobaListService=TestBed.inject(ReturnOsobaListService);
    manageOsobaService=TestBed.inject(ManageObjectService);
    deleteOsobaService=TestBed.inject(DeleteOsobaService);
  });

  it('should create',()=>{
    expect(component).toBeTruthy();
  });

  it('should return Osoba[]',()=>{
    const index=3;
    const size=5;
    const start=index*size-size;
    const end=index*size;

    const requestServiceSpy:jasmine.SpyObj<RequestService<Osoba[]>> = jasmine.createSpyObj('RequestService<Osoba[]>',['get']);
    requestServiceSpy.get.and.returnValue(new BehaviorSubject<Osoba[]>(mockOsobaList));
    
    returnOsobaListService= new ReturnOsobaListService(requestServiceSpy);
    returnOsobaListService.getOsobaList(index,size).subscribe((data)=>{
      expect(data.slice(start,end).length).toBeLessThanOrEqual(size);
      expect(data.slice(start,end).length).toBeGreaterThan(0);
    });
    
  });

  it('should load Osoba Object',()=>{
    let example = new Osoba(1000,"Никола","Николић",new Date("2000-03-04"),123,"2910394820329","+381(63)3920398",1);
    component.setOsobaObject(example);
    expect(manageOsobaService.osoba.value).toBe(example);
  });

  it('should delete Osoba object',()=>{
    let example =new Osoba(1000,"Никола","Николић",new Date("2000-03-04"),123,"2910394820329","+381(63)3920398",1);

    const requestServiceSpy:jasmine.SpyObj<RequestService<Osoba>> = jasmine.createSpyObj('RequestService',['post']);
    requestServiceSpy.post.and.returnValue(new Observable(observer=>observer.next(example)));
    deleteOsobaService=new DeleteOsobaService(requestServiceSpy);

    deleteOsobaService.deleteOsoba(example).subscribe((data)=>{
      expect(example).toEqual(data);
    });
    const mainPageComponent:MainPageComponent=new MainPageComponent(returnOsobaListService,manageOsobaService,deleteOsobaService);
    ;
    expect(mainPageComponent.deleteOsoba(example)).toBe(undefined);
  });
  it('should decrease index',()=>{
    const mainPageComponent:MainPageComponent= new MainPageComponent(returnOsobaListService,manageOsobaService,deleteOsobaService);
    mainPageComponent.index=2;
    const startValue= mainPageComponent.index;
    mainPageComponent.decreaseIndex();
    expect(startValue).toBeGreaterThan(mainPageComponent.index);
  });
  it('should increase index',()=>{
    const mainPageComponent:MainPageComponent= new MainPageComponent(returnOsobaListService,manageOsobaService,deleteOsobaService);
    mainPageComponent.list=mockOsobaList.slice(0,5);
    const startValue= mainPageComponent.index;
    mainPageComponent.increaseIndex();
    expect(startValue).toBeLessThan(mainPageComponent.index);
  });

});
