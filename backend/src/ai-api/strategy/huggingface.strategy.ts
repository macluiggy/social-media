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
    // let out = '';
    // for await (const chunk of this.hfInference.chatCompletionStream({
    //   model: 'mistralai/Mistral-7B-Instruct-v0.2',
    //   messages: [
    //     {
    //       role: 'user',
    //       content: 'Complete the equation 1+1= ,just the answer',
    //     },
    //   ],
    //   max_tokens: 500,
    //   temperature: 0.1,
    //   seed: 0,
    // })) {
    //   if (chunk.choices && chunk.choices.length > 0) {
    //     out += chunk.choices[0].delta.content;
    //     console.log(out);
    //   }
    // }
    const response = await this.hfInference.textGeneration({
      inputs: prompt,
    });
    const responseText = response.generated_text;

    return responseText;
  }
}
