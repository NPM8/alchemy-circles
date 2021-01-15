import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import generate from './generator';

type SvgGenProps = {
  id?: number;
} & RouteComponentProps;

const SvgGen = ({ id }: SvgGenProps) => {
  const innerHtml = {
    __html: generate(id ?? 0),
  };

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={innerHtml} />;
};

SvgGen.defaultProps = {
  id: 12345722,
};

export default SvgGen;
