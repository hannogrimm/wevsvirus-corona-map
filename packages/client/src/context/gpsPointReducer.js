import {
  GET_GPSPOINTS,
  ADD_GPSPOINT,
  DELETE_GPSPOINT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_GPSPOINT,
  FILTER_GPSPOINTS,
  CLEAR_FILTER,
  GPSPOINT_ERROR,
  CLEAR_GPSPOINTS
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case GET_GPSPOINTS:
      return {
        ...state,
        gpsPoints: action.payload,
        loading: false
      }
    case ADD_GPSPOINT:
      return {
        ...state,
        gpsPoints: [action.payload, ...state.gpsPoints],
        loading: false
      }
    case UPDATE_GPSPOINT:
      return {
        ...state,
        gpsPoints: state.gpsPoints.map(gpsPoint =>
          gpsPoint._id === action.payload._id ? action.payload : gpsPoint
        ),
        loading: false
      }
    case DELETE_GPSPOINT:
      return {
        ...state,
        gpsPoints: state.gpsPoints.filter(
          gpsPoint => gpsPoint._id !== action.payload
        ),
        loading: false
      }
    case CLEAR_GPSPOINT:
      return {
        ...state,
        gpsPoints: null,
        filtered: null,
        error: null,
        current: null
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case GPSPOINT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
