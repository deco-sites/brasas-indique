import Image from "apps/website/components/Image.tsx";

export default function ReferAndEarnPageBannerIsland(props) {
  return (
    <section className="flex w-full h-[35.8rem] relative">
      <Image
        src={props.background.image}
        alt={props.background.alt}
        width={props.background.width}
        height={props.background.height}
        className="w-full object-cover"
      />
      <Image
        src={props.centeredImage.image}
        alt={props.centeredImage.alt}
        width={props.centeredImage.width}
        height={props.centeredImage.height}
        className="object-contain absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25rem] sm:w-[35rem]"
      />

      <a
        href="https://hub.brasas.com"
        target="_self"
        className="absolute top-4 right-4 bg-purple-500 rounded-md px-4 py-2 flex gap-4 items-center justify-center text-white hover:scale-105 transition-all transform duration-300"
      >
        <img src="/hub-icon.svg" alt="Hub Icon" className="" />
        Back to hub
      </a>
    </section>
  );
}
