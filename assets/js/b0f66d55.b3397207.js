"use strict";(self.webpackChunkjiangmiemie=self.webpackChunkjiangmiemie||[]).push([[4745],{4154:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>p,contentTitle:()=>r,default:()=>_,frontMatter:()=>o,metadata:()=>s,toc:()=>h});var t=i(5893),a=i(1151);const o={tags:["python","office"],title:"Python\u64cd\u4f5c\u56fe\u7247"},r=void 0,s={id:"Python\u64cd\u4f5c\u56fe\u7247",title:"Python\u64cd\u4f5c\u56fe\u7247",description:"\u56fe\u7247\u8f6c\u65b9\u56fe\u5e76\u5207\u6210\u4e5d\u5bab\u683c",source:"@site/sheets/Python\u64cd\u4f5c\u56fe\u7247.md",sourceDirName:".",slug:"/Python\u64cd\u4f5c\u56fe\u7247",permalink:"/sheets/Python\u64cd\u4f5c\u56fe\u7247",draft:!1,unlisted:!1,editUrl:"https://github.com/jiangmiemie/blog/blob/master/sheets/Python\u64cd\u4f5c\u56fe\u7247.md",tags:[{label:"python",permalink:"/sheets/tags/python"},{label:"office",permalink:"/sheets/tags/office"}],version:"current",frontMatter:{tags:["python","office"],title:"Python\u64cd\u4f5c\u56fe\u7247"},sidebar:"tutorialSidebar",previous:{title:"Python\u64cd\u4f5cpyecharts",permalink:"/sheets/Python\u64cd\u4f5cpyecharts"},next:{title:"Python\u64cd\u4f5c\u6587\u4ef6\u540d",permalink:"/sheets/Python\u64cd\u4f5c\u6587\u4ef6\u540d"}},p={},h=[{value:"\u56fe\u7247\u8f6c\u65b9\u56fe\u5e76\u5207\u6210\u4e5d\u5bab\u683c",id:"\u56fe\u7247\u8f6c\u65b9\u56fe\u5e76\u5207\u6210\u4e5d\u5bab\u683c",level:2},{value:"\u56fe\u7247\u62fc\u63a5",id:"\u56fe\u7247\u62fc\u63a5",level:2}];function m(e){const n={code:"code",h2:"h2",pre:"pre",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"\u56fe\u7247\u8f6c\u65b9\u56fe\u5e76\u5207\u6210\u4e5d\u5bab\u683c",children:"\u56fe\u7247\u8f6c\u65b9\u56fe\u5e76\u5207\u6210\u4e5d\u5bab\u683c"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"'''\n\u8f6c\u65b9\u56fe\u5e76\u5207\u6210\u4e5d\u5bab\u683c\n'''\nfrom PIL import Image\nimport sys\nimport winreg\nimport os\n#\u5c06\u56fe\u7247\u586b\u5145\u4e3a\u6b63\u65b9\u5f62\ndef fill_image(image):\n    width, height = image.size\n    #\u9009\u53d6\u957f\u548c\u5bbd\u4e2d\u8f83\u5927\u503c\u4f5c\u4e3a\u65b0\u56fe\u7247\u7684\n    new_image_length = width if width > height else height\n    #\u751f\u6210\u65b0\u56fe\u7247[\u767d\u5e95]\n    new_image = Image.new(image.mode, (new_image_length, new_image_length), color='white')\n    #\u5c06\u4e4b\u524d\u7684\u56fe\u7c98\u8d34\u5728\u65b0\u56fe\u4e0a\uff0c\u5c45\u4e2d\n    if width > height:#\u539f\u56fe\u5bbd\u5927\u4e8e\u9ad8\uff0c\u5219\u586b\u5145\u56fe\u7247\u7684\u7ad6\u76f4\u7ef4\u5ea6\n        new_image.paste(image, (0, int((new_image_length - height) / 2)))#(x,y)\u4e8c\u5143\u7ec4\u8868\u793a\u7c98\u8d34\u4e0a\u56fe\u76f8\u5bf9\u4e0b\u56fe\u7684\u8d77\u59cb\u4f4d\u7f6e\n    else:\n        new_image.paste(image, (int((new_image_length - width) / 2),0))\n    return new_image\n#\u5207\u56fe\ndef cut_image(image):\n    width, height = image.size\n    item_width = int(width / 3)\n    box_list = []\n    # (left, upper, right, lower)\n    for i in range(0,3):\n        for j in range(0,3):\n            #print((i*item_width,j*item_width,(i+1)*item_width,(j+1)*item_width))\n            box = (j*item_width,i*item_width,(j+1)*item_width,(i+1)*item_width)\n            box_list.append(box)\n    \n    image_list = [image.crop(box) for box in box_list]\n\n    return image_list\n#\u4fdd\u5b58\ndef save_images(image_list):\n    Desktoppath = winreg.QueryValueEx(winreg.OpenKey(winreg.HKEY_CURRENT_USER,r'Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Shell Folders'), \"Desktop\")[0]#\u83b7\u53d6\u7535\u8111\u7cfb\u7edf\u684c\u9762\u8def\u5f84\n    os.makedirs(Desktoppath+\"\\\\result\") #\u521b\u5efa\u4e00\u4e2a\u6587\u4ef6\u5939\n    newfiledirs = Desktoppath+\"\\\\result\"\n    index = 1\n    for image in image_list:\n        image.save(newfiledirs+\"\\\\\"+str(index) + '.png', 'PNG')\n        index += 1\n        \nif __name__ == '__main__':\n    \u6587\u4ef6\u8def\u5f84 = input('\u8bf7\u8f93\u5165\u4f60\u7684\u8f6c\u5316\u7684\u6587\u4ef6\u8def\u5f84\uff08\u522b\u5fd8\u4e86\u52a0\u6587\u4ef6\u540e\u7f00\u540d\u54e6\uff09\uff1a')\n    image = Image.open(\u6587\u4ef6\u8def\u5f84)#\u653e\u5165\u56fe\u7247\u8def\u5f84\n    image = fill_image(image) #\u586b\u5145\n    image_list = cut_image(image) #\u5207\u5272\n    save_images(image_list) #\u4fdd\u5b58\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u56fe\u7247\u62fc\u63a5",children:"\u56fe\u7247\u62fc\u63a5"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"'''\n\u56fe\u7247\u62fc\u63a5\n'''\n\n# encoding: utf-8\ndef merge_LR(pics): #\u5de6\u53f3\u62fc\u63a5\n    from imageio import imread\n    import skimage.io as io\n    import numpy as np\n    A_wordcould_path = 'wordcould1.png'#\u5408\u5e76\u540e\u56fe\u7247\u7684\u540d\u5b57\n    #\u6a2a\u5411\u62fc\u63a5\n    \u56fe\u72471 = io.imread(pics[0])   # np.ndarray, [h, w, c], \u503c\u57df(0, 255), RGB\n    \u56fe\u72472 = io.imread(pics[1])   # np.ndarray, [h, w, c], \u503c\u57df(0, 255), RGB\n    #print(\u56fe\u72471.dtype)\n    \u56fe\u72471_h = \u56fe\u72471.shape[0]   #\u67e5\u770b\u56fe\u7247\u7684\u5927\u5c0f\n    \u56fe\u72471_w = \u56fe\u72471.shape[1]\n    \u56fe\u72471_c = \u56fe\u72471.shape[2]\n    \u56fe\u72472_h = \u56fe\u72472.shape[0]   #\u67e5\u770b\u56fe\u7247\u7684\u5927\u5c0f\n    \u56fe\u72472_w = \u56fe\u72472.shape[1]\n    if \u56fe\u72471_h >= \u56fe\u72472_h :\n        pj1 = np.zeros((\u56fe\u72471_h,\u56fe\u72471_w+\u56fe\u72472_w,\u56fe\u72471_c))   #\u6a2a\u5411\u62fc\u63a5\n    else:\n        pj1 = np.zeros((\u56fe\u72472_h,\u56fe\u72471_w+\u56fe\u72472_w,\u56fe\u72471_c))  #\u6a2a\u5411\u62fc\u63a5\n    pj1[:,:\u56fe\u72471_w,:] = \u56fe\u72471.copy()   #\u56fe\u7247\u56fe\u72471\u5728\u5de6\n    pj1[:,\u56fe\u72472_w:,:] = \u56fe\u72472.copy()   #\u56fe\u7247\u56fe\u72472\u5728\u53f3\n    pj1=np.array(pj1,dtype=np.uint8)   #\u5c06pj1\u6570\u7ec4\u5143\u7d20\u6570\u636e\u7c7b\u578b\u7684\u6539\u4e3a\"uint8\"\n    io.imsave(A_wordcould_path, pj1)   #\u4fdd\u5b58\u62fc\u63a5\u540e\u7684\u56fe\u7247\n\ndef merge_UD(pics): #\u4e0a\u4e0b\u62fc\u63a5\n    from imageio import imread\n    import skimage.io as io\n    import numpy as np\n    B_wordcould_path = 'wordcould2.png'\n    # \u4e0a\u9762\u4e0e\u4e0b\u9762\u62fc\u63a5\n    \u56fe\u72471 = io.imread(pics[0])   # np.ndarray, [h, w, c], \u503c\u57df(0, 255), RGB\n    \u56fe\u72472 = io.imread(pics[1])   # np.ndarray, [h, w, c], \u503c\u57df(0, 255), RGB\n    \u56fe\u72471_h = \u56fe\u72471.shape[0]   #\u67e5\u770b\u56fe\u7247\u7684\u5927\u5c0f\n    \u56fe\u72471_w = \u56fe\u72471.shape[1]\n    \u56fe\u72471_c = \u56fe\u72471.shape[2]\n    \u56fe\u72472_h = \u56fe\u72472.shape[0]   #\u67e5\u770b\u56fe\u7247\u7684\u5927\u5c0f\n    \u56fe\u72472_w = \u56fe\u72472.shape[1]\n    if \u56fe\u72471_w >= \u56fe\u72472_w :\n        pj = np.zeros((\u56fe\u72471_h+\u56fe\u72472_h,\u56fe\u72471_w,\u56fe\u72471_c))   #\u7ad6\u5411\u62fc\u63a5\n    else:\n        pj = np.zeros((\u56fe\u72472_h+\u56fe\u72472_h,\u56fe\u72472_w,\u56fe\u72471_c))  #\u7ad6\u5411\u62fc\u63a5\n    #\u8ba1\u7b97\u6700\u7ec8\u56fe\u7247\u7684\u50cf\u7d20\u5927\u5c0f\n    pj[:\u56fe\u72471_h,:,:] = \u56fe\u72471.copy()   #\u56fe\u7247\u56fe\u72471\u5728\u5de6\n    pj[\u56fe\u72472_h:,:,:] = \u56fe\u72472.copy()   #\u56fe\u7247\u56fe\u72472\u5728\u53f3\n    pj=np.array(pj,dtype=np.uint8)   #\u5c06pj\u6570\u7ec4\u5143\u7d20\u6570\u636e\u7c7b\u578b\u7684\u6539\u4e3a\"uint8\"\n    io.imsave(B_wordcould_path, pj)   #\u4fdd\u5b58\u62fc\u63a5\u540e\u7684\u56fe\u7247\n\npics = ['3.png','4.png']\nmerge_LR(pics) #\u5de6\u53f3\n#merge_UD(pics)#\u4e0a\u4e0b\n\n"})})]})}function _(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(m,{...e})}):m(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>s,a:()=>r});var t=i(7294);const a={},o=t.createContext(a);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);