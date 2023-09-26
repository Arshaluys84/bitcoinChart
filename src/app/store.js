import { configureStore } from '@reduxjs/toolkit'
import bitcoinSlice from '../features/bitcoin/bitcoinSlice'

export const store = configureStore({
  reducer: {
    bitcoin: bitcoinSlice
  },
})