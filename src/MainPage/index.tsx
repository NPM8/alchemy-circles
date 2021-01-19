import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const MainPage = () => {
  const [seed, setSeed] = useState<string>('0');
  const [color, setColor] = useState('#000');
  const [size, setSize] = useState('2');
  const [background, togleBackground] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState('#ffffff');
  const { push } = useHistory();

  const randomSeed: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setSeed(Math.floor(Math.random() * 100000).toString());
  };

  return (
    <div>
      <h1>ALCHEMY CIRCLE CREATOR</h1>
      <form className="mainForm">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="seed">Seed</label>
        <div>
          <input
            value={seed}
            name="seed"
            id="seed"
            type="text"
            onChange={(evt) => setSeed(evt.target.value)}
          />
          <button type="button" onClick={randomSeed}>
            Random
          </button>
        </div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="color">Color</label>
        <input
          type="color"
          name="color"
          id="color"
          value={color}
          onChange={(evt) => setColor(evt.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="size">Size {2 ** (parseInt(size, 10) + 1)}</label>
        <input
          type="range"
          name="size"
          id="size"
          value={size}
          min="4"
          max="9"
          onChange={(evt) => setSize(evt.target.value)}
        />
        <div>
          <input
            type="checkbox"
            name="background"
            checked={background}
            onChange={(evt) => togleBackground(evt.target.checked)}
            id="backgroundCh"
          />
          Background
          <input
            type="color"
            disabled={!background}
            name="bgColor"
            id="bg-color"
            value={bgColor}
            onChange={(evt) => setBgColor(evt.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            console.log(seed, color);
            push(
              `/gen/${seed}/${color.substr(1)}/${size}/${
                background ? bgColor.substr(1) : 'none'
              }`
            );
          }}
        >
          Generate
        </button>
      </form>
    </div>
  );
};

export default MainPage;
