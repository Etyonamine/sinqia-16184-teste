using System;
using System.Collections.Generic;
using System.Linq;
using Sinqia.Domain.Abstract;
using Sinqia.Domain.Entites;

namespace Sinqia.Domain.Concrete
{
    public class MovimentoManualRepositorio : IMovimentoManualRepositorio
    {
        private readonly EFDbContext dbContext = new EFDbContext();

        public IEnumerable<MovimentoManual> Lista() {
            try
            {
                 return dbContext.MovimentosManuais.Include("Produto");
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
           
        
        }


        public bool Incluir(MovimentoManual movimentoManual)
        {
            try
            {
                movimentoManual.Dat_Movimento = DateTime.Now;                       //data e hora de movimento
                movimentoManual.Num_Lancamento  = NumeroSequencial(movimentoManual);//numero do lancamento
                //movimentoManual.Num_Lancamento = 1;

                //validando se existe a sequencia ja no banco de dadoos
                var existe = dbContext.MovimentosManuais.Find(movimentoManual.Dat_Mes,
                                                              movimentoManual.Dat_Ano,
                                                              movimentoManual.Num_Lancamento,
                                                              movimentoManual.Cod_Produto,
                                                              movimentoManual.Cod_Cosif);
                if (existe != null)
                {
                    return false;
                }

                dbContext.MovimentosManuais.Add(movimentoManual);

                int execucao =  dbContext.SaveChanges();

                if (execucao == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {

                throw;
            }
           
           
            throw new NotImplementedException();
        }

        public ApiResult<MovimentoManual> ListaPorPagina(int pageIndex = 0,
                                                          int pageSize = 0,
                                                          string sortColumn = null,
                                                          string sortOrder = null,
                                                          string filterColumn = null,
                                                          string filterQuery = null)
        {
            string[] filterColumnArray = filterColumn != null ? filterColumn.Split('|'):null;
            string[] filterQueryArray = filterQuery != null ? filterQuery.Split('|') : null;

            return ApiResult<MovimentoManual>.Create(
               dbContext.MovimentosManuais.Include("Produto"),
               pageIndex,
               pageSize,
               sortColumn,
               sortOrder,
               filterColumnArray,
               filterQueryArray
               );

      
        }

        

        public MovimentoManual MovimentoManual(decimal dat_mes,
                                               decimal dat_ano, 
                                               decimal num_lancamento,
                                               string cod_produto, 
                                               string cod_cosif)
        {
            try
            {
                return dbContext.MovimentosManuais.Find( dat_mes ,
                                                         dat_ano ,
                                                         num_lancamento ,
                                                         cod_produto ,
                                                         cod_cosif);
            }
            catch (Exception)
            {

                throw;
            }
            
        }
                
        private decimal NumeroSequencial(MovimentoManual movimentoManual)
        {
            try
            {
                var lista = dbContext.MovimentosManuais.Where(e => e.Dat_Mes == movimentoManual.Dat_Mes &&
                                                                                                 e.Dat_Ano == movimentoManual.Dat_Ano).ToList();
                if (lista.Count > 0 )
                {

                    return lista.LastOrDefault().Num_Lancamento +  1;
                }
                else
                {
                    return 1;
                }
            }
            catch (Exception)
            {

                throw;
            }
                                                           
        }
    }
}
