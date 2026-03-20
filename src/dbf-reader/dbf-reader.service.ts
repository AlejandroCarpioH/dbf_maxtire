import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateDbfReaderDto } from './dto/create-dbf-reader.dto';
import { UpdateDbfReaderDto } from './dto/update-dbf-reader.dto';
import * as chokidar from 'chokidar';
import * as path from 'path';
import { DBFFile } from 'dbffile';
import {
  cliente,
  clienteDTO,
  comprasZetas,
  dbf_inventario,
  direccion,
  direccionesDTO,
  items_por_venta,
  movimientoDocumento,
  neumatico_dto,
  seguimientoDto,
  venta,
  venta_diaria,
  venta_por_item,
  ventasdelDia,
  ventasDiarias,
  ventasDTO,
} from './types';

@Injectable()
export class DbfReaderService implements OnModuleInit {
  private ruta_base_maxtire = 'Z:\\newdesar\\Winfac_nna\\Base\\';
  private ruta_local = './data/Winfac_nna/Base/';

  valores_sin_folio = [
    "002546",
    "002548",
    "002550",
    "002558",
    "002551",
    "002552",
  ]
  private ruta = `${this.ruta_base_maxtire}inventar.dbf`;
  private ruta_test = 'Z:\\ale\\prueba.txt';
  private indexRut = new Map();
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
  private clienteMap = new Map<
    string,
    {
      cliente: string;
      rut: string;
      ciudad: string;
      codigo_cliente: number;
      digito_verificador: string
      // direcciontes: {
      //   direccion: string;
      //   ciudad: string;
      // }[];
    }
  >();
  private direccionesMap = new Map<
    number,
    {
      codigo_cliente: number;
      direccion: string;
      ciudad: string;
    }[]
  >();

  private ventasMap = new Map<
    string,
    {
      cliente: string;
      fecha: string;
      hora: string;
      rut: string;
      notaVenta: string;
      estado: string;
      folio: string
      total: number
      // items: {
      //   folio: string;
      //   codigo_unico: string;
      //   cantidad: number;
      //   precio_und: number;
      //   precio_total: number;
      //   visacion: string;
      //   descripcion: string;
      // }[];
    }
  >();


  private seguimientoMap = new Map<string,
    {
      cliente: string
      rut: string
      folio: string,
      tipo: string,
      vendedor: string,
      vend: string,
    }>()




  onModuleInit() {
    console.log('iniciado');
    this.watchDBF();
  }

  watchDBF() {
    const watcher = chokidar.watch(this.ruta, {
      usePolling: true,
      interval: 1000,
      ignoreInitial: true,
      awaitWriteFinish: true,
    });

    watcher.on('add', (path) => console.log('Archivo creado:', path));
    watcher.on('change', (path) => {
      this.inventario();
      console.log('Archivo modificado:', path);
    });
    watcher.on('unlink', (path) => console.log('Archivo eliminado:', path));
  }

  create(createDbfReaderDto: CreateDbfReaderDto) {
    return 'This action adds a new dbfReader';
  }

  async seguimientoDto() {
    const ruta = 'Z:\\newdesar\\Winfac_nna\\Base\\movidcto.dbf';

    const dbf = await DBFFile.open(ruta);

    // console.log(dbf.recordCount)
    // console.log(dbf.fields)

    const seguimientoDto = (await dbf.readRecords()) as any as seguimientoDto[];




    const mapa = new Map<number, { vendedor: string; id: number }>();

    //seguimientodto es para saber a que vendedor pertenece la venta

    const vendedores = {
      22222222: 'S/N',
      99999999: 'MAXTIRE',
      44444444: 'ANGELO',
      11111111: 'CARLOS',
    };

    seguimientoDto.forEach((dto) => {
      if (dto.TIPOMOVI.toUpperCase().trim() === 'V') {
        // console.log({
        //   cliente: dto.CLIENTE,
        //   rut: dto.KCODCLIE,
        //   folio: Number(dto.KNUMDOCU),
        //   tipo: dto.TIPOMOVI,
        //   vendedor: vendedores[Number(dto.KNUMERUT)],
        //   vend: Number(dto.KNUMERUT),
        // });
        // console.log(dto.KNUMDOCU)
        this.seguimientoMap.set(dto.KNUMDOCU, {
          cliente: dto.CLIENTE,
          folio: dto.KNUMDOCU,
          rut: dto.KCODCLIE ?? "",
          tipo: dto.TIPOMOVI,
          vendedor: vendedores[Number(dto.KNUMERUT)],
          vend: dto.KNUMERUT

        })
        // mapa.set(Number(dto.KNUMDOCU), {
        //   vendedor: vendedores[Number(dto.KNUMERUT)],
        //   id: Number(dto.KNUMERUT),
        // });
      }
    });

    // console.log(this.seguimientoMap);

    return { message: 'ok' };
  }

  async test() {
    // this.compraZetaTraspaso()
    return
    const movimientoDocumento = 'Z:\\newdesar\\Winfac_nna\\Base\\movidcto.dbf'; // trae cliente comprador o vendedor y documento total 
    const documentosSve = 'Z:\\newdesar\\Winfac_nna\\docsve.dbf';
    const clientes = 'Z:\\newdesar\\Winfac_nna\\Base\\clientes.dbf';
    const ventasPorItems = 'Z:\\newdesar\\Winfac_nna\\Base\\itemdcto.dbf'; // desde aqui tengo los items de los productos zeta la cantidad
    const direcciones = 'Z:\\newdesar\\Winfac_nna\\Base\\direccio.dbf';
    const productoZeta = 'Z:\\newdesar\\Winfac_nna\\Base\\prodzeta.dbf';// enrega todos los zetas por items
    const dbf = await DBFFile.open(movimientoDocumento);

    const ventas = await dbf.readRecords()

    ventas.forEach(v => {
      if (v["DOCUZOFR"] === "103") {
        console.log(v)
      }
    })
  }



  async ventasDelDia(): Promise<ventasdelDia[]> {

    this.ventas_por_items_map.clear();
    const ruta_ventas = 'Z:\\newdesar\\Winfac_nna\\Base\\itemdcto.dbf';
    const ruta_local = path.join(
      __dirname,
      '../../src/dbf-reader/data/Winfac_nna/Base/itemdcto.dbf',
    );

    const dbfs = await DBFFile.open(ruta_ventas);
    const ventas_por_item =
      (await dbfs.readRecords()) as any as venta_por_item[];

    //  "KNUMFOLI": "002810",
    //  "DOCUZOFR": "201",
    //  "KNUMDOCU": "000000013756",
    ventas_por_item.forEach((venta) => {
      if (venta.DOCUZOFR.trim() === '201') {
        if (this.ventas_por_items_map.get(venta.KNUMFOLI)) {
          this.ventas_por_items_map.set(venta.KNUMFOLI, [
            ...this.ventas_por_items_map.get(venta.KNUMFOLI)!,
            {
              cantidad: Number(venta.CANTSALI),
              codigo_unico: venta.CODUNICO,
              descripcion: venta.DESCRIP,
              folio: venta.KNUMDOCU,
              precio_total: Number(venta.TOTALREA),
              precio_und: Number(venta.PRECDOCD),
              visacion: venta.KNUMEZET,
              nota_venta: venta.KNUMFOLI
            },
          ]);
        } else {
          this.ventas_por_items_map.set(venta.KNUMFOLI, [
            {
              cantidad: Number(venta.CANTSALI),
              codigo_unico: venta.CODUNICO,
              descripcion: venta.DESCRIP,
              folio: venta.KNUMDOCU,
              precio_total: Number(venta.TOTALREA),
              precio_und: Number(venta.PRECDOCD),
              visacion: venta.KNUMEZET,
              nota_venta: venta.KNUMFOLI
            },
          ]);
        }


      }
    });
    await this.seguimientoDto()
    this.ventasMap.clear();
    // esto trae las ventas por total factura no items

    const ruta = 'Z:\\newdesar\\Winfac_nna\\docsve.dbf';

    const dbf = await DBFFile.open(ruta);

    const ventas = (await dbf.readRecords()) as any as venta[];

    ventas.forEach((venta) => {
      console.log(venta.KNUMFOLI)

      const ventaxitem = this.ventas_por_items_map.get(venta.KNUMFOLI)
      let rut = ""
      console.log(ventaxitem)
      const seguimiento = this.seguimientoMap.get(venta.KNUMFOLI)
      if (seguimiento) {
        rut = seguimiento.rut
      }
      let total = 0
      if (ventaxitem !== undefined) {
        ventaxitem.forEach(v => {
          total = total + v.precio_total
        })
      }

      if (venta.DOCU.trim() === '201' && (venta.ESTADO === "CONFIRMADO" || venta.ESTADO === "VISADO")) {
        this.ventasMap.set(venta.KNUMFOLI, {
          cliente:
            venta.CLIENTE.split(':')[1] !== undefined
              ? venta.CLIENTE.split(':')[1].trim()
              : venta.CLIENTE,
          estado: venta.ESTADO,
          fecha: venta.FECHA,
          hora: venta.HORACARGA,
          notaVenta: venta.KNUMFOLI,
          folio: this.valores_sin_folio.includes(venta.KNUMFOLI) ? this.numerosVisacion(venta.KNUMFOLI) : ventaxitem !== undefined ? ventaxitem[0].folio : "",
          total,
          rut,
        });
      }
    });


    const result: ventasdelDia[] = [];

    this.ventasMap.forEach((venta) => {
      const fechaSinFormato = new Date(venta.fecha);
      const year = fechaSinFormato.getUTCFullYear();
      const month = fechaSinFormato.getUTCMonth();
      const day = fechaSinFormato.getUTCDate();
      const fechaChileUTC = new Date(Date.UTC(year, month, day, 4, 0, 0));
      if (
        fechaChileUTC.getFullYear() === new Date().getFullYear() &&
        fechaChileUTC.getMonth() === new Date().getMonth() &&
        fechaChileUTC.getDate() === new Date().getDate()
      )
        result.push({ ...venta, items: this.ventas_por_items_map.get(venta.notaVenta) ?? [] });
    });


    return result;
  }
  numerosVisacion(number: string) {
    const valor = {
      "002546": "202500127660",
      "002548": "202500127633",
      "002550": "202500129407",
      "002558": "202500130551",
      "002551": "202500129259",
      "002552": "202500129301"
    }
    return valor[number]
  }

  async ventasDiarias() {
    this.ventas_por_items_map.clear();
    const ruta = 'Z:\\newdesar\\Winfac_nna\\Base\\itemdcto.dbf';
    const ruta_local = path.join(
      __dirname,
      '../../src/dbf-reader/data/Winfac_nna/Base/itemdcto.dbf',
    );

    const dbf = await DBFFile.open(ruta);
    const ventas_por_item =
      (await dbf.readRecords()) as any as venta_por_item[];
    //  "KNUMFOLI": "002810",
    //  "DOCUZOFR": "201",
    //  "KNUMDOCU": "000000013756",
    ventas_por_item.forEach((venta) => {
      if (venta.DOCUZOFR.trim() === '201') {
        if (this.ventas_por_items_map.get(venta.KNUMFOLI)) {
          this.ventas_por_items_map.set(venta.KNUMFOLI, [
            ...this.ventas_por_items_map.get(venta.KNUMFOLI)!,
            {
              cantidad: Number(venta.CANTSALI),
              codigo_unico: venta.CODUNICO,
              descripcion: venta.DESCRIP,
              folio: venta.KNUMDOCU,
              precio_total: Number(venta.TOTALREA),
              precio_und: Number(venta.PRECDOCD),
              visacion: venta.KNUMEZET,
              nota_venta: venta.KNUMFOLI
            },
          ]);
        } else {
          this.ventas_por_items_map.set(venta.KNUMFOLI, [
            {
              cantidad: Number(venta.CANTSALI),
              codigo_unico: venta.CODUNICO,
              descripcion: venta.DESCRIP,
              folio: venta.KNUMDOCU,
              precio_total: Number(venta.TOTALREA),
              precio_und: Number(venta.PRECDOCD),
              visacion: venta.KNUMEZET,
              nota_venta: venta.KNUMFOLI
            },
          ]);
        }


      }
    });

    console.log(this.ventas_por_items_map)
    const result: ventasDiarias[] = [];

    this.ventasMap.forEach((venta) => {

      const ventaDiaria: venta_diaria[] = []
      const data = this.ventas_por_items_map.get(venta.notaVenta)
      if (data) {
        data.forEach(d => {
          ventaDiaria.push({
            folio: d.folio,
            cantidad: d.cantidad,
            id_interno: d.codigo_unico,
            precio_total: d.precio_total,
            precio_unidad: d.precio_und
          })
        })

      }
      result.push({ ...venta, items: ventaDiaria.length > 0 ? ventaDiaria : [] });
    });


    return result;

  }

  async ventas() { // aqui se ingresan las ventas con los items por ventas
    this.seguimientoDto()
    // this.ventasDiarias()
    this.ventasMap.clear();
    // esto trae las ventas por total factura no items

    const ruta = 'Z:\\newdesar\\Winfac_nna\\docsve.dbf';
    const ruta_local = path.join(
      __dirname,
      '../../src/dbf-reader/data/Winfac_nna/docsve.dbf',
    );

    const dbf = await DBFFile.open(ruta);

    const ventas = (await dbf.readRecords()) as any as venta[];

    // ventas.forEach(v => {
    //   if (v.KNUMFOLI === "002558") {
    //     console.log(v)
    //   }
    // })



    await this.ventas_por_items();

    ventas.forEach((venta) => {
      const ventaxitem = this.ventas_por_items_map.get(venta.KNUMFOLI)
      let rut = ""



      let total = 0
      if (ventaxitem !== undefined) {
        ventaxitem.forEach(v => {
          total = total + v.precio_total
        })
        const seguimiento = this.seguimientoMap.get(ventaxitem[0].folio)
        // console.log(ventaxitem[0].folio)
        if (seguimiento) {
          rut = seguimiento.rut
        }
      }

      if (venta.DOCU.trim() === '201' && (venta.ESTADO === "CONFIRMADO" || venta.ESTADO === "VISADO")) {

        this.ventasMap.set(venta.KNUMFOLI, {
          cliente:
            venta.CLIENTE.split(':')[1] !== undefined
              ? venta.CLIENTE.split(':')[1].trim()
              : venta.CLIENTE,
          estado: venta.ESTADO,
          fecha: venta.FECHA,
          hora: venta.HORACARGA,
          notaVenta: venta.KNUMFOLI,
          folio: this.valores_sin_folio.includes(venta.KNUMFOLI) ? this.numerosVisacion(venta.KNUMFOLI) : ventaxitem !== undefined ? ventaxitem[0].folio : "",
          total,
          rut,
        });
      }
    });

    // this.ventasMap.forEach(venta => {
    //   // if (venta.folio === "000000012939") {
    //   console.log(venta)
    //   // }
    // })

    // return


    const ventasdto: ventasDTO[] = []
    this.ventasMap.forEach(venta => {

      const ventaDiaria: venta_diaria[] = []
      const data = this.ventas_por_items_map.get(venta.notaVenta)
      if (data) {
        data.forEach(d => {
          ventaDiaria.push({
            folio: d.folio,
            cantidad: d.cantidad,
            id_interno: d.codigo_unico,
            precio_total: Math.round(d.precio_total),
            precio_unidad: Math.round(d.precio_und)
          })
        })

      }


      const fechaSinFormato = new Date(venta.fecha);
      const year = fechaSinFormato.getUTCFullYear();
      const month = fechaSinFormato.getUTCMonth();
      const day = fechaSinFormato.getUTCDate();
      const fechaChileUTC = new Date(Date.UTC(year, month, day, 4, 0, 0));


      ventasdto.push(
        {
          fecha: fechaChileUTC,
          folio: venta.folio,
          nota_venta: venta.notaVenta,
          total: Math.round(venta.total),
          rut: venta.rut,
          items: ventaDiaria

        })
    })
    ventasdto.forEach(v => {
      console.log({
        fecha: v.fecha,
        folio: v.folio,
        nota_venta: v.nota_venta,
        total: v.total,
        rut: v.rut,
        items: [
          ...v.items
        ]

      })
    })


    const data = await fetch('http://localhost:3010/ventas/createAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ventasdto),
    });
    const result = await data.text();
    return result;
    // this.ventasMap.forEach((venta) => {
    //   const fechaSinFormato = new Date(venta.fecha);
    //   const year = fechaSinFormato.getUTCFullYear();
    //   const month = fechaSinFormato.getUTCMonth();
    //   const day = fechaSinFormato.getUTCDate();
    //   const fechaChileUTC = new Date(Date.UTC(year, month, day, 4, 0, 0));
    //   // if (
    //   //   fechaChileUTC.getFullYear() === 2026 &&
    //   //   fechaChileUTC.getMonth() === 1 &&
    //   //   fechaChileUTC.getDate() === 17
    //   // ) {
    //   //   console.log(venta);
    //   // }
    // });
  }

  async clientes() {
    const ruta = 'Z:\\newdesar\\Winfac_nna\\Base\\clientes.dbf';
    const ruta_local = path.join(
      __dirname,
      '../../src/dbf-reader/data/Winfac_nna/Base/clientes.dbf',
    );
    // const ruta_local = `${__dirname}/data/Winfac_nna/Base/clientes.dbf`;

    const dbf = await DBFFile.open(ruta);
    const clientes = (await dbf.readRecords()) as any as cliente[];


    this.clienteMap.clear()
    clientes.forEach((cliente) => {
      // const d = this.direccionesMap.get(Number(cliente.RUTCLIEN.split("-")[0]))
      // console.log(d)

      // if (!this.clienteMap.get(`${cliente.RUTCLIEN}`)) {
      this.clienteMap.set(cliente.RUTCLIEN, {
        ciudad: cliente.CIUDAD,
        cliente: cliente.NOMBRESS,
        rut: cliente.RUTCLIEN,
        digito_verificador: cliente.DIGIVERI,
        codigo_cliente: cliente.KCODCLIE,
        // direcciontes: [],
      });
      // }

      // console.log({
      //   cliente: cliente.NOMBRESS,
      //   rut: `${cliente.RUTCLIEN}-${cliente.DIGIVERI}`,
      //   ciudad: cliente.CIUDAD,
      //   pais: cliente.PAIS,
      // })
    });
    // console.log(this.clienteMap)
    // await this.direccion();
    // console.log(this.direccionesMap)
    // console.log(this.direccionesMap.get(13873173))
    const clientes_: clienteDTO[] = [];
    this.clienteMap.forEach((clienteData) => {
      clientes_.push({
        nombre: clienteData.cliente.trim(),
        rut: clienteData.rut.trim(),
        ciudad: clienteData.ciudad.trim(),
        codigo_cliente: clienteData.codigo_cliente,
        digito_verificador: clienteData.digito_verificador.trim()
      });
    });
    const data = await fetch('http://localhost:3010/clientes/createAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientes_),
    });
    const result = await data.text();
    return result;
    // console.log(this.clienteMap);
  }

  async direccion() {
    this.direccionesMap.clear();
    const ruta = 'Z:\\newdesar\\Winfac_nna\\Base\\direccio.dbf';
    const ruta_local = path.join(
      __dirname,
      '../../src/dbf-reader/data/Winfac_nna/Base/direccio.dbf',
    );

    const dbf = await DBFFile.open(ruta);
    const direcciones = (await dbf.readRecords()) as any as direccion[];
    direcciones.forEach((direccion) => {
      if (this.direccionesMap.get(direccion.KCODCLIE)) {
        const d = this.direccionesMap.get(direccion.KCODCLIE);

        this.direccionesMap.set(direccion.KCODCLIE, [
          ...(d ?? []),
          {
            codigo_cliente: direccion.KCODCLIE,
            ciudad: direccion.NOMBCIUD,
            direccion: direccion.DESDIREC,
          },
        ]);
      } else {
        this.direccionesMap.set(direccion.KCODCLIE, [
          {
            codigo_cliente: direccion.KCODCLIE,
            ciudad: direccion.NOMBCIUD,
            direccion: direccion.DESDIREC,
          },
        ]);
      }
    });

    const direcciones_: [direccionesDTO[]] = [[]];

    this.direccionesMap.forEach((direccionesData) => {
      direcciones_.push([...direccionesData]);
    });

    const data = await fetch('http://localhost:3010/direcciones/createAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(direcciones_),
    });
    const result = await data.text();
    return result;
  }

  async ventas_por_items() {
    this.ventas_por_items_map.clear();
    const ruta = 'Z:\\newdesar\\Winfac_nna\\Base\\itemdcto.dbf';
    const ruta_local = path.join(
      __dirname,
      '../../src/dbf-reader/data/Winfac_nna/Base/itemdcto.dbf',
    );

    const dbf = await DBFFile.open(ruta);
    const ventas_por_item =
      (await dbf.readRecords()) as any as venta_por_item[];
    //  "KNUMFOLI": "002810",
    //  "DOCUZOFR": "201",
    //  "KNUMDOCU": "000000013756",
    ventas_por_item.forEach((venta) => {
      if (venta.DOCUZOFR.trim() === '201') {
        if (this.ventas_por_items_map.get(venta.KNUMFOLI)) {
          this.ventas_por_items_map.set(venta.KNUMFOLI, [
            ...this.ventas_por_items_map.get(venta.KNUMFOLI)!,
            {
              cantidad: Number(venta.CANTSALI),
              codigo_unico: venta.CODUNICO,
              descripcion: venta.DESCRIP,
              folio: venta.KNUMDOCU,
              precio_total: Number(venta.TOTALREA),
              precio_und: Number(venta.PRECDOCD),
              visacion: venta.KNUMEZET,
              nota_venta: venta.KNUMFOLI
            },
          ]);
        } else {
          this.ventas_por_items_map.set(venta.KNUMFOLI, [
            {
              cantidad: Number(venta.CANTSALI),
              codigo_unico: venta.CODUNICO,
              descripcion: venta.DESCRIP,
              folio: venta.KNUMDOCU,
              precio_total: Number(venta.TOTALREA),
              precio_und: Number(venta.PRECDOCD),
              visacion: venta.KNUMEZET,
              nota_venta: venta.KNUMFOLI
            },
          ]);
        }


      }
    });

    // console.log(this.ventas_por_items_map)
    // return
    const items_por_venta: items_por_venta[] = []


    this.ventas_por_items_map.forEach((ventas) => {
      for (let venta of ventas) {
        items_por_venta.push({
          cantidad: venta.cantidad,
          codigo_unico: venta.codigo_unico,
          descripcion: venta.descripcion,
          nota_venta: venta.nota_venta,
          precio_total: Math.round(venta.precio_total),
          precio_und: Math.round(venta.precio_und),
          visacion: venta.visacion
        })
      }
    });

    const data = await fetch('http://localhost:3010/items-ventas-winfac/createAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items_por_venta),
    });
    const result = await data.text();
    return result;
  }

  async inventario(): Promise<dbf_inventario[]> {
    const dbf = await DBFFile.open(this.ruta);

    // console.log(dbf.recordCount)
    // console.log(dbf.fields)

    const records = (await dbf.readRecords()) as unknown as dbf_inventario[];
    // console.log(records)

    const contiene = ['S/M', 'BV650I-MS', 'NOTAS DE VENTAS', 'C11CC24011'];
    const datos: dbf_inventario[] = [];

    records.forEach((r) => {
      if (!(contiene.includes(r.CODUNICO) || Number(r.STOCFISI) === 0))
        datos.push(r);
    });
    return datos;
  }

  async neumaticos(): Promise<neumatico_dto[]> {
    const dbf = await DBFFile.open(this.ruta);

    // console.log(dbf.recordCount)
    // console.log(dbf.fields)
    //
    const records = (await dbf.readRecords()) as unknown as dbf_inventario[];
    // console.log(records)

    const contiene = ['S/M', 'BV650I-MS', 'NOTAS DE VENTAS', 'C11CC24011'];
    const datos: dbf_inventario[] = [];
    const neumaticos: neumatico_dto[] = []
    const modelos: { codigo: string, detalle: string }[] = []
    records.forEach((r) => {
      if (!(contiene.includes(r.CODUNICO) || Number(r.STOCFISI) === 0))
        if (!modelos.some(m => m.codigo === r.CODUNICO))
          datos.push(r)

      // if (!(contiene.includes(r.CODUNICO) || Number(r.STOCFISI) === 0))
      //   datos.push(r);
    });
    datos.forEach(d => {
      neumaticos.push({ id_interno_completo: d.CODUNICO })
    })
    return neumaticos;
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
