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
  const [finalExternalId, setFinalExternalId] = useState(null);

  const ICONS = {
    "whatsapp": IconBrandWhatsapp,
    "email": IconMailFilled,
    "facebook": IconBrandFacebookFilled,
  };

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
          console.log("Usuário conectado:", data);
          console.log("userId:", data.userId);

          const community_id = "sophia-4375-44";
          const userId = data.userId;

          // 1. Login na API
          const access_token = await makeLogin(userId, community_id);

          // 2. Obter e-mail do usuário
          const userEmail = await getUserEmail(userId, access_token);

          // 3. Obter externalId
          const externalId = await getExternalId(userEmail, access_token);
          setFinalExternalId(externalId);

          console.log("Retorno dentro do script.onload", {
            access_token,
            userEmail,
            externalId,
          });
        } catch (error) {
          console.error("Erro ao obter dados do usuário:", error);
        }
      };

      init();
    };
    document.body.appendChild(script);

    {
      /* Limpeza
    return () => {
      document.body.removeChild(script);
    };*/
    }
  }, []);

  const generateCode = async (media: string) => {
    console.log("gerar link", finalExternalId);

    const whatsapp_base_url =
      `https://api.whatsapp.com/send?text=${finalExternalId}`;
    const facebook_base_url =
      `https://www.facebook.com/dialog/share?href=${finalExternalId}`;
    if (!finalExternalId) {
      alert(
        "O código ainda não está disponível. Tente novamente em instantes.",
      );
      return;
    }

    const message =
      `Olá, esse é meu código Brasas. Para usar acesse https://novosite.brasas.com/indique_e_ganhe e siga as instruções.\n\nCódigo: ${finalExternalId}`;
    const encodedMessage = encodeURIComponent(message);

    switch (media) {
      case "copy":
        try {
          await navigator.clipboard.writeText(finalExternalId);
          alert("O código foi enviado para a área de transferência.");
        } catch (err) {
          console.error("Erro ao copiar para área de transferência:", err);
          alert("Não foi possível copiar o código.");
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
          `https://www.facebook.com/dialog/send?link=https://novosite.brasas.com/indique_e_ganhe&app_id=YOUR_APP_ID&redirect_uri=https://novosite.brasas.com&display=popup&message=${encodedMessage}`,
          "_blank",
        );
        break;

      case "email":
        window.location.href =
          `mailto:?subject=Indicação Brasas&body=${encodedMessage}`;
        break;

      default:
        console.warn("Mídia não reconhecida:", media);
    }
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
              <IconCopy
                className="w-8 h-8 cursor-pointer"
                onClick={() => generateCode("copy")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
