import AiStrategy from './ai-strategy';

export default class HuggingFaceStrategy implements AiStrategy {
  // later add the constructor to add the configuration from google to add the api key
  async createCompletion(prompt: string): Promise<string> {
    return `HuggingFace: ${prompt}`;
  }
}
