const lights = require('./assets/lights');
const canvas = document.getElementById('base');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const view = lights.ViewE.FRONT;
  lights.lightsMultipleCompact(ctx, "MW+RG+LR", view);
} else {
  // canvas unsupported
}
