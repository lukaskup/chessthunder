// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.scss";
import "../styles/chessboard.scss";
import { Navigation } from "../components/navigation";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { wsLink, createWSClient } from "@trpc/client/links/wsLink";
import { useRouter } from "next/router";

const MyApp: AppType = ({
  Component,
  //@ts-ignore
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <Navigation />
      <div className={`max-w-lg mx-auto px-2 sm:px-6 lg:px-8 pt-4`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

const url = `${getBaseUrl()}/api/trpc`;

const getEndingLink = () => {
  if (typeof window === "undefined") {
    return httpBatchLink({
      url,
    });
  }

  const client = createWSClient({
    url: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001",
  });

  return wsLink({
    client,
  });
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */

    return {
      links: [getEndingLink()],
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers() {
        if (ctx?.req) {
          return { ...ctx.req.headers };
        }
        return {};
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
