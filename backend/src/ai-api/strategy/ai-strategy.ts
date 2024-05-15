export default interface AiStrategy {
  chatCompletion({ prompt }: { prompt: string }): Promise<{
    outputResponse: string;
  }>;
}
