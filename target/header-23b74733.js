import{g as e,b as t,d as a,a as n,p as o,c}from"./scripts.js";async function i(i){i.textContent="";const l=await e(window.location.pathname,window.location.hash),s=document.querySelector("header a.logo");s&&(s.href=l);const r=await fetch(`${l}nav.plain.html`,t());if(r.ok){const e=await r.text(),t=document.createElement("div");t.innerHTML=e,a(t);const l=t.children[0],s=t.children[1];if(l&&i.append(...Array.from(l.childNodes)),s){const e=n(i,"nav");e.append(...Array.from(s.childNodes)),function(e){const t=o(e,"h1","mobile-nav"),a=n(t,"a");a.href="#",a.text="Navigation",a.addEventListener("click",(t=>{t.preventDefault(),e.querySelector(":scope > ul")?.classList.toggle("active")})),e.querySelectorAll("li > a").forEach((e=>{const a=e.parentElement.querySelector(":scope > ul");a&&e.addEventListener("click",(e=>{"none"!==window.getComputedStyle(t).display&&(e.preventDefault(),a.classList.toggle("active"))}))})),c(e)}(e)}}}export{i as default};
//# sourceMappingURL=header-23b74733.js.map
