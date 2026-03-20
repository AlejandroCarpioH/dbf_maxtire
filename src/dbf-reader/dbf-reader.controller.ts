import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DbfReaderService } from './dbf-reader.service';
import { CreateDbfReaderDto } from './dto/create-dbf-reader.dto';
import { UpdateDbfReaderDto } from './dto/update-dbf-reader.dto';
import { DbfReaderIngresoComprasService } from './dbf-reader-ingreso-compras.service';

@Controller('dbf-reader')
export class DbfReaderController {
  constructor(
    private readonly dbfReaderService: DbfReaderService,
    private readonly dbfReaderIngresoComprasService: DbfReaderIngresoComprasService
  ) { }

  @Get('ventas')
  ventas(): any {
    return this.dbfReaderService.ventas();
  }

  @Get('comprasInit')
  initCompras() {
    return this.dbfReaderIngresoComprasService.init();
  }

  @Get('ventasDelDia')
  async ventasDelDia() {
    return await this.dbfReaderService.ventasDelDia();
  }

  @Get('ventasDiarias')
  async ventasDiarias() {
    return await this.dbfReaderService.ventasDiarias();
  }

  @Get('seguimientoVenta')
  async seguimientoVenta() {
    return await this.dbfReaderService.seguimientoDto();
  }

  @Get('ventasPorItems')
  async ventasPorItems() {
    return await this.dbfReaderService.ventas_por_items();
  }
  @Post()
  create(@Body() createDbfReaderDto: CreateDbfReaderDto) {
    return this.dbfReaderService.create(createDbfReaderDto);
  }

  @Get('inventario')
  inventario() {
    return this.dbfReaderService.inventario();
  }

  @Get('neumaticos')
  neumaticos() {
    return this.dbfReaderService.neumaticos();
  }

  @Get('movimientoDocumento')
  movimientoDocumento() {
    return this.dbfReaderIngresoComprasService.compraZetaTraspaso();
  }


  @Get('clientes')
  clientes() {
    return this.dbfReaderService.clientes();
  }

  @Get('test')
  test() {
    return this.dbfReaderService.test();
  }

  @Get('direcciones')
  direcciones() {
    return this.dbfReaderService.direccion();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dbfReaderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDbfReaderDto: UpdateDbfReaderDto,
  ) {
    return this.dbfReaderService.update(+id, updateDbfReaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dbfReaderService.remove(+id);
  }
}
