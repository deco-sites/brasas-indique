import { useSelectLanguage } from "site/sdk/language.ts";
import IconSend from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/send.tsx";
import IconHeartFilled from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/heart-filled.tsx";

export default function HaveQuestionsIsland(props) {
  const { selectedLanguage } = useSelectLanguage();

  const ICONS = {
    "send": IconSend,
    "heart": IconHeartFilled,
  };
  return (
    <section className="flex justify-center bg-purple-500">
      <div className="flex flex-col gap-12 items-center max-w-[88.5rem] px-9 w-full py-16">
        <span
          className="font-bold text-4xl text-white"
          dangerouslySetInnerHTML={{
            __html: selectedLanguage.value === "ptBr"
              ? props.titleInPortuguese
              : props.titleInEnglish,
          }}
        >
        </span>

        <div className="relative flex flex-col gap-8 xl:gap-16 xl:flex-row">
          <div className="hidden xl:flex bg-white h-1 w-[calc(100%-((33rem/2)+24px)*2)] absolute top-6 -translate-y-1/2 left-1/2 -translate-x-1/2">
          </div>
          {props.cards.map((card, index) => {
            const IconComponent = ICONS[card.icon.toLowerCase()];
            if (!IconComponent) return null;

            return (
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="relative flex shrink-0 items-center justify-center w-12 h-12 border-4 border-white rounded-full bg-transparent">
                  <span className="text-white font-bold text-2xl">
                    {index + 1}
                  </span>
                  {
                    /*
                  <div className="bg-white h-1 w-[calc((528px/2)-20px)] absolute top-1/2 -translate-y-1/2 right-0 translate-x-full">
                  </div>*/
                  }
                </div>
                <div className="h-full flex flex-col gap-4 items-center justify-center pt-8 px-8 pb-9 rounded-3xl bg-green-100 text-black-500 max-w-[33rem]">
                  <IconComponent className="w-10 h-10 text-purple-500" />
                  <span className="font-bold text-2xl">
                    {selectedLanguage.value === "ptBr"
                      ? card.titleInPortuguese
                      : card.titleInEnglish}
                  </span>
                  <span className="text-center text-base font-normal">
                    {selectedLanguage.value === "ptBr"
                      ? card.textInPortuguese
                      : card.textInEnglish}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
