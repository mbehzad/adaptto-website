import{a as e}from"./scripts-3c4e8c2e.js";function t(t){const a=t.querySelector("picture"),r=t.querySelector("h2"),o=Array.from(t.querySelectorAll("p > a")),c=Array.from(t.children);t.textContent="";const n=document.createDocumentFragment(),s=e(n,"div","stage-large");a&&s.append(a);const p=e(s,"div","stage-overlay"),d=e(p,"div","stage-title");r&&d.append(r),c.forEach((e=>d.append(e)));const i=e(p,"div","stage-cta-box");o.forEach((t=>{const a=e(i,"p");t.classList.add("stage-cta"),a.append(t)})),t.append(n)}export{t as default};
