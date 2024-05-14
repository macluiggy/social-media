import { Injectable } from '@nestjs/common';
import { CreateIaApiDto } from './dto/create-ia-api.dto';
import { UpdateIaApiDto } from './dto/update-ia-api.dto';

@Injectable()
export class IaApiService {
  create(createIaApiDto: CreateIaApiDto) {
    return 'This action adds a new iaApi';
  }

  findAll() {
    return `This action returns all iaApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iaApi`;
  }

  update(id: number, updateIaApiDto: UpdateIaApiDto) {
    return `This action updates a #${id} iaApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} iaApi`;
  }
}
