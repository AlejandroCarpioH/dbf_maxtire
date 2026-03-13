import { Module } from '@nestjs/common';
import { DbfReaderService } from './dbf-reader.service';
import { DbfReaderController } from './dbf-reader.controller';

@Module({
  controllers: [DbfReaderController],
  providers: [DbfReaderService],
})
export class DbfReaderModule {}
