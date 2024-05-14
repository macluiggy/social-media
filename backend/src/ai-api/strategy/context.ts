import AiStrategy from './ai-strategy';

export default class Context implements AiStrategy {
  private strategy: AiStrategy;

  constructor(strategy: AiStrategy) {
    this.strategy = strategy;
  }

  async generateCompletion(prompt: string): Promise<string> {
    return this.strategy.generateCompletion(prompt);
  }

  setStrategy(strategy: AiStrategy) {
    this.strategy = strategy;
  }
}
