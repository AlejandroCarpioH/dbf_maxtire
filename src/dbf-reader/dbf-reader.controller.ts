import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DbfReaderService } from './dbf-reader.service';
import { CreateDbfReaderDto } from './dto/create-dbf-reader.dto';
import { UpdateDbfReaderDto } from './dto/update-dbf-reader.dto';

@Controller('dbf-reader')
export class DbfReaderController {
  constructor(private readonly dbfReaderService: DbfReaderService) { }

  @Get("ventasDelDia")
  async ventasDelDia() {
    return await this.dbfReaderService.ventasDelDia()
  }
  @Post()
  create(@Body() createDbfReaderDto: CreateDbfReaderDto) {
    return this.dbfReaderService.create(createDbfReaderDto);
  }
  @Get("inventario")
  inventario() {
    return this.dbfReaderService.inventario();
  }
  @Get("ventas")
  seguimientoDto(): any {
    return this.dbfReaderService.seguimientoDto()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dbfReaderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDbfReaderDto: UpdateDbfReaderDto) {
    return this.dbfReaderService.update(+id, updateDbfReaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dbfReaderService.remove(+id);
  }
}
