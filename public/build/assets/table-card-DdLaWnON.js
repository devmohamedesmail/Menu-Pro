import{c as W,j as l,b as F,z as D}from"./app-kGwYUa0z.js";import{C as G,d as H}from"./card-CuQ6clXK.js";import{B as I}from"./badge-DoKYBISH.js";import{B as k}from"./button-BeiW3-ru.js";import{u as J}from"./useTranslation-BoVRGzZt.js";import{Q as K}from"./qr-code-Co0xNWH0.js";import{E as L}from"./eye-C902v2aQ.js";import{P as O}from"./printer-DL2rqOkp.js";import{S as U}from"./square-pen-e7YKfTU3.js";import{T as X}from"./trash-2-riNF2Qbg.js";/* empty css            */import"./utils-DvRnx1Xn.js";import"./index-3pDJhQo6.js";import"./createLucideIcon-Bt4MPmOA.js";function fe(A){const e=W.c(60),{table:t,setSelectedTable:Q,setShowDialog:S,setQrTable:$,setShowQRModal:R}=A,{t:s}=J();let y;e[0]!==Q||e[1]!==S?(y=i=>{Q(i),S(!0)},e[0]=Q,e[1]=S,e[2]=y):y=e[2];const _=y;let N;e[3]!==s?(N=i=>{confirm(s("tables.confirm-delete-table"))&&F.delete(route("store.table.delete",i),{onSuccess:()=>{D.success(s("tables.table-deleted-successfully"))},onError:w=>{D.error(s("tables.table-deleted-failed"))}})},e[3]=s,e[4]=N):N=e[4];const E=N;let v;e[5]!==$||e[6]!==R?(v=i=>{$(i),R(!0)},e[5]=$,e[6]=R,e[7]=v):v=e[7];const B=v;let q;e[8]!==s?(q=i=>{const w=window.open("","","height=600,width=800");w&&i.qr_code&&(w.document.write(`
                <html>
                    <head>
                        <title>${s("store.print-qr-code")} - ${i.name}</title>
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
                                    padding: 0;
                                }
                            }
                        </style>
                    </head>
                    <body>
                   
                        <h2>${i.name}</h2>
                        <img src="${i.qr_code}" alt="${i.name} QR Code" />
                        <p>${s("store.scan-to-order")}</p>
                    </body>
                </html>
            `),w.document.close(),setTimeout(()=>{w.print()},500))},e[8]=s,e[9]=q):q=e[9];const P=q,M=t.id;let r;e[10]!==t.name?(r=l.jsx("h3",{className:"font-bold text-black dark:text-white text-xl",children:t.name}),e[10]=t.name,e[11]=r):r=e[11];const V=t.capacity;let a;e[12]!==s?(a=s("tables.capacity"),e[12]=s,e[13]=a):a=e[13];let o;e[14]!==a||e[15]!==t.capacity?(o=l.jsxs(I,{className:"text-black dark:text-white",children:[V," ",a]}),e[14]=a,e[15]=t.capacity,e[16]=o):o=e[16];let n;e[17]!==r||e[18]!==o?(n=l.jsx("div",{className:"bg-gradient-to-r from-main to-second p-4 text-white",children:l.jsxs("div",{className:"flex items-center justify-between",children:[r,o]})}),e[17]=r,e[18]=o,e[19]=n):n=e[19];let c;e[20]!==s||e[21]!==t.name||e[22]!==t.qr_code?(c=t.qr_code?l.jsx("div",{className:"mb-4",children:l.jsx("div",{className:"bg-white p-3 rounded border-2 border-gray-200 flex items-center justify-center",children:l.jsx("img",{src:t.qr_code,alt:`${t.name} QR Code`,className:"w-32 h-32 object-contain"})})}):l.jsxs("div",{className:"mb-4 text-center py-8 bg-gray-50 rounded",children:[l.jsx(K,{className:"w-12 h-12 mx-auto text-gray-300 mb-2"}),l.jsx("p",{className:"text-sm text-gray-500",children:s("store.generating-qr")})]}),e[20]=s,e[21]=t.name,e[22]=t.qr_code,e[23]=c):c=e[23];let d;e[24]!==P||e[25]!==B||e[26]!==s||e[27]!==t?(d=t.qr_code&&l.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[l.jsxs(k,{onClick:()=>B(t),size:"sm",className:"bg-blue-500 hover:bg-blue-600 text-white",children:[l.jsx(L,{className:"w-4 h-4 mr-1"}),s("tables.view-qr")]}),l.jsxs(k,{onClick:()=>P(t),size:"sm",className:"bg-green-500 hover:bg-green-600 text-white",children:[l.jsx(O,{className:"w-4 h-4 mr-1"}),s("tables.print-qr")]})]}),e[24]=P,e[25]=B,e[26]=s,e[27]=t,e[28]=d):d=e[28];let m;e[29]!==_||e[30]!==t?(m=()=>_(t),e[29]=_,e[30]=t,e[31]=m):m=e[31];let C;e[32]===Symbol.for("react.memo_cache_sentinel")?(C=l.jsx(U,{className:"w-4 h-4 mr-1"}),e[32]=C):C=e[32];let f;e[33]!==s?(f=s("common.edit"),e[33]=s,e[34]=f):f=e[34];let h;e[35]!==m||e[36]!==f?(h=l.jsxs(k,{onClick:m,size:"sm",variant:"outline",className:"w-full",children:[C,f]}),e[35]=m,e[36]=f,e[37]=h):h=e[37];let x;e[38]!==E||e[39]!==t.id?(x=()=>E(t.id),e[38]=E,e[39]=t.id,e[40]=x):x=e[40];let z;e[41]===Symbol.for("react.memo_cache_sentinel")?(z=l.jsx(X,{className:"w-4 h-4 mr-1"}),e[41]=z):z=e[41];let p;e[42]!==s?(p=s("common.delete"),e[42]=s,e[43]=p):p=e[43];let b;e[44]!==x||e[45]!==p?(b=l.jsxs(k,{onClick:x,size:"sm",variant:"outline",className:"w-full text-red-600 hover:bg-red-50",children:[z,p]}),e[44]=x,e[45]=p,e[46]=b):b=e[46];let g;e[47]!==h||e[48]!==b?(g=l.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[h,b]}),e[47]=h,e[48]=b,e[49]=g):g=e[49];let u;e[50]!==d||e[51]!==g?(u=l.jsxs("div",{className:"space-y-2",children:[d,g]}),e[50]=d,e[51]=g,e[52]=u):u=e[52];let j;e[53]!==c||e[54]!==u?(j=l.jsxs(G,{className:"p-4",children:[c,u]}),e[53]=c,e[54]=u,e[55]=j):j=e[55];let T;return e[56]!==n||e[57]!==j||e[58]!==t.id?(T=l.jsxs(H,{className:"overflow-hidden hover:shadow-lg transition-shadow",children:[n,j]},M),e[56]=n,e[57]=j,e[58]=t.id,e[59]=T):T=e[59],T}export{fe as default};
