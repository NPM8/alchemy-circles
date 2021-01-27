import React, { useEffect, useState } from 'react';
import consts from '../consts';
import { SavedConfigs } from '../types';
import ElementComponent from './components/Element';

const { SEEDS_HISTORY } = consts;

const HistoryPage = () => {
  const [saved, setSaved] = useState<SavedConfigs | null>(null);

  useEffect(() => {
    const data = localStorage.getItem(SEEDS_HISTORY);

    if (data && data !== '') setSaved(JSON.parse(data));
  }, []);

  useEffect(() => {
    if (!saved) {
      localStorage.removeItem(SEEDS_HISTORY);
      return;
    }

    localStorage.setItem(SEEDS_HISTORY, JSON.stringify(saved));
  }, [saved]);

  const onClearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setSaved(null);
  };

  if (!saved) {
    return <div>Nothing here</div>;
  }

  return (
    <>
      <button type="button" onClick={onClearHistory}>
        Clear
      </button>
      {saved &&
        saved.map((item) => (
          <ElementComponent
            key={item.seed + item.color}
            seed={item.seed}
            size={item.size}
            background={item.background}
            color={item.color}
            onRemove={(seed, color) => {
              setSaved((prevState) => {
                const array = (prevState ?? []).filter(
                  (value) => value.seed + value.color !== seed + color
                );

                return array.length ? array : null;
              });
            }}
          />
        ))}
    </>
  );
};

export default HistoryPage;
