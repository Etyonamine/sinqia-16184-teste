import { ProdutoCosif } from './../produto/produto-cosif/produto-cosif';
import { Produto } from './../produto/produto';
export interface MovimentoManual {
  Dat_Mes: number;
  Dat_Ano: number;
  Num_Lancamento: number;
  Cod_Produto: string;
  Cod_Cosif: string;
  Des_Descricao: string;
  Dat_Movimento: string;
  Cod_Usuario: string;
  Val_Valor: number;
  Produto : Produto;
  ProdutoCosif : ProdutoCosif;
}

