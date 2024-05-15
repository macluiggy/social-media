import { HfInference } from '@huggingface/inference';
import AiStrategy from './ai-strategy';
import envVariables from '../../common/envVariables';
const { huggingFaceApiKey } = envVariables;

// const huggingFaceApiKey = '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';

export default class HuggingFaceStrategy implements AiStrategy {
  private hfInference: HfInference;
  constructor() {
    console.log(huggingFaceApiKey);
    this.hfInference = new HfInference(huggingFaceApiKey);
  }
  // later add the constructor to add the configuration from google to add the api key
  async createCompletion(prompt: string): Promise<string> {
    const response = await this.hfInference.textGeneration({
      inputs: prompt,
    });
    const responseText = response.generated_text;

    return responseText;
  }
}
