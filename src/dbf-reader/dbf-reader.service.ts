import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateDbfReaderDto } from './dto/create-dbf-reader.dto';
import { UpdateDbfReaderDto } from './dto/update-dbf-reader.dto';
import * as chokidar from 'chokidar';
import { DBFFile, DELETED } from "dbffile"
import { cliente, dbf_inventario, direccion, seguimientoDto, venta, venta_por_item, ventasdiarias } from './types';



@Injectable()
export class DbfReaderService implements OnModuleInit {

  private ruta = 'Z:\\newdesar\\Winfac_nna\\Base\\inventar.dbf';
  private ruta_test = "Z:\\ale\\prueba.txt"
  private indexRut = new Map();
  private clienteMap = new Map<string, {
    cliente: string,
    rut: string,
    ciudad: string,
    codigo_cliente: number,
    direcciontes: {
      direccion: string,
      ciudad: string
    }[]
  }>();
  private direccionesMap = new Map<number, {
    codigo_cliente: number,
    direccion: string, ciudad: string
  }[]>();



  private ventasMap = new Map<string, {
    cliente: string
    fecha: string,
    hora: string
    rut: string
    notaVenta: string
    estado: string
    items: {
      folio: string,
      codigo_unico: string,
      cantidad: number
      precio_und: number
      precio_total: number
      visacion: string
      descripcion: string
    }[]
  }>()

  private ventas_por_items_map = new Map<string, {
    folio: string,
    codigo_unico: string,
    cantidad: number
    precio_und: number
    precio_total: number
    visacion: string
    descripcion: string
  }[]>()

  onModuleInit() {
    console.log("iniciado")
    this.watchDBF();
  }

  watchDBF() {

    const watcher = chokidar.watch(this.ruta, {
      usePolling: true,
      interval: 1000,
      ignoreInitial: true,
      awaitWriteFinish: true
    })

    watcher.on('add', path => console.log('Archivo creado:', path));
    watcher.on('change', path => {
      this.inventario()
      console.log('Archivo modificado:', path)
    });
    watcher.on('unlink', path => console.log('Archivo eliminado:', path));
  }


  create(createDbfReaderDto: CreateDbfReaderDto) {
    return 'This action adds a new dbfReader';
  }

  async seguimientoDto() {
    this.ventas()
    // this.ventas_por_items()
    return
    const ruta = 'Z:\\newdesar\\Winfac_nna\\Base\\movidcto.dbf';

    const dbf = await DBFFile.open(ruta)

    // console.log(dbf.recordCount)
    // console.log(dbf.fields)

    const seguimientoDto = await dbf.readRecords() as any as seguimientoDto[]

    const mapa = new Map<number, { vendedor: string, id: number }>()

    //seguimientodto es para saber a que vendedor pertenece la venta


    const vendedores = {
      22222222: "S/N",
      99999999: "MAXTIRE",
      44444444: "ANGELO",
      11111111: "CARLOS"
    }

    seguimientoDto.forEach(dto => {
      if (dto.TIPOMOVI.toUpperCase().trim() === "V") {
        console.log({ cliente: dto.CLIENTE, rut: dto.KCODCLIE, folio: Number(dto.KNUMDOCU), tipo: dto.TIPOMOVI, vendedor: vendedores[Number(dto.KNUMERUT)], vend: Number(dto.KNUMERUT) })

        mapa.set(Number(dto.KNUMDOCU), { vendedor: vendedores[Number(dto.KNUMERUT)], id: Number(dto.KNUMERUT) })
      }
    })

    console.log(mapa.size)

    return { message: "ok" }



  }

  async ventasDelDia(): Promise<ventasdiarias[]> {
    await this.ventas_por_items()
    await this.ventas()
    const result: ventasdiarias[] = []
    const r = this.clienteMap.get("s")?.direcciontes.forEach
    this.ventasMap.forEach(venta => {
      const fechaSinFormato = new Date(venta.fecha)
      const year = fechaSinFormato.getUTCFullYear();
      const month = fechaSinFormato.getUTCMonth();
      const day = fechaSinFormato.getUTCDate();
      const fechaChileUTC = new Date(Date.UTC(year, month, day, 4, 0, 0));
      if (fechaChileUTC.getFullYear() === new Date().getFullYear() &&
        fechaChileUTC.getMonth() === new Date().getMonth() &&
        fechaChileUTC.getDate() === new Date().getDate())
        result.push(venta)
    })
    return result

  }

  async ventas() {
    this.ventasMap.clear()
    // esto trae las ventas por total factura no items

    const ruta = 'Z:\\newdesar\\Winfac_nna\\docsve.dbf';

    const dbf = await DBFFile.open(ruta)

    // console.log(dbf.recordCount)
    // console.log(dbf.fields)

    const ventas = await dbf.readRecords() as any as venta[]

    await this.ventas_por_items()

    ventas.forEach(venta => {
      if (venta.DOCU.trim() === "201")
        this.ventasMap.set(venta.KNUMFOLI, {
          cliente: venta.CLIENTE.split(":")[1] !== undefined ? venta.CLIENTE.split(":")[1].trim() : venta.CLIENTE,
          estado: venta.ESTADO,
          fecha: venta.FECHA,
          hora: venta.HORACARGA,
          notaVenta: venta.KNUMFOLI,
          rut: venta.RUTEMP,
          items: this.ventas_por_items_map.get(venta.KNUMFOLI) ?? []
        })
      // console.log(
      //   {
      //     cliente: venta.CLIENTE.split(":")[1] !== undefined ? venta.CLIENTE.split(":")[1].trim() : venta.CLIENTE.split(":")[1],
      //     fecha: venta.FECHA,
      //     fecha_format: new Date(venta.FECHA),
      //     hora: venta.HORACARGA
      //   }
      // )
    })

    // console.log(this.ventasMap)
  }

  async clientes() {
    const ruta = 'Z:\\newdesar\\Winfac_nna\\Base\\clientes.dbf';

    const dbf = await DBFFile.open(ruta)
    const clientes = await dbf.readRecords() as any as cliente[]

    clientes.forEach(cliente => {
      // const d = this.direccionesMap.get(Number(cliente.RUTCLIEN.split("-")[0]))
      // console.log(d)


      if (!this.clienteMap.get(`${cliente.RUTCLIEN}`)) {
        this.clienteMap.set(cliente.RUTCLIEN, {
          ciudad: cliente.CIUDAD,
          cliente: cliente.NOMBRESS,
          rut: cliente.RUTCLIEN,
          codigo_cliente: cliente.KCODCLIE,
          direcciontes: []
        })
      }


      // console.log({
      //   cliente: cliente.NOMBRESS,
      //   rut: `${cliente.RUTCLIEN}-${cliente.DIGIVERI}`,
      //   ciudad: cliente.CIUDAD,
      //   pais: cliente.PAIS,
      // })
    })
    // console.log(this.clienteMap)
    await this.direccion()
    // console.log(this.direccionesMap)
    // console.log(this.direccionesMap.get(13873173))

    this.clienteMap.forEach(cliente => {
      // console.log(cliente.codigo_cliente, cliente.rut)
      const d = this.direccionesMap.get(cliente.codigo_cliente)

      cliente.direcciontes = [...d ?? []]
    })
    console.log(this.clienteMap)
  }

  async direccion(): Promise<direccion[]> {
    const ruta = 'Z:\\newdesar\\Winfac_nna\\Base\\direccio.dbf';

    const dbf = await DBFFile.open(ruta)
    const direcciones = await dbf.readRecords() as any as direccion[]
    direcciones.forEach(direccion => {

      if (this.direccionesMap.get(direccion.KCODCLIE)) {
        const d = this.direccionesMap.get(direccion.KCODCLIE)

        this.direccionesMap.set(direccion.KCODCLIE, [...d ?? [], { codigo_cliente: direccion.KCODCLIE, ciudad: direccion.NOMBCIUD, direccion: direccion.DESDIREC }])
      } else {
        this.direccionesMap.set(direccion.KCODCLIE, [{ codigo_cliente: direccion.KCODCLIE, ciudad: direccion.NOMBCIUD, direccion: direccion.DESDIREC }])
      }
    })
    return direcciones
  }

  async ventas_por_items() {
    this.ventas_por_items_map.clear()
    const ruta = 'Z:\\newdesar\\Winfac_nna\\Base\\itemdcto.dbf';

    const dbf = await DBFFile.open(ruta)
    const ventas_por_item = await dbf.readRecords() as any as venta_por_item[]
    //  "KNUMFOLI": "002810",
    //  "DOCUZOFR": "201",
    //  "KNUMDOCU": "000000013756",
    ventas_por_item.forEach(venta => {

      if (venta.DOCUZOFR.trim() === "201") {

        if (this.ventas_por_items_map.get(venta.KNUMFOLI)) {
          this.ventas_por_items_map.set(venta.KNUMFOLI, [...this.ventas_por_items_map.get(venta.KNUMFOLI)!, {
            cantidad: Number(venta.CANTSALI),
            codigo_unico: venta.CODUNICO,
            descripcion: venta.DESCRIP,
            folio: venta.KNUMDOCU,
            precio_total: Number(venta.TOTALREA),
            precio_und: Number(venta.PRECDOCD),
            visacion: venta.KNUMEZET,
          }])
        } else {
          this.ventas_por_items_map.set(venta.KNUMFOLI, [{
            cantidad: Number(venta.CANTSALI),
            codigo_unico: venta.CODUNICO,
            descripcion: venta.DESCRIP,
            folio: venta.KNUMDOCU,
            precio_total: Number(venta.TOTALREA),
            precio_und: Number(venta.PRECDOCD),
            visacion: venta.KNUMEZET,
          }])

        }


      }

      // console.log(
      //   {
      //     item: venta.DESCRIP,
      //     folio: Number(venta.KNUMFOLI),
      //     nv: Number(venta.KNUMDOCU),
      //     fecha: venta.FECHAITE,
      //     cantidad: venta.CANTSALI
      //   }
      // )

    })

  }


  async inventario(): Promise<dbf_inventario[]> {
    const dbf = await DBFFile.open(this.ruta)

    // console.log(dbf.recordCount)
    // console.log(dbf.fields)

    const records = await dbf.readRecords() as unknown as dbf_inventario[]
    // console.log(records)

    const contiene = ["S/M", "BV650I-MS", "NOTAS DE VENTAS", "C11CC24011"]
    const datos: dbf_inventario[] = []

    records.forEach(r => {

      if (!(contiene.includes(r.CODUNICO) || Number(r.STOCFISI) === 0))
        datos.push(r)
    })
    return datos
  }

  findOne(id: number) {
    return `This action returns a #${id} dbfReader`;
  }

  update(id: number, updateDbfReaderDto: UpdateDbfReaderDto) {
    return `This action updates a #${id} dbfReader`;
  }

  remove(id: number) {
    return `This action removes a #${id} dbfReader`;
  }
}
