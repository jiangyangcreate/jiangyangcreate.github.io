"use strict";(self.webpackChunkjiangmiemie=self.webpackChunkjiangmiemie||[]).push([[4872],{6295:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>r});var s=t(5893),i=t(1151);const a={tags:["tensorflow","js"],title:"Js\u64cd\u4f5ctensorflow"},o=void 0,l={id:"Js\u64cd\u4f5ctensorflow",title:"Js\u64cd\u4f5ctensorflow",description:"KNN\u5206\u7c7b\u5668",source:"@site/sheets/Js\u64cd\u4f5ctensorflow.md",sourceDirName:".",slug:"/Js\u64cd\u4f5ctensorflow",permalink:"/sheets/Js\u64cd\u4f5ctensorflow",draft:!1,unlisted:!1,editUrl:"https://github.com/jiangmiemie/blog/blob/master/sheets/Js\u64cd\u4f5ctensorflow.md",tags:[{label:"tensorflow",permalink:"/sheets/tags/tensorflow"},{label:"js",permalink:"/sheets/tags/js"}],version:"current",frontMatter:{tags:["tensorflow","js"],title:"Js\u64cd\u4f5ctensorflow"},sidebar:"tutorialSidebar",previous:{title:"HTTP\u4e0eHTTPS",permalink:"/sheets/HTTP\u4e0eHTTPS"},next:{title:"MD5\u52a0\u5bc6",permalink:"/sheets/MD5\u52a0\u5bc6"}},c={},r=[{value:"KNN\u5206\u7c7b\u5668",id:"knn\u5206\u7c7b\u5668",level:2}];function d(e){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"knn\u5206\u7c7b\u5668",children:"KNN\u5206\u7c7b\u5668"}),"\n",(0,s.jsx)(n.p,{children:"\u4e00\u4e2a\u57fa\u4e8etensorflow\u7684\u5b9e\u65f6\u7684\u8c03\u7528\u6444\u50cf\u5934\u7684\uff0c\u53ef\u4ee5\u5728\u7f51\u9875\u7aef\u8fd0\u884c\u3002"}),"\n",(0,s.jsxs)(n.p,{children:["\u65b0\u5efa",(0,s.jsx)(n.code,{children:".html"}),"\u5e76\u5c06\u4e0b\u65b9\u4ee3\u7801\u590d\u5236\u8fdb\u53bb\uff0c\u7528\u6d4f\u89c8\u5668\u6253\u5f00\u5373\u53ef\u3002"]}),"\n",(0,s.jsx)(n.p,{children:"\u8bf7\u5728\u8054\u7f51\u73af\u5883\u4e0b\u7528\u5148\u8fdb\u7684\u6d4f\u89c8\u5668\u6253\u5f00"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"\u7b49\u5f85\u6a21\u578b\u52a0\u8f7d\uff08\u52a0\u8f7d\u5b8c\u6210\u540e\u4f1a\u63d0\u793a\u4f7f\u7528\u6444\u50cf\u5934\uff09"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"\u70b9\u51fbAdd A\u5219\u83b7\u53d6\u5f53\u524d\u6444\u50cf\u5934\u622a\u56fe\u52a0\u5165A\u8bad\u7ec3\u96c6"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"\u4ee5\u6b64\u7c7b\u63a8\u6dfb\u52a0B\u3001C\u8bad\u7ec3\u96c6"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"\u89c2\u5bdf\u5c4f\u5e55\u8f93\u51fa\u7684\u9884\u6d4b\u7ed3\u679c"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:"\n<html><head>\n    \x3c!-- Load the latest version of TensorFlow.js --\x3e\n    <script src=\"https://cdn.jsdelivr.net/npm/@tensorflow/tfjs\"><\/script>\n    <script src=\"https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet\"><\/script>\n    <script src=\"https://cdn.jsdelivr.net/npm/@tensorflow-models/knn-classifier\"><\/script>\n</head>\n\n<body>\n    <div style=\"text-align:center\">\n        <div id=\"console\"></div>\n        \x3c!-- Add an image that we will use to test --\x3e\n        <video autoplay=\"\" playsinline=\"\" muted=\"\" id=\"webcam\" width=\"224\" height=\"224\"></video>\n        <br>\n        <button id=\"class-a\">Add A</button>\n        <button id=\"class-b\">Add B</button>\n        <button id=\"class-c\">Add C</button>\n    </div>\n    <script>\n        const classifier = knnClassifier.create();\n        const webcamElement = document.getElementById('webcam');\n\n        async function app() {\n            console.log('Loading mobilenet..');\n\n            // Load the model.\n            net = await mobilenet.load();\n            console.log('Successfully loaded model');\n\n            // Create an object from Tensorflow.js data API which could capture image\n            // from the web camera as Tensor.\n            const webcam = await tf.data.webcam(webcamElement);\n\n            // Reads an image from the webcam and associates it with a specific class\n            // index.\n            const addExample = async classId => {\n                // Capture an image from the web camera.\n                const img = await webcam.capture();\n\n                // Get the intermediate activation of MobileNet 'conv_preds' and pass that\n                // to the KNN classifier.\n                const activation = net.infer(img, true);\n\n                // Pass the intermediate activation to the classifier.\n                classifier.addExample(activation, classId);\n\n                // Dispose the tensor to release the memory.\n                img.dispose();\n            };\n\n            // When clicking a button, add an example for that class.\n            document.getElementById('class-a').addEventListener('click', () => addExample(0));\n            document.getElementById('class-b').addEventListener('click', () => addExample(1));\n            document.getElementById('class-c').addEventListener('click', () => addExample(2));\n\n            while (true) {\n                if (classifier.getNumClasses() > 0) {\n                    const img = await webcam.capture();\n\n                    // Get the activation from mobilenet from the webcam.\n                    const activation = net.infer(img, 'conv_preds');\n                    // Get the most likely class and confidence from the classifier module.\n                    const result = await classifier.predictClass(activation);\n\n                    const classes = ['A', 'B', 'C'];\n                    document.getElementById('console').innerText = `\n    prediction: ${classes[result.label]}\\n\n    probability: ${result.confidences[result.label]}\n    `;\n\n                    // Dispose the tensor to release the memory.\n                    img.dispose();\n                }\n\n                await tf.nextFrame();\n            }\n        }\n\n        app();\n    <\/script>\n\n\n</body></html>\n\n"})})]})}function m(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>o});var s=t(7294);const i={},a=s.createContext(i);function o(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);