import React, { createRef, useState } from 'react'
import { autocompleteSearch } from './_helpers'
import { Formik } from 'formik'
import { Form, Input, TimePicker, DatePicker } from 'formik-antd'
import FormItem from 'antd/lib/form/FormItem'
import { useTranslation } from 'react-i18next'

const API_KEY = process.env.REACT_APP_HERE_API_KEY ? process.env.REACT_APP_HERE_API_KEY : 'unknown'

const LocationForm = () => {
  const [submitted, setSubmittedState] = useState(false)
  const { t } = useTranslation()
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
      <h4 style={{ marginTop: 0, marginBottom: 10 }}>{t('form.title')}</h4>
      <p>
        <span>{t('form.desc')}</span>
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
        onSubmit={(data, actions) => {
          actions.setSubmitting(true)
          setTimeout(() => {
            actions.setSubmitting(false)
            actions.resetForm()
            setSubmittedState(true)
          }, 100)
        }}
        render={() => (
          <Form layout="vertical">
            <Form.Item name="location" label={t('form.fields.location.label')}>
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
                placeholder={t('form.fields.location.placeholder')}
              />

              <datalist id="autocomplete-results">
                {autocompleteState &&
                  Array.isArray(autocompleteState) &&
                  autocompleteState.map(result => <option onClick={onInput(result)} key={result} value={result} />)}
              </datalist>
            </Form.Item>

            <Form.Item name="date" label={t('form.fields.date.label')}>
              <DatePicker
                name="date"
                style={{ width: '100%' }}
                placeholder={t('form.fields.date.placeholder')}
                format={t('form.fields.date.format')}
              />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Form.Item
                name="time.start"
                style={{ flex: '50%', marginRight: 10 }}
                label={t('form.fields.time.from.label')}
              >
                <TimePicker
                  name="time.start"
                  style={{ width: '100%' }}
                  showTime={{ format: 'HH:mm' }}
                  placeholder={t('form.fields.time.from.placeholder')}
                  format={t('form.fields.time.from.format')}
                />
              </Form.Item>

              <Form.Item name="time.end" style={{ flex: '50%' }} label={t('form.fields.time.to.label')}>
                <TimePicker
                  name="time.end"
                  style={{ width: '100%' }}
                  showTime={{ format: 'HH:mm' }}
                  placeholder={t('form.fields.time.to.placeholder')}
                  format={t('form.fields.time.to.format')}
                />
              </Form.Item>
            </div>

            <FormItem>
              <button
                type="submit"
                className="cta-button primary"
                style={{ borderRadius: 2, marginTop: 30, width: '100%' }}
              >
                {t('form.button')}
              </button>
            </FormItem>
            {submitted && <span>{t('form.demoinfo')}</span>}
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
