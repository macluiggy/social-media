import { HfInference } from '@huggingface/inference';
import AiStrategy from './ai-strategy';
import envVariables from '../../common/envVariables';

export default class HuggingFaceStrategy implements AiStrategy {
  private hfInference: HfInference;
  constructor() {
    this.hfInference = new HfInference(envVariables.huggingFaceApiKey);
  }
  // later add the constructor to add the configuration from google to add the api key
  async createCompletion(prompt: string): Promise<string> {
    return `HuggingFace: ${prompt}`;
  }
}
