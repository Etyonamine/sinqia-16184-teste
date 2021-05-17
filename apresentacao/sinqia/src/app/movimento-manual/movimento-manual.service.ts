import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { BaseService } from './../shared/service/base.service';
import { Injectable } from '@angular/core';
import { MovimentoManual } from './movimento-manual';

@Injectable({
  providedIn: 'root'
})
export class MovimentoManualService extends BaseService<MovimentoManual> {

  constructor(protected http : HttpClient) {
    super(http,`${environment.API}movimentomanual`);
  }
}
