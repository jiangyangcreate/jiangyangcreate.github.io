"use strict";(self.webpackChunkjiangmiemie=self.webpackChunkjiangmiemie||[]).push([[7004],{9333:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>t,metadata:()=>c,toc:()=>o});var r=s(5893),i=s(1151);const t={sidebar_position:2,title:"Terminal\u547d\u4ee4\u5907\u5fd8\u5f55"},a=void 0,c={id:"02\u7f16\u7a0b\u5916\u7684\u57fa\u7840/Terminal\u547d\u4ee4\u5907\u5fd8\u5f55",title:"Terminal\u547d\u4ee4\u5907\u5fd8\u5f55",description:"\u67e5\u770b\u7aef\u53e3\u53f7\u5360\u7528\u60c5\u51b5",source:"@site/docs/02\u7f16\u7a0b\u5916\u7684\u57fa\u7840/Terminal\u547d\u4ee4\u5907\u5fd8\u5f55.md",sourceDirName:"02\u7f16\u7a0b\u5916\u7684\u57fa\u7840",slug:"/02\u7f16\u7a0b\u5916\u7684\u57fa\u7840/Terminal\u547d\u4ee4\u5907\u5fd8\u5f55",permalink:"/docs/02\u7f16\u7a0b\u5916\u7684\u57fa\u7840/Terminal\u547d\u4ee4\u5907\u5fd8\u5f55",draft:!1,unlisted:!1,editUrl:"https://github.com/jiangmiemie/blog/blob/master/docs/02\u7f16\u7a0b\u5916\u7684\u57fa\u7840/Terminal\u547d\u4ee4\u5907\u5fd8\u5f55.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Terminal\u547d\u4ee4\u5907\u5fd8\u5f55"},sidebar:"tutorialSidebar",previous:{title:"\u7f16\u7a0b\u5916\u7684\u57fa\u7840\u6982\u8ff0",permalink:"/docs/02\u7f16\u7a0b\u5916\u7684\u57fa\u7840/"},next:{title:"\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00\u6982\u8ff0",permalink:"/docs/03\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/"}},l={},o=[];function d(e){const n={code:"code",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"\u67e5\u770b\u7aef\u53e3\u53f7\u5360\u7528\u60c5\u51b5"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"netstat -tunlp | grep \u7aef\u53e3\u53f7\n\nlsof -i:\u7aef\u53e3\u53f7\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u6740\u6389\u6307\u5b9a\u7aef\u53e3\u7684\u5e94\u7528(\u4ee56022\u4e3a\u4f8b)"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"kill -9 $(lsof -i tcp:6022 -t)\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u67e5\u770b\u5185\u5b58/\u663e\u793a\u7cfb\u7edf\u5f53\u524d\u8fdb\u7a0b\u4fe1\u606f"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"top\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u67e5\u770b\u78c1\u76d8\u50a8\u5b58\u72b6\u51b5"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"df -h\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u67e5\u770b\u62a5\u544a\u7cfb\u7edf\u8fd0\u884c\u65f6\u957f\u53ca\u5e73\u5747\u8d1f\u8f7d"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"uptime\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u663e\u793a\u5de5\u4f5c\u8def\u5f84"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"pwd\n"})}),"\n",(0,r.jsx)(n.p,{children:"\u590d\u5236\u6587\u4ef6"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"-a \uff1a\u5c06\u6587\u4ef6\u7684\u7279\u6027\u4e00\u8d77\u590d\u5236\n-p \uff1a\u8fde\u540c\u6587\u4ef6\u7684\u5c5e\u6027\u4e00\u8d77\u590d\u5236\uff0c\u800c\u975e\u4f7f\u7528\u9ed8\u8ba4\u65b9\u5f0f\uff0c\u4e0e-a\u76f8\u4f3c\uff0c\u5e38\u7528\u4e8e\u5907\u4efd\n-i \uff1a\u82e5\u76ee\u6807\u6587\u4ef6\u5df2\u7ecf\u5b58\u5728\u65f6\uff0c\u5728\u8986\u76d6\u65f6\u4f1a\u5148\u8be2\u95ee\u64cd\u4f5c\u7684\u8fdb\u884c\n-r \uff1a\u9012\u5f52\u6301\u7eed\u590d\u5236\uff0c\u7528\u4e8e\u76ee\u5f55\u7684\u590d\u5236\u884c\u4e3a\n-u \uff1a\u76ee\u6807\u6587\u4ef6\u4e0e\u6e90\u6587\u4ef6\u6709\u5dee\u5f02\u65f6\u624d\u4f1a\u590d\u5236\n"})})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>c,a:()=>a});var r=s(7294);const i={},t=r.createContext(i);function a(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);