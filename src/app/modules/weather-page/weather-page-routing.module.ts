import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WeatherPageComponent} from "./weather-page.component";
import {FindLocationGuard} from "./guard/find-location.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '0',
  },
  {
    path: ':key',
    component: WeatherPageComponent,
    canActivate: [FindLocationGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherPageRoutingModule { }
