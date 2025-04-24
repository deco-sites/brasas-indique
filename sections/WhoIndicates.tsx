import { ImageWidget } from "apps/admin/widgets.ts";
import WhoIndicatesIsland from "site/islands/WhoIndicatesIsland.tsx";

/* @titleBy icon */
interface SocialMedia {
  icon: string;
  link: string;
}

interface WhoIndicatesProps {
  titleInEnglish: string;
  titleInPortuguese: string;
  /**
   * @format rich-text
   */
  textInEnglish: string;
  /**
   * @format rich-text
   */
  textInPortuguese: string;
  boxTitleInEnglish: string;
  boxTitleInPortuguese: string;
  socialMediaIcons: SocialMedia[];
  bgImage: ImageWidget;
}

export default function WhoIndicates(props: WhoIndicatesProps) {
  return <WhoIndicatesIsland {...props} />;
}
