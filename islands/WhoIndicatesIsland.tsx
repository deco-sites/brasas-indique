import IconBrandWhatsapp from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/brand-whatsapp.tsx";
import IconMailFilled from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/mail-filled.tsx";
import IconBrandFacebookFilled from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/brand-facebook-filled.tsx";
import { useSelectLanguage } from "site/sdk/language.ts";
import Image from "apps/website/components/Image.tsx";

export default function WhoIndicatesIsland(props) {
  const { selectedLanguage } = useSelectLanguage();

  const ICONS = {
    "whatsapp": IconBrandWhatsapp,
    "email": IconMailFilled,
    "facebook": IconBrandFacebookFilled,
  };

  return (
    <section className="relative flex justify-center">
      <Image
        src={props.bgImage}
        alt="Background"
        className="flex xl:hidden absolute bottom-0 right-4"
      />
      <div className="flex flex-col gap-10 max-w-[88.5rem] px-9 w-full pt-20 pb-56 xl:pb-16">
        <span className="text-6xl font-black text-black-500 text-center">
          {selectedLanguage.value === "ptBr"
            ? props.titleInPortuguese
            : props.titleInEnglish}
        </span>
        <div className="flex flex-col items-center xl:flex-row gap-10 xl:gap-20">
          <span
            className="text-center xl:text-left text-black-500 text-2xl"
            dangerouslySetInnerHTML={{
              __html: selectedLanguage.value === "ptBr"
                ? props.textInPortuguese
                : props.textInEnglish,
            }}
          >
          </span>
          <div className="flex flex-col items-center xl:items-start gap-8 border border-blue-300 text-blue-300 p-10 rounded-[30px]">
            <span className="text-center xl:text-left font-black text-2xl">
              {selectedLanguage.value === "ptBr"
                ? props.boxTitleInPortuguese
                : props.boxTitleInEnglish}
            </span>
            <div className="flex gap-4 items-center ">
              {props.socialMediaIcons.map((socialMedia) => {
                const IconComponent = ICONS[socialMedia.icon.toLowerCase()];
                if (!IconComponent) return null;

                return (
                  <a
                    key={socialMedia.icon}
                    href={socialMedia.link}
                    target="_blank"
                  >
                    <IconComponent className="w-8 h-8" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
