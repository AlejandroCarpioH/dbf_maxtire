import { Module } from '@nestjs/common';
import { DbfWhatcherServiceService } from './dbf-whatcher-service/dbf-whatcher-service.service';
import { DbfWhatcherServiceController } from './dbf-whatcher-service/dbf-whatcher-service.controller';
import { DbfReaderModule } from './dbf-reader/dbf-reader.module';

@Module({
  imports: [DbfReaderModule],
  controllers: [DbfWhatcherServiceController],
  providers: [],
})
export class AppModule { }
