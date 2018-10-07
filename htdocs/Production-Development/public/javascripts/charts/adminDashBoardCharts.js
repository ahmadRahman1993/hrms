/**
 * Created by Muhammad Annis on 9/2/2016.
 */

function drawPerformanceChart() {
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
    ]);

    var options = {
        chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
        colors: ['#1b9e77', '#d95f02', '#7570b3']
    };

    var chart = new google.charts.Bar(document.getElementById('company_perm_chart'));

    chart.draw(data, options);

}

function drawDeptChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7]
    ]);

    var options = {
        title: 'My Daily Activities',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('company_dept_chart'));
    chart.draw(data, options);
}

function drawEmpDesignationChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7]
    ]);

    var options = {
        title: 'My Daily Activities',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('emp_des_chart'));
    chart.draw(data, options);
}

function drawWorkHrsChart() {
   /* var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales'],
        ['2014', 1000],
        ['2015', 1170],
        ['2016', 660],
        ['2017', 1030]
    ]);

    var options = {
        chart: {
            title: 'weekly work hours',
            subtitle: 'Sales: 2014-2017',
        },
        bars: 'vertical',
        vAxis: {format: 'decimal'},
        height: 400,
        colors: ['#1b9e77']
    };

    var chart = new google.charts.Bar(document.getElementById('work_hrs_chart'));

    chart.draw(data, options);
*/

    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales'],
        ['2014', 1000],
        ['2015', 1170],
        ['2016', 660],
        ['2017', 1030]
    ]);

    var options = {
        chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
        bars: 'vertical',
        vAxis: {format: 'decimal'},
        height: 400,
        colors: ['#1b9e77', '#d95f02', '#7570b3']
    };

    var chart = new google.charts.Bar(document.getElementById('work_hrs_chart'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function projUserCapacity() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7]
    ]);

    var options = {
        title: 'My Daily Activities',
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('proj-user-cap'));
    chart.draw(data, options);
}

function drawMap() {
    var data = google.visualization.arrayToDataTable([
        ['Lat', 'Long', 'Name'],
        [24.861895, 67.070712, 'Blue Zorro']
    ]);

    var map = new google.visualization.Map(document.getElementById('map_div'));
    map.draw(data, {showTip: true});
}


$(document).ready(function () {
    $(window).resize(function(){
        drawPerformanceChart();
        drawDeptChart();
        drawEmpDesignationChart();
        drawWorkHrsChart();
        projUserCapacity();
        drawMap();
    });
});