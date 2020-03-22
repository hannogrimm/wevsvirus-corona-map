import React from 'react'
import ReactDOM from 'react-dom'
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

function addLocation(e) {
  e.preventDefault()
  var form = document.getElementById('location-form')
  var nLocation = form.children.length + 1
  var locationInputId = `location-input-${nLocation}`
  var autocompleteListId = `autocomplete-results-${nLocation}`
  var dateInputId = `date-${nLocation}`
  var fromInputId = `from-${nLocation}`
  var toInputId = `to-${nLocation}`
  //console.log(form.children);
  class Location extends React.Component {
    render() {
      return (
        <>
          <label for={locationInputId}>Standort {nLocation}</label>
          <br></br>
          <input
            type="text"
            onChange={autocompleteSearch}
            placeholder="Search Location"
            id={locationInputId}
            list={autocompleteListId}
          ></input>
          <br></br>
          <datalist id={autocompleteListId}></datalist>
          <label for={dateInputId}>Date</label>
          <br></br>
          <input type="date" name={dateInputId} id={dateInputId}></input>
          <br></br>
          <label for={fromInputId}>Von</label>
          <input type="time" name={fromInputId} id={fromInputId}></input>
          <label for={toInputId}>Bis</label>
          <input type="time" name={toInputId} id={toInputId}></input>
          <br></br>
          <button onClick={addLocation}>+</button>
        </>
      )
    }
  }

  var div = document.createElement('div')
  div.id = `location-${nLocation}`
  form.appendChild(div)
  ReactDOM.render(<Location />, document.getElementById(`location-${nLocation}`))
}

function generateForm() {
  var form = document.createElement('form')
  form.id = 'location-form'
  var formHeader = document.createElement('h3')
  formHeader.innerText = "{t('checkLocations')}"
  form.appendChild(formHeader)
  return form
}

const LocationForm = () => {
  var nLocation = 1
  var locationInputId = `location-input-${nLocation}`
  var autocompleteListId = `autocomplete-results-${nLocation}`
  var dateInputId = `date-${nLocation}`
  var fromInputId = `from-${nLocation}`
  var toInputId = `to-${nLocation}`
  var divId = `location-${nLocation}`
  return (
    <>
      <span> I will be a form </span>
      <form id="location-form">
        <div id={divId}>
          <label for={locationInputId}>Standort {nLocation}</label>
          <br></br>
          <input
            type="text"
            onChange={autocompleteSearch}
            placeholder="Search Location"
            id={locationInputId}
            list={autocompleteListId}
          ></input>
          <br></br>
          <datalist id={autocompleteListId}></datalist>
          <label for={dateInputId}>Date</label>
          <br></br>
          <input type="date" name={dateInputId} id={dateInputId}></input>
          <br></br>
          <label for={fromInputId}>Von</label>
          <input type="time" name={fromInputId} id={fromInputId}></input>
          <label for={toInputId}>Bis</label>
          <input type="time" name={toInputId} id={toInputId}></input>
          <br></br>
          <button onClick={addLocation}>+</button>
        </div>
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
