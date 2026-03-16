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

@Controller('dbf-reader')
export class DbfReaderController {
  constructor(private readonly dbfReaderService: DbfReaderService) {}

  @Get('ventas')
  ventas(): any {
    return this.dbfReaderService.ventas();
  }

  @Get('ventasDelDia')
  async ventasDelDia() {
    return await this.dbfReaderService.ventasDelDia();
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

  @Get('clientes')
  clientes() {
    return this.dbfReaderService.clientes();
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
