import{f as t,a as n,i as a,n as e,u as o,v as s,l as c}from"./scripts-044ccee4.js";import{g as i,f as r,a as u}from"./ScheduleData-4994af62.js";async function d(d){d.textContent="";const p=t(document.location.pathname),f=(await i(`${p}schedule-data.json`)).getTalkEntry(document.location.pathname);!function(t){const s=a(e("article:tag"));if(0===s.length)return;const c=n(t,"ul","talk-tags");s.forEach((t=>{const a=n(c,"li"),e=n(a,"a");e.href=`${o(document.location.pathname)}#tags=${encodeURIComponent(t)}`,e.textContent=t}))}(d),f&&function(t,a){const e=n(t,"p");e.append(`${r(a.start)} ${u(a.start)} - ${u(a.end)}`),e.append(` (${a.duration} min`),a.durationFAQ>0&&e.append(` + ${a.durationFAQ} min FAQ`),e.append(")")}(d,f),function(t){const a=e("video");if(!a)return;const o=n(t,"div","embed-youtube"),i=n(o,"a");i.href=a,i.textContent=a,s(o),c(t)}(d),n(d,"h4").textContent="Outline"}export{d as default};
