import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./angularMaterial/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { TempPipe } from './pipes/temp.pipe';



@NgModule({
  declarations: [
    TempPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
    exports: [
        ReactiveFormsModule,
        MaterialModule,
        TempPipe,
    ]
})
export class SharedModule { }
