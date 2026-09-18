async function getBaconipsum() {
  // first build the API call string by starting with the URL
  var apiString = "https://baconipsum.com/api/";
  // next add the parameters to the string using the drop down lists
  var theNewParagraphs = document.getElementById("newParagraphs").value;
  apiString = apiString + "?type=meat&paras=" + theNewParagraphs;
  alert(apiString);  // show the API string

  // now make the API call to the web service using the string and store what is returned in response
  var response = await fetch(apiString);

  // finally, print the response in the various formats
  document.getElementById("myRawData").innerHTML = "";   // clear what was previously shown
  document.getElementById("myFormattedData").innerHTML = "";   // clear what was previously shown

  var jsonData = await response.json();  // read the response as JSON
  
  // stringify and print out the JSON object in the RawData section
  document.getElementById("myRawData").innerHTML = JSON.stringify(jsonData);
 
  // loop through the JSON object one paragraph at a time and print each in the FormattedData section
  for (var para in jsonData) {   
      document.getElementById("myFormattedData").innerHTML += "<p>" + jsonData[para] + "</p>";
    }

    runCipher(jsonData);

  return true;
}

function runCipher(paragraphs) {
    var shift = 3;
        var originalText = document.getElementById("originalText");
        var cipherOutput = document.getElementById("cipherOutput");

        originalText.innerHTML = "";
        cipherOutput.innerHTML = "";

        for (var paragraphText of paragraphs) {
                var originalParagraph = document.createElement("p");
                var encryptedParagraph = document.createElement("p");

                originalParagraph.textContent = paragraphText;
                encryptedParagraph.textContent = caesarCipher(paragraphText, shift);

                originalText.appendChild(originalParagraph);
                cipherOutput.appendChild(encryptedParagraph);
        }
}

// A becomes D, B becomes E, and C becomes F.
// Spaces, numbers, and punctuation are left unchanged.
function caesarCipher(text, shift) {
  var result = "";

  // Go through the text one character at a time
  for (var i = 0; i < text.length; i++) {
      var character = text[i];

      // Shift uppercase letters while keeping them within A-Z
      if (character >= "A" && character <= "Z") {
          result += String.fromCharCode(
              ((character.charCodeAt(0) - 65 + shift) % 26) + 65
          );
      }

      // Shift lowercase letters while keeping them within a-z
      else if (character >= "a" && character <= "z") {
          result += String.fromCharCode(
              ((character.charCodeAt(0) - 97 + shift) % 26) + 97
          );
      }

      // Keep spaces, numbers, and punctuation the same
      else {
          result += character;
      }
  }

  // Return the encrypted text
  return result;
}