import { Injectable } from "@nestjs/common";
import { DBFFile } from 'dbffile';
import {
    compras_traspaso,
    comprasZetas,
    movimientoDocumento,
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

    private compraZetaMap = new Map<string, {
        codigo: string,
        cod_unico: string,
        marca: string,
        modelo: string,
        tipo: string,
        descripcion: string


    }>()

    private movimientoDocumentoMap = new Map<string,
        {
            tipoDocumento: string // DOCUZOFR: '103',
            fecha: Date
            hora: string
            rut_cliente: string
            nombre_cliente: string
            codigo: string //KNUMFOLI: '103336',
            cod_aduana: string //CADUANA: '103-26-103336',
        }>()

    async init() {
        await this.compraZetaTraspaso()
    }
    async comprasZetas() {
        //entrega por cada items seria el segundo 
        //KNUMEZET: '103-26-101026-001',
        const productoZeta = 'Z:\\newdesar\\Winfac_nna\\Base\\prodzeta.dbf';
        const dbf = await DBFFile.open(productoZeta);

        const ventas = await dbf.readRecords() as any as comprasZetas[]
        this.compraZetaMap.clear()
        ventas.forEach(v => {
            this.compraZetaMap.set(v.KNUMEZET, {
                cod_unico: v.CODUNICO,
                codigo: v.KNUMEZET,
                descripcion: v.DESCRIP,
                marca: v.MARCA,
                modelo: v.MODELO,
                tipo: v.TIPO
            }
            )
            // if (v["DOCUZOFR"] === "103") {

            // }
        })
        // console.log(this.compraZetaMap)
    }

    async compraZetaTraspaso() {
        await this.comprasZetas()
        // inicio en las compras se genera el documento inicial completo entrega fecha y datos del distribuidor
        //CADUANA: '101-26-010548',
        const movimientoDocumento = 'Z:\\newdesar\\Winfac_nna\\Base\\movidcto.dbf';
        const dbf = await DBFFile.open(movimientoDocumento);

        const resultado = await dbf.readRecords() as any as movimientoDocumento[]

        // resultado.forEach(r => {
        //     if (r.DOCUZOFR === "103" || r.DOCUZOFR === "101") {
        //         console.log(r)
        //     }
        // })
        // return
        this.movimientoDocumentoMap.clear()
        resultado.forEach(dm => {
            if (dm.DOCUZOFR === "103" || dm.DOCUZOFR === "101") {
                this.movimientoDocumentoMap.set(dm.CADUANA.split("-")[2], {
                    cod_aduana: dm.CADUANA,
                    fecha: dm.FECHCONF,
                    hora: dm.HORACONF,
                    nombre_cliente: dm.CLIENTE,
                    rut_cliente: dm.RUTCOMPR,
                    tipoDocumento: dm.DOCUZOFR,
                    codigo: dm.KNUMFOLI
                })
            }
        })

        const compras_traspaso: compras_traspaso[] = []

        this.movimientoDocumentoMap.forEach(m => {
            const fechaSinFormato = new Date(m.fecha);
            const year = fechaSinFormato.getUTCFullYear();
            const month = fechaSinFormato.getUTCMonth();
            const day = fechaSinFormato.getUTCDate();
            const fechaChileUTC = new Date(Date.UTC(year, month, day, 4, 0, 0));
            compras_traspaso.push({
                fecha: fechaChileUTC,
                numero_ingreso: m.cod_aduana,
                codigo: m.codigo,
                tipo_documento: m.tipoDocumento
            })
            // this.compraZetaMap.forEach(c => {
            //     if (c.codigo.includes(m.cod_aduana)) {
            //         console.log(m.cod_aduana, c.codigo, c.descripcion)
            //     }
            // })
        })

        const result = await fetch(`http://localhost:3010/contenedores/createAll`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(compras_traspaso)
        })
        const data = await result.text();
        return data;

    }

    async comprasItems() {
        //entrega items de las compras este seria el tercero en compras  entrega cantidad
        // KNUMEZET: '103-26-079561-002-GLP',
        const ventasPorItems = 'Z:\\newdesar\\Winfac_nna\\Base\\itemdcto.dbf';
        const dbf = await DBFFile.open(ventasPorItems);

        const ventas = await dbf.readRecords() as any as venta_por_item[]

        ventas.forEach(v => {
            if (v["DOCUZOFR"] === "103") {
                console.log(v)
            }
        })
    }

}