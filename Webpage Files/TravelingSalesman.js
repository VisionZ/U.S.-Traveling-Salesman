//Names of major US Cities
//These naked variables are global
var names = ["New York", "Los Angeles", "Chicago", "Philadelphia", "Phoenix", "San Antonio", "San Diego", "Detroit", "San Jose", "Austin", "Jacksonville", "San Francisco", "Indianapolis", "Columbus", "Fort Worth", "Charlotte", "Seattle", "El Paso", "Dallas", "Denver", "Washington DC", "Memphis", "Boston", "Nashville", "New Orleans"];

//Flight distances between Houston and each city listed above
var distances = [1417.47, 1370.28, 941.83, 1339.78, 1014.13, 189.1, 1301, 1105.77, 1607.65, 146, 820.64, 1642.24, 865.75, 992.31, 237.12, 925.71, 1889.2, 673.88, 225, 878.35, 1218.51, 484.44, 1603.83, 665.42, 317.72];

//Reference Long-Lat Coordinate of Houston
var houstonCoord = new Coordinate(29.760427, -95.369803);

//Long-Lat Coordinates of each city
var coordinates = [
    new Coordinate(40.712775, -74.005973),
    new Coordinate(34.052234, -118.243685),
    new Coordinate(41.878114, -87.629798),
    new Coordinate(39.952584, -75.165222),
    new Coordinate(33.448377, -112.074037),
    new Coordinate(29.424122, -98.493628),
    new Coordinate(32.715738, -117.161084),
    new Coordinate(42.331427, -83.045754),
    new Coordinate(37.338208, -121.886329),
    new Coordinate(30.267153, -97.743061),
    new Coordinate(30.332184, -81.65565),
    new Coordinate(37.774929, -122.419416),
    new Coordinate(39.768403, -86.158068),
    new Coordinate(39.961176, -82.998794),
    new Coordinate(32.755488, -97.330766),
    new Coordinate(35.227087, -80.843127),
    new Coordinate(47.606209, -122.332071),
    new Coordinate(31.761878, -106.485022),
    new Coordinate(32.779091, -96.800270),
    new Coordinate(39.739236, -104.990251),
    new Coordinate(38.907192, -77.036871),
    new Coordinate(35.149534, -90.048980),
    new Coordinate(42.360082, -71.058880),
    new Coordinate(36.162664, -86.781602),
    new Coordinate(29.951066, -90.071532)
];

//Reasons to visit each city mentioned above
var reasons = [
    ["Wall Street", "Good bagels"],
    ["Hollywood", "Beautiful coastlines"],
    ["Famous deep dish pizza", "Home of the Chicago Cubs"],
    ["Home of the Philadelphia 76ers", "World famous Philly cheesesteaks"],
    ["Home of the Phoenix Suns", "Surrounded by desert"],
    ["Home of the San Antonio Spurs", "Has a beautiful river walk"],
    ["Close to the US-Mexican border", "San Diego Zoo"],
    ["Home of the Detroit Pistons", "Home of the Detroit Lions"],
    ["Home of the San Jose Sharks", "The Tech Museum of Innovation"],
    ["Booming tech center", "One of the fastest growing cities in the US"],
    ["Home of the Jacksonville Jaguars", "Jacksonville Zoo and Gardens"],
    ["Largest tech center in the US", "Home of the San Francisco 49ers"],
    ["Hosts the Indy 500 car race", "Soldiers' and Sailors' Monument"],
    ["Columbus Zoo and Aquarium", "COSI Columbus"],
    ["Texas Academy of Mathematics and Science", "Modern Art Museum of Fort Worth"],
    ["Home of the Charlotte Hornets", "Home of the Charlotte Panthers"],
    ["Home of the Seattle Seahawks", "Large tech center in the US"],
    ["Franklin Mountains State Park", "Hueco Tanks State Historic Site"],
    ["Home of the Dallas Mavericks", "Home of the Dallas Cowboys"],
    ["Home of the Denver Broncos", "Has an altitude of 1609.3 meters"],
    ["National capital of the United States", "Home of the Washington Wizards"],
    ["Home of the Memphis Grizzlies", "Famous barbecue"],
    ["Home of the Boston Celtics", "Home of the New England Patriots"],
    ["Full size Parthenon replica", "Ryman Auditorium"],
    ["Home of the New Orleans Pelicans", "Home of the New Orleans Saints"]
];

//Populate a list of city objects
var cities = [];
for (var i = 0; i < names.length; i++) {
    cities[i] = new City(names[i], distances[i], reasons[i], coordinates[i]);
}

function typingListener() {
    
}

window.onload = function() {
    
    var inputTable = document.createElement('table');
    var inputTableCaption = inputTable.createCaption();
    inputTableCaption.innerHTML = "Enter Cities Here (MAX 10)";
    
    for (var i = 1; i <= 10; ++i) {
        var currentRow = inputTable.insertRow(inputTable.rows.length); //insert new rows at the end
        var leftCell = currentRow.insertCell(0);
        var rightCell = currentRow.insertCell(1);
        rightCell.contentEditable = true;
        leftCell.innerHTML = "City " + i;
        rightCell.innerHTML = "Enter City Name Here";
        rightCell.onchange = typingListener();
        rightCell.id = "Input Table Right " + i;
        alert(rightCell.id);
    }
    
    document.getElementById("InputTable").appendChild(inputTable);
      
    var outputTable = document.createElement('table');
    var outputTableCaption = outputTable.createCaption();
    outputTableCaption.innerHTML = "Result (Shortest Way to Visit All Cities)";
    
    for (var i = 1; i <= 10; ++i) {
        var currentRow = outputTable.insertRow(outputTable.rows.length); //insert new rows at the end
        var leftCell = currentRow.insertCell(0);
        var rightCell = currentRow.insertCell(1);
        leftCell.innerHTML = numberToWord(i) + " City To Visit";
    }
    
    document.getElementById("OutputTable").appendChild(outputTable);
};

function numberToWord(n) {
    if (n == 1) {
        return "1st";
    }
    if (n == 2) {
        return "2nd";
    }
    if (n == 3) {
        return "3rd";
    }
    return n + "th";
}

/**
 * @param {City[]} array 
 * A rather stupid way to perform Traveling Salesman 
 */
function shortestPath(array) {
    var allPossiblePaths = permutation(array);
    var shortestPath = allPossiblePaths[0];
    var shortestPathLength = roundTripDist(shortestPath);
    for (var index = 1, numberOfPaths = allPossiblePaths.length; index < numberOfPaths; ++index){
        var currentPath = allPossiblePaths[index];
        var currentPathLength = roundTripDist(currentPath);
        if (currentPathLength < shortestPathLength) {
            shortestPath = currentPath;
            shortestPathLength = currentPathLength;
        }
    }
    return shortestPath;
}

function printFastestAndSlowestPaths() {
    lastPermutations.sort(function(first, next) {
        return roundTripDist(first) - roundTripDist(next);
    });
    console.log("Fastest Paths");
    for (var i = 0; i < 10; ++i) {
        var currentPath = lastPermutations[i];
        var output = roundTripDist(currentPath) + " ";
        for (var k = 0; k < currentPath.length; ++k) {
            output += currentPath[k].name + " -> ";
        }
        console.log(output);
        console.log(" ");
    }
    console.log("Slowest Paths");
    var count = 0;
    for (var i = lastPermutations.length - 1; count < 10; --i, ++count) {
        var currentPath = lastPermutations[i];
        var output = roundTripDist(currentPath) + " ";
        for (var k = 0; k < currentPath.length; ++k) {
            output += currentPath[k].name + " -> ";
        }
        console.log(output);
        console.log(" ");
    }
}

/**
 * @param {City[]} array 
 */
function roundTripDist(array) {
    var totalDistance = 0;
    var lastIndex = array.length - 1;
    for (var index = 0; index < lastIndex;) {
        var currentCity = array[index];
        var nextCity = array[++index];
        
        //(Denver -> Dallas -> Dallas -> Los Angeles) Is Unacceptable You can't visit Dallas twice in a row
        if (currentCity.name === nextCity.name) {
            alert("Should Not Happen With Check On Permutation");
            return 200000000;
        }
        
        totalDistance += currentCity.dist(nextCity);
    }
    return totalDistance;
}

var lastPermutations = null;

function permutation(inputArray) {
    var results = [];

    function permute(arr, memo) {
        var cur, memo = memo || [];

        for (var i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }

        return results;
    }

    var permutation = permute(inputArray);
    
    var cleaned = new Array();
    
    for (var outer = 0, numberOfPermutations = permutation.length; outer < numberOfPermutations; ++outer) {
        var currentPath = permutation[outer];
        var twoInARow = false;
        for (var inner = 0, currentPathLength = currentPath.length; inner < currentPathLength; ) {
            var currentCity = currentPath[inner];
            if (++inner < currentPath.length) {
                if (currentCity.name === currentPath[inner].name) {
                    twoInARow = true;
                    break;
                }
            }
            else {
                break; 
            }
        }
        if (!twoInARow) {
            cleaned.push(currentPath);
        }
    }
    
    return lastPermutations = cleaned;
}

/**
 * @param {Array[]} array
 * @param {Number} index1
 * @param {Number} index2
 */
function swap(array, index1, index2) {
    var tmp = array[index2];
    array[index2] = array[index1];
    array[index1] = tmp;
}

//Returns a array of n random cities from the global variable
function getRandomCities(numberOfCities) {
    var array = [];
    var selectedIndexes = [];
    while (array.length < numberOfCities) {
        var randomIndex = Math.floor(Math.random() * cities.length);
        if (selectedIndexes.indexOf(randomIndex) < 0) {
            selectedIndexes.push(randomIndex);
            array.push(cities[randomIndex]); //access from global variable
        }
    }
    return array;
}

/**
 * @param {Number} angle Angle in degrees
 */
function toRadians(angle) {
    return angle * (Math.PI / 180);
}

/**
 * @param {Number} angle Angle in radians
 */
function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

/**
 * @typedef {Object} City
 * @prop {String} name
 * @prop {Number} distance
 * @prop {String[]} reasons
 * @prop {Coordinate} coords
 * @prop {Number} bearing
 * @prop {Number} dist
 * 
 * @typedef {Object} Coordinate
 * @prop {Number} lat
 * @prop {Number} long
 */

/**
 * City constructor
 * @param {String} name 
 * @param {Number} distance
 * @param {String[]} reasons 
 * @param {Coordinate} coordinates
 */
function City(name, distance, reasons, coordinates) {
    this.name = name;
    this.distance = distance;
    this.reasons = reasons;
    this.coords = coordinates;

    this.bearing = function() {
        var lat1 = toRadians(houstonCoord.lat), lat2 = toRadians(this.coords.lat);
        var longDiff = toRadians(this.coords.long - houstonCoord.long);
        var y = Math.sin(longDiff) * Math.cos(lat2);
        var x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(longDiff);
        var bear = Math.atan2(y, x);

        return (toDegrees(bear) + 360) % 360;
    };

    /**
     * @param {City} other 
     */
    this.dist = function(other) {
        var angleDiff = Math.abs(this.bearing() - other.bearing());
        var c2 = Math.pow(this.distance, 2) + Math.pow(other.distance, 2) - 2 * this.distance * other.distance * Math.cos(toRadians(angleDiff));
        return Math.sqrt(c2);
    };
}


/**
 * Coordinate constructor
 * @param {Number} lat
 * @param {Number} long
 */
function Coordinate(lat, long) {
    this.lat = lat;
    this.long = long;
}