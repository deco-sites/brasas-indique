import { useSelectLanguage } from "site/sdk/language.ts";

export default function RegulationTextIsland(props) {
  const { selectedLanguage } = useSelectLanguage();

  return (
    <section className="flex justify-center py-10">
      <div className="w-full max-w-[88.5rem] px-9">
        <span
          className="text-center text-black-500 font-normal text-base"
          dangerouslySetInnerHTML={{
            __html: selectedLanguage.value === "ptBr"
              ? props.textInPortuguese
              : props.textInEnglish,
          }}
        >
        </span>
      </div>
    </section>
  );
}
