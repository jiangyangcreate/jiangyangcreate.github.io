"use strict";(self.webpackChunkjiangmiemie=self.webpackChunkjiangmiemie||[]).push([[3751],{727:(e,t,a)=>{a.r(t),a.d(t,{default:()=>d});a(7294);var s=a(6010),n=a(833),r=a(5281),l=a(5155),i=a(6090),c=a(197),g=a(2503),o=a(5893);function u(e){let{title:t}=e;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.d,{title:t}),(0,o.jsx)(c.Z,{tag:"doc_tags_list"})]})}function h(e){let{tags:t,title:a}=e;return(0,o.jsx)(n.FG,{className:(0,s.Z)(r.k.page.docsTagsListPage),children:(0,o.jsx)("div",{className:"container margin-vert--lg",children:(0,o.jsx)("div",{className:"row",children:(0,o.jsxs)("main",{className:"col col--8 col--offset-2",children:[(0,o.jsx)(g.Z,{as:"h1",children:a}),(0,o.jsx)(i.Z,{tags:t})]})})})})}function d(e){const t=(0,l.M)();return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(u,{...e,title:t}),(0,o.jsx)(h,{...e,title:t})]})}},3008:(e,t,a)=>{a.d(t,{Z:()=>i});a(7294);var s=a(6010),n=a(9960);const r={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var l=a(5893);function i(e){let{permalink:t,label:a,count:i}=e;return(0,l.jsxs)(n.Z,{href:t,className:(0,s.Z)(r.tag,i?r.tagWithCount:r.tagRegular),children:[a,i&&(0,l.jsx)("span",{children:i})]})}},6090:(e,t,a)=>{a.d(t,{Z:()=>g});a(7294);var s=a(5155),n=a(3008),r=a(2503);const l={tag:"tag_Nnez"};var i=a(5893);function c(e){let{letterEntry:t}=e;return(0,i.jsxs)("article",{children:[(0,i.jsx)(r.Z,{as:"h2",id:t.letter,children:t.letter}),(0,i.jsx)("ul",{className:"padding--none",children:t.tags.map((e=>(0,i.jsx)("li",{className:l.tag,children:(0,i.jsx)(n.Z,{...e})},e.permalink)))}),(0,i.jsx)("hr",{})]})}function g(e){let{tags:t}=e;const a=(0,s.P)(t);return(0,i.jsx)("section",{className:"margin-vert--lg",children:a.map((e=>(0,i.jsx)(c,{letterEntry:e},e.letter)))})}},5155:(e,t,a)=>{a.d(t,{M:()=>n,P:()=>r});var s=a(5999);const n=()=>(0,s.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});function r(e){const t={};return Object.values(e).forEach((e=>{const a=function(e){return e[0].toUpperCase()}(e.label);t[a]??=[],t[a].push(e)})),Object.entries(t).sort(((e,t)=>{let[a]=e,[s]=t;return a.localeCompare(s)})).map((e=>{let[t,a]=e;return{letter:t,tags:a.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}}}]);