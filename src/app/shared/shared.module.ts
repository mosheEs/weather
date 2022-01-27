import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./modules/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TempPipe} from './pipes/temp.pipe';

const declarations = [
  TempPipe,
];

const imports = [
  CommonModule,
  ReactiveFormsModule,
  MaterialModule,
]

@NgModule({
  declarations,
  imports,
  exports: [
    ...declarations,
    ...imports,
  ]
})
export class SharedModule {
}
