import RegulationTextIsland from "site/islands/RegulationTextIsland.tsx";

interface RegulationTextProps {
  /**
   * @format rich-text
   */
  textInEnglish: string;
  /**
   * @format rich-text
   */
  textInPortuguese: string;
}

export default function RegulationText(props: RegulationTextProps) {
  return <RegulationTextIsland {...props} />;
}
