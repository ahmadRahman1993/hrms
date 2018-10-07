/**
 * Created by Muhammad Annis on 9/6/2016.
 */

google.charts.load('current', {'packages': ['bar','corechart','line','map']});

$(document).ready(function () {

    if(userRole == 'SUPER ADMIN')
    {
        google.charts.setOnLoadCallback(compUsers);
        google.charts.setOnLoadCallback(policyPieChart);
        google.charts.setOnLoadCallback(monthlyRevenueChart);
        google.charts.setOnLoadCallback(visitorsPerMonth);
        google.charts.setOnLoadCallback(visitorsLocation);


    }
    else if (userRole == 'ADMIN')
    {
        google.charts.setOnLoadCallback(drawPerformanceChart);
        google.charts.setOnLoadCallback(drawDeptChart);
        google.charts.setOnLoadCallback(drawEmpDesignationChart);
        google.charts.setOnLoadCallback(drawWorkHrsChart);
        google.charts.setOnLoadCallback(projUserCapacity);
        google.charts.setOnLoadCallback(drawMap);
    }
    else if (userRole == 'USER')
    {
        //google.charts.setOnLoadCallback(userLeavesChart);
        google.charts.setOnLoadCallback(userLeavesPerMonthPieChart);
//        google.charts.setOnLoadCallback(userLeavesPerMonthBarChart);
        google.charts.setOnLoadCallback(drawCurveTypes);
    }

});
