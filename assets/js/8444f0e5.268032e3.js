"use strict";(self.webpackChunkjiangmiemie=self.webpackChunkjiangmiemie||[]).push([[1707],{9547:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>a,contentTitle:()=>d,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>t});var l=n(74848),r=n(28453);const s={},d="File \u5bf9\u8c61\uff0cFileList \u5bf9\u8c61\uff0cFileReader \u5bf9\u8c61",c={id:"\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/bom/file",title:"File \u5bf9\u8c61\uff0cFileList \u5bf9\u8c61\uff0cFileReader \u5bf9\u8c61",description:"File \u5bf9\u8c61",source:"@site/docs/docs/\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/10. bom/file.md",sourceDirName:"\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/10. bom",slug:"/\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/bom/file",permalink:"/docs/\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/bom/file",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u6d4f\u89c8\u5668\u73af\u5883\u6982\u8ff0",permalink:"/docs/\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/bom/engine"},next:{title:"\u8868\u5355\uff0cFormData \u5bf9\u8c61",permalink:"/docs/\u9009\u62e9\u7f16\u7a0b\u8bed\u8a00/JavaScript/bom/form"}},a={},t=[{value:"File \u5bf9\u8c61",id:"file-\u5bf9\u8c61",level:2},{value:"\u6784\u9020\u51fd\u6570",id:"\u6784\u9020\u51fd\u6570",level:3},{value:"\u5b9e\u4f8b\u5c5e\u6027\u548c\u5b9e\u4f8b\u65b9\u6cd5",id:"\u5b9e\u4f8b\u5c5e\u6027\u548c\u5b9e\u4f8b\u65b9\u6cd5",level:3},{value:"FileList \u5bf9\u8c61",id:"filelist-\u5bf9\u8c61",level:2},{value:"FileReader \u5bf9\u8c61",id:"filereader-\u5bf9\u8c61",level:2}];function o(e){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.h1,{id:"file-\u5bf9\u8c61filelist-\u5bf9\u8c61filereader-\u5bf9\u8c61",children:"File \u5bf9\u8c61\uff0cFileList \u5bf9\u8c61\uff0cFileReader \u5bf9\u8c61"}),"\n",(0,l.jsx)(i.h2,{id:"file-\u5bf9\u8c61",children:"File \u5bf9\u8c61"}),"\n",(0,l.jsx)(i.p,{children:"File \u5bf9\u8c61\u4ee3\u8868\u4e00\u4e2a\u6587\u4ef6\uff0c\u7528\u6765\u8bfb\u5199\u6587\u4ef6\u4fe1\u606f\u3002\u5b83\u7ee7\u627f\u4e86 Blob \u5bf9\u8c61\uff0c\u6216\u8005\u8bf4\u662f\u4e00\u79cd\u7279\u6b8a\u7684 Blob \u5bf9\u8c61\uff0c\u6240\u6709\u53ef\u4ee5\u4f7f\u7528 Blob \u5bf9\u8c61\u7684\u573a\u5408\u90fd\u53ef\u4ee5\u4f7f\u7528\u5b83\u3002"}),"\n",(0,l.jsxs)(i.p,{children:["\u6700\u5e38\u89c1\u7684\u4f7f\u7528\u573a\u5408\u662f\u8868\u5355\u7684\u6587\u4ef6\u4e0a\u4f20\u63a7\u4ef6\uff08",(0,l.jsx)(i.code,{children:'<input type="file">'}),"\uff09\uff0c\u7528\u6237\u9009\u4e2d\u6587\u4ef6\u4ee5\u540e\uff0c\u6d4f\u89c8\u5668\u5c31\u4f1a\u751f\u6210\u4e00\u4e2a\u6570\u7ec4\uff0c\u91cc\u9762\u662f\u6bcf\u4e00\u4e2a\u7528\u6237\u9009\u4e2d\u7684\u6587\u4ef6\uff0c\u5b83\u4eec\u90fd\u662f File \u5b9e\u4f8b\u5bf9\u8c61\u3002"]}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-javascript",children:'// HTML \u4ee3\u7801\u5982\u4e0b\n// <input id="fileItem" type="file">\nvar file = document.getElementById(\'fileItem\').files[0];\nfile instanceof File // true\n'})}),"\n",(0,l.jsxs)(i.p,{children:["\u4e0a\u9762\u4ee3\u7801\u4e2d\uff0c",(0,l.jsx)(i.code,{children:"file"}),"\u662f\u7528\u6237\u9009\u4e2d\u7684\u7b2c\u4e00\u4e2a\u6587\u4ef6\uff0c\u5b83\u662f File \u7684\u5b9e\u4f8b\u3002"]}),"\n",(0,l.jsx)(i.h3,{id:"\u6784\u9020\u51fd\u6570",children:"\u6784\u9020\u51fd\u6570"}),"\n",(0,l.jsxs)(i.p,{children:["\u6d4f\u89c8\u5668\u539f\u751f\u63d0\u4f9b\u4e00\u4e2a",(0,l.jsx)(i.code,{children:"File()"}),"\u6784\u9020\u51fd\u6570\uff0c\u7528\u6765\u751f\u6210 File \u5b9e\u4f8b\u5bf9\u8c61\u3002"]}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-javascript",children:"new File(array, name [, options])\n"})}),"\n",(0,l.jsxs)(i.p,{children:[(0,l.jsx)(i.code,{children:"File()"}),"\u6784\u9020\u51fd\u6570\u63a5\u53d7\u4e09\u4e2a\u53c2\u6570\u3002"]}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"array\uff1a\u4e00\u4e2a\u6570\u7ec4\uff0c\u6210\u5458\u53ef\u4ee5\u662f\u4e8c\u8fdb\u5236\u5bf9\u8c61\u6216\u5b57\u7b26\u4e32\uff0c\u8868\u793a\u6587\u4ef6\u7684\u5185\u5bb9\u3002"}),"\n",(0,l.jsx)(i.li,{children:"name\uff1a\u5b57\u7b26\u4e32\uff0c\u8868\u793a\u6587\u4ef6\u540d\u6216\u6587\u4ef6\u8def\u5f84\u3002"}),"\n",(0,l.jsx)(i.li,{children:"options\uff1a\u914d\u7f6e\u5bf9\u8c61\uff0c\u8bbe\u7f6e\u5b9e\u4f8b\u7684\u5c5e\u6027\u3002\u8be5\u53c2\u6570\u53ef\u9009\u3002"}),"\n"]}),"\n",(0,l.jsx)(i.p,{children:"\u7b2c\u4e09\u4e2a\u53c2\u6570\u914d\u7f6e\u5bf9\u8c61\uff0c\u53ef\u4ee5\u8bbe\u7f6e\u4e24\u4e2a\u5c5e\u6027\u3002"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"type\uff1a\u5b57\u7b26\u4e32\uff0c\u8868\u793a\u5b9e\u4f8b\u5bf9\u8c61\u7684 MIME \u7c7b\u578b\uff0c\u9ed8\u8ba4\u503c\u4e3a\u7a7a\u5b57\u7b26\u4e32\u3002"}),"\n",(0,l.jsxs)(i.li,{children:["lastModified\uff1a\u65f6\u95f4\u6233\uff0c\u8868\u793a\u4e0a\u6b21\u4fee\u6539\u7684\u65f6\u95f4\uff0c\u9ed8\u8ba4\u4e3a",(0,l.jsx)(i.code,{children:"Date.now()"}),"\u3002"]}),"\n"]}),"\n",(0,l.jsx)(i.p,{children:"\u4e0b\u9762\u662f\u4e00\u4e2a\u4f8b\u5b50\u3002"}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-javascript",children:"var file = new File(\n  ['foo'],\n  'foo.txt',\n  {\n    type: 'text/plain',\n  }\n);\n"})}),"\n",(0,l.jsx)(i.h3,{id:"\u5b9e\u4f8b\u5c5e\u6027\u548c\u5b9e\u4f8b\u65b9\u6cd5",children:"\u5b9e\u4f8b\u5c5e\u6027\u548c\u5b9e\u4f8b\u65b9\u6cd5"}),"\n",(0,l.jsx)(i.p,{children:"File \u5bf9\u8c61\u6709\u4ee5\u4e0b\u5b9e\u4f8b\u5c5e\u6027\u3002"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"File.lastModified\uff1a\u6700\u540e\u4fee\u6539\u65f6\u95f4"}),"\n",(0,l.jsx)(i.li,{children:"File.name\uff1a\u6587\u4ef6\u540d\u6216\u6587\u4ef6\u8def\u5f84"}),"\n",(0,l.jsx)(i.li,{children:"File.size\uff1a\u6587\u4ef6\u5927\u5c0f\uff08\u5355\u4f4d\u5b57\u8282\uff09"}),"\n",(0,l.jsx)(i.li,{children:"File.type\uff1a\u6587\u4ef6\u7684 MIME \u7c7b\u578b"}),"\n"]}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-javascript",children:'var myFile = new File([], \'file.bin\', {\n  lastModified: new Date(2018, 1, 1),\n});\nmyFile.lastModified // 1517414400000\nmyFile.name // "file.bin"\nmyFile.size // 0\nmyFile.type // ""\n'})}),"\n",(0,l.jsxs)(i.p,{children:["\u4e0a\u9762\u4ee3\u7801\u4e2d\uff0c\u7531\u4e8e",(0,l.jsx)(i.code,{children:"myFile"}),"\u7684\u5185\u5bb9\u4e3a\u7a7a\uff0c\u4e5f\u6ca1\u6709\u8bbe\u7f6e MIME \u7c7b\u578b\uff0c\u6240\u4ee5",(0,l.jsx)(i.code,{children:"size"}),"\u5c5e\u6027\u7b49\u4e8e0\uff0c",(0,l.jsx)(i.code,{children:"type"}),"\u5c5e\u6027\u7b49\u4e8e\u7a7a\u5b57\u7b26\u4e32\u3002"]}),"\n",(0,l.jsxs)(i.p,{children:["File \u5bf9\u8c61\u6ca1\u6709\u81ea\u5df1\u7684\u5b9e\u4f8b\u65b9\u6cd5\uff0c\u7531\u4e8e\u7ee7\u627f\u4e86 Blob \u5bf9\u8c61\uff0c\u56e0\u6b64\u53ef\u4ee5\u4f7f\u7528 Blob \u7684\u5b9e\u4f8b\u65b9\u6cd5",(0,l.jsx)(i.code,{children:"slice()"}),"\u3002"]}),"\n",(0,l.jsx)(i.h2,{id:"filelist-\u5bf9\u8c61",children:"FileList \u5bf9\u8c61"}),"\n",(0,l.jsxs)(i.p,{children:[(0,l.jsx)(i.code,{children:"FileList"}),"\u5bf9\u8c61\u662f\u4e00\u4e2a\u7c7b\u4f3c\u6570\u7ec4\u7684\u5bf9\u8c61\uff0c\u4ee3\u8868\u4e00\u7ec4\u9009\u4e2d\u7684\u6587\u4ef6\uff0c\u6bcf\u4e2a\u6210\u5458\u90fd\u662f\u4e00\u4e2a File \u5b9e\u4f8b\u3002\u5b83\u4e3b\u8981\u51fa\u73b0\u5728\u4e24\u4e2a\u573a\u5408\u3002"]}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:["\u6587\u4ef6\u63a7\u4ef6\u8282\u70b9\uff08",(0,l.jsx)(i.code,{children:'<input type="file">'}),"\uff09\u7684",(0,l.jsx)(i.code,{children:"files"}),"\u5c5e\u6027\uff0c\u8fd4\u56de\u4e00\u4e2a FileList \u5b9e\u4f8b\u3002"]}),"\n",(0,l.jsxs)(i.li,{children:["\u62d6\u62c9\u4e00\u7ec4\u6587\u4ef6\u65f6\uff0c\u76ee\u6807\u533a\u7684",(0,l.jsx)(i.code,{children:"DataTransfer.files"}),"\u5c5e\u6027\uff0c\u8fd4\u56de\u4e00\u4e2a FileList \u5b9e\u4f8b\u3002"]}),"\n"]}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-javascript",children:'// HTML \u4ee3\u7801\u5982\u4e0b\n// <input id="fileItem" type="file">\nvar files = document.getElementById(\'fileItem\').files;\nfiles instanceof FileList // true\n'})}),"\n",(0,l.jsxs)(i.p,{children:["\u4e0a\u9762\u4ee3\u7801\u4e2d\uff0c\u6587\u4ef6\u63a7\u4ef6\u7684",(0,l.jsx)(i.code,{children:"files"}),"\u5c5e\u6027\u662f\u4e00\u4e2a FileList \u5b9e\u4f8b\u3002"]}),"\n",(0,l.jsxs)(i.p,{children:["FileList \u7684\u5b9e\u4f8b\u5c5e\u6027\u4e3b\u8981\u662f",(0,l.jsx)(i.code,{children:"length"}),"\uff0c\u8868\u793a\u5305\u542b\u591a\u5c11\u4e2a\u6587\u4ef6\u3002"]}),"\n",(0,l.jsxs)(i.p,{children:["FileList \u7684\u5b9e\u4f8b\u65b9\u6cd5\u4e3b\u8981\u662f",(0,l.jsx)(i.code,{children:"item()"}),"\uff0c\u7528\u6765\u8fd4\u56de\u6307\u5b9a\u4f4d\u7f6e\u7684\u5b9e\u4f8b\u3002\u5b83\u63a5\u53d7\u4e00\u4e2a\u6574\u6570\u4f5c\u4e3a\u53c2\u6570\uff0c\u8868\u793a\u4f4d\u7f6e\u7684\u5e8f\u53f7\uff08\u4ece\u96f6\u5f00\u59cb\uff09\u3002\u4f46\u662f\uff0c\u7531\u4e8e FileList \u7684\u5b9e\u4f8b\u662f\u4e00\u4e2a\u7c7b\u4f3c\u6570\u7ec4\u7684\u5bf9\u8c61\uff0c\u53ef\u4ee5\u76f4\u63a5\u7528\u65b9\u62ec\u53f7\u8fd0\u7b97\u7b26\uff0c\u5373",(0,l.jsx)(i.code,{children:"myFileList[0]"}),"\u7b49\u540c\u4e8e",(0,l.jsx)(i.code,{children:"myFileList.item(0)"}),"\uff0c\u6240\u4ee5\u4e00\u822c\u7528\u4e0d\u5230",(0,l.jsx)(i.code,{children:"item()"}),"\u65b9\u6cd5\u3002"]}),"\n",(0,l.jsx)(i.h2,{id:"filereader-\u5bf9\u8c61",children:"FileReader \u5bf9\u8c61"}),"\n",(0,l.jsx)(i.p,{children:"FileReader \u5bf9\u8c61\u7528\u4e8e\u8bfb\u53d6 File \u5bf9\u8c61\u6216 Blob \u5bf9\u8c61\u6240\u5305\u542b\u7684\u6587\u4ef6\u5185\u5bb9\u3002"}),"\n",(0,l.jsxs)(i.p,{children:["\u6d4f\u89c8\u5668\u539f\u751f\u63d0\u4f9b\u4e00\u4e2a",(0,l.jsx)(i.code,{children:"FileReader"}),"\u6784\u9020\u51fd\u6570\uff0c\u7528\u6765\u751f\u6210 FileReader \u5b9e\u4f8b\u3002"]}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-javascript",children:"var reader = new FileReader();\n"})}),"\n",(0,l.jsx)(i.p,{children:"FileReader \u6709\u4ee5\u4e0b\u7684\u5b9e\u4f8b\u5c5e\u6027\u3002"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsx)(i.li,{children:"FileReader.error\uff1a\u8bfb\u53d6\u6587\u4ef6\u65f6\u4ea7\u751f\u7684\u9519\u8bef\u5bf9\u8c61"}),"\n",(0,l.jsxs)(i.li,{children:["FileReader.readyState\uff1a\u6574\u6570\uff0c\u8868\u793a\u8bfb\u53d6\u6587\u4ef6\u65f6\u7684\u5f53\u524d\u72b6\u6001\u3002\u4e00\u5171\u6709\u4e09\u79cd\u53ef\u80fd\u7684\u72b6\u6001\uff0c",(0,l.jsx)(i.code,{children:"0"}),"\u8868\u793a\u5c1a\u672a\u52a0\u8f7d\u4efb\u4f55\u6570\u636e\uff0c",(0,l.jsx)(i.code,{children:"1"}),"\u8868\u793a\u6570\u636e\u6b63\u5728\u52a0\u8f7d\uff0c",(0,l.jsx)(i.code,{children:"2"}),"\u8868\u793a\u52a0\u8f7d\u5b8c\u6210\u3002"]}),"\n",(0,l.jsx)(i.li,{children:"FileReader.result\uff1a\u8bfb\u53d6\u5b8c\u6210\u540e\u7684\u6587\u4ef6\u5185\u5bb9\uff0c\u6709\u53ef\u80fd\u662f\u5b57\u7b26\u4e32\uff0c\u4e5f\u53ef\u80fd\u662f\u4e00\u4e2a ArrayBuffer \u5b9e\u4f8b\u3002"}),"\n",(0,l.jsxs)(i.li,{children:["FileReader.onabort\uff1a",(0,l.jsx)(i.code,{children:"abort"}),"\u4e8b\u4ef6\uff08\u7528\u6237\u7ec8\u6b62\u8bfb\u53d6\u64cd\u4f5c\uff09\u7684\u76d1\u542c\u51fd\u6570\u3002"]}),"\n",(0,l.jsxs)(i.li,{children:["FileReader.onerror\uff1a",(0,l.jsx)(i.code,{children:"error"}),"\u4e8b\u4ef6\uff08\u8bfb\u53d6\u9519\u8bef\uff09\u7684\u76d1\u542c\u51fd\u6570\u3002"]}),"\n",(0,l.jsxs)(i.li,{children:["FileReader.onload\uff1a",(0,l.jsx)(i.code,{children:"load"}),"\u4e8b\u4ef6\uff08\u8bfb\u53d6\u64cd\u4f5c\u5b8c\u6210\uff09\u7684\u76d1\u542c\u51fd\u6570\uff0c\u901a\u5e38\u5728\u8fd9\u4e2a\u51fd\u6570\u91cc\u9762\u4f7f\u7528",(0,l.jsx)(i.code,{children:"result"}),"\u5c5e\u6027\uff0c\u62ff\u5230\u6587\u4ef6\u5185\u5bb9\u3002"]}),"\n",(0,l.jsxs)(i.li,{children:["FileReader.onloadstart\uff1a",(0,l.jsx)(i.code,{children:"loadstart"}),"\u4e8b\u4ef6\uff08\u8bfb\u53d6\u64cd\u4f5c\u5f00\u59cb\uff09\u7684\u76d1\u542c\u51fd\u6570\u3002"]}),"\n",(0,l.jsxs)(i.li,{children:["FileReader.onloadend\uff1a",(0,l.jsx)(i.code,{children:"loadend"}),"\u4e8b\u4ef6\uff08\u8bfb\u53d6\u64cd\u4f5c\u7ed3\u675f\uff09\u7684\u76d1\u542c\u51fd\u6570\u3002"]}),"\n",(0,l.jsxs)(i.li,{children:["FileReader.onprogress\uff1a",(0,l.jsx)(i.code,{children:"progress"}),"\u4e8b\u4ef6\uff08\u8bfb\u53d6\u64cd\u4f5c\u8fdb\u884c\u4e2d\uff09\u7684\u76d1\u542c\u51fd\u6570\u3002"]}),"\n"]}),"\n",(0,l.jsxs)(i.p,{children:["\u4e0b\u9762\u662f\u76d1\u542c",(0,l.jsx)(i.code,{children:"load"}),"\u4e8b\u4ef6\u7684\u4e00\u4e2a\u4f8b\u5b50\u3002"]}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-javascript",children:'// HTML \u4ee3\u7801\u5982\u4e0b\n// <input type="file" onchange="onChange(event)">\n\nfunction onChange(event) {\n  var file = event.target.files[0];\n  var reader = new FileReader();\n  reader.onload = function (event) {\n    console.log(event.target.result)\n  };\n\n  reader.readAsText(file);\n}\n'})}),"\n",(0,l.jsxs)(i.p,{children:["\u4e0a\u9762\u4ee3\u7801\u4e2d\uff0c\u6bcf\u5f53\u6587\u4ef6\u63a7\u4ef6\u53d1\u751f\u53d8\u5316\uff0c\u5c31\u5c1d\u8bd5\u8bfb\u53d6\u7b2c\u4e00\u4e2a\u6587\u4ef6\u3002\u5982\u679c\u8bfb\u53d6\u6210\u529f\uff08",(0,l.jsx)(i.code,{children:"load"}),"\u4e8b\u4ef6\u53d1\u751f\uff09\uff0c\u5c31\u6253\u5370\u51fa\u6587\u4ef6\u5185\u5bb9\u3002"]}),"\n",(0,l.jsx)(i.p,{children:"FileReader \u6709\u4ee5\u4e0b\u5b9e\u4f8b\u65b9\u6cd5\u3002"}),"\n",(0,l.jsxs)(i.ul,{children:["\n",(0,l.jsxs)(i.li,{children:["FileReader.abort()\uff1a\u7ec8\u6b62\u8bfb\u53d6\u64cd\u4f5c\uff0c",(0,l.jsx)(i.code,{children:"readyState"}),"\u5c5e\u6027\u5c06\u53d8\u6210",(0,l.jsx)(i.code,{children:"2"}),"\u3002"]}),"\n",(0,l.jsxs)(i.li,{children:["FileReader.readAsArrayBuffer()\uff1a\u4ee5 ArrayBuffer \u7684\u683c\u5f0f\u8bfb\u53d6\u6587\u4ef6\uff0c\u8bfb\u53d6\u5b8c\u6210\u540e",(0,l.jsx)(i.code,{children:"result"}),"\u5c5e\u6027\u5c06\u8fd4\u56de\u4e00\u4e2a ArrayBuffer \u5b9e\u4f8b\u3002"]}),"\n",(0,l.jsxs)(i.li,{children:["FileReader.readAsBinaryString()\uff1a\u8bfb\u53d6\u5b8c\u6210\u540e\uff0c",(0,l.jsx)(i.code,{children:"result"}),"\u5c5e\u6027\u5c06\u8fd4\u56de\u539f\u59cb\u7684\u4e8c\u8fdb\u5236\u5b57\u7b26\u4e32\u3002"]}),"\n",(0,l.jsxs)(i.li,{children:["FileReader.readAsDataURL()\uff1a\u8bfb\u53d6\u5b8c\u6210\u540e\uff0c",(0,l.jsx)(i.code,{children:"result"}),"\u5c5e\u6027\u5c06\u8fd4\u56de\u4e00\u4e2a Data URL \u683c\u5f0f\uff08Base64 \u7f16\u7801\uff09\u7684\u5b57\u7b26\u4e32\uff0c\u4ee3\u8868\u6587\u4ef6\u5185\u5bb9\u3002\u5bf9\u4e8e\u56fe\u7247\u6587\u4ef6\uff0c\u8fd9\u4e2a\u5b57\u7b26\u4e32\u53ef\u4ee5\u7528\u4e8e",(0,l.jsx)(i.code,{children:"<img>"}),"\u5143\u7d20\u7684",(0,l.jsx)(i.code,{children:"src"}),"\u5c5e\u6027\u3002\u6ce8\u610f\uff0c\u8fd9\u4e2a\u5b57\u7b26\u4e32\u4e0d\u80fd\u76f4\u63a5\u8fdb\u884c Base64 \u89e3\u7801\uff0c\u5fc5\u987b\u628a\u524d\u7f00",(0,l.jsx)(i.code,{children:"data:*/*;base64,"}),"\u4ece\u5b57\u7b26\u4e32\u91cc\u5220\u9664\u4ee5\u540e\uff0c\u518d\u8fdb\u884c\u89e3\u7801\u3002"]}),"\n",(0,l.jsxs)(i.li,{children:["FileReader.readAsText()\uff1a\u8bfb\u53d6\u5b8c\u6210\u540e\uff0c",(0,l.jsx)(i.code,{children:"result"}),"\u5c5e\u6027\u5c06\u8fd4\u56de\u6587\u4ef6\u5185\u5bb9\u7684\u6587\u672c\u5b57\u7b26\u4e32\u3002\u8be5\u65b9\u6cd5\u7684\u7b2c\u4e00\u4e2a\u53c2\u6570\u662f\u4ee3\u8868\u6587\u4ef6\u7684 Blob \u5b9e\u4f8b\uff0c\u7b2c\u4e8c\u4e2a\u53c2\u6570\u662f\u53ef\u9009\u7684\uff0c\u8868\u793a\u6587\u672c\u7f16\u7801\uff0c\u9ed8\u8ba4\u4e3a UTF-8\u3002"]}),"\n"]}),"\n",(0,l.jsx)(i.p,{children:"\u4e0b\u9762\u662f\u4e00\u4e2a\u4f8b\u5b50\u3002"}),"\n",(0,l.jsx)(i.pre,{children:(0,l.jsx)(i.code,{className:"language-javascript",children:'/* HTML \u4ee3\u7801\u5982\u4e0b\n  <input type="file" onchange="previewFile()">\n  <img src="" height="200">\n*/\n\nfunction previewFile() {\n  var preview = document.querySelector(\'img\');\n  var file    = document.querySelector(\'input[type=file]\').files[0];\n  var reader  = new FileReader();\n\n  reader.addEventListener(\'load\', function () {\n    preview.src = reader.result;\n  }, false);\n\n  if (file) {\n    reader.readAsDataURL(file);\n  }\n}\n'})}),"\n",(0,l.jsxs)(i.p,{children:["\u4e0a\u9762\u4ee3\u7801\u4e2d\uff0c\u7528\u6237\u9009\u4e2d\u56fe\u7247\u6587\u4ef6\u4ee5\u540e\uff0c\u811a\u672c\u4f1a\u81ea\u52a8\u8bfb\u53d6\u6587\u4ef6\u5185\u5bb9\uff0c\u7136\u540e\u4f5c\u4e3a\u4e00\u4e2a Data URL \u8d4b\u503c\u7ed9",(0,l.jsx)(i.code,{children:"<img>"}),"\u5143\u7d20\u7684",(0,l.jsx)(i.code,{children:"src"}),"\u5c5e\u6027\uff0c\u4ece\u800c\u628a\u56fe\u7247\u5c55\u793a\u51fa\u6765\u3002"]})]})}function h(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,l.jsx)(i,{...e,children:(0,l.jsx)(o,{...e})}):o(e)}},28453:(e,i,n)=>{n.d(i,{R:()=>d,x:()=>c});var l=n(96540);const r={},s=l.createContext(r);function d(e){const i=l.useContext(s);return l.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),l.createElement(s.Provider,{value:i},e.children)}}}]);