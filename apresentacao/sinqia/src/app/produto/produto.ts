import { ProdutoCosif } from "./produto-cosif/produto-cosif";

export class Produto
{
  Cod_Produto : string;
  Des_Produto : string;
  Sta_Status  : string;
  ListaProdutosCosif : Array<ProdutoCosif>;

}
