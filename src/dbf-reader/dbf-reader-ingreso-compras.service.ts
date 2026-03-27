import { Injectable } from "@nestjs/common";
import { DBFFile } from 'dbffile';
import {
    compras_traspaso,
    itemsZeta,
    dbf_inventario,
    movimientoDocumento,
    paridade,
    venta_por_item,
} from './types';


@Injectable()
export class DbfReaderIngresoComprasService {

    private ventas_por_items_map = new Map<
        string,
        {
            folio: string;
            nota_venta: string
            codigo_unico: string;
            cantidad: number;
            precio_und: number;
            precio_total: number;
            visacion: string;
            descripcion: string;
        }[]
    >();

    private itemsZetasCompras = new Map<string, { // se ingresan los items cantidad 
        FOLIO: string //   KNUMFOLI: '010548',
        TIPO_DOCUMENTO: string//   DOCUZOFR: '101',
        //   KNUMDOCU: '010548',
        CODIGO_UNICO_NEUMATICO: string//   CODUNICO: '25-0010',
        CANTIDAD: number//   CANTENTR: 40,
        ITEM: string//   CANTSALI: null,
        CODIGO_ZETA: string//   PRECDOCD: null,
        //   PRECREAD: null,
        //   CODCLASI: 'GLP',
        //   KNUMORDE: '',
        //   KDOCITEM: '008',
        //   KNUMEZET: '101-26-010548-008-GLP',
    }>

    private itemsZeta = new Map<string, {
        codigo: string,
        cod_unico: string,
        marca: string,
        modelo: string,
        tipo: string,
        descripcion: string


    }>()

    private zeta = new Map<string,
        {
            tipoDocumento: string // DOCUZOFR: '103',
            fecha: Date
            hora: string
            rut_cliente: string
            nombre_cliente: string
            codigo: string //KNUMFOLI: '103336',
            cod_aduana: string //CADUANA: '103-26-103336',
        }>()

    private inventarioZetaMap = new Map<string, {
        CODIGO: string,
        CODIGO_UNICO: string,
        DESCRIPCION: string,
        CANTIDAD: number,
        COSTO_UND: number,
        COSTO_TOTAL: number,
    }>()

    async paridade() {
        const productoZeta = 'Z:\\newdesar\\Winfac_nna\\Base\\paridade.dbf';// inventar
        const dbf = await DBFFile.open(productoZeta);

        const paridades = await dbf.readRecords() as any as paridade[]
        paridades.forEach(p => {
            if (p.FECHADOC.getFullYear() === 2026) {
                console.log(p)
            }
        })

    }

    async inventario() {
        const productoZeta = 'Z:\\newdesar\\Winfac_nna\\Base\\inventar.dbf';// inventar
        const dbf = await DBFFile.open(productoZeta);

        const inventario = await dbf.readRecords() as any as dbf_inventario[]
        // console.log(inventario)
        // return
        inventario.forEach(v => {
            this.inventarioZetaMap.set(v.KNUMEZET.replace("-GLP", ""), {
                CODIGO: v.KNUMEZET,
                CODIGO_UNICO: v.CODUNICO,
                DESCRIPCION: v.DESCRIPT,
                CANTIDAD: v.ENTRADAS,
                COSTO_UND: Number(v.COSUNIT2),
                COSTO_TOTAL: Number(v.COSUNIT2) * v.ENTRADAS,

            })
            // if (v["KNUMDOCU"] === "113640") {
            //     // console.log(v.DESCRIPT, v.ENTRADAS, v.COSUNIT1, v.COSUNIT2, v.CODUNICO, Number(v.COSUNIT2) * v.ENTRADAS)
            //     let empresa = ""
            //     let fecha: Date | string = ""
            //     const zeta = this.zeta.get(v.KNUMDOCU)
            //     if (zeta) {
            //         console.log(zeta)
            //         empresa = zeta.nombre_cliente
            //         fecha = zeta.fecha
            //     }
            //     // console.log(v)
            //     // console.log({
            //     //     FECHA: fecha,
            //     //     CODIGO: v.KNUMEZET,
            //     //     CODIGO_UNICO: v.CODUNICO,
            //     //     DESCRIPCION: v.DESCRIPT,
            //     //     CANTIDAD: v.ENTRADAS,
            //     //     COSTO_UND: v.COSUNIT2,
            //     //     COSTO_TOTAL: Number(v.COSUNIT2) * v.ENTRADAS,
            //     //     EMPRESA: empresa
            //     // })
            // }
        })

        // console.log(this.inventarioZetaMap.get("103-26-113640-010"))
    }

    async test() {
        // console.log(this.movimientoDocumentoMap)
        // return
        const productoZeta2 = 'Z:\\newdesar\\TotVentas\\totventas.dbf';// inventar
        const productoZeta = 'Z:\\newdesar\\Winfac_nna\\Base\\historia.dbf';// inventar
        const dbf = await DBFFile.open(productoZeta2);

        const ventas = await dbf.readRecords()
        ventas.forEach(v => {
            // if (v["TIPOMOVI"] !== "V") {
            console.log(v)
            // }
        })

        // ventas.forEach(v => {
        //     if (v["KNUMDOCU"] === "113640") {
        //         // console.log(v.DESCRIPT, v.ENTRADAS, v.COSUNIT1, v.COSUNIT2, v.CODUNICO, Number(v.COSUNIT2) * v.ENTRADAS)
        //         let empresa = ""
        //         let fecha: Date | string = ""
        //         const zeta = this.zeta.get(v.KNUMDOCU)
        //         if (zeta) {
        //             console.log(zeta)
        //             empresa = zeta.nombre_cliente
        //             fecha = zeta.fecha
        //         }
        //         // console.log(v)
        //         console.log({
        //             FECHA: fecha,
        //             CODIGO: v.KNUMEZET,
        //             DESCRIPCION: v.DESCRIPT,
        //             CANTIDAD: v.ENTRADAS,
        //             COSTO_UND: v.COSUNIT2,
        //             COSTO_TOTAL: Number(v.COSUNIT2) * v.ENTRADAS,
        //             EMPRESA: empresa
        //         })
        //     }
        // })
    }

    async init() {

        // await this.compraZetaTraspaso()
        // await this.traeItemsZeta()
        // await this.traeZetas()
        await this.test()
        // await this.inventario()
    }


    async traeItemsZeta() {
        //entrega por cada items seria el segundo 
        //KNUMEZET: '103-26-101026-001',
        const productoZeta = 'Z:\\newdesar\\Winfac_nna\\Base\\prodzeta.dbf';
        const dbf = await DBFFile.open(productoZeta);

        const itemsZetas = await dbf.readRecords() as any as itemsZeta[]


        this.itemsZeta.clear()
        itemsZetas.forEach(v => {
            this.itemsZeta.set(v.KNUMEZET, {
                cod_unico: v.CODUNICO,
                codigo: v.KNUMEZET,
                descripcion: v.DESCRIP,
                marca: v.MARCA,
                modelo: v.MODELO,
                tipo: v.TIPO
            }
            )
            // if (v["DOCUZOFR"] === "103" || v["DOCUZOFR"] === "101") {
            // console.log(v)
            // }
        })
    }

    async traeZetas() { // principal es el zeta competo 

        await this.inventario()
        await this.traeItemsZeta()
        await this.comprasItems()
        // inicio en las compras se genera el documento inicial completo entrega fecha y datos del distribuidor
        //CADUANA: '101-26-010548',
        const movimientoDocumento = 'Z:\\newdesar\\Winfac_nna\\Base\\movidcto.dbf';
        const dbf = await DBFFile.open(movimientoDocumento);

        const zetas = await dbf.readRecords() as any as movimientoDocumento[]

        // resultado.forEach(r => {
        //     if (r.DOCUZOFR === "103" || r.DOCUZOFR === "101") {
        //         console.log(r)
        //     }
        // })
        // return

        // resultado.forEach(r => {
        //     if (r.DOCUZOFR === "103" || r.DOCUZOFR === "101") {
        //         console.log(r);

        //     }
        // })
        // return


        // resultado.forEach(r => {
        //     if (r.DOCUZOFR === "103" || r.DOCUZOFR === "101") {
        //         if (r.KNUMFOLI === "075139")
        //             console.log(r)
        //     }
        // })
        // return


        zetas.forEach(z => {
            if (z.KNUMFOLI === "018970") {
                console.log(z)
            }
        })



        return

        this.zeta.clear()
        zetas.forEach(dm => {
            if (dm.DOCUZOFR === "103" || dm.DOCUZOFR === "101") {

                this.zeta.set(dm.KNUMFOLI, {
                    cod_aduana: dm.CADUANA,
                    fecha: dm.FECHCONF,
                    hora: dm.HORACONF,
                    nombre_cliente: dm.NOMCOMPR,
                    rut_cliente: dm.RUTCOMPR,
                    tipoDocumento: dm.DOCUZOFR,
                    codigo: dm.KNUMFOLI
                })
            }
        })


        const compras_traspaso: compras_traspaso[] = []

        const itemsZetas: {
            codigo: string,
            cod_unico: string,
            marca: string,
            modelo: string,
            codigo_zeta: string,
            item: string,
            tipo: string,
            descripcion: string
        }[] = []

        this.zeta.forEach(m => {
            const itemsZetas: {
                codigo_visacion: string,
                cod_unico: string,
                cantidad: number,
                descripcion: string,
                costo_unidad: number,
                costo_total: number,
            }[] = []
            this.itemsZeta.forEach(iz => {
                if (iz.codigo.split("-")[2] === m.codigo) {
                    const itemsCompras = this.itemsZetasCompras.get(iz.codigo)
                    let itemsInventario: {
                        CODIGO: string,
                        CODIGO_UNICO: string,
                        DESCRIPCION: string,
                        CANTIDAD: number,
                        COSTO_UND: number,
                        COSTO_TOTAL: number,
                    } | undefined = undefined
                    if (itemsCompras) {
                        itemsInventario = this.inventarioZetaMap.get(itemsCompras.CODIGO_ZETA.replace("-GLP", ""))
                    }
                    itemsZetas.push({
                        cantidad: itemsCompras?.CANTIDAD ?? 0,
                        descripcion: itemsInventario?.DESCRIPCION ?? "",
                        cod_unico: itemsCompras?.CODIGO_UNICO_NEUMATICO ?? "",
                        codigo_visacion: itemsCompras?.CODIGO_ZETA ?? "",
                        costo_total: itemsInventario !== undefined ? Number(itemsInventario?.COSTO_TOTAL.toFixed(2)) : 0,
                        costo_unidad: itemsInventario !== undefined ? itemsInventario?.COSTO_UND : 0
                    })
                }
            })


            const fechaSinFormato = new Date(m.fecha);
            const year = fechaSinFormato.getUTCFullYear();
            const month = fechaSinFormato.getUTCMonth();
            const day = fechaSinFormato.getUTCDate();
            const fechaChileUTC = new Date(Date.UTC(year, month, day, 4, 0, 0));
            compras_traspaso.push({
                fecha: fechaChileUTC,
                numero_ingreso: m.cod_aduana,
                codigo: m.codigo,
                nombre_cliente: m.nombre_cliente,
                hora: m.hora,
                tipo_documento: m.tipoDocumento,
                items: itemsZetas
            })
            // this.compraZetaMap.forEach(c => {
            //     if (c.codigo.includes(m.cod_aduana)) {
            //         console.log(m.cod_aduana, c.codigo, c.descripcion)
            //     }
            // })
        })
        // compras_traspaso.forEach(c => {
        //     if (c.codigo === "079561") {
        //         console.log(c)
        //     }
        // })


        compras_traspaso.forEach(ct => {
            if (ct.codigo === "018970") {
                console.log(ct)
            }
        })
        return
        const result = await fetch(`http://localhost:3010/contenedores/createAll`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(compras_traspaso)
        })
        const data = await result.text();
        return "ok";

    }



    async comprasItems() {
        //entrega items de las compras este seria el tercero en compras  entrega cantidad y codigo de neumatico
        // KNUMEZET: '103-26-079561-002-GLP',
        const ventasPorItems = 'Z:\\newdesar\\Winfac_nna\\Base\\itemdcto.dbf';
        const dbf = await DBFFile.open(ventasPorItems);

        const ventas = await dbf.readRecords() as any as venta_por_item[]

        //   KNUMFOLI: '010548',
        //   DOCUZOFR: '101',
        //   KNUMDOCU: '010548',
        //   CODUNICO: '25-0010',
        //   CANTENTR: 40,
        //   CANTSALI: null,
        //   PRECDOCD: null,
        //   PRECREAD: null,
        //   CODCLASI: 'GLP',
        //   KNUMORDE: '',
        //   KDOCITEM: '008',
        //   KNUMEZET: '101-26-010548-008-GLP',
        this.itemsZetasCompras.clear()
        ventas.forEach(v => {
            if (v.DOCUZOFR === "101" || v.DOCUZOFR === "103") {
                this.itemsZetasCompras.set(v.KNUMEZET.replace("-GLP", ""), {
                    CANTIDAD: Number(v.CANTENTR),
                    CODIGO_UNICO_NEUMATICO: v.CODUNICO,
                    CODIGO_ZETA: v.KNUMEZET,
                    FOLIO: v.KNUMFOLI,
                    ITEM: v.KDOCITEM,
                    TIPO_DOCUMENTO: v.DOCUZOFR
                })
            }
        })
    }

}