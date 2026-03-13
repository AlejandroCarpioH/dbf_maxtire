import { PartialType } from '@nestjs/mapped-types';
import { CreateDbfReaderDto } from './create-dbf-reader.dto';

export class UpdateDbfReaderDto extends PartialType(CreateDbfReaderDto) {}
