using System;
using System.Collections.Generic;
using System.Web.Http;
using Sinqia.Domain.Abstract;
using Sinqia.Domain.Entites;

namespace Sinqia.WebAPI.Controllers
{

    public class ProdutoController : ApiController
    {
        private readonly IProdutoRepositorio _iRepositorio;

        public ProdutoController(IProdutoRepositorio repository)
        {
            this._iRepositorio = repository;
        }


        // GET: api/Produto
        [HttpGet]        
        public IEnumerable<Produto> List()
        {
            try
            {
                return _iRepositorio.Produtos;
            }
            catch (Exception)
            {

                throw;
            }           
        }    

        [Route("api/produto/{cod_produto}")]
        [HttpGet()]
       
        public Produto Get(string cod_produto)
        {
            return _iRepositorio.Produto(cod_produto);
        }
    }
}
