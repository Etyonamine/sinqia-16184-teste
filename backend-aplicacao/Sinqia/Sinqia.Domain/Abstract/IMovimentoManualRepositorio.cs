using System.Collections.Generic;
using Sinqia.Domain.Entites;
using Sinqia.Domain.Concrete;
namespace Sinqia.Domain.Abstract
{
    public interface IMovimentoManualRepositorio
    {
        /// <summary>
        /// Listar os movimentos manuais cadastrados.
        /// </summary>
        IEnumerable<MovimentoManual> Lista();

        /// <summary>
        /// Lista por paginação 
        /// </summary>
        /// <param name="pagina"></param>
        /// <param name="quantidadePorPagina"></param>
        /// <returns></returns>
        ApiResult<MovimentoManual> ListaPorPagina(int pageIndex = 0,
                                                          int pageSize = 0,
                                                          string sortColumn = null,
                                                          string sortOrder = null,
                                                          string filterColumn = null,
                                                          string filterQuery = null);

        

        /// <summary>
        /// Recuperar o regitro do momento manual
        /// </summary>
        /// <param name="dat_mes"></param>
        /// <param name="dat_ano"></param>
        /// <param name="num_lancamento"></param>
        /// <param name="cod_produto"></param>
        /// <param name="cod_cosif"></param>
        /// <returns>o objeto</returns>
        MovimentoManual MovimentoManual(decimal dat_mes,
                                        decimal dat_ano,
                                        decimal num_lancamento,
                                        string cod_produto,
                                        string cod_cosif);

        /// <summary>
        /// Rotina de inclusão de movimento manual
        /// </summary>
        /// <param name="movimentoManual"></param>
        /// <returns> true or false</returns>
        bool Incluir(MovimentoManual movimentoManual);

        
    }
}
