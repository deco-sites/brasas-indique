import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "../sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme colorScheme="any" />

      {/* Include Icons and manifest */}
      <Head>
        <link
          rel="preconnect"
          href={asset("MuseoSans-100.otf")}
          as="font"
          type="font/otf"
        />
        <link
          rel="preconnect"
          href={asset("MuseoSans-100Italic.otf")}
          as="font"
          type="font/otf"
        />
        <link
          rel="preconnect"
          href={asset("MuseoSans-300.otf")}
          as="font"
          type="font/otf"
        />
        <link
          rel="preconnect"
          href={asset("MuseoSans-300Italic.otf")}
          as="font"
          type="font/otf"
        />
        <link
          rel="preconnect"
          href={asset("MuseoSans-500.otf")}
          as="font"
          type="font/otf"
        />
        <link
          rel="preconnect"
          href={asset("MuseoSans-500Italic.otf")}
          as="font"
          type="font/otf"
        />
        <link
          rel="preconnect"
          href={asset("MuseoSans-700.otf")}
          as="font"
          type="font/otf"
        />
        <link
          rel="preconnect"
          href={asset("MuseoSans-700Italic.otf")}
          as="font"
          type="font/otf"
        />
        <link
          rel="preconnect"
          href={asset("MuseoSans-900.otf")}
          as="font"
          type="font/otf"
        />
        <link
          rel="preconnect"
          href={asset("MuseoSans-900Italic.otf")}
          as="font"
          type="font/otf"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `@font-face {
                      font-family: 'Museo Sans';
                      font-style: normal;
                      font-weight: 100;
                      font-display: swap;
                      src: url(${
              asset("MuseoSans-100.otf")
            }) format('opentype');
                    }

                    @font-face {
                      font-family: 'Museo Sans';
                      font-style: normal;
                      font-weight: 300;
                      font-display: swap;
                      src: url(${
              asset("MuseoSans-300.otf")
            }) format('opentype');
                    }

                    @font-face {
                      font-family: 'Museo Sans';
                      font-style: normal;
                      font-weight: 500;
                      font-display: swap;
                      src: url(${
              asset("MuseoSans-500.otf")
            }) format('opentype');
                    }

                    @font-face {
                      font-family: 'Museo Sans';
                      font-style: normal;
                      font-weight: 700;
                      font-display: swap;
                      src: url(${
              asset("MuseoSans-700.otf")
            }) format('opentype');
                    }

                    @font-face {
                      font-family: 'Museo Sans';
                      font-style: normal;
                      font-weight: 100;
                      font-display: swap;
                      src: url(${
              asset("MuseoSans-900.otf")
            }) format('opentype');
                    }
                      
                    * {
                      font-family: 'Museo Sans', sans-serif  
                    }
                    `,
          }}
        />
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />
    </>
  );
});
