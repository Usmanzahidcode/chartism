function addRow() {
  let table = document.getElementById("data-table");
  let rowCount = table.rows.length;
  let newRow = table.insertRow(rowCount);

  // Insert cells
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    let cell = newRow.insertCell(i);
    if (i === 0) {
      let input = document.createElement("input");
      input.type = "text";
      input.value = "label " + rowCount;
      cell.appendChild(input);
    } else {
      let input = document.createElement("input");
      input.type = "number";
      input.min = "0";
      input.max = "100";
      input.value = "0";
      cell.appendChild(input);
    }
  }
}

function addColumn() {
  let table = document.getElementById("data-table");

  for (let i = 0; i < table.rows.length; i++) {
    let cell = table.rows[i].insertCell(-1);
    if (i === 0) {
      let input = document.createElement("input");
      input.type = "text";
      input.value = "Subject " + (table.rows[0].cells.length - 1);
      cell.appendChild(input);
    } else {
      let input = document.createElement("input");
      input.type = "number";
      input.min = "0";
      input.max = "100";
      input.value = "0";
      cell.appendChild(input);
    }
  }
}

// Generate the chart:

const plugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color || "#99ffff";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};
let myChart = null;
function generateChart() {
  if (myChart) {
    myChart.destroy();
  }
  let table = document.getElementById("data-table");
  let rows = table.rows;

  let labels = [];
  let datasets = [];

  for (let i = 1; i < rows.length; i++) {
    let label = rows[i].cells[0].querySelector("input").value;
    labels.push(label);
  }
  let fillvalue =
    document.getElementById("fill-selecter").value === "true" ? true : false;
  let chartType = document.getElementById("type-selecter").value;
  console.log(chartType);
  // Extract marks data for each subject
  for (let j = 1; j < rows[0].cells.length; j++) {
    let dataset_names = rows[0].cells[j].querySelector("input").value;
    let data = [];

    for (let i = 1; i < rows.length; i++) {
      let mark = parseFloat(rows[i].cells[j].querySelector("input").value);
      data.push(mark);
    }

    datasets.push({
      label: dataset_names,
      data: data,
      borderWidth: 1,
      fill: fillvalue,
      tension: 0.3,
    });
  }

  // Generate the chart
  const ctx = document.getElementById("chart-wrapper");
  myChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      animation: {
        duration: 1000,
      },
      radius: 5,
      hitRadius: 20,
      hoverRadius: 12,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        customCanvasBackgroundColor: {
          color: "white",
        },
      },
      devicePixelRatio: 5,
    },
    plugins: [plugin],
  });

  console.log("myChart", myChart);
}

// Download the Image

function downloadChart() {
  const canvas = document.getElementById("chart-wrapper");
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "chart.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Initial chart creation with dummy data

window.onload = function () {
  document.getElementById("generate-button").click();
};
