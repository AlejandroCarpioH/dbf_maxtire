CLOSE ALL
CLEAR

USE z:\newdesar\winfac_sve\base\inventar.dbf IN 0 ALIAS inv shared

USE f:\aaaa_huibang\galpon\maestro.dbf IN 0 ALIAS svr SHARED

SELECT inv
GO top
DO WHILE !EOF()
	SELECT svr
	LOCATE FOR ALLTRIM(svr.cod_tras) = SUBSTR(inv.knumezet,2,16)
	IF FOUND()
		SELECT inv
		REPLACE inv.descript WITH ALLTRIM(svr.nombre)+" Marca: "+ALLTRIM(svr.marca_com)+"Modelo: "+ALLTRIM(svr.model_prod)+" "+ALLTRIM(svr.tipo)
		REPLACE inv.codunico WITH ALLTRIM(svr.codigo)
	ENDIF
	SELECT inv
	SKIP
	
ENDDO

CLOSE ALL
return