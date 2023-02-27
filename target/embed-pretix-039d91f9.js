import{r as t,a as e}from"./scripts-044ccee4.js";import{h as r}from"./htmlTemplateTag-954b8530.js";import{a as s}from"./usercentrics-8fc0607a.js";function a(a){const i=t(a),c=i["shop-url"],n=i["shop-css-url"],p=i["script-url"];if(c&&n&&p){a.innerHTML="";e(a,"p").innerHTML=r`Direct link to <a href="${c}" target="_blank">adaptTo() Ticket Shop</a>.`;const t=e(a,"div");s("pretix",t,(t=>{const e=document.createElement("script");e.src=p,e.type="text/javascript",e.onload=()=>{t.innerHTML=r`
          <link rel="stylesheet" type="text/css" href="${n}">
          <pretix-widget event="${c}"></pretix-widget>
        `},document.head.append(e)}))}}export{a as default};
