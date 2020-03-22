import React from 'react'
const API_KEY = process.env.REACT_APP_HERE_API_KEY ? process.env.REACT_APP_HERE_API_KEY : 'unknown'

function searchLocation(e) {
  e.preventDefault();
  var form = document.getElementById("location-form");
  console.log(form)
}

function autocompleteSearch(e) {
  //console.log(e.target.value)
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      //console.log(xmlHttp.responseText);
      var resultsList = document.getElementById("autocomplete-results");
      if(typeof(resultsList) !== "undefined"){
        resultsList.innerHTML = "";
        var response = JSON.parse(xmlHttp.response);
        if(typeof(response.suggestions) !== "undefined"){
          for(var result of response.suggestions){
            console.log(result)
            var resultOption = document.createElement('option');
            resultOption.innerHTML = result.label;
            resultsList.appendChild(resultOption);
          } 
        }

      }
      



  }
  var search = encodeURI(e.target.value)
  var requestUrl = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${API_KEY}&query=${search}&country=DEU&beginHighlight=<b>&endHighlight=</b>`
  //console.log(requestUrl)
  xmlHttp.open("GET", requestUrl, true); // true for asynchronous 
  xmlHttp.send(null);

}

function generateForm() {
  var form = document.createElement("form");
  form.id = "location-form"
  var formHeader = document.createElement("h3")
  formHeader.innerText = "{t('checkLocations')}";
  form.appendChild(formHeader);
  return form
}

const LocationForm = () => {
  return ( 
    <>
    <span> I will be a form </span> 
    <form id = "location-form" >
      <label for="location-1">Standort 1</label><br></br>
    <input type = "text" onChange = {autocompleteSearch} placeholder = "Search Location" list="autocomplete-results"></input><br></br>
    <datalist id="autocomplete-results">
    <option>Deutschland, Frankfurt am Main, <b>Berl</b>iner Straße</option>
    </datalist>
    <label for="date-1">Date</label><br></br>
    <input type="date" name="date-1"></input><br></br>
    <label for="from-1">Von</label>
    <input type="time" name="from-1"></input>
    <label for="to-1">Bis</label>
    <input type="time" name="to-1"></input><br></br>
    <button onClick = {searchLocation}>Submit</button>
    </form>
    </>
  )
}

export default LocationForm


var data = {
  latitude: 52.32383,
  longitude: 13.06973,
  datetime: "YYYY-mm-ddTHH:MM:ssZ"
}