export default interface IaStrategy {
  generateCompletion(prompt: string): Promise<string>;
}
