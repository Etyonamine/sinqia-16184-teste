namespace Sinqia.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Produto",
                c => new
                    {
                        Cod_Produto = c.String(nullable: false, maxLength: 128),
                        Des_Produto = c.String(),
                        Sta_Status = c.String(),
                    })
                .PrimaryKey(t => t.Cod_Produto);
            
            CreateTable(
                "dbo.ProdutoCosif",
                c => new
                    {
                        Cod_Produto = c.String(nullable: false, maxLength: 128),
                        Cod_Cosif = c.String(nullable: false, maxLength: 128),
                        Cod_Classificacao = c.String(),
                        Sta_Status = c.String(),
                    })
                .PrimaryKey(t => new { t.Cod_Produto, t.Cod_Cosif })
                .ForeignKey("dbo.Produto", t => t.Cod_Produto, cascadeDelete: true)
                .Index(t => t.Cod_Produto);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProdutoCosif", "Cod_Produto", "dbo.Produto");
            DropIndex("dbo.ProdutoCosif", new[] { "Cod_Produto" });
            DropTable("dbo.ProdutoCosif");
            DropTable("dbo.Produto");
        }
    }
}
