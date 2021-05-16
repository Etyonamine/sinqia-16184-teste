using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Sinqia.Domain.Abstract;
using Sinqia.Domain.Entites;

namespace Sinqia.WebAPI.Controllers
{     
    public class ProdutoCosifController : ApiController
    {
        private readonly IProdutosCosifRepositorio _iRepositorio;

        public ProdutoCosifController(IProdutosCosifRepositorio iRepositorio)
        {
            this._iRepositorio = iRepositorio;
        }

        // GET: api/ProdutoCosif
        [HttpGet]        
        public IEnumerable<ProdutoCosif> List()
        {
            try
            {
                return  this._iRepositorio.ProdutosCosif;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
