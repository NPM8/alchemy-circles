import React from 'react';
import { Link } from 'react-router-dom';

type ElementComponentProps = {
  seed: string;
  size: string;
  background: string;
  color: string;
  onRemove: (seed: string, color: string) => void;
};

const ElementComponent: React.FC<ElementComponentProps> = ({
  seed,
  color,
  background,
  size,
  onRemove,
}) => {
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    onRemove(seed, color);
  };

  return (
    <div>
      <Link
        key={seed + color}
        to={`/gen/${seed}/${color}/${size}/${background}`}
      >
        {seed}
      </Link>
      <button type="button" onClick={onClick}>
        Remove
      </button>
    </div>
  );
};

export default ElementComponent;
