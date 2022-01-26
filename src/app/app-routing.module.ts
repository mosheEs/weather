import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export enum AppPage {
  WEATHER = 'weather',
  FAVORITES = 'favorites',
}

const routes: Routes = [
  {
    path: '',
    redirectTo: AppPage.WEATHER,
    pathMatch: 'full',
  },
  {
    path: AppPage.WEATHER,
    loadChildren: () => import("./modules/weather-page/weather-page.module").then(m => m.WeatherPageModule),
  },
  {
    path: AppPage.FAVORITES,
    loadChildren: () => import("./modules/favorites-page/favorites-page.module").then(m => m.FavoritesPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
