import{b as t,decorateMain as e,l as s}from"./scripts-13eb0b7a.js";async function a(a){const n=a.querySelector("a"),c=n?n.getAttribute("href"):a.textContent.trim(),i=await async function(a){if(a&&a.startsWith("/")){const n=await fetch(`${a}.plain.html`,t());if(n.ok){const t=document.createElement("main");return t.innerHTML=await n.text(),e(t,!0),await s(t),t}}return null}(c);if(i){const t=i.querySelector(":scope .section");t&&(a.closest(".section").classList.add(...t.classList),a.closest(".fragment-wrapper").replaceWith(...t.childNodes))}}export{a as default};
