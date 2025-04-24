import { ImageWidget } from "apps/admin/widgets.ts";
import ReferAndEarnPageBannerIsland from "site/islands/ReferAndEarnPageBannerIsland.tsx";

interface Image {
  image: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

interface ReferAndEarnPageBannerProps {
  background: Image;
  centeredImage: Image;
}

export default function ReferAndEarnPageBanner(
  props: ReferAndEarnPageBannerProps,
) {
  return <ReferAndEarnPageBannerIsland {...props} />;
}
