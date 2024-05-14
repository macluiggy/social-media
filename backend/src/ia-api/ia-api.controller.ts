import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IaApiService } from './ia-api.service';
import { CreateIaApiDto } from './dto/create-ia-api.dto';
import { UpdateIaApiDto } from './dto/update-ia-api.dto';

@Controller('ia-api')
export class IaApiController {
  constructor(private readonly iaApiService: IaApiService) {}

  @Post()
  create(@Body() createIaApiDto: CreateIaApiDto) {
    return this.iaApiService.create(createIaApiDto);
  }

  @Get()
  findAll() {
    return this.iaApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iaApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIaApiDto: UpdateIaApiDto) {
    return this.iaApiService.update(+id, updateIaApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iaApiService.remove(+id);
  }
}
