"use strict";(self.webpackChunkjiangmiemie=self.webpackChunkjiangmiemie||[]).push([[3481],{69867:(n,e,a)=>{a.r(e),a.d(e,{assets:()=>d,contentTitle:()=>i,default:()=>o,frontMatter:()=>c,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/stdlib/math","title":"Math \u5bf9\u8c61","description":"Math\u662f JavaScript \u7684\u539f\u751f\u5bf9\u8c61\uff0c\u63d0\u4f9b\u5404\u79cd\u6570\u5b66\u529f\u80fd\u3002\u8be5\u5bf9\u8c61\u4e0d\u662f\u6784\u9020\u51fd\u6570\uff0c\u4e0d\u80fd\u751f\u6210\u5b9e\u4f8b\uff0c\u6240\u6709\u7684\u5c5e\u6027\u548c\u65b9\u6cd5\u90fd\u5fc5\u987b\u5728Math\u5bf9\u8c61\u4e0a\u8c03\u7528\u3002","source":"@site/docs/docs/\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/5. stdlib/math.md","sourceDirName":"\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/5. stdlib","slug":"/\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/stdlib/math","permalink":"/docs/\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/stdlib/math","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"JSON \u5bf9\u8c61","permalink":"/docs/\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/stdlib/json"},"next":{"title":"Number \u5bf9\u8c61","permalink":"/docs/\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/stdlib/number"}}');var r=a(74848),h=a(28453);const c={},i="Math \u5bf9\u8c61",d={},l=[{value:"\u9759\u6001\u5c5e\u6027",id:"\u9759\u6001\u5c5e\u6027",level:2},{value:"\u9759\u6001\u65b9\u6cd5",id:"\u9759\u6001\u65b9\u6cd5",level:2},{value:"Math.abs()",id:"mathabs",level:3},{value:"Math.max()\uff0cMath.min()",id:"mathmaxmathmin",level:3},{value:"Math.floor()\uff0cMath.ceil()",id:"mathfloormathceil",level:3},{value:"Math.round()",id:"mathround",level:3},{value:"Math.pow()",id:"mathpow",level:3},{value:"Math.sqrt()",id:"mathsqrt",level:3},{value:"Math.log()",id:"mathlog",level:3},{value:"Math.exp()",id:"mathexp",level:3},{value:"Math.random()",id:"mathrandom",level:3},{value:"\u4e09\u89d2\u51fd\u6570\u65b9\u6cd5",id:"\u4e09\u89d2\u51fd\u6570\u65b9\u6cd5",level:3}];function t(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,h.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"math-\u5bf9\u8c61",children:"Math \u5bf9\u8c61"})}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math"}),"\u662f JavaScript \u7684\u539f\u751f\u5bf9\u8c61\uff0c\u63d0\u4f9b\u5404\u79cd\u6570\u5b66\u529f\u80fd\u3002\u8be5\u5bf9\u8c61\u4e0d\u662f\u6784\u9020\u51fd\u6570\uff0c\u4e0d\u80fd\u751f\u6210\u5b9e\u4f8b\uff0c\u6240\u6709\u7684\u5c5e\u6027\u548c\u65b9\u6cd5\u90fd\u5fc5\u987b\u5728",(0,r.jsx)(e.code,{children:"Math"}),"\u5bf9\u8c61\u4e0a\u8c03\u7528\u3002"]}),"\n",(0,r.jsx)(e.h2,{id:"\u9759\u6001\u5c5e\u6027",children:"\u9759\u6001\u5c5e\u6027"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math"}),"\u5bf9\u8c61\u7684\u9759\u6001\u5c5e\u6027\uff0c\u63d0\u4f9b\u4ee5\u4e0b\u4e00\u4e9b\u6570\u5b66\u5e38\u6570\u3002"]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.E"}),"\uff1a\u5e38\u6570",(0,r.jsx)(e.code,{children:"e"}),"\u3002"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.LN2"}),"\uff1a2 \u7684\u81ea\u7136\u5bf9\u6570\u3002"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.LN10"}),"\uff1a10 \u7684\u81ea\u7136\u5bf9\u6570\u3002"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.LOG2E"}),"\uff1a\u4ee5 2 \u4e3a\u5e95\u7684",(0,r.jsx)(e.code,{children:"e"}),"\u7684\u5bf9\u6570\u3002"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.LOG10E"}),"\uff1a\u4ee5 10 \u4e3a\u5e95\u7684",(0,r.jsx)(e.code,{children:"e"}),"\u7684\u5bf9\u6570\u3002"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.PI"}),"\uff1a\u5e38\u6570",(0,r.jsx)(e.code,{children:"\u03c0"}),"\u3002"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.SQRT1_2"}),"\uff1a0.5 \u7684\u5e73\u65b9\u6839\u3002"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.SQRT2"}),"\uff1a2 \u7684\u5e73\u65b9\u6839\u3002"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.E // 2.718281828459045\nMath.LN2 // 0.6931471805599453\nMath.LN10 // 2.302585092994046\nMath.LOG2E // 1.4426950408889634\nMath.LOG10E // 0.4342944819032518\nMath.PI // 3.141592653589793\nMath.SQRT1_2 // 0.7071067811865476\nMath.SQRT2 // 1.4142135623730951\n"})}),"\n",(0,r.jsx)(e.p,{children:"\u8fd9\u4e9b\u5c5e\u6027\u90fd\u662f\u53ea\u8bfb\u7684\uff0c\u4e0d\u80fd\u4fee\u6539\u3002"}),"\n",(0,r.jsx)(e.h2,{id:"\u9759\u6001\u65b9\u6cd5",children:"\u9759\u6001\u65b9\u6cd5"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math"}),"\u5bf9\u8c61\u63d0\u4f9b\u4ee5\u4e0b\u4e00\u4e9b\u9759\u6001\u65b9\u6cd5\u3002"]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.abs()"}),"\uff1a\u7edd\u5bf9\u503c"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.ceil()"}),"\uff1a\u5411\u4e0a\u53d6\u6574"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.floor()"}),"\uff1a\u5411\u4e0b\u53d6\u6574"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.max()"}),"\uff1a\u6700\u5927\u503c"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.min()"}),"\uff1a\u6700\u5c0f\u503c"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.pow()"}),"\uff1a\u5e42\u8fd0\u7b97"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.sqrt()"}),"\uff1a\u5e73\u65b9\u6839"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.log()"}),"\uff1a\u81ea\u7136\u5bf9\u6570"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.exp()"}),"\uff1a",(0,r.jsx)(e.code,{children:"e"}),"\u7684\u6307\u6570"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.round()"}),"\uff1a\u56db\u820d\u4e94\u5165"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.random()"}),"\uff1a\u968f\u673a\u6570"]}),"\n"]}),"\n",(0,r.jsx)(e.h3,{id:"mathabs",children:"Math.abs()"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math.abs"}),"\u65b9\u6cd5\u8fd4\u56de\u53c2\u6570\u503c\u7684\u7edd\u5bf9\u503c\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.abs(1) // 1\nMath.abs(-1) // 1\n"})}),"\n",(0,r.jsx)(e.h3,{id:"mathmaxmathmin",children:"Math.max()\uff0cMath.min()"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math.max"}),"\u65b9\u6cd5\u8fd4\u56de\u53c2\u6570\u4e4b\u4e2d\u6700\u5927\u7684\u90a3\u4e2a\u503c\uff0c",(0,r.jsx)(e.code,{children:"Math.min"}),"\u8fd4\u56de\u6700\u5c0f\u7684\u90a3\u4e2a\u503c\u3002\u5982\u679c\u53c2\u6570\u4e3a\u7a7a, ",(0,r.jsx)(e.code,{children:"Math.min"}),"\u8fd4\u56de",(0,r.jsx)(e.code,{children:"Infinity"}),", ",(0,r.jsx)(e.code,{children:"Math.max"}),"\u8fd4\u56de",(0,r.jsx)(e.code,{children:"-Infinity"}),"\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.max(2, -1, 5) // 5\nMath.min(2, -1, 5) // -1\nMath.min() // Infinity\nMath.max() // -Infinity\n"})}),"\n",(0,r.jsx)(e.h3,{id:"mathfloormathceil",children:"Math.floor()\uff0cMath.ceil()"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math.floor"}),"\u65b9\u6cd5\u8fd4\u56de\u5c0f\u4e8e\u6216\u7b49\u4e8e\u53c2\u6570\u503c\u7684\u6700\u5927\u6574\u6570\uff08\u5730\u677f\u503c\uff09\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.floor(3.2) // 3\nMath.floor(-3.2) // -4\n"})}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math.ceil"}),"\u65b9\u6cd5\u8fd4\u56de\u5927\u4e8e\u6216\u7b49\u4e8e\u53c2\u6570\u503c\u7684\u6700\u5c0f\u6574\u6570\uff08\u5929\u82b1\u677f\u503c\uff09\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.ceil(3.2) // 4\nMath.ceil(-3.2) // -3\n"})}),"\n",(0,r.jsx)(e.p,{children:"\u8fd9\u4e24\u4e2a\u65b9\u6cd5\u53ef\u4ee5\u7ed3\u5408\u8d77\u6765\uff0c\u5b9e\u73b0\u4e00\u4e2a\u603b\u662f\u8fd4\u56de\u6570\u503c\u7684\u6574\u6570\u90e8\u5206\u7684\u51fd\u6570\u3002"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"function ToInteger(x) {\n  x = Number(x);\n  return x < 0 ? Math.ceil(x) : Math.floor(x);\n}\n\nToInteger(3.2) // 3\nToInteger(3.5) // 3\nToInteger(3.8) // 3\nToInteger(-3.2) // -3\nToInteger(-3.5) // -3\nToInteger(-3.8) // -3\n"})}),"\n",(0,r.jsxs)(e.p,{children:["\u4e0a\u9762\u4ee3\u7801\u4e2d\uff0c\u4e0d\u7ba1\u6b63\u6570\u6216\u8d1f\u6570\uff0c",(0,r.jsx)(e.code,{children:"ToInteger"}),"\u51fd\u6570\u603b\u662f\u8fd4\u56de\u4e00\u4e2a\u6570\u503c\u7684\u6574\u6570\u90e8\u5206\u3002"]}),"\n",(0,r.jsx)(e.h3,{id:"mathround",children:"Math.round()"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math.round"}),"\u65b9\u6cd5\u7528\u4e8e\u56db\u820d\u4e94\u5165\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.round(0.1) // 0\nMath.round(0.5) // 1\nMath.round(0.6) // 1\n\n// \u7b49\u540c\u4e8e\nMath.floor(x + 0.5)\n"})}),"\n",(0,r.jsxs)(e.p,{children:["\u6ce8\u610f\uff0c\u5b83\u5bf9\u8d1f\u6570\u7684\u5904\u7406\uff08\u4e3b\u8981\u662f\u5bf9",(0,r.jsx)(e.code,{children:"0.5"}),"\u7684\u5904\u7406\uff09\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.round(-1.1) // -1\nMath.round(-1.5) // -1\nMath.round(-1.6) // -2\n"})}),"\n",(0,r.jsx)(e.h3,{id:"mathpow",children:"Math.pow()"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math.pow"}),"\u65b9\u6cd5\u8fd4\u56de\u4ee5\u7b2c\u4e00\u4e2a\u53c2\u6570\u4e3a\u5e95\u6570\u3001\u7b2c\u4e8c\u4e2a\u53c2\u6570\u4e3a\u6307\u6570\u7684\u5e42\u8fd0\u7b97\u503c\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"// \u7b49\u540c\u4e8e 2 ** 2\nMath.pow(2, 2) // 4\n// \u7b49\u540c\u4e8e 2 ** 3\nMath.pow(2, 3) // 8\n"})}),"\n",(0,r.jsx)(e.p,{children:"\u4e0b\u9762\u662f\u8ba1\u7b97\u5706\u9762\u79ef\u7684\u65b9\u6cd5\u3002"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"var radius = 20;\nvar area = Math.PI * Math.pow(radius, 2);\n"})}),"\n",(0,r.jsx)(e.h3,{id:"mathsqrt",children:"Math.sqrt()"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math.sqrt"}),"\u65b9\u6cd5\u8fd4\u56de\u53c2\u6570\u503c\u7684\u5e73\u65b9\u6839\u3002\u5982\u679c\u53c2\u6570\u662f\u4e00\u4e2a\u8d1f\u503c\uff0c\u5219\u8fd4\u56de",(0,r.jsx)(e.code,{children:"NaN"}),"\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.sqrt(4) // 2\nMath.sqrt(-4) // NaN\n"})}),"\n",(0,r.jsx)(e.h3,{id:"mathlog",children:"Math.log()"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math.log"}),"\u65b9\u6cd5\u8fd4\u56de\u4ee5",(0,r.jsx)(e.code,{children:"e"}),"\u4e3a\u5e95\u7684\u81ea\u7136\u5bf9\u6570\u503c\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.log(Math.E) // 1\nMath.log(10) // 2.302585092994046\n"})}),"\n",(0,r.jsxs)(e.p,{children:["\u5982\u679c\u8981\u8ba1\u7b97\u4ee510\u4e3a\u5e95\u7684\u5bf9\u6570\uff0c\u53ef\u4ee5\u5148\u7528",(0,r.jsx)(e.code,{children:"Math.log"}),"\u6c42\u51fa\u81ea\u7136\u5bf9\u6570\uff0c\u7136\u540e\u9664\u4ee5",(0,r.jsx)(e.code,{children:"Math.LN10"}),"\uff1b\u6c42\u4ee52\u4e3a\u5e95\u7684\u5bf9\u6570\uff0c\u53ef\u4ee5\u9664\u4ee5",(0,r.jsx)(e.code,{children:"Math.LN2"}),"\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.log(100)/Math.LN10 // 2\nMath.log(8)/Math.LN2 // 3\n"})}),"\n",(0,r.jsx)(e.h3,{id:"mathexp",children:"Math.exp()"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math.exp"}),"\u65b9\u6cd5\u8fd4\u56de\u5e38\u6570",(0,r.jsx)(e.code,{children:"e"}),"\u7684\u53c2\u6570\u6b21\u65b9\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.exp(1) // 2.718281828459045\nMath.exp(3) // 20.085536923187668\n"})}),"\n",(0,r.jsx)(e.h3,{id:"mathrandom",children:"Math.random()"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math.random()"}),"\u8fd4\u56de0\u52301\u4e4b\u95f4\u7684\u4e00\u4e2a\u4f2a\u968f\u673a\u6570\uff0c\u53ef\u80fd\u7b49\u4e8e0\uff0c\u4f46\u662f\u4e00\u5b9a\u5c0f\u4e8e1\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.random() // 0.7151307314634323\n"})}),"\n",(0,r.jsx)(e.p,{children:"\u4efb\u610f\u8303\u56f4\u7684\u968f\u673a\u6570\u751f\u6210\u51fd\u6570\u5982\u4e0b\u3002"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"function getRandomArbitrary(min, max) {\n  return Math.random() * (max - min) + min;\n}\n\ngetRandomArbitrary(1.5, 6.5)\n// 2.4942810038223864\n"})}),"\n",(0,r.jsx)(e.p,{children:"\u4efb\u610f\u8303\u56f4\u7684\u968f\u673a\u6574\u6570\u751f\u6210\u51fd\u6570\u5982\u4e0b\u3002"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"function getRandomInt(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\ngetRandomInt(1, 6) // 5\n"})}),"\n",(0,r.jsx)(e.p,{children:"\u8fd4\u56de\u968f\u673a\u5b57\u7b26\u7684\u4f8b\u5b50\u5982\u4e0b\u3002"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"function random_str(length) {\n  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';\n  ALPHABET += 'abcdefghijklmnopqrstuvwxyz';\n  ALPHABET += '0123456789-_';\n  var str = '';\n  for (var i = 0; i < length; ++i) {\n    var rand = Math.floor(Math.random() * ALPHABET.length);\n    str += ALPHABET.substring(rand, rand + 1);\n  }\n  return str;\n}\n\nrandom_str(6) // \"NdQKOr\"\n"})}),"\n",(0,r.jsxs)(e.p,{children:["\u4e0a\u9762\u4ee3\u7801\u4e2d\uff0c",(0,r.jsx)(e.code,{children:"random_str"}),"\u51fd\u6570\u63a5\u53d7\u4e00\u4e2a\u6574\u6570\u4f5c\u4e3a\u53c2\u6570\uff0c\u8fd4\u56de\u53d8\u91cf",(0,r.jsx)(e.code,{children:"ALPHABET"}),"\u5185\u7684\u968f\u673a\u5b57\u7b26\u6240\u7ec4\u6210\u7684\u6307\u5b9a\u957f\u5ea6\u7684\u5b57\u7b26\u4e32\u3002"]}),"\n",(0,r.jsx)(e.h3,{id:"\u4e09\u89d2\u51fd\u6570\u65b9\u6cd5",children:"\u4e09\u89d2\u51fd\u6570\u65b9\u6cd5"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Math"}),"\u5bf9\u8c61\u8fd8\u63d0\u4f9b\u4e00\u7cfb\u5217\u4e09\u89d2\u51fd\u6570\u65b9\u6cd5\u3002"]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.sin()"}),"\uff1a\u8fd4\u56de\u53c2\u6570\u7684\u6b63\u5f26\uff08\u53c2\u6570\u4e3a\u5f27\u5ea6\u503c\uff09"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.cos()"}),"\uff1a\u8fd4\u56de\u53c2\u6570\u7684\u4f59\u5f26\uff08\u53c2\u6570\u4e3a\u5f27\u5ea6\u503c\uff09"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.tan()"}),"\uff1a\u8fd4\u56de\u53c2\u6570\u7684\u6b63\u5207\uff08\u53c2\u6570\u4e3a\u5f27\u5ea6\u503c\uff09"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.asin()"}),"\uff1a\u8fd4\u56de\u53c2\u6570\u7684\u53cd\u6b63\u5f26\uff08\u8fd4\u56de\u503c\u4e3a\u5f27\u5ea6\u503c\uff09"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.acos()"}),"\uff1a\u8fd4\u56de\u53c2\u6570\u7684\u53cd\u4f59\u5f26\uff08\u8fd4\u56de\u503c\u4e3a\u5f27\u5ea6\u503c\uff09"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.code,{children:"Math.atan()"}),"\uff1a\u8fd4\u56de\u53c2\u6570\u7684\u53cd\u6b63\u5207\uff08\u8fd4\u56de\u503c\u4e3a\u5f27\u5ea6\u503c\uff09"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"Math.sin(0) // 0\nMath.cos(0) // 1\nMath.tan(0) // 0\n\nMath.sin(Math.PI / 2) // 1\n\nMath.asin(1) // 1.5707963267948966\nMath.acos(1) // 0\nMath.atan(1) // 0.7853981633974483\n"})})]})}function o(n={}){const{wrapper:e}={...(0,h.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(t,{...n})}):t(n)}},28453:(n,e,a)=>{a.d(e,{R:()=>c,x:()=>i});var s=a(96540);const r={},h=s.createContext(r);function c(n){const e=s.useContext(h);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:c(n.components),s.createElement(h.Provider,{value:e},n.children)}}}]);