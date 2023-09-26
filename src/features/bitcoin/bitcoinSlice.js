import { createSlice } from "@reduxjs/toolkit";

const bitcoinSlice = createSlice({
  name: "bitcoin",
  initialState: { USD: [], EUR: [], GBP: [] },
  reducers: {
    setBitcoinData: (state, action) => {
      const { USD, EUR, GBP } = state;

      return {
        USD: [...USD, action.payload.USD],
        EUR: [...EUR, action.payload.EUR],
        GBP: [...GBP, action.payload.GBP],
      };
    },
  },
});

export const { setBitcoinData } = bitcoinSlice.actions;
export default bitcoinSlice.reducer;
