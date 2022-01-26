import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesPageRoutingModule } from './favorites-page-routing.module';
import { FavoritesPageComponent } from './favorites-page.component';


@NgModule({
  declarations: [
    FavoritesPageComponent
  ],
  imports: [
    CommonModule,
    FavoritesPageRoutingModule
  ]
})
export class FavoritesPageModule { }
