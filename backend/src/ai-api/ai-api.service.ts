import { Injectable } from '@nestjs/common';
import AiStrategy from './strategy/ai-strategy';
import Context from './strategy/context';
import GeminiStrategy from './strategy/gemini.strategy';
// import { CreateAiApiDto } from './dto/create-ai-api.dto';
// import { UpdateAiApiDto } from './dto/update-ai-api.dto';

@Injectable()
export class AiApiService implements AiStrategy {
  private context: Context;

  constructor() {
    this.context = new Context(new GeminiStrategy());
  }

  setStrategy(strategy: AiStrategy) {
    this.context.setStrategy(strategy);
  }
  generateCompletion(prompt: string): Promise<string> {
    return this.context.generateCompletion(prompt);
  }
  // create(createAiApiDto: CreateAiApiDto) {
  //   return 'This action adds a new aiApi';
  // }
  // findAll() {
  //   return `This action returns all aiApi`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} aiApi`;
  // }
  // update(id: number, updateAiApiDto: UpdateAiApiDto) {
  //   return `This action updates a #${id} aiApi`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} aiApi`;
  // }
}
