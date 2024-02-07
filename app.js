// Download the Image

function downloadChart() {
  myChart.options.devicePixelRatio = 2;
  myChart.update();

  const canvas = document.getElementById("chart-wrapper");
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "chart.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // myChart.options.devicePixelRatio = 0.5;
}
