import { env } from "./src/server/env.mjs";
import path from "path";
import withPWA from "next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

function defineNextConfig(config) {
  return config;
}

export default defineNextConfig(
  withPWAConfig({
    reactStrictMode: true,
    images: {
      domains: [
        "i.pravatar.cc",
        "avatars.githubusercontent.com",
        "lh3.googleusercontent.com",
        "cdn.discordapp.com",
      ],
    },
    sassOptions: {
      includePaths: ["src/styles"],
    },
  })
);
