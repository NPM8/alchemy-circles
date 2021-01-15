import React from 'react';
import Prando from 'prando';
import pipe from 'lodash/fp/pipe';

const setAttributes: (
  attrs: [string, string][]
) => <T extends Element>(element: T) => T = (attrs) => (element) => {
  console.log(attrs[0], element);
  attrs.forEach(([attr, value]) => element.setAttribute(attr, value));
  return element;
};

const width = (value: number): ['width', string] => ['width', value.toString()];

const height = (value: number): ['height', string] => [
  'height',
  value.toString(),
];

const fill = (value: string): ['fill', string] => ['fill', value];

const stroke = (value: string): ['stroke', string] => ['stroke', value];

const strokeWidth = (value: number): ['stroke-width', string] => [
  'stroke-width',
  value.toString(),
];

const posX = (value: number, prefix?: string): [string, string] => [
  prefix ? `${prefix}x` : 'x',
  value.toString(),
];

const r = (value: number): ['r', string] => ['r', value.toString()];

const points = (values: [number, number][]): ['points', string] => [
  'points',
  values.map((value) => value.join(',')).join(' '),
];

const posY = (value: number, prefix?: string): [string, string] => [
  prefix ? `${prefix}y` : 'y',
  value.toString(),
];

const convertDeg2Rad = (deg: number) => deg * (Math.PI / 180);

const genCircle = (uri: string) => document.createElementNS(uri, 'circle');

const genPolygon = (uri: string) => document.createElementNS(uri, 'polygon');

const drawPolygon = (
  sides: number,
  rotation: number,
  radius: number,
  size: number,
  uri: string,
  attrs: [string, string][]
) => {
  const eages: [number, number][] = [];
  const angDiff = convertDeg2Rad(360 / (sides * 2));
  const rot = convertDeg2Rad(rotation);

  for (let a = 0; a < sides * 2; a += 2) {
    eages.push([
      size / 2 + radius * Math.cos(a * angDiff + rot),
      size / 2 + radius * Math.sin(a * angDiff + rot),
    ]);
  }

  return setAttributes([points(eages), ...attrs])(genPolygon(uri));
};

type SvgGenProps = {
  id?: number;
};

const SvgGen = ({ id }: SvgGenProps) => {
  const rng = new Prando(id);

  const lineWidth = 2;
  const size = 128 * lineWidth;

  const defaults = [stroke('black'), strokeWidth(lineWidth), fill('none')];

  const ns = setAttributes([width(size), height(size)])(
    document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  );

  const url: string = ns.namespaceURI || '';

  const hexX = size / 2;
  const hexY = size / 2;
  const radius = (size / 2) * (3 / 4);

  // Base circle
  ns.appendChild(
    setAttributes([r(radius), posY(hexY, 'c'), posX(hexX, 'c'), ...defaults])(
      genCircle(url)
    )
  );

  const randomEages = rng.next(4, 8);

  ns.appendChild(drawPolygon(randomEages, 0, radius, size, url, defaults));

  const innerHtml = {
    __html: ns.outerHTML,
  };

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={innerHtml} />;
};

SvgGen.defaultProps = {
  id: 4,
};

export default SvgGen;
