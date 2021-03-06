import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from './../material-angular/material-angular.module';
import { MovimentoManualRoutingModule } from './movimento-manual-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentoManualComponent } from './movimento-manual.component';
import { MovimentoManualConsultaComponent } from './movimento-manual-consulta/movimento-manual-consulta.component';



@NgModule({
  declarations:[
    MovimentoManualComponent,
    MovimentoManualConsultaComponent
  ],
  imports: [
    CommonModule,
    MovimentoManualRoutingModule,
    MaterialAngularModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
    ]
})
export class MovimentoManualModule { }
