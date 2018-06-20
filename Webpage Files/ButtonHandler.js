//event listener for clearing table
document.getElementById('Clear').addEventListener('click', function() {
    var table = document.getElementById('InputTable').firstChild;
    var numberOfRows = table.rows.length;
    for (var i = 0; i < numberOfRows; ++i) {
        table.rows[i].cells[1].innerHTML = "";
    }
});

//event listener for sorting table cells based on Traveling Salesman

document.getElementById('Calculate').addEventListener('click', function() {
    var inputTable = document.getElementById('InputTable').firstChild;
    var numberOfRows = inputTable.rows.length;
    
    var inputCities = [];
    
    for (var i = 0; i < numberOfRows; ++i) {
        
        var cityName = trimString(inputTable.rows[i].cells[1].innerHTML);
        
        console.log("After: " + cityName);
        
        var index = names.indexOf(cityName); //array of city names
        
        if (index >= 0) {
            inputCities.push(cities[index]); //push good cities onto array
        }
    }
    
    //if the input list contains 2 of the same cities side by side!
    
    var resultCities = shortestPath(inputCities);
    
    var outputTable = document.getElementById('OutputTable').firstChild;
    
    //override innerHTML with cities in sorted order
    for (var i = 0; i < resultCities.length; ++i) {
        outputTable.rows[i].cells[1].innerHTML = resultCities[i].name;
    }
    
    document.querySelector("#TotalMiles").innerHTML = Math.round(roundTripDist(resultCities)) + " Miles";
    
    printFastestAndSlowestPaths();
    
    alert("Operation Finished");
});

function trimString(s) {
    console.log("Before: " + s);
    return s.trim();
}