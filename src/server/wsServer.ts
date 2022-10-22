import ws from "ws";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { appRouter } from "./router";
import { createContext } from "./router/context";

const webSocketServer = new ws.Server({
  port: 3001,
});

const handler = applyWSSHandler({
  wss: webSocketServer,
  router: appRouter,
  createContext,
});

webSocketServer.on("connection", () => {
  console.log(`++ ws connection ${webSocketServer.clients.size}`);

  webSocketServer.on("close", () => {
    console.log(`-- ws connection ${webSocketServer.clients.size}`);
  });
});

console.log("websocket server started");

process.on("SIGTERM", () => {
  console.log("SIGTERM");

  handler.broadcastReconnectNotification();

  webSocketServer.close();
});
