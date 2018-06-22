google.charts.setOnLoadCallback(drawChartPob);

function drawChartPob() {
  var data = google.visualization.arrayToDataTable(tuplaPob);

  var options = {
    height: 500,
    width: 1200,
    displayExactValues: true,
    hAxis: { format:'decimal' },
    vAxis: { format:'decimal' },
  };

  var chart = new google.charts.Bar(document.getElementById('columnchartPob'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}