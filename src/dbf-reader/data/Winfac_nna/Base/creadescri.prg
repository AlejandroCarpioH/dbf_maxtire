CLOSE ALL
USE f:\newdesar\winfac\base\producto.dbf IN 0 ALIAS PRO

SELECT PRO
GO TOP
DO WHILE !EOF()
	IF EMPTY(pro.descrip)
		dnom=IIF(EMPTY(pro.nombre),"",ALLTRIM(pro.nombre)+" ")
		dmca=IIF(EMPTY(pro.marca),"","MARCA "+ALLTRIM(pro.marca)+" ")
		dmod=IIF(EMPTY(pro.modelo),"","MODELO "+ALLTRIM(pro.modelo)+" ")
		dtip=IIF(EMPTY(pro.tipo),"","TIPO "+ALLTRIM(pro.tipo)+" ")
		dadi=ALLTRIM(pro.adic01)+" "+ALLTRIM(pro.adic02)

		descr=dnom+dmca+dmod+dtip+dadi
		REPLACE pro.descrip WITH descr
	ENDIF 
	SKIP
ENDDO 
