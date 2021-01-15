import Prando from 'prando';
import {
  stroke,
  strokeWidth,
  fill,
  setAttributes,
  width,
  height,
  r,
  prefixAttr,
  posY,
  posX,
  genCircle,
  drawPolygon,
  convertDeg2Rad,
  sufixAttr,
  genLine,
} from './utils';

const generate = (id: number | string) => {
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

  return ns.outerHTML;
};

export default generate;
