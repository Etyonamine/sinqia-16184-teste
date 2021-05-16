using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sinqia.Domain.Entites
{
    [Table("Produto")]
    public class Produto
    {
        public Produto()
        {
            ListaProdutosCosif = new HashSet<ProdutoCosif>();             
        }

        [Key]
        public string Cod_Produto { get; set; }
        public string Des_Produto { get; set; }
        public string Sta_Status { get; set; }
        
        public virtual ICollection<ProdutoCosif> ListaProdutosCosif { get; set; }
         
    }
}
