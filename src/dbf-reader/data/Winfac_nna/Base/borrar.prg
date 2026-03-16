close all 

USE z:\newdesar\bodegaz\base\clientes.dbf in 0 alias bod excl
USE z:\newdesar\winfac_sve\base\clientes.dbf IN 0 alias cli SHARED
USE z:\newdesar\winfac_sve\base\direccio.dbf IN 0 alias dir SHARED


sele cli
GO top 
DO while !EOF()
	sele bod
	appen blank 
	REPLACE bod.codcli with cli.kcodclie
	REPLACE bod.nomcli with cli.nombress
	REPLACE bod.fono   with cli.telefono
	sele dir
	loca for dir.kcodclie=cli.kcodclie
	if FOUND()
		sele bod
		REPLACE bod.direcc with dir.desdirec
		REPLACE bod.ciupai with alltr(dir.nombciud)+" / "+alltr(cli.pdespais)
	ENDIF 
	sele cli
	skip 
ENDDO 