CLOSE ALL

USE c:\sisvfp\sve.dbf IN 0 ALIAS sve excl
USE z:\newdesar\winfac_sve\base\inventar.dbf IN 0 ALIAS inv SHARED


SELECT inv
GO TOP 
DO WHILE !EOF()
	SELECT sve
	LOCATE FOR SUBSTR(sve.zeta,1,17)=SUBSTR(inv.knumezet,1,17)
	IF FOUND()
		SELECT inv
		REPLACE inv.descript WITH sve.descrip
		REPLACE inv.codunico WITH sve.codigo
	ELSE
		WAIT WINDOW ""+inv.knumezet+""
	ENDIF
	SELECT inv
	SKIP 
ENDDO 