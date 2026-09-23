// Algorithm 1 reverses the word and compares it to the original word
// I found it online https://www.geeksforgeeks.org/javascript/palindrome-in-javascript/
function isPalindromeReverse(str) {

    // Reverse the string
    let rev = str.split("").reverse().join("");

    // Check if the reversed word matches the original
    if (rev == str) {
        return true;
    }

    // The word is not a palindrome
    return false;
}


// Algorithm 2 compares characters from opposite ends of the word and moves toward the middle
// AI helped with this one 😁
function isPalindromeTwoPointer(str) {

    // Start at the first character
    let left = 0;

    // Start at the last character
    let right = str.length - 1;

    // Keep checking until the pointers meet
    while (left < right) {

        // Check if the characters are different
        if (str[left] != str[right]) {
            return false;
        }

        // Move the left pointer toward the middle
        left++;

        // Move the right pointer toward the middle
        right--;
    }

    // All characters matched, so it is a palindrome
    return true;
}


// Get the form from the HTML
const form = document.getElementById("palindromeForm");


// Run this function when the form is submitted
form.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get the word entered by the user
    let word = document.getElementById("word").value.trim();

    // Get the algorithm number entered by the user
    let algorithm = document.getElementById("algorithm").value;

    // Get the area where error messages are displayed
    let errorMessage = document.getElementById("errorMessage");

    // Clear any previous error message
    errorMessage.textContent = "";


    // Check if the user entered a word
    if (word === "") {

        // Display an error message
        errorMessage.textContent = "Please enter a word.";

        // Stop the function
        return;
    }


    // Check if the algorithm is 1 or 2
    if (algorithm !== "1" && algorithm !== "2") {

        // Display an error message
        errorMessage.textContent =
            "Please enter 1 or 2 for the algorithm.";

        // Stop the function
        return;
    }


    // Store the result of the selected algorithm
    let result;


    // Use Algorithm 1 if the user entered 1
    if (algorithm === "1") {

        result = isPalindromeReverse(word);
    }

    // Use Algorithm 2 if the user entered 2
    else {

        result = isPalindromeTwoPointer(word);
    }


    // Create an object to store the palindrome information
    const palindromeCheck = {

        // Store the word
        word: word,

        // Store the algorithm number
        algorithm: algorithm,

        // Store whether the word is a palindrome
        isPalindrome: result
    };


    // Add the result to the correct list
    if (palindromeCheck.algorithm === "1") {

        addResultToList(
            "algorithm1List",
            palindromeCheck
        );

    } else {

        addResultToList(
            "algorithm2List",
            palindromeCheck
        );
    }


    // Clear the form after submitting
    form.reset();

});


// Function for adding a result to a list
function addResultToList(listID, check) {

    // Find the correct list using its ID
    const list = document.getElementById(listID);

    // Create a new list item
    const listItem = document.createElement("li");

    // Display the word and whether it is a palindrome
    // Example: racecar: true
    listItem.textContent =
        check.word + ": " + check.isPalindrome;

    // Add the result to the list
    list.appendChild(listItem);
}


// Clear the Algorithm 1 list
document.getElementById("clear1").addEventListener(
    "click",
    function() {

        // Remove all results from the Algorithm 1 list
        document.getElementById("algorithm1List").innerHTML = "";

    }
);


// Clear the Algorithm 2 list
document.getElementById("clear2").addEventListener(
    "click",
    function() {

        // Remove all results from the Algorithm 2 list
        document.getElementById("algorithm2List").innerHTML = "";

    }
);