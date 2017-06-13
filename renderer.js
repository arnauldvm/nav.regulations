const lightSelect = document.getElementById('lightSelect');
const lightsDataList = require("./data/lights.json");
lightsDataList.forEach(function(lightData) {
  var option = document.createElement("option");
  option.value = lightData.definition;
  option.text = lightData.description;
  lightSelect.appendChild(option);
});

const lights = require('./assets/lights');
const canvas = document.getElementById('base');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');
  lightSelect.onchange = function() {
    var view = lights.ViewE.FRONT;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lights.lightsMultipleCompact(ctx, lightSelect.value, view);
  };
} else {
  // canvas unsupported
}
