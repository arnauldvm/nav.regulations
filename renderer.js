const lights = require('./assets/lights');
const canvas = document.getElementById('base');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const view = lights.ViewE.FRONT;
  // lights.light(ctx, lights.PositionE.MAST, lights.ColorE.WHITE, view);
  // lights.light(ctx, lights.PositionE.RIGHT, lights.ColorE.GREEN, view);
  // lights.lightCompact(ctx, "LR", view);
  // lights.lightsMultiple(ctx, [ "MW", "RG", "LR"], view);
  lights.lightsMultipleCompact(ctx, "MW+RG+LR", view);
} else {
  // canvas unsupported
}
