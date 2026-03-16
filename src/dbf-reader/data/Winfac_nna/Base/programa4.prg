CLOSE ALL

USE z:\newdesar\winfac_sve\base\inventar.dbf IN 0 ALIAS inv SHARED
USE z:\newdesar\winfac_sve\base\itemdcto.dbf IN 0 ALIAS ite SHARED


SELECT ite
GO TOP 
DO WHILE !EOF()
	SELECT inv
	LOCATE FOR inv.knumezet=ite.knumezet
	IF FOUND()
		SELECT ite
		REPLACE ite.codunico WITH inv.codunico
	ELSE
		WAIT WINDOW ""+inv.knumezet+""
	ENDIF
	SELECT ite
	SKIP 
ENDDO 