using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sinqia.Domain.Entites;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Sinqia.Domain.Concrete
{
    public class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("EFDbContext")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Produto> Produtos { get; set; }
        public DbSet<ProdutoCosif> ProdutosCosif { get; set; }
        public DbSet<MovimentoManual> MovimentosManuais { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            
        }
    }       
}
