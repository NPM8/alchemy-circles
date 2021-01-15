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
const r = (value: number): ['r', string] => ['r', value.toString()];

const points = (values: [number, number][]): ['points', string] => [
  'points',
  values.map((value) => value.join(',')).join(' '),
];

const prefixAttr = (
  prefix: string,
  attr: [string, string]
): [string, string] => [`${prefix}${attr[0]}`, attr[1]];

const sufixAttr = (sufix: string, attr: [string, string]): [string, string] => [
  `${attr[0]}${sufix}`,
  attr[1],
];

const posX = (value: number): ['x', string] => ['x', value.toString()];

const posY = (value: number): ['y', string] => ['y', value.toString()];

const convertDeg2Rad = (deg: number) => deg * (Math.PI / 180);

const genCircle = (uri: string) => document.createElementNS(uri, 'circle');

const genPolygon = (uri: string) => document.createElementNS(uri, 'polygon');

const genLine = (uri: string) => document.createElementNS(uri, 'line');

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
  console.log(id);
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

  /* Base circle */
  ns.appendChild(
    setAttributes([
      r(radius),
      prefixAttr('c', posY(hexY)),
      prefixAttr('c', posX(hexX)),
      ...defaults,
    ])(genCircle(url))
  );
  /* /Base circle */

  const randomEages = rng.nextInt(4, 8);

  // Base polygon
  ns.appendChild(drawPolygon(randomEages, 0, radius, size, url, defaults));

  // Base lines
  for (let line = 0; line < randomEages; line += 1) {
    const angle = convertDeg2Rad(360 / randomEages) * line;

    const newLine = setAttributes([
      sufixAttr('1', posX(hexX)),
      sufixAttr('1', posY(hexY)),
      sufixAttr('2', posX(hexX + radius * Math.cos(angle))),
      sufixAttr('2', posY(hexY + radius * Math.sin(angle))),
      ...defaults,
    ])(genLine(url));

    ns.appendChild(newLine);
  }
  // inside polygon with lines
  if (!(randomEages % 2)) {
    let random = rng.nextInt(2, 6);

    while (!(random % 2)) random = rng.nextInt(3, 6);

    ns.appendChild(drawPolygon(random, 180, radius, size, url, defaults));

    for (let line = 0; line < random; line += 1) {
      const angle = convertDeg2Rad(360 / random) * line;

      const newLine = setAttributes([
        sufixAttr('1', posX(hexX)),
        sufixAttr('1', posY(hexY)),
        sufixAttr('2', posX(hexX + radius * Math.cos(angle))),
        sufixAttr('2', posY(hexY + radius * Math.sin(angle))),
        ...defaults,
      ])(genLine(url));

      ns.appendChild(newLine);
    }
  }
  // inside polygon without lines
  if (randomEages % 2) {
    let random = rng.nextInt(3, 6);

    while (!(random % 2)) random = rng.nextInt(3, 6);

    ns.appendChild(drawPolygon(random, 180, radius, size, url, defaults));
  }

  if (!rng.nextInt(0, 1)) {
    const ronad = rng.nextInt(0, 4);

    if (ronad % 2) {
      ns.appendChild(
        drawPolygon(randomEages + 4, 0, radius / 2, size, url, defaults)
      );

      for (let line = 0; line < randomEages + 4; line += 1) {
        const angle = convertDeg2Rad(360 / (randomEages + 4)) * line;

        ns.appendChild(
          setAttributes([
            sufixAttr('1', posX(hexX)),
            sufixAttr('1', posY(hexY)),
            sufixAttr(
              '2',
              posX(hexX + ((radius / 8) * 5 + 2) * Math.cos(angle))
            ),
            sufixAttr(
              '2',
              posY(hexY + ((radius / 8) * 5 + 2) * Math.sin(angle))
            ),
            ...defaults,
          ])(genLine(url))
        );
      }
    }

    if (!(ronad % 2) && randomEages > 5) {
      ns.appendChild(
        drawPolygon(randomEages - 2, 0, radius / 4, size, url, defaults)
      );

      for (let line = 0; line < randomEages - 2; line += 1) {
        const angle = convertDeg2Rad(360 / (randomEages - 2)) * line;

        ns.appendChild(
          setAttributes([
            sufixAttr('1', posX(hexX)),
            sufixAttr('1', posY(hexY)),
            sufixAttr(
              '2',
              posX(hexX + ((radius / 8) * 5 + 2) * Math.cos(angle))
            ),
            sufixAttr(
              '2',
              posY(hexY + ((radius / 8) * 5 + 2) * Math.sin(angle))
            ),
            ...defaults,
          ])(genLine(url))
        );
      }
    }
  }

  if (!(rng.nextInt(0, 4) % 2)) {
    ns.appendChild(
      setAttributes([
        prefixAttr('c', posX(hexX)),
        prefixAttr('c', posY(hexY)),
        r((radius / 2 / 8) * 11),
        ...defaults,
      ])(genCircle(url))
    );

    if (!(randomEages % 2)) {
      let random = rng.nextInt(2, 8);

      while (!(random % 2)) random = rng.nextInt(3, 8);

      if (random !== 2) {
        ns.appendChild(
          drawPolygon(random, 180, (radius / 3) * 2, size, url, defaults)
        );
      }
    }

    if (randomEages % 2) {
      let random = rng.nextInt(3, 8);

      while (!(random % 2)) random = rng.nextInt(3, 8);

      ns.appendChild(
        drawPolygon(random, 180, (radius / 3) * 2, size, url, defaults)
      );
    }
  }

  switch (rng.nextInt(0, 3)) {
    case 0:
      for (let circle = 0; circle < randomEages; circle += 1) {
        const angle = convertDeg2Rad(360 / randomEages) * circle;

        ns.appendChild(
          setAttributes([
            prefixAttr('c', posX(hexX + (radius / 18) * 11 * Math.cos(angle))),
            prefixAttr('c', posY(hexY + (radius / 18) * 11 * Math.sin(angle))),
            r((radius / 2 / 44) * 12),
            ...defaults,
          ])(genCircle(url))
        );
      }
      break;
    case 1:
      for (let circle = 0; circle < randomEages; circle += 1) {
        const angle = convertDeg2Rad(360 / randomEages) * circle;

        ns.appendChild(
          setAttributes([
            prefixAttr('c', posX(hexX + radius * Math.cos(angle))),
            prefixAttr('c', posY(hexY + radius * Math.sin(angle))),
            r((radius / 2 / 44) * 12),
            ...defaults,
          ])(genCircle(url))
        );
      }
      break;
    case 2:
      ns.appendChild(
        setAttributes([
          prefixAttr('c', posX(hexX)),
          prefixAttr('c', posY(hexY)),
          r((radius / 2 / 18) * 12),
          ...defaults,
        ])(genCircle(url))
      );

      ns.appendChild(
        setAttributes([
          prefixAttr('c', posX(hexX)),
          prefixAttr('c', posY(hexY)),
          r((radius / 2 / 22) * 12),
          ...defaults,
        ])(genCircle(url))
      );
      break;
    default:
    case 3:
      for (let lines = 0; lines < randomEages; lines += 1) {
        const angle = convertDeg2Rad(360 / randomEages) * lines;

        ns.appendChild(
          setAttributes([
            sufixAttr('1', posX(hexX + (radius / 3) * 2 * Math.cos(angle))),
            sufixAttr('1', posY(hexY + (radius / 3) * 2 * Math.sin(angle))),
            sufixAttr('2', posX(hexX + radius * Math.cos(angle))),
            sufixAttr('2', posY(hexY + radius * Math.sin(angle))),
            ...defaults,
          ])(genLine(url))
        );
      }

      /*
        TODO: Add lines from orginal algo (228, 246) https://github.com/CiaccoDavide/Alchemy-Circles-Generator/blob/master/src_PHP/alchemy-svg.php

        There are based on global variables need to reconsider it.
      */
      break;
  }

  const innerHtml = {
    __html: ns.outerHTML,
  };

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={innerHtml} />;
};

SvgGen.defaultProps = {
  id: 12345722,
};

export default SvgGen;
