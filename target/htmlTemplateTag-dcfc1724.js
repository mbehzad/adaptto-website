const r={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#39;","`":"&#96;"},e=new RegExp(Object.keys(r).join("|"),"g");function t(t,...n){return t.raw.reduce(((a,i,c)=>{let o=n[c-1];return Array.isArray(o)?o=o.join(""):t.raw[c-1]&&t.raw[c-1].endsWith("$")?a=a.slice(0,-1):o=String(o).replace(e,(e=>r[e])),a+o+i}))}export{t as h};
//# sourceMappingURL=htmlTemplateTag-dcfc1724.js.map
