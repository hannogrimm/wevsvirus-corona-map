import React, { createRef, useState } from 'react'
import { autocompleteSearch } from './_helpers'
import { Formik } from 'formik'
import { Form, Input, TimePicker, DatePicker } from 'formik-antd'
import FormItem from 'antd/lib/form/FormItem'

const API_KEY = process.env.REACT_APP_HERE_API_KEY ? process.env.REACT_APP_HERE_API_KEY : 'unknown'

const LocationForm = () => {
  const [autocompleteState, setAutocompleteState] = useState([])
  const inputRef = createRef()

  const onInput = (value = null) => {
    const val = value ? value : inputRef.current && inputRef.current.value
  }

  const onAutocomplete = results => {
    const autocompleteResults = []

    results &&
      results.suggestions &&
      Object.keys(results.suggestions).forEach(key => {
        const result = results.suggestions[key]
        autocompleteResults.push(result.label)
      })

    setAutocompleteState(autocompleteResults)
    console.log(results)
  }

  return (
    <div className="location-form">
      <h4 style={{ marginTop: 0, marginBottom: 10 }}>Sende Deine letzten Standorte</h4>
      <p>
        <span>Wähle Deine letzten Standorte aus oder importiere Deine Bewegungshistorie von Google</span>
      </p>
      <Formik
        initialValues={{
          location: '',
          date: null,
          time: {
            start: null,
            end: null,
          },
        }}
        render={() => (
          <Form layout="vertical">
            <Form.Item name="location" label="Standort">
              <Input
                name="location"
                ref={inputRef}
                size="large"
                type="text"
                onChange={e => {
                  autocompleteSearch(e, onAutocomplete)
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    onInput()
                  }
                }}
                id="autocomplete-input"
                list="autocomplete-results"
                placeholder="Stadt, Adresse, Gebäude, Örtlichkeit etc."
              />

              <datalist id="autocomplete-results">
                {autocompleteState &&
                  Array.isArray(autocompleteState) &&
                  autocompleteState.map(result => <option onClick={onInput(result)} key={result} value={result} />)}
              </datalist>
            </Form.Item>

            <Form.Item name="date" label="Datum">
              <DatePicker name="date" style={{ width: '100%' }} placeholder="Tag des Besuchs" format="DD.MM.YYYY" />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Form.Item name="time.start" style={{ flex: '50%', marginRight: 10 }} label="Von">
                <TimePicker name="time.start" style={{ width: '100%' }} showTime={{ format: 'HH:mm' }} placeholder="Uhrzeit" format="HH:mm" />
              </Form.Item>

              <Form.Item name="time.end" style={{ flex: '50%' }} label="Bis">
                <TimePicker name="time.end" style={{ width: '100%' }} showTime={{ format: 'HH:mm' }} placeholder="Uhrzeit"  format="HH:mm" />
              </Form.Item>
            </div>

            <FormItem>
              <button className="cta-button primary" style={{ borderRadius: 2, marginTop: 30, width: '100%' }}>
                Übermittle diesen Standort
              </button>
            </FormItem>
          </Form>
        )}
      />
    </div>
  )
}

export default LocationForm

var data = {
  latitude: 52.32383,
  longitude: 13.06973,
  datetime: 'YYYY-mm-ddTHH:MM:ssZ',
}
