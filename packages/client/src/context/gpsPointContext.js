import { createContext, useContext } from 'react'

export const GpsPointsContext = createContext()

export const useGPSContext = () => useContext(GpsPointsContext)
