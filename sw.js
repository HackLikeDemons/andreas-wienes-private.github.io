// Kill-Switch: ersetzt den Service Worker der alten Seite (Chirpy 4, /sw.js).
// Löscht alle Zwischenspeicher, meldet sich ab und lädt offene Tabs neu.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) await caches.delete(key);
      await self.registration.unregister();
      for (const client of await self.clients.matchAll({ type: "window" })) {
        client.navigate(client.url);
      }
    })()
  );
});
