import { Competencia } from './competencia';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-movimento-manual-consulta',
  templateUrl: './movimento-manual-consulta.component.html',
  styleUrls: ['./movimento-manual-consulta.component.scss']
})
export class MovimentoManualConsultaComponent implements OnInit {
  dat_mes : number;
  dat_ano : number;
  constructor(public dialogRef: MatDialogRef<MovimentoManualConsultaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Competencia) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
