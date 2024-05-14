import AiStrategy from './ai-strategy';

export default class GeminiStrategy implements AiStrategy {
  // later add the constructor to add the configuration from google to add the api key
  async generateCompletion(prompt: string): Promise<string> {
    return `Gemini: ${prompt}`;
  }
}
