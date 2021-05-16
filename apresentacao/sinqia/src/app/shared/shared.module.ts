import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgErroComponent } from './msg-erro/msg-erro.component';


@NgModule({
  declarations: [
    MsgErroComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    MsgErroComponent
  ]
})
export class SharedModule { }
