import React from 'react'
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next'
const API_KEY = process.env.REACT_APP_HERE_API_KEY ? process.env.REACT_APP_HERE_API_KEY : 'unknown'

function autocompleteSearch(e) {
  //console.log(e.target.value)
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      //console.log(xmlHttp.responseText);
      var nLocation = document.getElementById('location-form').children.length
    var resultsList = document.getElementById(`autocomplete-results-${nLocation}`)

    if (typeof resultsList !== 'undefined' && resultsList !== null) {
      resultsList.innerHTML = ''
      var response = JSON.parse(xmlHttp.response)
      if (typeof response.suggestions !== 'undefined') {
        for (var result of response.suggestions) {
          var resultOption = document.createElement('option')
          resultOption.innerHTML = result.label
          resultsList.appendChild(resultOption)
        }
      }
    }
  }
  var search = encodeURI(e.target.value)
  var requestUrl = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${API_KEY}&query=${search}&country=DEU&beginHighlight=<b>&endHighlight=</b>`
  //console.log(requestUrl)
  xmlHttp.open('GET', requestUrl, true) // true for asynchronous
  xmlHttp.send(null)
}

class Location extends React.Component {

  render() {
    var locationInputId = `location-input-${this.props.nLocation}`;
    var autocompleteListId = `autocomplete-results-${this.props.nLocation}`;
    var dateInputId = `date-${this.props.nLocation}`;
    var fromInputId = `from-${this.props.nLocation}`;
    var toInputId = `to-${this.props.nLocation}`;

    return(
      <>
    <label for={locationInputId}>Standort {this.props.nLocation}</label><br></br>
  <input type = "text" onChange = {autocompleteSearch} placeholder = "Search Location" id={locationInputId} list={autocompleteListId}></input><br></br>
  <datalist id={autocompleteListId}>
  </datalist>
  <label for={dateInputId}>Date</label><br></br>
  <input type="date" name={dateInputId} id={dateInputId}></input><br></br>
  <label for={fromInputId}>Von</label>
  <input type="time" name={fromInputId} id={fromInputId}></input>
  <label for={toInputId}>Bis</label>
  <input type="time" name={toInputId} id={toInputId}></input><br></br>
  <button onClick={addLocation}>+</button>
  </>
)
    }
}
function addLocation(e) {
  e.preventDefault();
  var form = document.getElementById("location-form");
  var nLocation = form.children.length;
  //console.log(form.children);
 var div = document.createElement("div");
 div.id = `location-${nLocation}`
 form.appendChild(div);
 ReactDOM.render(<Location nLocation={nLocation}/>, document.getElementById(`location-${nLocation}`))
}

function uploadInfections(e) {
  e.preventDefault();

  // Add backend connection to upload infected locations here
}

function checkInfected(e) {
  e.preventDefault();

  // Add backend connection to get infected locations and check against user's location
}

const LocationForm = (props) => {
  const { t } = useTranslation();

  var submitButton;
  if(props.infected){
    submitButton = <button onClick={uploadInfections}>{t('uploadInfections')}</button>
  } else {
    submitButton = <button onClick={checkInfected}>{t('checkInfected')}</button>
  }

  return ( 
    <>
    <span> I will be a form </span> 
    <form id = "location-form" >
    <div id="location-1">
<Location nLocation={1}/>
    </div>
    {submitButton}
    </form>
    </>
  )
}

export default LocationForm

var data = {
  latitude: 52.32383,
  longitude: 13.06973,
  datetime: 'YYYY-mm-ddTHH:MM:ssZ',
}
