import HaveQuestionsIsland from "site/islands/HaveQuestionsIsland.tsx";

/**
 * @titleBy titleInPortuguese
 */
interface Card {
  icon: string;
  titleInEnglish: string;
  titleInPortuguese: string;
  textInEnglish: string;
  textInPortuguese: string;
}

interface HaveQuestionsProps {
  /**
   * @format rich-text
   */
  titleInEnglish: string;
  /**
   * @format rich-text
   */
  titleInPortuguese: string;
  cards: Card[];
}

export default function HaveQuestions(props: HaveQuestionsProps) {
  return <HaveQuestionsIsland {...props} />;
}
