import { ipcRenderer } from 'electron';
import { writeFileSync } from 'fs';
import { join } from 'path';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import generate from './generator';

const SvgGen = () => {
  const { seed, color } = useParams<{ seed: string; color: string }>();
  const [dir, setDir] = useState<string>(process.cwd());
  console.log(seed, color);
  const data = generate(seed ?? 0);

  const saveFileSvg = () => {
    const path = join(dir, `gen-${Date.now()}.svg`);
    writeFileSync(path, data);
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
    __html: data,
  };

  // eslint-disable-next-line react/no-danger
  return (
    <>
      <div dangerouslySetInnerHTML={innerHtml} />
      <div>
        <p>Current path to save {dir}</p>
        <button type="button" onClick={selectFolderClick}>
          Select folder
        </button>
        <button type="button" onClick={saveFileSvg}>
          Save to svg
        </button>
      </div>
    </>
  );
};

SvgGen.defaultProps = {
  id: 12345722,
};

export default SvgGen;
