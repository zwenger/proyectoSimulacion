google.charts.load('current', {'packages':['bar']});
//google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable(tuplaDique);

  var options = {
    height: 500,
    width: 1200,
    displayExactValues: true,
    hAxis: { format:'decimal' },
    vAxis: { format:'decimal' },
  };

  var chart = new google.charts.Bar(document.getElementById('columnchart'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}