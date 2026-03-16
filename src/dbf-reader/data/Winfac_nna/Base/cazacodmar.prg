CLOSE ALL

SET DELETED ON 
SET CENTURY on
SET date FRENCH


USE z:\newdesar\winfac_sve\base\inventar.dbf IN 0 ALIAS inv shar 
USE z:\newdesar\winmod\m7121\inventar.dbf IN 0 ALIAS mdl SHARED


SELECT inv
GO TOP 
DO WHILE !EOF()
	IF inv.codmarca=0
		SELECT mdl
		LOCATE FOR SUBSTR(mdl.zeta,1,17)=SUBSTR(inv.knumezet,1,17)
		IF FOUND()
			SELECT inv
			REPLACE inv.codmarca WITH VAL(mdl.codmarca)
		ENDIF
	ENDIF
	SELECT inv
	SKIP 
ENDDO 