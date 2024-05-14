import { Injectable } from '@nestjs/common';
import { CreateAiApiDto } from './dto/create-ai-api.dto';
import { UpdateAiApiDto } from './dto/update-ai-api.dto';

@Injectable()
export class AiApiService {
  create(createAiApiDto: CreateAiApiDto) {
    return 'This action adds a new aiApi';
  }

  findAll() {
    return `This action returns all aiApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiApi`;
  }

  update(id: number, updateAiApiDto: UpdateAiApiDto) {
    return `This action updates a #${id} aiApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiApi`;
  }
}
