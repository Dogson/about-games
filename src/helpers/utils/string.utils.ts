import AppConfig from "../../config/app.config.ts";

export const isStringRegexp = (value: string): boolean => {
  try {
    new RegExp(value);
    return true;
  } catch {
    return false;
  }
};

export const normalizeGameCandidateAIPrompt = (
  prompt: string | undefined,
): string | undefined => {
  const trimmed = prompt?.trim() ?? "";
  if (
    !trimmed ||
    trimmed === AppConfig.channelForm.gameCandidateAIPromptDefault.trim()
  ) {
    return undefined;
  }
  return trimmed;
};
