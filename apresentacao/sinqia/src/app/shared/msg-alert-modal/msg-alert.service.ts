import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MsgAlertService {

  durationInSeconds: number = 3000;
  _verticalPosition: MatSnackBarVerticalPosition = 'top';
  _horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  private mensagemAlerta(msg: string, classe: string) {
    var nomeClasse: string = '';

    switch (classe) {
      case ('sucesso'):
        nomeClasse = 'sucess-snackbar';
        break;

      case ('erro'):
        nomeClasse = 'error-snackbar';
        break;

      default:
        nomeClasse = 'sucess-snackbar';
        break;
    }

    this._snackBar.open(
      msg, '',
      {
        duration: this.durationInSeconds,
        verticalPosition: this._verticalPosition,
        horizontalPosition: this._horizontalPosition,
        panelClass: [nomeClasse]
      }
    );
  }

  mensagemSucesso(msg: string) {
    this.mensagemAlerta(msg, 'sucesso');
  }

  mensagemErro(msg: string) {
    this.mensagemAlerta(msg, 'erro');
  }

  // openConfirmModal(messagem: string, titulo: string,  callBackFunction: Function, okText?:string ,cancelTxt?:string) {
  //   const dialogRef = this.dialog.open(AlertConfirmComponent, {
  //     width: '400px',
  //     data: new ModalConfirmData({
  //       title: titulo,
  //       content: messagem,
  //       confirmButtonLabel: okText =='' ? 'Confirmar': okText,
  //       closeButtonLabel:  cancelTxt == ''?'Fechar' : cancelTxt
  //     })
  //   });

  //   dialogRef.afterClosed().subscribe(result => callBackFunction(result));
  //}

}
