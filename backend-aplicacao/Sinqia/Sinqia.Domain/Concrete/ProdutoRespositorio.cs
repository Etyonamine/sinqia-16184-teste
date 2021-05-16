using System.Collections.Generic;
using Sinqia.Domain.Abstract;
using Sinqia.Domain.Entites;
using System.Linq;


namespace Sinqia.Domain.Concrete
{
    public class ProdutoRespositorio : IProdutoRepositorio
    {
        private readonly EFDbContext dbContext = new EFDbContext();

        public IEnumerable<Produto> Produtos { 
            get => dbContext.Produtos; 
             }

        public Produto Produto(string cod_produto)
        {
            try
            {
                var produto = dbContext.Produtos
                                .Include("ListaProdutosCosif")
                                .FirstOrDefault(p => p.Cod_Produto.Trim().ToUpper() == cod_produto.Trim().ToUpper());
                if (produto!= null)
                {
                    foreach(var item in produto.ListaProdutosCosif)
                    {
                        item.Produto = null;
                    }
                }
                return  produto;
            }
            catch (System.Exception)
            {

                throw;
            };
        }
    }
}
