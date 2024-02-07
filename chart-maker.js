// Add the rows function
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
      input.value = "Student " + rowCount;
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

// Add a column to the table
function addColumn() {
  let table = document.getElementById("data-table");

  // Loop through each row and add a cell at the end of each row
  for (let i = 0; i < table.rows.length; i++) {
    let cell = table.rows[i].insertCell(-1);
    if (i === 0) {
      // If it's the first row, create a header cell with an input element
      let input = document.createElement("input");
      input.type = "text";
      input.value = "Subject " + (table.rows[0].cells.length - 1);
      cell.appendChild(input);
    } else {
      // For other rows, create a regular cell with an input element
      let input = document.createElement("input");
      input.type = "number";
      input.min = "0";
      input.max = "100";
      input.value = "0";
      cell.appendChild(input);
    }
  }
}

// Making the chart:

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
    myChart.destroy(); // Destroy the existing chart instance if it exists
  }
  let table = document.getElementById("data-table");
  let rows = table.rows;

  let labels = [];
  let datasets = [];

  // Extract student names
  for (let i = 1; i < rows.length; i++) {
    let studentName = rows[i].cells[0].querySelector("input").value;
    labels.push(studentName);
  }
  let fillvalue =
    document.getElementById("fill-selecter").value === "true" ? true : false;
  console.log(fillvalue.type);
  // Extract marks data for each subject
  for (let j = 1; j < rows[0].cells.length; j++) {
    let subjectName = rows[0].cells[j].querySelector("input").value;
    let data = [];

    for (let i = 1; i < rows.length; i++) {
      let mark = parseFloat(rows[i].cells[j].querySelector("input").value);
      data.push(mark);
    }

    datasets.push({
      label: subjectName,
      data: data,
      borderWidth: 1,
      fill: fillvalue,
      tension: 0.3,
    });
  }

  // Generate the chart
  const ctx = document.getElementById("chart-wrapper");
  myChart = new Chart(ctx, {
    type: "line",
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
