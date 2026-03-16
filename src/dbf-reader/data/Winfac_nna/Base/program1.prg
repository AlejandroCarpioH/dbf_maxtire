CLOSE DATABASES all
SET CENTURY ON 
SET date FRENCH
SET DELETED ON
SET SAFETY OFF


USE d:\newdesar\winfac\base\movidcto IN 0 ALIAS mov SHARED 
USE d:\newdesar\winfac\base\itemdcto IN 0 ALIAS ite SHARED 
USE d:\newdesar\winfac\base\empresas IN 0 ALIAS emp SHARED 
USE d:\newdesar\winfac\base\paridade IN 0 ALIAS tip SHARED 
USE d:\newdesar\winfac\base\inventar IN 0 ALIAS inv SHARED 
USE d:\newdesar\winfac\base\doczofr  IN 0 ALIAS doc SHARED 

fini=CTOD("01/01/2006")
fter=CTOD("31/12/2006")
ver=2

SELECT fechadoc,knumfoli,knumdocu,docuzofr,pestadot,00000.00 AS tcambio,;
		00000000.0000 AS cif,00000000.0000 AS costo;
	 FROM mov;
	 INTO CURSOR pas;
	 WHERE BETWEEN(mov.fechadoc,fini,fter) AND mov.pestadot="3"
	 
SELECT  pas.fechadoc,pas.knumfoli,pas.knumdocu,pas.docuzofr,pas.pestadot,pas.tcambio,;
		pas.cif,pas.costo,ite.codunico,ite.knumezet,ite.cantsali,ite.cantentr,ite.codclasi,;
		ite.precdocd,ite.precread;
	 FROM pas,ite;
	 INTO TABLE pas1;
	 WHERE ite.docuzofr=pas.docuzofr AND ite.knumfoli=pas.knumfoli
	
SELECT pas1
REPLACE pas1.codclasi WITH "" ALL

REPLACE pas1.codclasi WITH "1" FOR pas1.cantentr<>0
REPLACE pas1.codclasi WITH "2" FOR pas1.cantentr=0
REPLACE pas1.docuzofr WITH STRTRAN(pas1.docuzofr," ","0") ALL 

INDEX ON pas1.fechadoc TO pas1
GO TOP 
DO WHILE !EOF()
	codf=pas1.fechadoc
	SELECT tip
	LOCATE FOR tip.fechadoc=pas1.fechadoc
	IF FOUND()
		doll=tip.relacion
	ELSE
		WAIT WINDOW "ERROR: TIPO CAMBIO DE FECHA "+DTOC(pas1.fechadoc)+"  NO ENCONTRADO..."
		doll=1
	ENDIF 
	SELECT pas1
	DO WHILE !EOF() AND codf=pas1.fechadoc
		REPLACE pas1.tcambio WITH doll
		SKIP
	ENDDO	
ENDDO

INDEX ON pas1.knumezet TO pas1
GO TOP 
DO WHILE !EOF()
	codf=pas1.knumezet
	SELECT inv
	LOCATE FOR inv.knumezet=pas1.knumezet
	IF FOUND()
		vcif=inv.cifunita
		vcos=inv.cosunita
	ELSE
		WAIT WINDOW "ERROR: ZETA No.:"+pas1.knumezet+"  NO ENCONTRADO..."
		vcif=0
		vcos=0
	ENDIF 
	SELECT pas1
	DO WHILE !EOF() AND codf=pas1.knumezet
		REPLACE pas1.cif   WITH vcif
		REPLACE pas1.costo WITH vcos
		SKIP
	ENDDO	
ENDDO

INDEX ON pas1.codclasi+pas1.docuzofr TO pas1

IF ver=1
	DO WHIL  !PRINTSTATUS()
		WAIT WIND [ Verifique Impresora, con <ENTER> para continuar, <ESC> Abandona ]
   	 
		IF LASTKEY() = 27
			RETU	
		ENDIF  && (LASTKEY() = 27)
		LOOP
	ENDDO
	WAIT WINDOW [    !!!  I M P R I M I E N D O !!!    ] NOWAIT
	SET DEVI TO PRINT
	???CHR(27)+CHR(48) 					&& Fija salto linea en 1/8 pp
	???CHR(15)
ELSE
	SET DEVICE TO FILE C:\informe.txt
ENDIF 

lin=1
pag=1
vcla=""
GO TOP
STORE 0 TO spdoc,sddoc,sdcif,sdcos,spcif,spcos
DO WHILE !EOF()
	IF lin=1 OR lin>56
		@02,001 SAY ALLT(emp.razonemp)
		@02,115 SAY "PAGINA:"+STR(pag,3)
		pag=pag+1
		@03,001 SAY "RESUMEN TIPO DOCUMENTOS "
		@03,115 SAY "FECHA :"+DTOC(DATE())
		@05,001 SAY "T/D"
		@05,006 SAY "DOCUMENTO"
*					 123456789012345
		@05,041 SAY "       CIF.US$"
		@05,056 SAY "      COST.US$"
		@05,071 SAY "   PR.COST.US$"
*		@05,075 SAY " T/CBM"
		@05,085 SAY "       T.CIF.$"
		@05,100 SAY "      T.COST.$"
		@05,115 SAY "     PR.COST.$"
		@06,001 SAY REPLICATE("-",135)
		lin=7
	ENDIF
	cod=pas1.docuzofr
	cla=pas1.codclasi
	IF vcla<>cla
		vcla=cla
		STORE 0 TO cpdoc,cddoc,cdcif,cdcos,cpcif,cpcos
		IF cla="1"
			@lin,001 SAY "* * * *   RESUMEN DOCUMENT DE INGRESOS  * * * *"
		ELSE
			lin=lin+3
			@lin,001 SAY "* * * *   RESUMEN DOCUMENT DE VENTAS    * * * *"
		ENDIF
		lin=lin+1
	ENDIF
	SELECT doc
	LOCATE FOR VAL(doc.docuzofr)=VAL(cod)
	IF FOUND()
		des=doc.descripc
	ELSE
		des="ERROR DESCRIPCION DOCUMENTO"
	ENDIF
	SELECT pas1
	STORE 0 TO tpdoc,tddoc,tdcif,tdcos,tpcif,tpcos
	DO WHILE !EOF() AND cod=pas1.docuzofr
		IF pas1.codclasi="1"
			cant=pas1.cantentr
		ELSE
			cant=pas1.cantsali
		ENDIF

		tddoc=tddoc+ROUND(pas1.precread*cant,2)
		tdcif=tdcif+ROUND(pas1.cif*cant,2)
		tdcos=tdcos+ROUND(pas1.costo*cant,2)
		tpdoc=tpdoc+ROUND(ROUND(pas1.precread*cant,2)*pas1.tcambio,0)
		tpcif=tpcif+ROUND(ROUND(pas1.cif*cant,2)*pas1.tcambio,0)
		tpcos=tpcos+ROUND(ROUND(pas1.costo*cant,2)*pas1.tcambio,0)

		cddoc=cddoc+ROUND(pas1.precread*cant,2)
		cdcif=cdcif+ROUND(pas1.cif*cant,2)
		cdcos=cdcos+ROUND(pas1.costo*cant,2)
		cpdoc=cpdoc+ROUND(ROUND(pas1.precread*cant,2)*pas1.tcambio,0)
		cpcif=cpcif+ROUND(ROUND(pas1.cif*cant,2)*pas1.tcambio,0)
		cpcos=cpcos+ROUND(ROUND(pas1.costo*cant,2)*pas1.tcambio,0)

		sddoc=sddoc+ROUND(pas1.precread*cant,2)
		sdcif=sdcif+ROUND(pas1.cif*cant,2)
		sdcos=sdcos+ROUND(pas1.costo*cant,2)
		spdoc=spdoc+ROUND(ROUND(pas1.precread*cant,2)*pas1.tcambio,0)
		spcif=spcif+ROUND(ROUND(pas1.cif*cant,2)*pas1.tcambio,0)
		spcos=spcos+ROUND(ROUND(pas1.costo*cant,2)*pas1.tcambio,0)

		SKIP
	ENDDO
	@lin,001 SAY cod
	@lin,006 SAY SUBSTR(des,1,34)
	@lin,041 SAY tdcif PICT "99,999,999.99"
	@lin,056 SAY tdcos PICT "99,999,999.99"
	IF cla="2"
		@lin,071 SAY tddoc PICT "99,999,999.99"
	ENDIF
	@lin,085 SAY tpcif PICT "99,999,999,999"
	@lin,100 SAY tpcos PICT "99,999,999,999"
	IF cla="2"
		@lin,115 SAY tpdoc PICT "99,999,999,999"
	ENDIF 
	lin=lin+1
	IF vcla<>pas1.codclasi
		@lin,030 SAY REPLICATE("-",105)
		lin=lin+1
		@lin,030 SAY "SUBTOTAL :"
		@lin,041 SAY cdcif PICT "99,999,999.99"
		@lin,056 SAY cdcos PICT "99,999,999.99"
		IF cla="2"
			@lin,071 SAY cddoc PICT "99,999,999.99"
		ENDIF
		@lin,085 SAY cpcif PICT "99,999,999,999"
		@lin,100 SAY cpcos PICT "99,999,999,999"
		IF cla="2"
			@lin,115 SAY cpdoc PICT "99,999,999,999"
		ENDIF
	ENDIF
ENDDO
lin=lin+2
@lin,001 SAY REPLICATE("-",135)
lin=lin+1
@lin,001 SAY "END."
IF ver=1
	@lin,001 SAY "."
	EJECT
	SET PRINTER TO
	SET DEVICE TO SCREEN
ELSE
	SET DEVI TO SCREEN
	MODIFY COMMAND c:\informe.txt NOEDIT NOMENU
ENDIF







RETURN

USE f:\newdesar\winfac\base\inventar.dbf IN 0 ALIAS inv SHARED
USE f:\newdesar\winfac\base\liprecio.dbf IN 0 ALIAS prc SHARED

SELECT prc
GO top
DO WHILE !EOF()
	SELECT inv
	LOCATE FOR inv.codunico=prc.codigo
	IF FOUND()
		SELECT prc
		REPLACE prc.codmarca WITH inv.codmarca
	ENDIF
	SELECT prc
	skip
ENDDO 