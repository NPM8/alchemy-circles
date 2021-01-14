import React from 'react';

const SvgGen = () => {
  const ns = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const url = ns.namespaceURI;

  const rect = document.createElementNS(url, 'rect');
  rect.setAttribute('x', 5);
  rect.setAttribute('y', 5);
  rect.setAttribute('width', 500);
  rect.setAttribute('height', 500);
  rect.setAttribute('fill', '#aaa');
  ns.appendChild(rect);

  const innerHtml = {
    __html: ns.outerHTML,
  };

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={innerHtml} />;
};

export default SvgGen;
