export interface dbf_inventario {
  KNUMEZET: string;
  CODUNICO: string;
  CODPRODU: string;
  CODBARRA: string;
  CODCLASI: string;
  PROCEDE: string;
  ENTRADAS: number;
  SALIDASS: number;
  STOCDISP: number;
  STOCFISI: number;
  STDENTRA: string | null;
  STDSALID: string | null;
  STDDISPO: string | null;
  STDCFISI: string | null;
  FACTORRR: string | null;
  CIFUNITA: number;
  CIFTOTAL: string | null;
  COSUNIT1: string | null;
  COSUNITA: number;
  VIUPRODT: number;
  PARTARAN: number;
  DESCRIPT: string;
  CODIVERI: string;
  UNIDADDD: string;
  DESUNIDA: string;
  CODIGIAD: string | null;
  MONEDAAA: string;
  KCODUNID: string;
  PROCEDEN: string | null;
  ORIGEMER: string | null;
  PTOEMBA: string | null;
  PTIPOMER: string;
  PCOMPRAD: string;
  CONTADOR: string | null;
  CODADIC: string;
  ADIC: number;
  CANTCAJA: number;
  PESOCAJA: string | null;
  CUBICAJA: string | null;
  UNIDXSET: string | null;
  ORGEXT1: string;
  COBUENO1: string;
  NVBUENO1: string;
  FVBUENO1: string | null;
  OVBUENO1: string;
  ORGEXT2: string;
  COBUENO2: string;
  NVBUENO2: string;
  FVBUENO2: string | null;
  OVBUENO2: string;
  P_ROJO: string | null;
  P_VERDE: string | null;
  P_MODUL: string | null;
  COSUNIC: string;
  CODMARCA: number;
  CODFAMI: string | null;
  CANTENTR: number;
  SDO_ENT: number;
  SDO_SAD: number;
  SDO_SAF: number;
  SDO_EN: string | null;
  SDO_SA: string | null;
  SDO_ST: string | null;
  STW: string;
  KNUMDOCU: string;
  MONEDCMP: string;
  TIPOARTI: string;
  DESCRIP2: string;
  COSREAL: string | null;
  DOLAR: string | null;
  PRECIO: string | null;
  GANANCIA: string | null;
  OKVENTA: number;
  OKFECHA: string | null;
  FECHAING: string | null;
  LEGALIZA: string;
  ADULEGAL: string;
  VISAADUA: string;
  NOTAINSU: string;
  INVOICE: string;
  INFPRODU: string;
  VISPROD: string;
  FECPROD: string | null;
  HORPROD: string;
  LEGPROD: string;
  CANCAJA: string | null;
  PESCAJA: string | null;
  UBIZOFRI: string;
  TPBUENO1: string;
  TPBUENO2: string;
  CRBUENO1: string;
  CRBUENO2: string;
  CIFUNIT2: string | null;
  COSUNIT2: string | null;
  VIUPROD2: string | null;
  NROCONT: string;
}
export interface comprasZetas {
  KNUMEZET: string,
  ADULEGAL: string,
  CODUNICO: string,
  CODPRODU: string,
  ARANCEL: number,
  PAISORIGEN: string,
  PAISPROCE: string,
  UNIDADDD: string,
  DESUNIDA: string,
  UNIXSET: number,
  CODVEH: string,
  DCODVEH: string,
  CODVDE: string,
  DCODVDE: string,
  NOMBRE: string,
  NOMBREC: string,
  CMARCA: string,
  MARCA: string,
  MODELO: string,
  TIPO: string,
  TIPOENC: string,
  DTIPOENC: string,
  SISTRAC: string,
  DSISTRAC: string,
  SERIE: string,
  CHASSIS: string,
  MOTOR: string,
  CILINDRA: number,
  ASIENTO: number,
  CARGATON: number,
  CARGAKGS: number,
  PESOS: number,
  CABINA: string,
  CABINAD: string,
  ADIC01: string,
  ADIC02: string,
  ADIC03: string,
  DESCRIP: string,
  TIPOARTI: string,
  SDO_CRITI: number,
  PRC_SRF: number,
  PRC_TRA: number,
  PRC_EMP: number,
  MANNO: number,
  PORCCOMP: number,
  CAPA_KG: number,
  CAPA_MB: number,
  CAPA_GR: number,
  CAPA_CL: number,
  CAPA_CC: number,
  CAPA_ML: number,
  CAPA_UNI: number,
  CAPA_CIG: number,
  NUM_FRANCE: number,
  MAT_CAPE: number,
  MAT_PLAN: number,
  TALLA: number,
  TIP_ENV: string,
  DTIP_ENV: string,
  TIP_PRODU: string,
  PRESENTA: string,
  FABRICA: string,
  VARIEDAD: string,
  SOF_TIPO: string,
  SOF_NOM: string,
  SOF_CMARCA: string,
  SOF_MARCA: string,
  VPESO: number,
  COLOR0: string,
  DCOLOR0: string,
  COLOR1: string,
  DCOLOR1: string,
  COLOR2: string,
  DCOLOR2: string,
  COLOR3: string,
  DCOLOR3: string,
  TIP_COMB: string,
  NOM_COMB: string,
  SIG_COMB: string,
  IMAGEN: string,
  DESCRIP2: string,
  CODBARRA: string,
  NUEVO: string | null,
  PBV: string | null,
  TIPCAR: string,
  TIPCARD: string,
  VEHDES: string,
  VEHDESD: string,
  EJE_NRO: string | null,
  EJE_DISP: string,
  EJE_RUEDAS: string | null,
  PUERTAS: string | null,
  POTMOTOR: string | null,
  PASAJERO: string | null,
  ORGEXT1: string,
  COBUENO1: string,
  NVBUENO1: string,
  FVBUENO1: string | null,
  OVBUENO1: string,
  TPBUENO1: string,
  CRBUENO1: string,
  ORGEXT2: string,
  COBUENO2: string,
  NVBUENO2: string,
  FVBUENO2: string | null,
  OVBUENO2: string,
  TPBUENO2: string,
  CRBUENO2: string,
  NROCONT: string
  NROFACT: string
}
export interface seguimientoDto {
  CAJA: string;
  TIPOMOVI: string;
  DOCUZOFR: string;
  MONEDAAA: string;
  FECHANVT: string;
  KNUMFOLI: string;
  FECHADOC: string;
  KNUMDOCU: string;
  SUBFACTU: string;
  UB_MERCA: string;
  USUARIOO: string;
  OCUPADO: string;
  CODCLASI: string;
  FOLIOUNI: string;
  VISAADUA: string;
  VISACPDD: string;
  FECHCONF: string;
  HORACONF: string;
  USUACONF: string;
  CODIVERI: string;
  CORREDIR: string | null;
  PCODAREA: string | null;
  PESTADOT: string;
  PFORMPAG: string;
  KNUMERUT: string;
  KCODCLIE: string | null;
  KCODCLI2: string | null;
  NUMFOLI2: string;
  PCODIMPT: string;
  TCODAVAN: string;
  PCODIVIA: string;
  TCODPLAZ: string;
  PCODSEGU: string;
  PCODPAIS: string | null;
  MODULOSS: string;
  PCODDEST: string;
  RESOLIMP: string;
  FECHARES: string | null;
  CODANEXO: string;
  DESANEXO: string;
  CANANEXO: string | null;
  MARANEXO: string;
  PESANEXO: string | null;
  CODANEXO1: string;
  DESANEXO1: string;
  CANANEXO1: string | null;
  MARANEXO1: string;
  PESANEXO1: string | null;
  CONTINUO: string;
  HOJASSSS: string | null;
  DESCRIP: string;
  KINCLIVA: string;
  RUTCOMPR: string;
  NOMCOMPR: string;
  INFVENTA: string;
  VL_TIPTOT: string;
  MONECMP: string;
  VL_FACTUR: number;
  VL_GASTOS: number;
  VL_FOB: number;
  VL_FLETE: number;
  VL_SEGURO: number;
  VL_CIF: number;
  VL_VIU: number;
  CODPROCE: string;
  CODDESTI: string;
  TIPO: string | null;
  ZNCODDES: string;
  ZNCODEXT: string;
  REGION: string;
  MEDTRANS: string;
  TIPOCAMB: string | null;
  RESNUM: string;
  RESFEC: string | null;
  RESEMI: string;
  UBCODDES: string;
  SEGPAGA: string;
  MONEDCMP: string;
  CONSUMO: string;
  OBSERVA: string;
  OBSERVA2: string;
  CODBULTO: string | null;
  CANBULTO: string | null;
  PESBULTO: string | null;
  CLIENTE: string;
  VAL_DOC: string | null;
  VAL_REA: string | null;
  VL_ZOF: string | null;
  VL_IVA: string | null;
  VL_IAD: string | null;
  VL_TOT: string | null;
  NTESTADO: string;
  FECHAVIS: string | null;
  NESTADO: string;
  IMPADIC1: string | null;
  CARGASRF: string;
  CADUANA: string;
  LEGALIZA: string;
  VAL_IAD: string | null;
  VENDEDOR: string;
  ESTANOTA: string | null;
  ID_TDOCU: string;
  TCODPCO: string;
  PARIDAD: string | null;
  UTM: string | null;
  VAL_IVA: string | null;
  VAL_IZF: string | null;
  IMPTOZOF: string | null;
  RESOLSII: string | null;
  GARANTIA: string | null;
  FACTURA: string;
}

export interface movimientoDocumento {
  CAJA: string,
  DOCUZOFR: string,
  MONEDAAA: string,
  TIPOMOVI: string,
  FECHANVT: Date,
  KNUMFOLI: string,
  FECHADOC: Date,
  KNUMDOCU: string,
  SUBFACTU: string,
  UB_MERCA: string,
  USUARIOO: string,
  OCUPADO: string,
  CODCLASI: string,
  FOLIOUNI: string,
  VISAADUA: string,
  VISACPDD: string,
  FECHCONF: Date,
  HORACONF: string,
  USUACONF: string,
  CODIVERI: string,
  CORREDIR: string | null,
  PCODAREA: string | null,
  PESTADOT: string,
  PFORMPAG: string,
  KNUMERUT: string,
  KCODCLIE: string | null,
  KCODCLI2: string | null,
  NUMFOLI2: string,
  PCODIMPT: string,
  TCODAVAN: string,
  PCODIVIA: string,
  TCODPLAZ: string,
  PCODSEGU: string,
  PCODPAIS: string | null,
  MODULOSS: string,
  PCODDEST: string,
  RESOLIMP: string,
  FECHARES: string | null,
  CODANEXO: string,
  DESANEXO: string,
  CANANEXO: string | null,
  MARANEXO: string,
  PESANEXO: string | null,
  CODANEXO1: string,
  DESANEXO1: string,
  CANANEXO1: string | null,
  MARANEXO1: string,
  PESANEXO1: string | null,
  CONTINUO: string,
  HOJASSSS: string | null,
  DESCRIP: string,
  KINCLIVA: string,
  RUTCOMPR: string,
  NOMCOMPR: string,
  INFVENTA: string,
  VL_TIPTOT: string,
  MONECMP: string,
  VL_FACTUR: number,
  VL_GASTOS: number,
  VL_FOB: number,
  VL_FLETE: number,
  VL_SEGURO: number,
  VL_CIF: number,
  VL_VIU: number,
  CODPROCE: string,
  CODDESTI: string,
  TIPO: string | null,
  ZNCODDES: string,
  ZNCODEXT: string,
  REGION: string,
  MEDTRANS: string,
  TIPOCAMB: null,
  RESNUM: string,
  RESFEC: string | null,
  RESEMI: string,
  UBCODDES: string,
  SEGPAGA: string,
  MONEDCMP: string,
  CONSUMO: string,
  OBSERVA: string,
  OBSERVA2: string,
  CODBULTO: string | null,
  CANBULTO: string | null,
  PESBULTO: string | null,
  CLIENTE: string,
  VAL_DOC: string | null,
  VAL_REA: string | null,
  VL_ZOF: string | null,
  VL_IVA: string | null,
  VL_IAD: string | null,
  VL_TOT: string | null,
  NTESTADO: string,
  FECHAVIS: string | null,
  NESTADO: string,
  IMPADIC1: string,
  CARGASRF: string,
  CADUANA: string,
  LEGALIZA: string,
  VAL_IAD: string | null,
  VENDEDOR: string,
  ESTANOTA: string,
  ID_TDOCU: string,
  TCODPCO: string,
  PARIDAD: string | null,
  UTM: string | null,
  VAL_IVA: string | null,
  VAL_IZF: string | null,
  IMPTOZOF: string | null,
  RESOLSII: string | null,
  GARANTIA: string | null,
  FACTURA: string
}

export interface venta {
  RUTEMP: string;
  DOCU: string;
  NOTAVTA: string;
  FECHA: string;
  ESTADO: string;
  PROVISORIO: string;
  ATENCION: string;
  NO_APRUEBA: string;
  CLIENTE: string;
  FECSVE: string;
  NROCOMER: string;
  FIRMANTE: string;
  ID_TDOCU: string;
  LEGADUNRO: string;
  LEGADUFEC: string;
  KNUMFOLI: string;
  HORACARGA: string;
  REP_RUT: string;
}

export interface venta_por_item {
  EMPRESAA: string;
  KNUMFOLI: string;
  DOCUZOFR: string;
  KNUMDOCU: string;
  CODUNICO: string;
  CANTENTR: string;
  CANTSALI: string;
  PRECDOCD: string;
  PRECREAD: string;
  CODCLASI: string;
  KNUMORDE: string;
  KDOCITEM: string;
  KNUMEZET: string;
  TOTALDOC: string;
  TOTALREA: string;
  IMPTOIVA: string;
  PORCEIAD: string;
  CODIGIAD: string;
  IMPTOIAD: string;
  CODIVERI: string;
  CODBARRA: string;
  COD_MODUL: string;
  COLECCION: string;
  NORCONT: string;
  ITMX: string;
  CANTXCAJA: string;
  PESO: string;
  DESCRIP: string;
  PESTADOT: string;
  FECHAITE: string;
  USUARIOS: string;
  INFVENTA: string;
  NUM: string;
  CIFUNITA: string;
  VIUPRODT: string;
  REC_INV: string;
  CANTIDAD: string;
  ADULEGAL: string;
  CARGASRF: string;
  TOTALADI: string;
  FOB: string;
  FLETE: string;
  SEGURO: string;
  CIF: string;
  UNIDADDD: string;
  ID_TDOCU: string;
  IMPTOZOF: string;
  CIFUNIT2: string;
  COSUNIT2: string;
  VIUPROD2: string;
  NROCONT: string;
}

export interface cliente {
  KCODCLIE: number;
  NOMBRESS: string;
  PASAPORTE: string;
  RUTCLIEN: string;
  NUMECONT: string | null;
  DIGIVERI: string;
  FECHCONT: string | null;
  BLOQUEOO: string;
  PCODCLAS: string;
  PCODCOST: string;
  PCODCOBR: string;
  PCODREPA: string;
  PCODPAIS: number;
  PDESPAIS: string;
  PCODZONA: string;
  PDIASCRE: string | null;
  USUTIPO: string;
  TELEFONO: string;
  FAX: string;
  TELECASA: string;
  CELULAR: string;
  PRODUCTO: string;
  FECHIN: string | null;
  PAIS: string;
  CIUDAD: string;
  EMAIL01: string;
  EMAIL02: string;
  PAGWEB: string;
  NOMUSUA: string;
  ZOFRI: number;
  KCODCLIE1: string | null;
  BLOQUEO: string;
  LINEACRE: string | null;
  OBSERVA: string | null;
  MONEDA: string;
  LISPRECIO: number;
}

export interface direccion {
  KCODCLIE: number;
  PTIPODIR: string;
  CORREDIR: number;
  DESDIREC: string;
  KCIUDADD: number;
  HUBICACI: string;
  NOMBCIUD: string;
  NUMERO: string;
  CCOMUNA: string;
  CODREG: string;
  REGION: string;
}
export interface ventasdelDia {
  cliente: string;
  fecha: string;
  hora: string;
  rut: string;
  notaVenta: string;
  estado: string;
  items: {
    folio: string;
    codigo_unico: string;
    cantidad: number;
    precio_und: number;
    precio_total: number;
    visacion: string;
    descripcion: string;
  }[];
}

export interface ventasDiarias {
  cliente: string;
  fecha: string;
  hora: string;
  rut: string;
  notaVenta: string;
  estado: string;
  items: {
    folio: string;
    cantidad: number;
    id_interno: string;
    precio_total: number;
    precio_unidad: number;
  }[];
}

export interface clienteDTO {
  nombre: string;
  rut: string;
  ciudad: string;
  codigo_cliente: number;
  digito_verificador: string
}

export interface direccionesDTO {
  direccion: string;
  ciudad: string;
  codigo_cliente: number;
}

export interface ventasDTO {
  fecha: Date;
  folio: string;
  nota_venta: string;
  total: number;
  rut: string
  items: {
    folio: string;
    cantidad: number;
    id_interno: string;
    precio_total: number;
    precio_unidad: number;
  }[]
}

export interface items_por_venta {
  codigo_unico: string;
  cantidad: number;
  precio_und: number;
  precio_total: number;
  visacion: string;
  descripcion: string;
  nota_venta: string
}
export interface venta_diaria {
  folio: string;
  cantidad: number;
  id_interno: string;
  precio_total: number;
  precio_unidad: number;
}

export interface compras_traspaso {
  numero_ingreso: string;
  tipo_documento: string
  fecha: Date;
  codigo: string;
}

export interface neumatico_dto {

  id_interno_completo: string;

}
