using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sinqia.Domain.Entites
{
    [Table("Produto_Cosif")]
    public class ProdutoCosif
    {
        public ProdutoCosif()
        {
            ListaMovimentosManuais = new HashSet<MovimentoManual>();
        }

        [Key]
        [Column(Order = 0)]        
        public string Cod_Produto { get; set; }
        [Key]
        [Column(Order = 1)]
        public string Cod_Cosif { get; set; }
        public string Cod_Classificacao { get; set; }
        public string Sta_Status { get; set; }

        
        public virtual Produto Produto { get; set; }
        public virtual ICollection<MovimentoManual> ListaMovimentosManuais { get; set; }
    }
}
