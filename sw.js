// static/sw.js
const CACHE = "desafiei-v1";
const ARQUIVOS = ["/", "/dashboard", "/static/css/style.css", "/static/js/app.js"];

self.addEventListener("install", e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)));
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});