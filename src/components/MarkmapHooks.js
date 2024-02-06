import React, { useState, useRef, useEffect } from "react";

// 思维导图部分
// 完整文档与修改可参见https://markmap.js.org/
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import { Toolbar } from "markmap-toolbar";
import { deriveOptions } from "markmap-view";

export default function MarkmapHooks({ initialMarkdown }) {
  const jsonOptions = {
    color: ["#DD551E"],
    initialExpandLevel: 3, //限制展开级别
    maxWidth: 500,
  };

  const markmapOptions = deriveOptions(jsonOptions);
  const t = new Transformer();
  const refSvg = useRef();
  const refTb = useRef();

  useEffect(() => {
    const mm = Markmap.create(refSvg.current, markmapOptions);
    const { root } = t.transform(initialMarkdown);
    mm.setData(root);
    mm.fit();

    const w = refTb.current;
    while (w?.firstChild) w.firstChild.remove();

    if (w) {
      const tb = new Toolbar();
      tb.setBrand(false);
      tb.attach(mm);
      tb.setItems(["fit","zoomIn", "zoomOut", ]);
      w.append(tb.render());
    }
  }, [initialMarkdown]);

  return (
    <div className="flex flex-col h-screen p-2">
      <React.Fragment>
        <svg className="flex-1" style={{ height: '50vh'}} ref={refSvg} />
        <div className="absolute bottom-1 right-1" ref={refTb}></div>
      </React.Fragment>
    </div>
  );
}