import{c as _,j as o}from"./app-kGwYUa0z.js";import{b as q,D as v,d as C,e as $}from"./dialog-BO_8L416.js";import{B as w}from"./button-BeiW3-ru.js";import{u as D}from"./useTranslation-BoVRGzZt.js";import{c as k}from"./createLucideIcon-Bt4MPmOA.js";import{P as R}from"./printer-DL2rqOkp.js";/* empty css            */import"./index-DpnXNSlh.js";import"./index-MN3eVXh1.js";import"./index-BnNFHdUN.js";import"./index-3pDJhQo6.js";import"./utils-DvRnx1Xn.js";import"./x-CDgJvsZ7.js";const Q=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]],z=k("Download",Q);function G(N){const e=_.c(28),{open:f,table:t,store:m,onClose:g}=N,{t:n}=D();let d;e[0]!==t?.name||e[1]!==t?.qr_code?(d=()=>{if(t?.qr_code){const s=document.createElement("a");s.href=t?.qr_code,s.download=`${t?.name}_QR_Code.png`,document.body.appendChild(s),s.click(),document.body.removeChild(s)}},e[0]=t?.name,e[1]=t?.qr_code,e[2]=d):d=e[2];const b=d;let x;e[3]!==m?.name||e[4]!==n||e[5]!==t?(x=()=>{const s=window.open("","","height=600,width=800");s&&t.qr_code&&(s.document.write(`
                <html>
                    <head>
                        <title>${n("store.print-qr-code")} - ${t.name}</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                padding: 40px;
                                text-align: center;
                            }
                            h1 {
                                margin-bottom: 10px;
                                font-size: 32px;
                                color: #333;
                            }
                            h2 {
                                color: #666;
                                margin-bottom: 30px;
                                font-size: 24px;
                            }
                            img {
                                max-width: 400px;
                                border: 4px solid #333;
                                border-radius: 10px;
                                margin-bottom: 20px;
                            }
                            p {
                                font-size: 18px;
                                color: #888;
                            }
                            @media print {
                                body {
                                    padding: 20px;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <h1>${m?.name}</h1>
                        <h2>${t?.name}</h2>
                        <img src="${t?.qr_code}" alt="${t?.name} QR Code" />
                        <p>${n("store.scan-to-order")}</p>
                    </body>
                </html>
            `),s.document.close(),setTimeout(()=>{s.print()},500))},e[3]=m?.name,e[4]=n,e[5]=t,e[6]=x):x=e[6];const y=x;let l;e[7]!==g?(l=s=>!s&&g(),e[7]=g,e[8]=l):l=e[8];let p;e[9]===Symbol.for("react.memo_cache_sentinel")?(p=o.jsx(q,{children:o.jsx(v,{})}),e[9]=p):p=e[9];const j=m?.name;let a;e[10]!==j?(a=o.jsx("h3",{className:"font-bold text-2xl mb-2",children:j}),e[10]=j,e[11]=a):a=e[11];const u=t?.name;let r;e[12]!==u?(r=o.jsx("h4",{className:"text-xl text-gray-600 mb-6",children:u}),e[12]=u,e[13]=r):r=e[13];let i;e[14]!==b||e[15]!==y||e[16]!==n||e[17]!==t?.name||e[18]!==t?.qr_code?(i=t?.qr_code?o.jsxs("div",{className:"flex flex-col items-center",children:[o.jsx("div",{className:"bg-white p-6 rounded-lg border-4 border-gray-300 mb-6",children:o.jsx("img",{src:t?.qr_code,alt:`${t?.name} QR Code`,className:"w-80 h-80 object-contain"})}),o.jsx("p",{className:"text-lg text-gray-600 mb-6",children:n("tables.scan-to-order")}),o.jsxs("div",{className:"flex gap-3 w-full max-w-md",children:[o.jsxs(w,{onClick:b,className:"flex-1 bg-green-500 hover:bg-green-600 text-white",children:[o.jsx(z,{className:"w-5 h-5 mr-2"}),n("tables.download")]}),o.jsxs(w,{onClick:y,className:"flex-1 bg-blue-500 hover:bg-blue-600 text-white",children:[o.jsx(R,{className:"w-5 h-5 mr-2"}),n("tables.print")]})]})]}):o.jsx("div",{className:"py-12",children:o.jsx("p",{className:"text-gray-500",children:n("store.no-qr-code")})}),e[14]=b,e[15]=y,e[16]=n,e[17]=t?.name,e[18]=t?.qr_code,e[19]=i):i=e[19];let c;e[20]!==a||e[21]!==r||e[22]!==i?(c=o.jsxs(C,{className:"sm:max-w-[525px]",children:[p,o.jsxs("div",{className:"text-center",children:[a,r,i]})]}),e[20]=a,e[21]=r,e[22]=i,e[23]=c):c=e[23];let h;return e[24]!==f||e[25]!==c||e[26]!==l?(h=o.jsx($,{open:f,onOpenChange:l,children:c}),e[24]=f,e[25]=c,e[26]=l,e[27]=h):h=e[27],h}export{G as default};
