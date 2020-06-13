import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const data: string[] = [];
const routes: Routes = [];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
