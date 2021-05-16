using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sinqia.Domain.Abstract;
using Sinqia.Domain.Entites;

namespace Sinqia.Domain.Concrete
{
    public class ProdutoCosifRepositorio:IProdutosCosifRepositorio
    {
        private readonly EFDbContext dbContext = new EFDbContext();

        public IEnumerable<ProdutoCosif> ProdutosCosif
        {
            get => dbContext.ProdutosCosif;
        }
    }
}
