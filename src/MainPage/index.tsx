import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const MainPage = () => {
  const [seed, setSeed] = useState<string>('0');
  const [color, setColor] = useState('#000');
  const { push } = useHistory();

  return (
    <div>
      <h1>ALCHEMY CIRCLE CREATOR</h1>
      <form>
        <label htmlFor="seed">
          <input
            value={seed}
            name="seed"
            id="seed"
            type="text"
            onChange={(evt) => setSeed(evt.target.value)}
          />
        </label>
        <label htmlFor="color">
          <input
            type="color"
            name="color"
            id="color"
            value={color}
            onChange={(evt) => setColor(evt.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            push(`/gen/${seed}/${color}`);
          }}
        >
          Generate
        </button>
      </form>
    </div>
  );
};

export default MainPage;
