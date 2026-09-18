// Store the numbers entered by the user
var numbers = [];

// Store the minimum and maximum range
var minimumValue;
var maximumValue;


// Add a number to the list
function addNumber() {

    var numberInput = document.forms["myForm"]["newNumber"];
    var newNumber = Number(numberInput.value);
    var message = document.getElementById("message");

    // Automatically get the minimum and maximum values
    minimumValue = Number(document.forms["myForm"]["minimum"].value);
    maximumValue = Number(document.forms["myForm"]["maximum"].value);

    // Make sure a range was entered
    if (
        document.forms["myForm"]["minimum"].value === "" ||
        document.forms["myForm"]["maximum"].value === ""
    ) {
        message.textContent = "Please enter the minimum and maximum values first.";
        return;
    }

    // Make sure the minimum isn't greater than the maximum
    if (minimumValue > maximumValue) {
        message.textContent = "The minimum value cannot be greater than the maximum value.";
        return;
    }

    // Make sure a number was entered
    if (numberInput.value === "") {
        message.textContent = "Please enter a number.";
        return;
    }

    // Make sure the number is inside the range
    if (newNumber < minimumValue || newNumber > maximumValue) {
        message.textContent =
            "Please enter a number between " +
            minimumValue +
            " and " +
            maximumValue +
            ".";

        numberInput.value = "";
        return;
    }

    // Add the number to the array
    numbers.push(newNumber);

    // Display the number
    displayNumbers();

    // Calculate mean, median, and mode
    calculateMean();
    calculateMedian();
    calculateMode();

    // Clear the input field
    numberInput.value = "";

    message.textContent = "Number included.";
}


// Display all numbers entered
function displayNumbers() {

    var numberList = document.getElementById("numberList");

    numberList.innerHTML = "";

    for (var i = 0; i < numbers.length; i++) {

        var numberItem = document.createElement("span");

        numberItem.className = "numberItem";

        numberItem.textContent = numbers[i];

        numberList.appendChild(numberItem);
    }
}


// Calculate the mean
function calculateMean() {

    var total = 0;

    for (var i = 0; i < numbers.length; i++) {
        total = total + numbers[i];
    }

    var mean = total / numbers.length;

    document.getElementById("mean").textContent = mean.toFixed(2);
}


// Calculate the median
function calculateMedian() {

    // Make a copy so we don't change the original order
    var sortedNumbers = numbers.slice().sort(function(a, b) {
        return a - b;
    });

    var middle = Math.floor(sortedNumbers.length / 2);

    var median;

    // Odd number of values
    if (sortedNumbers.length % 2 !== 0) {

        median = sortedNumbers[middle];

    }

    // Even number of values
    else {

        median =
            (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2;
    }

    document.getElementById("median").textContent = median;
}


// Calculate the mode
function calculateMode() {

    var counts = {};

    var highestCount = 0;

    var modes = [];


    // Count how many times each number appears
    for (var i = 0; i < numbers.length; i++) {

        var number = numbers[i];

        if (counts[number] === undefined) {
            counts[number] = 1;
        } else {
            counts[number]++;
        }

        if (counts[number] > highestCount) {
            highestCount = counts[number];
        }
    }


    // Find the numbers with the highest count
    for (var value in counts) {

        if (counts[value] === highestCount) {
            modes.push(value);
        }
    }


    // If every number appears only once, there is no mode
    if (highestCount === 1) {

        document.getElementById("mode").textContent = "No mode";

    } else {

        document.getElementById("mode").textContent = modes.join(", ");
    }
}


// Clear the entire calculator
function clearEverything() {

    numbers = [];

    minimumValue = undefined;
    maximumValue = undefined;

    document.forms["myForm"]["minimum"].value = "";
    document.forms["myForm"]["maximum"].value = "";
    document.forms["myForm"]["newNumber"].value = "";

    document.getElementById("numberList").innerHTML =
        "<p>No numbers entered yet.</p>";

    document.getElementById("mean").textContent = "n/a";
    document.getElementById("median").textContent = "n/a";
    document.getElementById("mode").textContent = "n/a";

    document.getElementById("message").textContent = "";
}