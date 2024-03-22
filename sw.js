if (!self.define) {
  let e,
    i = {};
  const r = (r, c) => (
    (r = new URL(r + ".js", c).href),
    i[r] ||
      new Promise((i) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = r), (e.onload = i), document.head.appendChild(e);
        } else (e = r), importScripts(r), i();
      }).then(() => {
        let e = i[r];
        if (!e) throw new Error(`Module ${r} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, o) => {
    const s =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (i[s]) return;
    let n = {};
    const a = (e) => r(e, s),
      f = { module: { uri: s }, exports: n, require: a };
    i[s] = Promise.all(c.map((e) => f[e] || a(e))).then((e) => (o(...e), n));
  };
}
define(["./workbox-8366b1fe"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        {
          url: "estudioServciceWorker/notificacionesDesdeBtn.js",
          revision: "f1a258c31d8e0aed21e47178f51781ff",
        },
        {
          url: "estudioServciceWorker/opcion-1/registradorServiceWorker.js",
          revision: "d4808eef6bf2cb2822584f455653c934",
        },
        {
          url: "estudioServciceWorker/opcion-1/service-worker.js",
          revision: "891d5847db2b3be0ab74ff0ca2561bf5",
        },
        {
          url: "estudioServciceWorker/opcion-2/SW-notification.js",
          revision: "584471e3b47b699577b2dd28a3d4946e",
        },
        {
          url: "estudioServciceWorker/opcion-2/SW-Registrados.js",
          revision: "747885d31b2f6ee9e5b1ab5463e5c529",
        },
        {
          url: "estudioServciceWorker/webDevSimplified.js",
          revision: "64a28ab8c538addb7b300d9252666295",
        },
        {
          url: "favicon/android-chrome-192x192.png",
          revision: "ebed08865d28bdae35625d35e8bf3579",
        },
        {
          url: "favicon/android-chrome-512x512.png",
          revision: "25cbe0bc555a30e4b6d1d10f3c4b4862",
        },
        {
          url: "favicon/apple-touch-icon.png",
          revision: "7699a6e0b6a68375b792b1f43c077d35",
        },
        {
          url: "favicon/favicon-16x16.png",
          revision: "a731547a7a1c678e7ff6ce6d2d3ebf53",
        },
        {
          url: "favicon/favicon-32x32.png",
          revision: "653344ea454ee843f69cea0ecf337999",
        },
        {
          url: "favicon/favicon.ico",
          revision: "32b7adccc2ac51c6bd912b83cca3e6bb",
        },
        { url: "index.html", revision: "10cc7ba00a258aa28b4a97747422157a" },
        { url: "manifest.json", revision: "fd86bfa96eff9e814af4e2cc5c9e19f4" },
        { url: "README.md", revision: "dd30bfc148efd39bbfb09f213642f5e6" },
        {
          url: "registradorDelSW.js",
          revision: "b3ec669241536ebaa354c087bd995142",
        },
        {
          url: "serviceWorker.js",
          revision: "419e459b1a917110848a2717f8da1205",
        },
        { url: "style.css", revision: "13e8b44ca0c01ad65109044c4bfaaf9a" },
        {
          url: "svg/BurgerMenu.svg",
          revision: "d99ee0ee56e04f1308ec1624f0c6d485",
        },
        {
          url: "svg/logo-favicon.svg",
          revision: "7dcba3bd6b77f2c7cab9f091ce8cd690",
        },
        { url: "svg/mas.svg", revision: "d039cf5f1b80ddec3308209659743547" },
        {
          url: "tarjetasEnPantalla.js",
          revision: "09f097f6f74ae5cb76092032c3acb7dc",
        },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    );
});
//# sourceMappingURL=sw.js.map
