import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { InsertOsobaPageComponent } from './insert-osoba-page/insert-osoba-page.component';
import { UpdateOsobaPageComponent } from './update-osoba-page/update-osoba-page.component';

const routes: Routes = [
  {path:"", component: MainPageComponent},
  {path:"insert", component: InsertOsobaPageComponent},
  {path:"update",component: UpdateOsobaPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
