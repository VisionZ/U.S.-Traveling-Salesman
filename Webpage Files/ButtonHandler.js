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
    
    var inputCities = []; //list of city objects
    
    for (var index = 0; index < numberOfRows; ++index) {
        var cityName = trimString(inputTable.rows[index].cells[1].innerHTML);
        var cityNameLowerCase = cityName.toLowerCase();
        
        var searchIndex = -1;
        
        for (var innerIndex = 0; innerIndex < names.length; ++innerIndex) {
            var knownCityName = names[innerIndex];
            if (cityNameLowerCase === knownCityName.toLowerCase()) {
                searchIndex = innerIndex;
                break;
            }
        }
    
        if (searchIndex >= 0) {
            inputCities.push(cities[searchIndex]); //push good cities onto array
        }
        else {
            console.log("Unable to find: " + cityNameLowerCase);
        }
    }
    
    console.log("List of Cities:");    
    console.log(inputCities);
    
    //if the input list contains 2 of the same cities side by side!
    
    var resultCities = shortestPath(inputCities); //will return empty city list if given empty city list
    
    console.log("List of Sorted Cities:");    
    console.log(resultCities);
    
    var outputTable = document.getElementById('OutputTable').firstChild;
    
    //override innerHTML with cities in sorted order
    for (var i = 0; i < resultCities.length; ++i) {
        outputTable.rows[i].cells[1].innerHTML = resultCities[i].name;
    }
    
    document.querySelector("#TotalMiles").innerHTML = Math.round(roundTripDist(resultCities)) + " Miles";
    
    //printFastestAndSlowestPaths();
    
    alert("Operation Finished");
});

function trimString(s) {
    //console.log("Before: " + s);
    return s.trim();
}