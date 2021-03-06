import { MovimentoManualConsultaComponent } from './movimento-manual-consulta/movimento-manual-consulta.component';
import { MsgAlertService } from './../shared/msg-alert-modal/msg-alert.service';
import { ProdutoService } from './../produto/produto.service';

import { MovimentoManualService } from './movimento-manual.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MovimentoManual } from './movimento-manual';
import { EMPTY, Subscription } from 'rxjs';
import { ApiResult } from '../shared/Interface/apiresult';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../produto/produto';
import { map, switchMap } from 'rxjs/operators';
import { ProdutoCosif } from '../produto/produto-cosif/produto-cosif';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({

  selector: 'app-movimento-manual',
  templateUrl: './movimento-manual.component.html',
  styleUrls: ['./movimento-manual.component.scss']
})
export class MovimentoManualComponent implements OnInit, OnDestroy {

  //*** variaveis utiizados no formulario */
  formulario: FormGroup;
  operacaoInclusao: boolean = false;
  //colunas da tabela
  public colunas: string[] = ["Dat_Mes",
    "Dat_Ano",
    "Cod_Produto",
    "Produto.Des_Produto",
    "Num_Lancamento",
    "Des_Descricao",
    "Val_Valor"
  ];

  //variaveis da consulta
  dat_mes_con: string;
  dat_ano_con: string;


  //objetos utilizados
  produtos: Array<Produto>;
  produtosCosif: Array<ProdutoCosif>;
  movimentosManuais: MatTableDataSource<MovimentoManual>;
  movimentoManual: MovimentoManual;

  // variaveis da paginação *******************
  defaultPageIndex: number = 0;
  defaultPageSize: number = 5;

  public defaultSortColumn: string = "dat_mes";
  public defaultSortOrder: string = "asc";

  defaultFilterColumn: Array<string> = ["dat_mes"];
  filterQuery: Array<string> = null;

  //inscricoes ****************
  inscricaoMovimento$: Subscription;
  inscricaoProduto$: Subscription;
  inscricaoSalvar$: Subscription;
  //emmitter ********
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Construtor
  constructor(private movimentoService: MovimentoManualService,
    private formBuilder: FormBuilder,
    private produtoServico: ProdutoService,
    private alertModalServico: MsgAlertService,
    public dialog: MatDialog) { }

  //ngOnInit e ngOnDestroy *********************************
  ngOnInit(): void {
    this.movimentoManual = <MovimentoManual>{};

    this.lista();
    this.formulario = this.formBuilder.group({
      Dat_Mes: [null, [Validators.required, Validators.min(1), Validators.max(12), Validators.maxLength(2)]],
      Dat_Ano: [null, [Validators.required, Validators.min(1900), Validators.max(9999), Validators.maxLength(2)]],
      Cod_Produto: [[null], [Validators.required]],
      Cod_Cosif: [null, [Validators.required]],
      Val_Valor: [null, [Validators.required]],
      Des_Descricao: [null, [Validators.required, Validators.maxLength(50)]]
    })
    this.formulario.disable();
    //listar produtos
    this.listaProduto();
    this.formulario.get('Cod_Produto')
      .valueChanges
      .pipe(
        map(produto => this.produtos.filter(e => e.Cod_Produto === produto)),
        map(produtos => produtos && produtos.length > 0 ? produtos[0].Cod_Produto : EMPTY),
        switchMap(
          (produtoId: string) => {
            this.produtosCosif = [];
            this.formulario.get("Cod_Cosif").setValue(0);
            if (produtoId !== null && produtoId !== undefined && produtoId !== "") {

              return this.produtoServico.get<Produto>(produtoId);
            } else {
              return EMPTY;
            }
          }
        )
      ).subscribe(result => {
        this.produtosCosif = null;
        if (result) {
          this.produtosCosif = result.ListaProdutosCosif;
        }
      });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.inscricaoMovimento$) {
      this.inscricaoMovimento$.unsubscribe();
    }
    if (this.inscricaoProduto$) {
      this.inscricaoProduto$.unsubscribe()
    }
    if (this.inscricaoSalvar$) {
      this.inscricaoSalvar$.unsubscribe();
    }
  }

  //*** METODOS ******************************************************************/
  listaProduto() {
    this.inscricaoProduto$ = this.produtoServico.list<Produto[]>()
      .subscribe(result => this.produtos = result,
        error => {
          console.error(error);
        })
  }

  lista(query: string[] = null) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;

    if (query) {

      this.filterQuery = query;


    }

    this.getData(pageEvent);

  }

  getData(event: PageEvent) {

    var sortColumn = (this.sort) ? this.sort.active : this.defaultSortColumn;
    var sortOrder = (this.sort) ? this.sort.direction : this.defaultSortOrder;
    var filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null;
    var filterQuery = (this.filterQuery) ? this.filterQuery : null;

    this.inscricaoMovimento$ = this.movimentoService.getData<ApiResult<MovimentoManual>>(
      event.pageIndex,
      event.pageSize,
      sortColumn,
      sortOrder,
      filterColumn,
      filterQuery
    ).subscribe(result => {
      this.movimentosManuais = new MatTableDataSource<MovimentoManual>(result.Data);
      this.paginator.length = result.TotalCount;
      this.paginator.pageIndex = result.PageIndex;
      this.paginator.pageSize = result.PageSize;
      if (result.Data.length == 0){
        this.handlerMsgInformacao("Não foi encontrado nenhum registro!");
      }

    }, error => {
      console.error(error);
      this.handlerMsgErro('Ocorreu um erro!Tente novamente mais tarde.')
    });
  }

  onSubmit() {

    this.movimentoManual = Object.assign({}, this.formulario.value);
    this.movimentoManual.Cod_Usuario = 'TESTE';
    this.movimentoService.save(this.movimentoManual)
      .subscribe(sucesso => {
        if (sucesso) {
          this.operacaoInclusao = false;
          this.limparCampos();
          this.lista();

          // this.operacaoInclusao = true; //manter o fluxo de inclusao
          this.handlerMsgSucesso("Movimento incluído com sucesso!");
        } else {
          this.handlerMsgErro("Ocorreu um erro na tentativa de incluir o cadastro.");
        }
      },
        error => {
          this.handlerMsgErro("Ocorreu um erro na tentativa de incluir o cadastro.");
        });
  }

  incluir() {

    this.operacaoInclusao = !this.operacaoInclusao;
    this.limparCampos();
  }

  limparCampos() {

    this.filterQuery = null;
    this.lista();
    this.habilitarDesabilitarFormulario()
    this.formulario.reset();
  }

  handlerMsgSucesso(msg: string) {
    this.alertModalServico.mensagemSucesso(msg);
  }

  handlerMsgErro(msg: string) {
    this.alertModalServico.mensagemErro(msg);
  }
  handlerMsgInformacao(msg: string) {
    this.alertModalServico.mensagemInformacao(msg);
  }

  openDialogConsulta(): void {
    const dialogRef = this.dialog.open(MovimentoManualConsultaComponent, {
      width: '450px',
      data: { mes: this.dat_mes_con, ano: this.dat_ano_con }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.dat_mes_con = result.Dat_Mes;
      this.dat_ano_con = result.Dat_Ano;
      //validar informações
      if (!this.validarCompetenciaConsulta()) {
        return;
      }
      //montar filtros
      //limpando a variavel colunas
      this.defaultFilterColumn.splice(0, this.defaultFilterColumn.length);
      this.defaultFilterColumn.push("Dat_Mes");
      this.defaultFilterColumn.push("Dat_Ano");
      //limpando a variavel query
      var valores: Array<string>;
      valores = [this.dat_mes_con, this.dat_ano_con];


      //chamado a rotina de consulta
      this.lista(valores);
      this.formulario.get('Dat_Mes').setValue(this.dat_mes_con);
      this.formulario.get('Dat_Ano').setValue(this.dat_ano_con);

    });
  }
  validarCompetenciaConsulta() {
    //validar as informações
    //mes
    if (this.dat_mes_con === '' || this.dat_mes_con === null) {
      this.handlerMsgErro('Mês não informado para a consulta!')
      return false;
    } else {
      var mesAux: number = +this.dat_mes_con;
      if (mesAux < 0 || mesAux > 12) {
        this.handlerMsgErro('Mês inválido informado para a consulta!');
        return false;
      }
    }
    //ano
    if (this.dat_ano_con === '' || this.dat_ano_con === null) {
      this.handlerMsgErro('Ano não informado para a consulta!')
      return false;
    } else {
      var mesAux: number = +this.dat_ano_con;
      if (mesAux < 1900) {
        this.handlerMsgErro('Ano inválido informado para a consulta!');
        return false;
      }
    }
    return true;
  }
  habilitarBotaoLimpar() {
    if (this.operacaoInclusao) {
      return false;
    } else {
      if (this.formulario.get('Dat_Mes').value != null && this.formulario.get('Dat_Ano').value != null) {
        return false;
      }
      return true;
    }
  }
  habilitarDesabilitarFormulario() {
    if (this.operacaoInclusao) {
      this.formulario.enable();
    } else {
      this.formulario.disable();
    }
  }
}
