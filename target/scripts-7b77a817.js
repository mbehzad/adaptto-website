function e(t,a={}){e.defer=e.defer||[];const r=t=>{e[t]=e[t]||((...a)=>e.defer.push({fnname:t,args:a}))};e.drain=e.drain||((t,a)=>{e[t]=a,e.defer.filter((({fnname:e})=>t===e)).forEach((({fnname:t,args:a})=>e[t](...a)))}),e.on=(t,a)=>{e.cases[t]=a},r("observe"),r("cwv");try{if(window.hlx=window.hlx||{},!window.hlx.rum){const t="on"===new URLSearchParams(window.location.search).get("rum")?1:100,a=`${(e=>e.split("").reduce(((e,t)=>(e<<5)-e+t.charCodeAt(0)|0),0))(window.location.href)}-${(new Date).getTime()}-${Math.random().toString(16).substr(2,14)}`,r=Math.random(),s=r*t<1;window.hlx.rum={weight:t,id:a,random:r,isSelected:s,sampleRUM:e}}const{weight:r,id:s}=window.hlx.rum;if(window.hlx&&window.hlx.rum&&window.hlx.rum.isSelected){const n=(e=a)=>{const n=JSON.stringify({weight:r,id:s,referer:window.location.href,generation:window.hlx.RUM_GENERATION,checkpoint:t,...a}),o=`https://rum.hlx.page/.rum/${r}`;navigator.sendBeacon(o,n),console.debug(`ping:${t}`,e)};e.cases=e.cases||{cwv:()=>e.cwv(a)||!0,lazy:()=>{const e=document.createElement("script");return e.src="https://rum.hlx.page/.rum/@adobe/helix-rum-enhancer@^1/src/index.js",document.head.appendChild(e),!0}},n(a),e.cases[t]&&e.cases[t]()}}catch(e){}}function t(e){const t=e&&e.includes(":")?"property":"name";return[...document.head.querySelectorAll(`meta[${t}="${e}"]`)].map((e=>e.content)).join(", ")||""}function a(e){return"string"==typeof e?e.toLowerCase().replace(/[^0-9a-z]/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,""):""}function r(e){const t=e.classList[0];if(t){e.classList.add("block"),e.setAttribute("data-block-name",t),e.setAttribute("data-block-status","initialized");e.parentElement.classList.add(`${t}-wrapper`);const a=e.closest(".section");a&&a.classList.add(`${t}-container`)}}function s(e){const t={};return e.querySelectorAll(":scope>div").forEach((e=>{if(e.children){const r=[...e.children];if(r[1]){const s=r[1],n=a(r[0].textContent);let o="";if(s.querySelector("a")){const e=[...s.querySelectorAll("a")];o=1===e.length?e[0].href:e.map((e=>e.href))}else if(s.querySelector("img")){const e=[...s.querySelectorAll("img")];o=1===e.length?e[0].src:e.map((e=>e.src))}else if(s.querySelector("p")){const e=[...s.querySelectorAll("p")];o=1===e.length?e[0].textContent:e.map((e=>e.textContent))}else o=e.children[1].textContent;t[n]=o}}})),t}function n(e){e.querySelectorAll(":scope > div").forEach((e=>{const t=[];let r=!1;[...e.children].forEach((e=>{if("DIV"===e.tagName||!r){const a=document.createElement("div");t.push(a),r="DIV"!==e.tagName,r&&a.classList.add("default-content-wrapper")}t[t.length-1].append(e)})),t.forEach((t=>e.append(t))),e.classList.add("section"),e.setAttribute("data-section-status","initialized");const n=e.querySelector("div.section-metadata");if(n){const t=s(n);Object.keys(t).forEach((r=>{if("style"===r){t.style.split(",").map((e=>a(e.trim()))).forEach((t=>e.classList.add(t)))}else e.dataset[(s=r,a(s).replace(/-([a-z])/g,(e=>e[1].toUpperCase())))]=t[r];var s})),n.parentNode.remove()}}))}function o(e){const t=[...e.querySelectorAll(":scope > div.section")];for(let e=0;e<t.length;e+=1){const a=t[e];if("loaded"!==a.getAttribute("data-section-status")){if(a.querySelector('.block[data-block-status="initialized"], .block[data-block-status="loading"]')){a.setAttribute("data-section-status","loading");break}a.setAttribute("data-section-status","loaded")}}}function i(e,t){const a=Array.isArray(t)?t:[[t]],r=document.createElement("div");return r.classList.add(e),a.forEach((e=>{const t=document.createElement("div");e.forEach((e=>{const a=document.createElement("div");(e.elems?e.elems:[e]).forEach((e=>{e&&("string"==typeof e?a.innerHTML+=e:a.appendChild(e))})),t.appendChild(a)})),r.appendChild(t)})),r}async function c(e){const t=e.getAttribute("data-block-status");if("loading"!==t&&"loaded"!==t){e.setAttribute("data-block-status","loading");const t=e.getAttribute("data-block-name");try{const a=function(e){switch(e){case"../blocks/embed-google-maps/embed-google-maps.css":return import("./embed-google-maps-6604347c.js");case"../blocks/embed-newsletter/embed-newsletter.css":return import("./embed-newsletter-771053ba.js");case"../blocks/embed-pretix/embed-pretix.css":return import("./embed-pretix-1bb72ce1.js");case"../blocks/embed-youtube/embed-youtube.css":return import("./embed-youtube-e3d26ed6.js");case"../blocks/footer/footer.css":return import("./footer-943df51a.js");case"../blocks/fragment/fragment.css":return import("./fragment-4ed993c7.js");case"../blocks/header/header.css":return import("./header-ddac5d91.js");case"../blocks/image-gallery/image-gallery.css":return import("./image-gallery-9c163c58.js");case"../blocks/schedule/schedule.css":return import("./schedule-33a33944.js");case"../blocks/social-teaser/social-teaser.css":return import("./social-teaser-0309fd8b.js");case"../blocks/speaker-detail/speaker-detail.css":return import("./speaker-detail-74ea8050.js");case"../blocks/speaker-gallery/speaker-gallery.css":return import("./speaker-gallery-1ce92198.js");case"../blocks/sponsor-teaser/sponsor-teaser.css":return import("./sponsor-teaser-3f6d614a.js");case"../blocks/stage-header/stage-header.css":return import("./stage-header-64415454.js");case"../blocks/talk-archive/talk-archive.css":return import("./talk-archive-f9d56f9a.js");case"../blocks/talk-detail-after-outline/talk-detail-after-outline.css":return import("./talk-detail-after-outline-88908fc9.js");case"../blocks/talk-detail-before-outline/talk-detail-before-outline.css":return import("./talk-detail-before-outline-fb1949b7.js");case"../blocks/talk-detail-footer/talk-detail-footer.css":return import("./talk-detail-footer-4ed993c7.js");case"../blocks/teaser-bar/teaser-bar.css":return import("./teaser-bar-f0ea51d8.js");default:return new Promise((function(t,a){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(a.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`../blocks/${t}/${t}.css`).then((({default:e})=>{if(e instanceof CSSStyleSheet)document.adoptedStyleSheets=[...document.adoptedStyleSheets,e];else{const t=document.createElement("style");t.appendChild(document.createTextNode(e)),document.head.appendChild(t)}})),r=new Promise((a=>{(async()=>{try{const a=await function(e){switch(e){case"../blocks/embed-google-maps/embed-google-maps.js":return import("./embed-google-maps-b14f7652.js");case"../blocks/embed-newsletter/embed-newsletter.js":return import("./embed-newsletter-d6fd4911.js");case"../blocks/embed-pretix/embed-pretix.js":return import("./embed-pretix-144d6812.js");case"../blocks/embed-youtube/embed-youtube.js":return import("./embed-youtube-baa073a5.js");case"../blocks/footer/footer.js":return import("./footer-c24eb5f1.js");case"../blocks/fragment/fragment.js":return import("./fragment-dcadd4a8.js");case"../blocks/header/header.js":return import("./header-43dcbc25.js");case"../blocks/image-gallery/image-gallery.js":return import("./image-gallery-fd490c4d.js");case"../blocks/schedule/schedule.js":return import("./schedule-689b5646.js");case"../blocks/social-teaser/social-teaser.js":return import("./social-teaser-4ed993c7.js");case"../blocks/speaker-detail/speaker-detail.js":return import("./speaker-detail-d239d661.js");case"../blocks/speaker-gallery/speaker-gallery.js":return import("./speaker-gallery-763a40ac.js");case"../blocks/sponsor-teaser/sponsor-teaser.js":return import("./sponsor-teaser-4ed993c7.js");case"../blocks/stage-header/stage-header.js":return import("./stage-header-798bcf84.js");case"../blocks/talk-archive/talk-archive.js":return import("./talk-archive-090f8991.js");case"../blocks/talk-detail-after-outline/talk-detail-after-outline.js":return import("./talk-detail-after-outline-ee466b63.js");case"../blocks/talk-detail-before-outline/talk-detail-before-outline.js":return import("./talk-detail-before-outline-837d6513.js");case"../blocks/talk-detail-footer/talk-detail-footer.js":return import("./talk-detail-footer-2969663d.js");case"../blocks/teaser-bar/teaser-bar.js":return import("./teaser-bar-528746a3.js");default:return new Promise((function(t,a){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(a.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`../blocks/${t}/${t}.js`);a.default&&await a.default(e)}catch(e){console.log(`failed to load module for ${t}`,e)}a()})()}));await Promise.all([a,r])}catch(e){console.log(`failed to load block ${t}`,e)}e.setAttribute("data-block-status","loaded")}}async function l(e){o(e);const t=[...e.querySelectorAll("div.block")];for(let a=0;a<t.length;a+=1)await c(t[a]),o(e)}function d(e,t="",a=!1,r=[{media:"(min-width: 400px)",width:"2000"},{width:"750"}]){const s=new URL(e,window.location.href),n=document.createElement("picture"),{pathname:o}=s,i=o.substring(o.lastIndexOf(".")+1);return r.forEach((e=>{const t=document.createElement("source");e.media&&t.setAttribute("media",e.media),t.setAttribute("type","image/webp"),t.setAttribute("srcset",`${o}?width=${e.width}&format=webply&optimize=medium`),n.appendChild(t)})),r.forEach(((e,s)=>{if(s<r.length-1){const t=document.createElement("source");e.media&&t.setAttribute("media",e.media),t.setAttribute("srcset",`${o}?width=${e.width}&format=${i}&optimize=medium`),n.appendChild(t)}else{const r=document.createElement("img");r.setAttribute("loading",a?"eager":"lazy"),r.setAttribute("alt",t),n.appendChild(r),r.setAttribute("src",`${o}?width=${e.width}&format=${i}&optimize=medium`)}})),n}!function(){window.hlx=window.hlx||{},window.hlx.codeBasePath="",window.hlx.lighthouse="on"===new URLSearchParams(window.location.search).get("lighthouse");const e=document.querySelector('script[src$="/scripts/scripts.js"]');if(e)try{[window.hlx.codeBasePath]=new URL(e.src).pathname.split("/scripts/scripts.js")}catch(e){console.log(e)}}(),e("top"),window.addEventListener("load",(()=>e("load"))),window.addEventListener("unhandledrejection",(t=>{e("error",{source:t.reason.sourceURL,target:t.reason.line})})),window.addEventListener("error",(t=>{e("error",{source:t.filename,target:t.lineno})}));const u=/^https?:\/\/([^/.]+--adaptto-website--adaptto.hlx.(page|live)|adapt.to|localhost:\d+)(\/.+)$/,m=/^.+\.(pdf|zip)$/;class p{constructor(e){this.url=e,this.adaptToSiteUrlMatch=this.url.match(u)}isAdaptToSiteUrl(){return null!=this.adaptToSiteUrlMatch}getAdaptToSiteUrlPath(){return this.adaptToSiteUrlMatch[3]}isDownload(){return null!=this.url.match(m)}}function h(e){e.querySelectorAll("a").forEach((e=>function(e){const t=e.href;if(t){const a=new p(t);a.isAdaptToSiteUrl()?(e.href=a.getAdaptToSiteUrlPath(),a.isDownload()&&e.setAttribute("download","")):e.target="_blank"}return e}(e)))}function f(e,t,...a){const r=e.createElement(t);return a&&a.length>0&&r.classList.add(...a),r}function g(e,t,...a){const r=f(e.ownerDocument,t,...a);return e.append(r),r}function b(e,t,...a){const r=f(e.ownerDocument,t,...a);return e.prepend(r),r}function k(){const e=window.performance.getEntriesByType("navigation")[0]?.type;return"reload"===e?{cache:"reload"}:{}}const w=/^(https?:\/\/[^/]+)?\/.*$/,y=/^\/(\d\d\d\d)\/(.+)?$/;function S(e){return!!e&&null!=e.match(w)}function j(e){return function(e){if(e){const t=e.match(w);if(t)return void 0!==t[1]}return!1}(e)?new URL(e).pathname:function(e){if(e){const t=e.match(w);if(t)return void 0===t[1]}return!1}(e)?e:void 0}function v(e){const t=j(e);if(t){const e=t.lastIndexOf("/"),a=t.substring(e+1);if(""!==a)return a}}function E(e){const t=e.match(y);if(t)return parseInt(t[1],10)}const A=/^(.+)\s-\s+adaptTo\(\)\s+\d+\s*$/;function $(e){return e?e.split(",").map((e=>e.trim())).filter((e=>""!==e)):[]}function x(e){if(e){const t=e.match(A);if(t)return t[1].trim()}return e}class q{path;title;description;keywords;robots;image;tags;affiliation;twitter;"speaker-alias";uptoyear;speakers;getKeywords(){return $(this.keywords)}getRobots(){return $(this.robots)}getTags(){return function(e){if(e)try{return JSON.parse(e)}catch(t){return $(e)}return[]}(this.tags)}getSpeakers(){return $(this.speakers)}}const L=/^\/\d\d\d\d\/$/,C=/^\/speakers\/.*$/,T=/^\/\d\d\d\d\/schedule\/.+$/,U="/default-meta-image.png?width=1200&format=pjpg&optimize=medium";let R;function z(e,t){const a=new Set;return e.filter((e=>e.path.match(t))).forEach((e=>{e.getSpeakers().forEach((e=>a.add(e)))})),Array.from(a).sort()}class I{items;constructor(e){this.items=e}getItem(e){return this.items.find((t=>t.path===e))}getAllSiteRoots(){return this.items.filter((e=>e.path&&e.path.match(L))).sort(((e,t)=>e.path&&t.path&&t.path.localeCompare(e.path)))}getSpeaker(e,t){if(S(e)){const t=j(e);if(t.match(C))return this.getItem(t)}return function(e,t){if(0===e.length)return;if(1===e.length)return e[0];const a=parseInt(t.substring(1,t.length-1),10);return e.sort(((e,t)=>e.uptoyear?t.uptoyear?e.uptoyear-t.uptoyear:-1:1)),e.find((e=>!e.uptoyear||e.uptoyear>=a))}(this.items.filter((e=>e.path.match(C))).filter((t=>t.title===e||v(t.path)===e)),t)}getTalkSpeakerNames(e){const t=new RegExp(`^${e}schedule/[^/]+$`);return z(this.items,t)}getLightningTalkSpeakerNames(e){const t=new RegExp(`^${e}schedule/[^/]+/[^/]+$`),a=z(this.items,t),r=this.getTalkSpeakerNames(e);return a.filter((e=>!r.includes(e)))}getAllTalks(){return this.items.filter((e=>e.path.match(T))).sort(((e,t)=>{const a=e.path.substring(0,6),r=t.path.substring(0,6);return a===r?e.path.localeCompare(t.path):r.localeCompare(a)}))}getTalksForSpeaker(e){const t=v(e.path);return this.getAllTalks().filter((a=>{if(a.speakers){const r=a.getSpeakers();return r.includes(e.title)||r.includes(t)}return!1}))}}async function M(){if(!R){let e;const t=await fetch("/query-index.json",k());if(t.ok){e=(await t.json()).data}e=e||[];const a=e.map((e=>{const t=Object.assign(new q,e);return t.image===U&&(t.image=void 0),t}));R=new I(a)}return R}const N=/^(\/\d\d\d\d\/)(.+)?$/,P=/^\/speakers\/[^/]+$/,B=/^#(\d\d\d\d)$/;function O(e){const t=e.match(N);return t?t[1]:"/"}async function D(e,t){if(e.match(P)){const a=t?.match(B);let r;if(a)[,r]=a;else{const t=await M(),a=t.getItem(e);if(a){const e=t.getTalksForSpeaker(a)[0];e&&(r=E(e.path))}}if(r)return`/${r}/`}return O(e)}function F(e){const t=O(e);if(e!==t&&"/"!==t){const a=e.lastIndexOf("/");return a===t.length-1?t:e.substring(0,a)}}function G(e,t){return`${O(e)}${t}`}function V(e){return G(e,"schedule")}function _(e){return G(e,"archive")}function H(e){return G(e,"conference/speaker")}function J(e,t){const a=E(t);return`${e.path}#${a}`}async function K(e){const t=e.querySelectorAll(":scope > ul > li"),a=t[t.length-1];if(a){let e=a.querySelector(":scope > ul");e||(e=g(a,"ul"));(await M()).getAllSiteRoots().forEach((t=>{const a=g(e,"li"),r=g(a,"a");r.href=t.path,r.textContent=t.title}))}}const W=[];function Q(e){if(null!=window.location.pathname.match(P)){const t=e.querySelector(":scope > div");t&&t.prepend(i("speaker-detail",{elems:Array.from(t.children)}))}}function X(e){const t=`${O(window.location.pathname)}${e}`,a=document.createElement("a");return a.setAttribute("href",t),a.innerText=t,i("fragment",a)}function Y(e){try{Q(e),function(e){if("talk-detail"===t("theme")){const t=e.querySelector(":scope > div");if(t){const e=t.querySelector(":scope > h1"),a=document.createElement("div");a.classList.add("talk-detail-before-outline"),e.nextSibling?t.insertBefore(a,e.nextSibling):t.append(a);const r=document.createElement("div");r.classList.add("talk-detail-after-outline"),t.append(r)}const a=document.createElement("div");e.append(a);const r=document.createElement("div");r.classList.add("talk-detail-footer"),a.append(r)}}(e),function(e){const t=document.createElement("div");t.classList.add("stage-header-section"),e.prepend(t);const a=e.querySelector(".stage-header");a&&t.appendChild(a)}(e),function(e){if("false"===t("include-aside-bar"))return;const a=X("fragments/aside-bar"),r=document.createElement("div");r.classList.add("aside-bar-section"),r.appendChild(a),e.append(r)}(e),function(e){if("false"===t("include-teaser-bar"))return;const a=X("fragments/teaser-bar"),r=document.createElement("div");r.classList.add("teaser-bar-section"),r.appendChild(a),e.append(r)}(e)}catch(e){console.error("Auto Blocking failed",e)}}function Z(e,t){!function(e=document){e.querySelectorAll("span.icon").forEach((async e=>{if(e.classList.length<2||!e.classList[1].startsWith("icon-"))return;const t=e.classList[1].substring(5),a=await fetch(`${window.hlx.codeBasePath}/icons/${t}.svg`);if(a.ok){const t=await a.text();if(t.match(/<style/i)){const a=document.createElement("img");a.src=`data:image/svg+xml,${encodeURIComponent(t)}`,e.appendChild(a)}else e.innerHTML=t}}))}(e),h(e),t||Y(e),n(e),function(e){e.querySelectorAll("div.section > div > div").forEach(r)}(e)}function ee(){!function(){const e=(e,t)=>{t.split(",").forEach((t=>{e.classList.add(a(t.trim()))}))},r=t("template");r&&e(document.body,r);const s=t("theme");s&&e(document.body,s)}();let e=t("template");e||(e="false"===t("include-aside-bar")?"content-4col":"content-3col",document.body.classList.add(e))}async function te(e){document.documentElement.lang="en";const t=e.querySelector("header");t&&function(e){const t=g(e,"div","header-container"),a=g(t,"a","logo");a.id="top",g(a,"div"),g(e,"div","nav-background")}(t),ee();const a=e.querySelector("main");a&&(Z(a),await async function(e){const t=document.querySelector(".block");t&&e.includes(t.getAttribute("data-block-name"))&&await c(t),document.querySelector("body").classList.add("appear");const a=document.querySelector("main img");await new Promise((e=>{a&&!a.complete?(a.setAttribute("loading","eager"),a.addEventListener("load",e),a.addEventListener("error",e)):e()}))}(W))}async function ae(t){const a=t.querySelector("main");await l(a);const{hash:s}=window.location,n=!!s&&t.getElementById(s.substring(1));s&&n&&n.scrollIntoView(),function(e){const t=i("header","");e.append(t),r(t),c(t)}(t.querySelector("header .header-container")),function(e){const t=i("footer","");e.append(t),r(t),c(t)}(t.querySelector("footer")),import("./lazy-styles-4ed993c7.js").then((({default:e})=>{if(e instanceof CSSStyleSheet)document.adoptedStyleSheets=[...document.adoptedStyleSheets,e];else{const t=document.createElement("style");t.appendChild(document.createTextNode(e)),document.head.appendChild(t)}})),e("lazy"),e.observe(a.querySelectorAll("div[data-block-name]")),e.observe(a.querySelectorAll("picture > img"))}window.hlx.RUM_GENERATION="project-1",async function(){await te(document),await ae(document),window.setTimeout((()=>import("./delayed-68cc017d.js")),3e3)}();export{g as a,k as b,K as c,h as d,Z as decorateMain,d as e,O as f,D as g,t as h,M as i,H as j,x as k,l,E as m,$ as n,J as o,b as p,_ as q,s as r,e as s,r as t,S as u,j as v,F as w,V as x};
