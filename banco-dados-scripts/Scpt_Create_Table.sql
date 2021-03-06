IF OBJECT_ID(N'dbo.PRODUTO', N'U') IS NOT NULL  
   DROP TABLE [dbo].[PRODUTO];  
GO
CREATE TABLE PRODUTO (
	COD_PRODUTO [CHAR](4) PRIMARY KEY NOT NULL,
	DES_PRODUTO [VARCHAR](30) NULL,
	STA_STATUS [CHAR](1)
)
GO
IF OBJECT_ID(N'dbo.PRODUTO_COSIF', N'U') IS NOT NULL  
   DROP TABLE [dbo].[PRODUTO_COSIF];  
GO
CREATE TABLE PRODUTO_COSIF(
 COD_PRODUTO [CHAR](4) NOT NULL,
 COD_COSIF [CHAR](11) NOT NULL,
 COD_CLASSIFICACAO [CHAR](6) NULL,
 STA_STATUS [CHAR](1),
 CONSTRAINT PK_PRODUTO_COSIF PRIMARY KEY ( COD_PRODUTO, COD_COSIF),
 CONSTRAINT FK_PRODUTO FOREIGN KEY (COD_PRODUTO) REFERENCES PRODUTO(COD_PRODUTO)
)
GO

IF OBJECT_ID(N'dbo.MOVIMENTO_MANUAL', N'U') IS NOT NULL  
   DROP TABLE [dbo].[MOVIMENTO_MANUAL];  
GO

CREATE TABLE MOVIMENTO_MANUAL(
DAT_MES [NUMERIC](2,0) NOT NULL,
DAT_ANO [NUMERIC](4,0) NOT NULL,
NUM_LANCAMENTO[NUMERIC](18,0) NOT NULL,
COD_PRODUTO [CHAR](4) NOT NULL,
COD_COSIF [CHAR](11),
DES_DESCRICAO [VARCHAR](50) NOT NULL,
DAT_MOVIMENTO [SMALLDATETIME] NOT NULL DEFAULT GETDATE(),
COD_USUARIO [VARCHAR](15) NOT NULL,
VAL_VALOR [NUMERIC](18,2) NOT NULL,
CONSTRAINT PK_MOVIMENTO_MANUAL PRIMARY KEY (DAT_MES, DAT_ANO, NUM_LANCAMENTO, COD_PRODUTO, COD_COSIF) ,
CONSTRAINT FK_PRODUTO_COSIF_MOVTO FOREIGN KEY (COD_PRODUTO, COD_COSIF) REFERENCES PRODUTO_COSIF(COD_PRODUTO , COD_COSIF)
)

---INSERT TABELAS DE DOMINICO (PRODUTO e PRODUTO_COSIF)
--PRODUTO
INSERT INTO PRODUTO (COD_PRODUTO, DES_PRODUTO, STA_STATUS)VALUES ('0001','PROD 001','A');
INSERT INTO PRODUTO (COD_PRODUTO, DES_PRODUTO, STA_STATUS)VALUES ('0002','PROD 002','A');
--COSIF
INSERT INTO PRODUTO_COSIF (COD_PRODUTO,COD_COSIF,COD_CLASSIFICACAO, STA_STATUS)VALUES ('0001','1.1.0.00.00','6','A');
INSERT INTO PRODUTO_COSIF (COD_PRODUTO,COD_COSIF,COD_CLASSIFICACAO, STA_STATUS)VALUES ('0001','1.1.1.00.00','9','A');
INSERT INTO PRODUTO_COSIF (COD_PRODUTO,COD_COSIF,COD_CLASSIFICACAO, STA_STATUS)VALUES ('0001','1.1.2.30.00','3','A');

INSERT INTO PRODUTO_COSIF (COD_PRODUTO,COD_COSIF,COD_CLASSIFICACAO, STA_STATUS)VALUES ('0002','1.2.0.00.00','5','A');
INSERT INTO PRODUTO_COSIF (COD_PRODUTO,COD_COSIF,COD_CLASSIFICACAO, STA_STATUS)VALUES ('0002','1.2.1.00.00','8','A');
INSERT INTO PRODUTO_COSIF (COD_PRODUTO,COD_COSIF,COD_CLASSIFICACAO, STA_STATUS)VALUES ('0002','1.2.1.10.00','5','A');

