import { Module } from '@nestjs/common';
import { DbfReaderService } from './dbf-reader.service';
import { DbfReaderController } from './dbf-reader.controller';
import { DbfReaderIngresoComprasService } from './dbf-reader-ingreso-compras.service';

@Module({
  controllers: [DbfReaderController],
  providers: [DbfReaderService, DbfReaderIngresoComprasService],
})
export class DbfReaderModule { }
