import AiStrategy from './ai-strategy';

export default class Context implements AiStrategy {
  private strategy: AiStrategy;

  constructor(strategy: AiStrategy) {
    this.strategy = strategy;
  }

  async createCompletion(prompt: string): Promise<string> {
    return this.strategy.createCompletion(prompt);
  }

  setStrategy(strategy: AiStrategy) {
    this.strategy = strategy;
  }
}
