"use strict";(self.webpackChunkjiangmiemie=self.webpackChunkjiangmiemie||[]).push([[6035],{3905:(t,e,n)=>{n.d(e,{Zo:()=>l,kt:()=>f});var r=n(7294);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function g(t,e){if(null==t)return{};var n,r,i=function(t,e){if(null==t)return{};var n,r,i={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}var s=r.createContext({}),c=function(t){var e=r.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):o(o({},e),t)),n},l=function(t){var e=c(t.components);return r.createElement(s.Provider,{value:e},t.children)},p="mdxType",u={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var n=t.components,i=t.mdxType,a=t.originalType,s=t.parentName,l=g(t,["components","mdxType","originalType","parentName"]),p=c(n),m=i,f=p["".concat(s,".").concat(m)]||p[m]||u[m]||a;return n?r.createElement(f,o(o({ref:e},l),{},{components:n})):r.createElement(f,o({ref:e},l))}));function f(t,e){var n=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var a=n.length,o=new Array(a);o[0]=m;var g={};for(var s in e)hasOwnProperty.call(e,s)&&(g[s]=e[s]);g.originalType=t,g[p]="string"==typeof t?t:i,o[1]=g;for(var c=2;c<a;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4460:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>g,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const a={tags:["git","\u5907\u5fd8\u5f55"],title:"Git\u5907\u5fd8\u5f55"},o=void 0,g={unversionedId:"Git\u5907\u5fd8\u5f55",id:"Git\u5907\u5fd8\u5f55",title:"Git\u5907\u5fd8\u5f55",description:"",source:"@site/sheets/Git\u5907\u5fd8\u5f55.md",sourceDirName:".",slug:"/Git\u5907\u5fd8\u5f55",permalink:"/sheets/Git\u5907\u5fd8\u5f55",draft:!1,editUrl:"https://github.com/jiangmiemie/blog/blob/master/sheets/Git\u5907\u5fd8\u5f55.md",tags:[{label:"git",permalink:"/sheets/tags/git"},{label:"\u5907\u5fd8\u5f55",permalink:"/sheets/tags/\u5907\u5fd8\u5f55"}],version:"current",frontMatter:{tags:["git","\u5907\u5fd8\u5f55"],title:"Git\u5907\u5fd8\u5f55"},sidebar:"tutorialSidebar",previous:{title:"CSS\u5907\u5fd8\u5f55",permalink:"/sheets/CSS\u5907\u5fd8\u5f55"},next:{title:"HTTP\u4e0eHTTPS",permalink:"/sheets/HTTP\u4e0eHTTPS"}},s={},c=[],l={toc:c},p="wrapper";function u(t){let{components:e,...n}=t;return(0,i.kt)(p,(0,r.Z)({},l,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"git tag -l | xargs git tag -d #\u5220\u9664\u6240\u6709\u672c\u5730\u5206\u652f\ngit fetch origin --prune #\u4ece\u8fdc\u7a0b\u62c9\u53d6\u6240\u6709\u4fe1\u606f\ngit branch -a --contains Tag_V1.0.0 # \u770b\u770b\u54ea\u4e2a\u5206\u652f\u5305\u542b\u8fd9\u4e2atag/commit\n\ngit log # \u67e5\u770b\u4f60\u8981\u56de\u5230\u7684\u90a3\u4e2a\u7248\u672c\ngit reset --hard HEAD^ # \u56de\u9000\u5230\u4e0a\u4e2a\u7248\u672c\ngit reset --hard commit_id # \u9000\u5230/\u8fdb\u5230 \u6307\u5b9acommit_id\ngit push origin HEAD --force #\u5c06\u672c\u5730\u7684\u4fee\u6539\u63d0\u4ea4\u5230\u8fdc\u7a0b\n\n\n#\u67e5\u8be2\u8fdc\u7a0btags\u7684\u547d\u4ee4\u5982\u4e0b\uff1a\ngit ls-remote --tags origin\n\n#tag\u5e38\u7528git\u547d\u4ee4\uff1a\ngit tag #\u5217\u51fa\u6240\u6709tag\ngit tag -l v1.* #\u5217\u51fa\u7b26\u5408\u6761\u4ef6\u7684tag\uff08\u7b5b\u9009\u4f5c\u7528\uff09\ngit tag [tag\u540d] #\u521b\u5efa\u8f7b\u91cftag\uff08\u65e0-m\u6807\u6ce8\u4fe1\u606f\uff09\ngit tag -a [tag\u540d] #\u521b\u5efa\u542b\u6ce8\u89e3\u7684tag\n\ngit push origin --tags #\u63a8\u9001\u6240\u6709\u672c\u5730tag\u5230\u8fdc\u7a0b\ngit push origin [\u672c\u5730tag\u540d] #\u63a8\u9001\u6307\u5b9a\u672c\u5730tag\u5230\u8fdc\u7a0b\n\ngit tag -d [\u672c\u5730tag\u540d] #\u5220\u9664\u672c\u5730\u6307\u5b9atag\ngit push origin :refs/tags/[\u8fdc\u7a0btag\u540d] #\u5220\u9664\u8fdc\u7a0b\u6307\u5b9atag\n\ngit fetch origin [\u8fdc\u7a0btag\u540d] #\u62c9\u53d6\u8fdc\u7a0b\u6307\u5b9atag\ngit show [tag\u540d] #\u663e\u793a\u6307\u5b9atag\u8be6\u7ec6\u4fe1\u606f\n")))}u.isMDXComponent=!0}}]);