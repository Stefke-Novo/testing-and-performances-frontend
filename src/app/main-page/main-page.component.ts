import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription, map, timer } from 'rxjs';
import Osoba from 'src/classes/Osoba';
import DeleteOsobaService from 'src/services/OsobaService/DeleteOsobaService';
import ManageObjectService from 'src/services/OsobaService/ManageObjectService';
import { ReturnOsobaListService } from 'src/services/OsobaService/ReturnOsobaList.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit,OnDestroy,OnChanges {
[x: string]: any;

  dateTime!:Observable<Date>;
  public list:Osoba[] = [];
  private subscription:Subscription = new Subscription();
  public names:string[]=Osoba.getAttributes();
  public index:number=1;
  @Input() size=5;

  constructor(private returnOsobaListService:ReturnOsobaListService,
    private manageOsobaService:ManageObjectService,
    private deleteOsobaService:DeleteOsobaService){}
  ngOnChanges(changes: SimpleChanges): void {
    this.size=changes['size'].currentValue;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.index=1;
    this.dateTime = timer(0,1000)
    .pipe(map(()=>{
      return new Date();
    }));
    this.getData();
  }
    public decreaseIndex(): void{
      if(this.index>1){
        this.index--;
        this.getData();
      }
    }
    public increaseIndex():void{
      if(this.list.length==this.size){
        this.index++;
        this.getData();
      }
    }
    private getData():void{
      this.subscription.add(
        this.returnOsobaListService.getOsobaList(this.index,this.size).subscribe({
         next: (data:Osoba[])=>{this.list=data},
         error: (error:any)=>console.log(error)
        })
     );
    }
    public changeSize($event:Event){
      this.size=+($event.target as HTMLInputElement).value;
      this.getData();
    }
    public setOsobaObject(osoba:Osoba){
      this.manageOsobaService.osoba.next(osoba);
    }
    public deleteOsoba(item:Osoba){
      console.log(item);
      this.subscription.add(
        this.deleteOsobaService.deleteOsoba(item).subscribe({
          next:(data:Osoba)=>{console.log(data);this.getData();},
          error:(error:any)=>console.log(error)
        })
      )
      
    }
}
