import IaStrategy from './ai-strategy';

export default class Context {
  private strategy: IaStrategy;

  constructor(strategy: IaStrategy) {
    this.strategy = strategy;
  }

  async generateCompletion(prompt: string): Promise<string> {
    return this.strategy.generateCompletion(prompt);
  }
}
