import { signal } from "@preact/signals";

const selectedLanguage = signal("ptBr");

const state = {
  selectedLanguage,
};

export const useSelectLanguage = () => state;
