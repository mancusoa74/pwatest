!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";try{self["workbox:precaching:5.1.4"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:core:5.1.4"]&&_()}catch(e){}},function(e,t,n){"use strict";n.r(t);n(0);const s=[],r={get:()=>s,add(e){s.push(...e)}};n(1);const c={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},a=e=>[c.prefix,e,c.suffix].filter((e=>e&&e.length>0)).join("-"),o=e=>e||a(c.precache),i=(e,...t)=>{let n=e;return t.length>0&&(n+=" :: "+JSON.stringify(t)),n};class l extends Error{constructor(e,t){super(i(e,t)),this.name=e,this.details=t}}const h=new Set;const u=(e,t)=>e.filter((e=>t in e)),f=async({request:e,mode:t,plugins:n=[]})=>{const s=u(n,"cacheKeyWillBeUsed");let r=e;for(const e of s)r=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},d=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:r=[]})=>{const c=await self.caches.open(e),a=await f({plugins:r,request:t,mode:"read"});let o=await c.match(a,s);for(const t of r)if("cachedResponseWillBeUsed"in t){const r=t.cachedResponseWillBeUsed;o=await r.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:o,request:a})}return o},p=async({cacheName:e,request:t,response:n,event:s,plugins:r=[],matchOptions:c})=>{const a=await f({plugins:r,request:t,mode:"write"});if(!n)throw new l("cache-put-with-no-response",{url:(o=a.url,new URL(String(o),location.href).href.replace(new RegExp("^"+location.origin),""))});var o;const i=await(async({request:e,response:t,event:n,plugins:s=[]})=>{let r=t,c=!1;for(const t of s)if("cacheWillUpdate"in t){c=!0;const s=t.cacheWillUpdate;if(r=await s.call(t,{request:e,response:r,event:n}),!r)break}return c||(r=r&&200===r.status?r:void 0),r||null})({event:s,plugins:r,response:n,request:a});if(!i)return void 0;const p=await self.caches.open(e),y=u(r,"cacheDidUpdate"),w=y.length>0?await d({cacheName:e,matchOptions:c,request:a}):null;try{await p.put(a,i)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of h)await e()}(),e}for(const t of y)await t.cacheDidUpdate.call(t,{cacheName:e,event:s,oldResponse:w,newResponse:i,request:a})},y=async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const r=u(s,"fetchDidFail"),c=r.length>0?e.clone():null;try{for(const t of s)if("requestWillFetch"in t){const s=t.requestWillFetch,r=e.clone();e=await s.call(t,{request:r,event:n})}}catch(e){throw new l("plugin-error-request-will-fetch",{thrownError:e})}const a=e.clone();try{let r;r="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(r=await e.fetchDidSucceed.call(e,{event:n,request:a,response:r}));return r}catch(e){0;for(const t of r)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:c.clone(),request:a.clone()});throw e}};let w;async function g(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=t?t(s):s,c=function(){if(void 0===w){const e=new Response("");if("body"in e)try{new Response(e.body),w=!0}catch(e){w=!1}w=!1}return w}()?n.body:await n.blob();return new Response(c,r)}function m(e){if(!e)throw new l("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new l("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),r=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:r.href}}class v{constructor(e){this._cacheName=o(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=m(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],r=await self.caches.open(this._cacheName),c=await r.keys(),a=new Set(c.map((e=>e.url)));for(const[e,t]of this._urlsToCacheKeys)a.has(t)?s.push(e):n.push({cacheKey:t,url:e});const o=n.map((({cacheKey:n,url:s})=>{const r=this._cacheKeysToIntegrities.get(n),c=this._urlsToCacheModes.get(s);return this._addURLToCache({cacheKey:n,cacheMode:c,event:e,integrity:r,plugins:t,url:s})}));await Promise.all(o);return{updatedURLs:n.map((e=>e.url)),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),s=[];for(const r of t)n.has(r.url)||(await e.delete(r),s.push(r.url));return{deletedURLs:s}}async _addURLToCache({cacheKey:e,url:t,cacheMode:n,event:s,plugins:r,integrity:c}){const a=new Request(t,{integrity:c,cache:n,credentials:"same-origin"});let o,i=await y({event:s,plugins:r,request:a});for(const e of r||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:s,request:a,response:i}):i.status<400))throw new l("bad-precaching-response",{url:t,status:i.status});i.redirected&&(i=await g(i)),await p({event:s,plugins:r,response:i,request:e===t?a:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this._cacheName)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new l("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new l("non-precached-url",{url:e});const n=this.createHandler(t),s=new Request(e);return()=>n({request:s})}}let R;const _=()=>(R||(R=new v),R);const U=(e,t)=>{const n=_().getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:r}={}){const c=new URL(e,location.href);c.hash="",yield c.href;const a=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some((e=>e.test(n)))&&e.searchParams.delete(n);return e}(c,t);if(yield a.href,n&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=n,yield e.href}if(s){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:c});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let q=!1;function L(e){q||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:s}={})=>{const r=o();self.addEventListener("fetch",(c=>{const a=U(c.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:s});if(!a)return;let o=self.caches.open(r).then((e=>e.match(a))).then((e=>e||fetch(a)));c.respondWith(o)}))})(e),q=!0)}const T=e=>{const t=_(),n=r.get();e.waitUntil(t.install({event:e,plugins:n}).catch((e=>{throw e})))},K=e=>{const t=_();e.waitUntil(t.activate())};var b;(function(e){_().addToCacheList(e),e.length>0&&(self.addEventListener("install",T),self.addEventListener("activate",K))})([{'revision':'4acd12bb2e19161e7d2c098fe56f6914','url':'./index.html'},{'revision':'6133dbd7254b721c7a53209af00756b7','url':'css/app.css'},{'revision':'a722c1fd8ad97523cc97685cef99d4f3','url':'js/app.js'},{'revision':'09486fd88fb3ad794c0290acae54ec7e','url':'manifest.json'},{'revision':'4e35a6dad5f1ab5b385f86dfe97579b8','url':'static/icons/128x128.png'},{'revision':'47efa07843a29aff095e50015e084e85','url':'static/icons/144x144.png'},{'revision':'ab189ff1c3604cbecd2ccc180b6f7c25','url':'static/icons/152x152.png'},{'revision':'9ad7d46019f56396237834ced5038973','url':'static/icons/192x192.png'},{'revision':'28969ffd71e59d0bb2ca642ac8bb0134','url':'static/icons/256x256.png'},{'revision':'aa0c2f038e42624eb7ee396b272ee852','url':'static/icons/512x512.png'},{'revision':'4e94b1d1edaea36f052ec015c03ff26b','url':'static/icons/apple-touch-icon.png'},{'revision':'4e35a6dad5f1ab5b385f86dfe97579b8','url':'static/icons/favicon.png'}]||[]),L(b),self.addEventListener("install",(function(e){console.log("[Service Worker] Installing SW version:","0015")})),self.addEventListener("fetch",(function(e){console.log("FETCH EVENT"),"GET"===e.request.method&&e.respondWith(caches.match(e.request).then((function(t){return console.log("[SW] Requesting ".concat(e.request.url,".")),t||fetch(e.request)})))})),self.addEventListener("activate",(function(e){e.waitUntil(self.clients.claim())}))}]);
//# sourceMappingURL=service-worker.js.map