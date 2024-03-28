import { Component, OnInit } from '@angular/core';
import { Observable, map, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-app';
  dateTime!:Observable<Date>;

  ngOnInit(): void {
    this.dateTime = timer(0,1000)
    .pipe(map(()=>{
      return new Date();
    }));
  }
}
