"use strict";(self.webpackChunkjiangmiemie=self.webpackChunkjiangmiemie||[]).push([[2634],{30192:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d});var s=n(44586),r=n(44561),i=n(56347),c=n(96540),l=n(74848);const a=()=>{const[e,t]=(0,c.useState)(""),n=(0,i.W6)();(0,c.useEffect)((()=>{const t=document.querySelector(".search-box input");t&&(t.value=e)}),[e]);return(0,l.jsx)("div",{children:(0,l.jsx)("input",{type:"text",value:e,onChange:e=>{t(e.target.value),n.push(`/search?q=${e.target.value}`)},placeholder:"Search : Hello, World!",style:{width:"100%",padding:"10px",borderRadius:"20px",border:"1px solid #ccc"}})})},o=()=>{const[e,t]=(0,c.useState)(new Date);(0,c.useEffect)((()=>{const e=setInterval((()=>n()),1e3);return function(){clearInterval(e)}}),[]);const n=()=>{t(new Date)};return(0,l.jsx)("div",{style:{color:"black",height:"200px",display:"flex",justifyContent:"center",alignItems:"center"},children:(0,l.jsx)("h1",{children:e.toLocaleTimeString()})})};function u(){return(0,l.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"79vh",margin:"0 5%"},children:[(0,l.jsx)("div",{style:{marginBottom:"-60px"},children:(0,l.jsx)(o,{})}),(0,l.jsx)("h1",{style:{textShadow:"-1px 1px #3C3C3C, -10px 10px 5px #3C3C3C80"},children:(0,l.jsx)(a,{})})]})}function d(){const e=(0,s.A)(),{siteConfig:t={}}=e;return(0,l.jsx)(r.A,{description:t.tagline,keywords:t.customFields.keywords,wrapperClassName:"es-navbar-white",children:(0,l.jsx)(u,{})})}}}]);