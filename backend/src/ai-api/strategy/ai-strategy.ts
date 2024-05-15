export default interface AiStrategy {
  createCompletion(prompt: string): Promise<string>;
}
