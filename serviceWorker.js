const assets = ["/", "/index.html", "/css/style.css", "favicon.ico"];
const staticDevChessthunder = "dev-chessthunder-site-v1";

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDevChessthunder).then((cache) => {
      cache.addAll(assets);
    })
  );
});
