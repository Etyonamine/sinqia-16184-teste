import { environment } from './../../environments/environment.prod';
import { BaseService } from './../shared/service/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService<Produto> {

  constructor(protected http : HttpClient) {
    super(http,`${environment.API}Produto`);
  }

}
