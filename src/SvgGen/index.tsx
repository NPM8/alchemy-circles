import { ipcRenderer } from 'electron';
import { writeFileSync } from 'fs';
import { join } from 'path';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import generate from './generator';

const SvgGen = () => {
  const { seed, color, pow, background } = useParams<{
    seed: string;
    color: string;
    pow: string;
    background: string;
  }>();
  console.log(seed, color, pow, background);
  const [dir, setDir] = useState<string>(process.cwd());
  const data = generate(
    seed ?? 0,
    color,
    parseInt(pow, 10),
    !background || background === 'none' ? 'none' : `#${background}`
  );

  const saveFileSvg = () => {
    const path = join(dir, `gen-${Date.now()}.svg`);
    data.setAttribute('version', '1.1');

    data.removeAttribute('xmlns');
    data.removeAttribute('xlink');

    // These are needed for the svg
    if (!data.hasAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns')) {
      data.setAttributeNS(
        'http://www.w3.org/2000/xmlns/',
        'xmlns',
        'http://www.w3.org/2000/svg'
      );
    }

    if (!data.hasAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink')) {
      data.setAttributeNS(
        'http://www.w3.org/2000/xmlns/',
        'xmlns:xlink',
        'http://www.w3.org/1999/xlink'
      );
    }

    const xmlns = new XMLSerializer();

    const source = xmlns.serializeToString(data);

    const toWrite = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">${source}`;

    writeFileSync(path, toWrite);
    alert(`File saved as ${path}`);
  };

  const selectFolderClick = () => {
    ipcRenderer.send('select-dir', dir);
  };

  useEffect(() => {
    ipcRenderer.on('selected-dir', (_event, newDir) => {
      setDir(newDir.dir);
    });

    return () => {
      ipcRenderer.removeAllListeners('selected-dir');
    };
  });

  const innerHtml = {
    __html: data.outerHTML,
  };

  // eslint-disable-next-line react/no-danger
  return (
    <>
      <div dangerouslySetInnerHTML={innerHtml} id="handlerSvg" />
      <div>
        <p>Current path to save {dir}</p>
        <button type="button" onClick={selectFolderClick}>
          Select folder
        </button>
        <button type="button" onClick={saveFileSvg}>
          Save as svg
        </button>
      </div>
    </>
  );
};

SvgGen.defaultProps = {
  id: 12345722,
};

export default SvgGen;
