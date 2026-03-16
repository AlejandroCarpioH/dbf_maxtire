CLOSE ALL

USE f:\newdesar\winfac\base\arancela.dbf IN 0 ALIAS ARA EXCLUSIVE 
USE f:\newdesar\winfac\base\CODARANCE.dbf IN 0 ALIAS COD EXCLUSIVE

SELECT COD
INDEX ON COD.CODIGO TO AAA

GO TOP
DO WHILE !EOF()
	SELECT ara
	LOCATE FOR cod.codigo=ara.arancel
	IF FOUND()
		DO WHILE !EOF() AND cod.codigo=ara.arancel
			SELECT cod
			aa=cod.campo
			SELECT ara
			www="repla "+alltr(aa)+" with [X]"
			&www
			SELECT cod
			SKIP
		ENDDO
	ELSE
		SELECT cod
		skip
	ENDIF 
ENDDO
