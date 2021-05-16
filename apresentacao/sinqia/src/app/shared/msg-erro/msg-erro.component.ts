import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-msg-erro',
  templateUrl: './msg-erro.component.html',
  styleUrls: ['./msg-erro.component.scss']
})
export class MsgErroComponent implements OnInit {

  //emmitters ***************
  @Input() mostrarErro: boolean;
  @Input() mensagemErro: string;

  constructor() { }

  ngOnInit(): void {
  }

}
