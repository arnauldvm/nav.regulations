const createOption = function(value, text) {
  var option = document.createElement("option");
  option.value = value;
  option.text = text;
  return option;
};

const lightSelect = document.getElementById('lightSelect');
const lightsDataList = require("./data/lights.json");
lightsDataList.forEach(function(lightData) {
  var option = document.createElement("option");
  lightSelect.appendChild(createOption(lightData.definition, lightData.description));
});

const lights = require('./assets/lights');
const canvas = document.getElementById('base');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const redraw = function() {
    var view = lights.ViewE.FRONT;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lights.lightsMultipleCompact(ctx, lightSelect.value, view);
  };
  lightSelect.onchange = redraw;
} else {
  // canvas unsupported
}
