import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsertOsobaPageComponent } from './insert-osoba-page/insert-osoba-page.component';
import { UpdateOsobaPageComponent } from './update-osoba-page/update-osoba-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    InsertOsobaPageComponent,
    UpdateOsobaPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
