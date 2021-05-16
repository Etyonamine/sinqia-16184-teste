using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sinqia.Domain.Entites
{
    [Table("Movimento_Manual")]
    public class MovimentoManual
    {
       
        [Key]
        [Column(Order = 0)]
        public decimal Dat_Mes { get; set; }
        [Key]
        [Column(Order = 1)]
        public decimal Dat_Ano { get; set; }
        [Key]
        [Column(Order = 2)]
        public decimal Num_Lancamento { get; set; }
        [Key]
        [Column(Order = 3)]
        public string Cod_Produto { get; set; }
        [Key]
        [Column(Order = 4)]
        public string Cod_Cosif { get; set; }
        public string Des_Descricao { get; set; }
        public DateTime Dat_Movimento { get; set; }
        public string Cod_Usuario { get; set; } 
        public decimal Val_Valor  { get; set; }

        public virtual ProdutoCosif ProdutoCosif { get; set; }
        public virtual Produto Produto { get; set; }
    }
}
