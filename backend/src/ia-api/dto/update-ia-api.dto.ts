import { PartialType } from '@nestjs/swagger';
import { CreateIaApiDto } from './create-ia-api.dto';

export class UpdateIaApiDto extends PartialType(CreateIaApiDto) {}
