// Define cache version identifier
const CACHE_NAME = "lyon-guide-v1";

// List of assets to cache during service worker installation
const PRECACHE_URLS = [
  "index.html",
  "offline.html",
  "main/style.css",
  "js/app.js",
  "js/CustomTabs.js",
  "review.json",
  "manifest.json",
  "images/icon.svg"
];

// 1. INSTALLATION: Saving core assets to the Cache Storage
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Pre-caching assets...");
      return cache.addAll(PRECACHE_URLS);
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// 2. ACTIVATION: Cleaning up old cache versions to save space
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Service Worker: Removing old cache", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  // Allow the service worker to take control of the page immediately
  self.clients.claim();
});

// 3. FETCH: Intercepting network requests
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-standard protocols (like chrome-extension://)
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return;
  }

  // --- STRATEGY A: NAVIGATION (HTML Pages) - Network First ---
  // This ensures users get the latest site updates when online
  if (request.mode === "navigate" || (request.method === "GET" && request.headers.get("accept").includes("text/html"))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          // Eto ang magliligtas sa offline page mo
          return await cache.match("offline.html") || await cache.match("/offline.html");
        })
    );
    return;
}

  // --- STRATEGY B: ASSETS (CSS, JS, Images) - Cache First ---
  // This speeds up the site by loading local files instead of downloading them
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        // VIDEO FIX: Avoid caching .mp4 or 206 Partial Content
        const isVideo = request.url.includes('.mp4');
        
        if (response.status === 200 && !isVideo) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      }).catch(() => {
        // Silently fail for missing background assets
        return new Response("Asset not found", { status: 404 });
      });
    })
  );
});