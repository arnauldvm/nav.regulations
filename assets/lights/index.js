'use strict';

const LIGHT_SIZE = 10;
const MARGIN = 40;

const PositionE = module.exports.PositionE = Object.freeze({
  MAST: 'M',
  BOW: 'B',
  STERN: 'S',
  RIGHT: 'R',
  LEFT: 'L',
  name: {
    'M': {en: "mast", fr: "mat"},
    'B': {en: "bow", fr: "proue"},
    'S': {en: "stern", fr: "poupe"},
    'R': {en: "right", fr: "droite"},
    'L': {en: "left", fr: "gauche"}
  },
  xyz: { // relative value between 0 and 1
    // x: axis of the boat from 0 (stern) to 1 (bow)
    // y: longitudinal from 0 (left) to 1 (right)
    // z: vertical from 0 (see level) to 1 (top of the mast)
    'M': [0.3, 0.5, 1],
    'B': [1, 0.5, 0.25],
    'S': [0, 0.5, 0.25],
    'R': [0.5, 1, 0.25],
    'L': [0.5, 0, 0.25]
  }
});

const ColorE = module.exports.ColorE = Object.freeze({
  WHITE: 'W',
  RED: 'R',
  GREEN: 'G',
  YELLOW: 'Y',
  rgb: {
    'W': "#FFF",
    'R': "#F00",
    'G': "#0F0",
    'Y': "#FF0"
  }
});

const ViewE = module.exports.ViewE = Object.freeze({
  FRONT: 'f',
  REAR: 'r',
  RIGHT: 'R',
  LEFT: 'L',
  horiz: {
    'f': {axis: 1, dir: -1},
    'r': {axis: 1, dir: +1},
    'R': {axis: 0, dir: +1},
    'L': {axis: 0, dir: -1}
  }
});

const light = module.exports.light = function(/* CanvasRenderingContext2D */ ctx, /* PositionE */ position, /* ColorE */ color, /* ViewE */ view) {
  const xyz = PositionE.xyz[position];
  const rgb = ColorE.rgb[color];
  const horiz = ViewE.horiz[view];
  ctx.save();
  ctx.transform(1, 0, 0, -1, 0, ctx.canvas.height);
  const height = ctx.canvas.width - 2*MARGIN;
  const width = ctx.canvas.height - 2*MARGIN;
  ctx.fillStyle = rgb;
  const x = ctx.canvas.width / 2 + (horiz.dir*(xyz[horiz.axis]-0.5))*width;
  const y = MARGIN + xyz[2]*width;
  ctx.beginPath();
  ctx.arc(x, y, LIGHT_SIZE, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();
}

const lightCompact = module.exports.lightCompact = function(/* CanvasRenderingContext2D */ ctx, /* String(2) */ lightDescription, /* ViewE */ view) {
  light(ctx, lightDescription[0], lightDescription[1], view);
}

module.exports.lightsMultiple = function(/* CanvasRenderingContext2D */ ctx, /* String(2)[] */ lightDescriptions, /* ViewE */ view) {
  for (var idx in lightDescriptions) lightCompact(ctx, lightDescriptions[idx], view);
}
