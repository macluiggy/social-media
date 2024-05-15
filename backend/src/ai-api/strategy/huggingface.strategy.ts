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
  async chatCompletion({ prompt }: { prompt: string }) {
    const out = await this.hfInference.chatCompletion({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.1,
      seed: 0,
    });

    const outputResponse = out.choices[0].message.content;
    return {
      outputResponse,
    };
  }
}
