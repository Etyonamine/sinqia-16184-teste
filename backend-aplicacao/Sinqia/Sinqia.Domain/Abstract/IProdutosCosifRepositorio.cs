using System.Collections.Generic;
using Sinqia.Domain.Entites;

namespace Sinqia.Domain.Abstract
{
    public interface IProdutosCosifRepositorio
    {
        IEnumerable<ProdutoCosif> ProdutosCosif { get; }
    }
}
