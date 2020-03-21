import React, { useReducer } from "react"
import axios from "axios"
import GpsPointContext from "./gpspointContext"
import gpspointReducer from "./gpspointReducer"
import {
  GET_GPSPOINTS,
  ADD_GPSPOINT,
  DELETE_GPSPOINT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_GPSPOINT,
  FILTER_GPSPOINTS,
  CLEAR_GPSPOINTS,
  CLEAR_FILTER,
  GPSPOINT_ERROR
} from "../types"

const GpsPointState = props => {
  const initialState = {
    gpspoints: null,
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(gpspointReducer, initialState)

  // Get GpsPoints
  const getGpsPoints = async () => {
    try {
      const res = await axios.get("/api/gpspoints")

      dispatch({
        type: GET_GPSPOINTS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: GPSPOINT_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Add GpsPoint
  const addGpsPoint = async gpspoint => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const res = await axios.post("/api/gpspoints", gpspoint, config)

      dispatch({
        type: ADD_GPSPOINT,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: GPSPOINT_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Delete GpsPoint
  const deleteGpsPoint = async id => {
    try {
      await axios.delete(`/api/gpspoints/${id}`)

      dispatch({
        type: DELETE_GPSPOINT,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: GPSPOINT_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Update GpsPoint
  const updateGpsPoint = async gpspoint => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const res = await axios.put(
        `/api/gpspoints/${gpspoint._id}`,
        gpspoint,
        config
      )

      dispatch({
        type: UPDATE_GPSPOINT,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: GPSPOINT_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Clear GpsPoints
  const clearGpsPoints = () => {
    dispatch({ type: CLEAR_GPSPOINTS })
  }

  // Set Current GpsPoint
  const setCurrent = gpspoint => {
    dispatch({ type: SET_CURRENT, payload: gpspoint })
  }

  // Clear Current GpsPoint
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Filter GpsPoints
  const filterGpsPoints = text => {
    dispatch({ type: FILTER_GPSPOINTS, payload: text })
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <GpsPointContext.Provider
      value={{
        gpspoints: state.gpspoints,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addGpsPoint,
        deleteGpsPoint,
        setCurrent,
        clearCurrent,
        updateGpsPoint,
        filterGpsPoints,
        clearFilter,
        getGpsPoints,
        clearGpsPoints
      }}
    >
      {props.children}
    </GpsPointContext.Provider>
  )
}

export default GpsPointState
