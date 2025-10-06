import IconBrandWhatsapp from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/brand-whatsapp.tsx";
import IconMailFilled from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/mail-filled.tsx";
import IconBrandFacebookFilled from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/brand-facebook-filled.tsx";
import IconCopy from "https://deno.land/x/tabler_icons_tsx@0.0.7/tsx/copy.tsx";
import { useSelectLanguage } from "site/sdk/language.ts";
import Image from "apps/website/components/Image.tsx";
import { useEffect, useState } from "preact/hooks";
import { getExternalId, getUserEmail, makeLogin } from "site/services/users.ts";

declare global {
  interface Window {
    LayersPortalOptions?: {
      appId: string;
      insidePortalOnly?: boolean;
      manualLoadingControl?: boolean;
    };
    LayersPortal?: any;
  }
}

export default function WhoIndicatesIsland(props) {
  const { selectedLanguage } = useSelectLanguage();
  const [finalExternalId, setFinalExternalId] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  {
    /*
  useEffect(() => {
    //Define os cookies
    document.cookie =
      "_your_app_session=layers_cookie; SameSite=None; Secure; Path=/;";

    // Define as opções no window
    window.LayersPortalOptions = {
      appId: "deep-link-brasas",
      insidePortalOnly: false,
      manualLoadingControl: false,
    };

    // Cria o script de carregamento
    const script = document.createElement("script");
    script.src = "https://js.layers.digital/v1/LayersPortal.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      const init = async () => {
        try {
          const data = await window.LayersPortal?.readyPromise;
          console.log("data", data);
          const community_id = "sophia-4375-44";
          const userId = data.userId;

          const access_token = await makeLogin(userId, community_id);
          console.log("access_token:", access_token);
          const userEmail = await getUserEmail(userId, access_token);
          console.log("userEmail:", userEmail);
          const externalId = await getExternalId(userEmail, access_token);
          console.log("externalId:", externalId);
          setFinalExternalId(externalId);
        } catch (error) {
          console.error("Erro ao obter dados do usuário:", error);
        }
      };

      init();
    };
    document.body.appendChild(script);
  }, []);*/
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    const email = params.get("email");
    const externalId = params.get("externalId");
    setFinalExternalId(externalId);
    console.log("Recebido do pai:", { userId, email, externalId });
  }, []);

  const generateCode = async (media: string) => {
    //if (!finalExternalId) return;

    const message =
      `Hey, tenho uma dica imperdível pra você! Se você se matricular no BRASAS usando meu código, nós dois ganhamos R$100 de desconto! Vamos aprender inglês juntos e ainda economizar? Meu código é ${finalExternalId} – é só informar na secretaria na hora da matrícula ou acessar https://novosite.brasas.com/indique_e_ganhe?code=${finalExternalId} e seguir as instruções!`;
    const encodedMessage = encodeURIComponent(message);

    switch (media) {
      case "copy":
        try {
          await navigator.clipboard.writeText(finalExternalId);
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 2000);
        } catch (err) {
          console.error("Erro ao copiar para área de transferência:", err);
        }
        break;

      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${encodedMessage}`,
          "_blank",
        );
        break;

      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=https://novosite.brasas.com/indique_e_ganhe?code=${finalExternalId}`,
          "_blank",
        );
        break;

      case "email":
        window.open(
          `mailto:?subject=${
            encodeURIComponent("Indicação Brasas")
          }&body=${encodedMessage}`,
          "_blank",
        );
        break;

      default:
        console.warn("Mídia não reconhecida:", media);
    }
  };

  {
    /*
  if (!finalExternalId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent">
        </div>
      </div>
    );
  }*/
  }

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
          <div className="flex flex-col items-center xl:items-start gap-8 border border-blue-300 text-blue-300 p-10 rounded-[30px] relative">
            <span className="text-center xl:text-left font-black text-2xl">
              {selectedLanguage.value === "ptBr"
                ? props.boxTitleInPortuguese
                : props.boxTitleInEnglish}
            </span>
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-4 items-center">
                <IconBrandWhatsapp
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => generateCode("whatsapp")}
                />
                <IconMailFilled
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => generateCode("email")}
                />
                <IconBrandFacebookFilled
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => generateCode("facebook")}
                />
              </div>
              <div className="relative">
                <IconCopy
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => generateCode("copy")}
                />
                <div
                  className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-300 text-white text-sm rounded-lg shadow transition-all duration-300 ${
                    showTooltip
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  Copiado!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
