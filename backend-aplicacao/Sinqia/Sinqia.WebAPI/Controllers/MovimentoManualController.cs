using System;
using System.Collections.Generic;
using System.Web.Http;
using Sinqia.Domain.Abstract;
using Sinqia.Domain.Concrete;
using Sinqia.Domain.Entites;

namespace Sinqia.WebAPI.Controllers
{
    public class MovimentoManualController : ApiController
    {
        private readonly IMovimentoManualRepositorio _iRepositorio;
         

        public MovimentoManualController(IMovimentoManualRepositorio iRepositorio)
        {
            _iRepositorio = iRepositorio;
        }
        //[HttpGet]
        //public IEnumerable<MovimentoManual> Lista()
        //{
        //    return _iRepositorio.Lista();
        //}
        [HttpGet]
        public ApiResult<MovimentoManual> Lista(int pageIndex = 0,
                                                int pageSize = 0,
                                                string sortColumn = null,
                                                string sortOrder = null,
                                                string filterColumn = null,
                                                string filterQuery = null)
        {
            try
            {
                return _iRepositorio.ListaPorPagina(pageIndex,
                                                    pageSize,
                                                    sortColumn,
                                                    sortOrder,
                                                    filterColumn,
                                                    filterQuery);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]        
        public bool Incluir(MovimentoManual movimentoManual)
        {
            try
            { 
                return _iRepositorio.Incluir(movimentoManual);                
            }
            catch (Exception)
            {

                throw;
            }
        }     
    }
}
