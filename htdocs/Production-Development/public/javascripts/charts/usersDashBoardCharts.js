/**
 * Created by Muhammad Annis on 9/6/2016.
 */

function userLeavesChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Day');
    data.addColumn('number', 'Hours');

    data.addRows([
        [new Date(2016,9,1), 8], [new Date(2016,9,2), 7], [new Date(2016,9,3), 7.5], [new Date(2016,9,4), 6], [new Date(2016,9,5), 0],
        [new Date(2016,9,6), 7], [new Date(2016,9,7), 8], [new Date(2016,9,8), 10], [new Date(2016,9,9), 4], [new Date(2016,9,10), 8],
        [new Date(2016,9,11), 12], [new Date(2016,9,12), 0], [new Date(2016,9,13), 0], [new Date(2016,9,14), 0], [new Date(2016,9,15), 0],
        [new Date(2016,9,16), 0], [new Date(2016,9,17), 6.5], [new Date(2016,9,18), 4], [new Date(2016,9,19), 10], [new Date(2016,9,20), 6.5],
        [new Date(2016,9,21), 9], [new Date(2016,9,22), 0], [new Date(2016,9,23), 8], [new Date(2016,9,24), 0], [new Date(2016,9,25), 0],
        [new Date(2016,9,26), 8], [new Date(2016,9,27), 9.5], [new Date(2016,9,28), 5], [new Date(2016,9,29), 8], [new Date(2016,9,30), 0],

    ]);

    /*data.addRows([
        ['Ivan', new Date(2016,2,28)],
        ['Igor', new Date(1962,7,5)],
        ['Felix', new Date(1983,11,17)],
        ['Bob', null] // No date set for Bob.
    ]);*/

    var options = {
        hAxis: {
            title: 'Days'
        },
        vAxis: {
            title: 'Hours'
        },
        colors: ['#26B99A']
    };

    var chart = new google.visualization.AreaChart(document.getElementById('user_leaves_chart'));

    chart.draw(data, options);
}

function userLeavesPerMonthPieChart() {
    var data = google.visualization.arrayToDataTable([
        ['Time', 'Percentage'],
        ['On Time (9:00 A.M)', 17.6],
        ['Late (After 9:30 A.M)', 4.4]
    ]);

    var options = {
        pieHole: 0.4,
        colors: ['#26B99A', '#FF0000' ],
        /*height : 300,
        width : 320,*/
        chartArea:{left:20,top:0,width:'75%',height:'75%'},
        legend : {position:'bottom'}
    };

    var chart = new google.visualization.PieChart(document.getElementById('leaves_pie_chart'));
    chart.draw(data, options);
}


function userLeavesPerMonthBarChart() {
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Sick', 'Casual', 'Bonus'],
        ['June', 3, 2, 1.5],
        ['July', 2, 3.5, 1],
        ['Aug', 2, 4, 0.5],
        ['Sep', 2, 1.5, 2.5],
        ['Oct', 2, 4, 0.5]
    ]);

    var options = {
        /*chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },*/
        chartArea:{left:20,top:0,width:'100%',height:'100%'},
        legend : {position:'none'},
        colors: ['#03586A', '#26B99A', '#9B59B6']
    };

    var chart = new google.charts.Bar(document.getElementById('leaves_bar_chart'));

    chart.draw(data, options);

}

//google.charts.load('current', {packages: ['corechart', 'line']});
//google.charts.setOnLoadCallback(drawCurveTypes);

function drawCurveTypes() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Time in');
    data.addColumn('number', 'Time out');

    data.addRows([
        [1, 10.25, 17.34],
        [2, 10.12, 17.51],
        [3, 10.38, 17.31],
        [4, 10.25, 17.34],
        [5, 10.06, 17.27],
        [6, 10.18, 16.27],
        [7, 10.05, 15.27],
        [8, 10.13, 18.15],
        [9, 10.06, 18.17],
        [10,10.36, 18.58],
        [11,10.13, 19.31],
        [12,10.10, 18.09],
        [13,10.10, 18.09],
        [14,10.10, 18.09],
        [15,11.06, 19.29],
        [16,10.07, 19.32],
        [17,10.02, 19.21],
        [18,9.56,  19.19],
        [19,9.54,  19.14],
        [20,10.10, 18.09],
        [21,10.13, 19.07],
        [22,9.58,  20.11],
        [23,9.59,  18.54],
        [24,9.54,  19.14],
        [25,10.10, 18.09],
        [26,10.13, 19.07],
        [27,9.58,  20.11],
        [28,9.54,  19.14],
        [29,10.10, 18.09],
        [30,10.13, 19.07]
    ]);

    var options = {
        width: 'auto',
        height: 'auto',
        hAxis: {
            title: 'Date',
            ticks: [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30]
        },
        vAxis: {
            title: 'Time',
            minValue: 8,
            maxValue: 20,
            ticks: [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
        },
        title: 'Login / Logout timings ',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('user_check_in_out'));
    chart.draw(data, options);
}




$(document).ready(function () {
    $(window).resize(function(){
        //userLeavesChart();
        userLeavesPerMonth();
//        userLeavesPerMonthBarChart();
        drawCurveTypes();
    });
});