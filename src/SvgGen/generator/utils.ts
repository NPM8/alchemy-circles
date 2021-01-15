export const setAttributes: (
  attrs: [string, string][]
) => <T extends Element>(element: T) => T = (attrs) => (element) => {
  console.log(attrs[0], element);
  attrs.forEach(([attr, value]) => element.setAttribute(attr, value));
  return element;
};

export const width = (value: number): ['width', string] => [
  'width',
  value.toString(),
];

export const height = (value: number): ['height', string] => [
  'height',
  value.toString(),
];

export const fill = (value: string): ['fill', string] => ['fill', value];

export const stroke = (value: string): ['stroke', string] => ['stroke', value];

export const strokeWidth = (value: number): ['stroke-width', string] => [
  'stroke-width',
  value.toString(),
];
export const r = (value: number): ['r', string] => ['r', value.toString()];

export const points = (values: [number, number][]): ['points', string] => [
  'points',
  values.map((value) => value.join(',')).join(' '),
];

export const prefixAttr = (
  prefix: string,
  attr: [string, string]
): [string, string] => [`${prefix}${attr[0]}`, attr[1]];

export const sufixAttr = (
  sufix: string,
  attr: [string, string]
): [string, string] => [`${attr[0]}${sufix}`, attr[1]];

export const posX = (value: number): ['x', string] => ['x', value.toString()];

export const posY = (value: number): ['y', string] => ['y', value.toString()];

export const convertDeg2Rad = (deg: number) => deg * (Math.PI / 180);

export const genCircle = (uri: string) =>
  document.createElementNS(uri, 'circle');

export const genPolygon = (uri: string) =>
  document.createElementNS(uri, 'polygon');

export const genLine = (uri: string) => document.createElementNS(uri, 'line');

export const drawPolygon = (
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
