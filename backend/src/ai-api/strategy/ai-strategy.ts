export default interface AiStrategy {
  generateCompletion(prompt: string): Promise<string>;
}
