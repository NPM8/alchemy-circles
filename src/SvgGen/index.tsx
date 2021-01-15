import React from 'react';
import { useParams } from 'react-router-dom';
import generate from './generator';

const SvgGen = () => {
  const { seed, color } = useParams<{ seed: string; color: string }>();
  console.log(seed, color);
  const innerHtml = {
    __html: generate(seed ?? 0),
  };

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={innerHtml} />;
};

SvgGen.defaultProps = {
  id: 12345722,
};

export default SvgGen;
