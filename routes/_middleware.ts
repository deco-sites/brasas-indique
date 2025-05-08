import { FreshContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: FreshContext) {
  const resp = await ctx.next();

  resp.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'self' *.layers.education",
  );

  return resp;
}
