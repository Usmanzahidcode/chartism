valueInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addData();
    }
});

var tension = 0.3;

const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#99ffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
};

let chartData = {
    labels: ['Usman', 'Aman'],
    datasets: [{
        label: 'Marks',
        data: [12, 19],
        borderWidth: 1,
        fill: true,
        tension: tension,
    },],
};

const ctx = document.getElementById('chart-wrapper');
const myChart = new Chart(ctx, {
    type: 'line',

    data: chartData,

    options: {
        radius: 5,
        hitRadius: 20,
        hoverRadius: 12,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            customCanvasBackgroundColor: {
                color: 'white',
            }
        },
        devicePixelRatio: 3,
    },
    plugins: [plugin],
});

// Add the user data

function addData() {
    const labelInput = document.getElementById('labelInput').value;
    const valueInput = document.getElementById('valueInput').value;

    chartData.labels.push(labelInput);
    chartData.datasets[0].data.push(valueInput);

    myChart.options.devicePixelRatio = 2;
    myChart.update();

    document.getElementById('labelInput').value = '';
    document.getElementById('valueInput').value = '';


}

// Reset the chart

function resetChart() {
    chartData.labels = [];
    chartData.datasets[0].data = [];

    myChart.update();
}

// Change the smoothness of the lines


function changeTension() {
    if (tension == 0) {
        tension = 0.3;
    } else {
        tension = 0;
    }
    myChart.data.datasets.forEach(dataset => {
        dataset.tension = tension;
    });
    myChart.update();
}

// Download the Image

function downloadChart() {
    myChart.options.devicePixelRatio = 2;
    myChart.update();

    const canvas = document.getElementById('chart-wrapper');
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'chart.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // myChart.options.devicePixelRatio = 0.5;
}
