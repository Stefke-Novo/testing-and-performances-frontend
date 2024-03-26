import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, map, timer } from 'rxjs';
import Osoba from 'src/classes/Osoba';
import { ReturnOsobaListService } from 'src/services/OsobaService/ReturnOsobaList.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
[x: string]: any;

  dateTime!:Observable<Date>;
  public list:Osoba[] = [];
  private subscription:Subscription = new Subscription();
  public names:string[]=Osoba.getAttributes();

  constructor(private returnOsobaListService:ReturnOsobaListService){}

  ngOnInit(): void {
    this.dateTime = timer(0,1000)
    .pipe(map(()=>{
      return new Date();
    }));
    this.subscription.add(
       this.returnOsobaListService.getOsobaList().subscribe({
        next: (data:Osoba[])=>this.list=data,
        error: (error:any)=>console.log(error)
       })
    );
  }

  

}
