const API_KEY = process.env.REACT_APP_HERE_API_KEY ? process.env.REACT_APP_HERE_API_KEY : 'unknown'

export const autocompleteSearch = (e, callback) => {
  var xmlHttp = new XMLHttpRequest()

  var search = encodeURI(e.target.value)
  var requestUrl = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${API_KEY}&query=${search}&country=DEU`

  xmlHttp.open('GET', requestUrl, true) // true for asynchronous
  xmlHttp.send(null)

  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      const response = JSON.parse(xmlHttp.response)
      callback.apply(this, [response])
    }
  }
}
