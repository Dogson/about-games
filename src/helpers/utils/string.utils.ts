export const isStringRegexp = (value: string): boolean => {
  try {
    new RegExp(value);
    return true;
  } catch {
    return false;
  }
};

export const normalizeAdditionalGameCandidateAIPrompt = (
  prompt: string | undefined,
): string | undefined => {
  const trimmed = prompt?.trim() ?? "";
  return trimmed || undefined;
};
