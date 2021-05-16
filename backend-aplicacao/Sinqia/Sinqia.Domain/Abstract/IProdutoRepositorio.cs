using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sinqia.Domain.Entites;

namespace Sinqia.Domain.Abstract
{
    public interface IProdutoRepositorio
    {
        IEnumerable<Produto> Produtos { get; }

        Produto Produto(string cod_produto);
    }
}
