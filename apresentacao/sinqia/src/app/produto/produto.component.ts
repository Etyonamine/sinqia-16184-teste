import { ProdutoService } from './produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from './produto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  produtos : Array<Produto>;
  inscricao$ : Subscription;

  constructor(private produtoService : ProdutoService) { }

  ngOnInit(): void {
    this.listar();
  }
  ngOnDestroy(){
    if (this.inscricao$){
      this.inscricao$.unsubscribe();
    }
  }
  listar(){
    this.inscricao$ = this.produtoService.list<Produto[]>().subscribe(resultado => this.produtos=resultado);
  }
}
