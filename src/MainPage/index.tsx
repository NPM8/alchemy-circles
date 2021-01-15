import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const MainPage = () => {
  const [seed, setSeed] = useState<string>('0');
  const [color, setColor] = useState('#000');
  const { push } = useHistory();

  return (
    <div>
      <h1>ALCHEMY CIRCLE CREATOR</h1>
      <form className="mainForm">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="seed">Seed</label>
        <input
          value={seed}
          name="seed"
          id="seed"
          type="text"
          onChange={(evt) => setSeed(evt.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="color">Color</label>
        <input
          type="color"
          name="color"
          id="color"
          value={color}
          onChange={(evt) => setColor(evt.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            console.log(seed, color);
            push(`/gen/${seed}/${color.substr(1)}`);
          }}
        >
          Generate
        </button>
      </form>
    </div>
  );
};

export default MainPage;
