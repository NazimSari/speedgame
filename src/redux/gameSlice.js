import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWordAsync = createAsyncThunk("game/getWrodsAsync", async () => {
  const res = await axios.get(
    "https://random-word-api.vercel.app/api?words=150"
  );
  return res.data;
});

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    words: [],
    currWordIndex: 0,
    correct: 0,
    inCorrect: 0,
    currInput: "",
    result: false,
    startCountdown: false,
    isMatch: false,
    countdown: 60,
    correctIndices: [],
    incorrectIndices: [],
  },
  reducers: {
    decreaseCountdown: (state) => {
      if (state.countdown > 0) state.countdown -= 1;
    },
    setInput: (state, action) => {
      state.currInput = action.payload;
    },
    checkMatch: (state) => {
      const compare = state.words[state.currWordIndex];
      const isMatch = compare === state.currInput.trim();
      state.isMatch = isMatch;
      if (isMatch) {
        state.correct += 1;
        state.correctIndices.push(state.currWordIndex);
        console.log("Match!"); // Eşleşme durumunu konsola yazdır
      } else {
        state.inCorrect += 1;
        state.incorrectIndices.push(state.currWordIndex);
        console.log("Not a match!"); // Eşleşme durumunu konsola yazdır
      }
    },
    incrementWordIndex: (state) => {
      state.currWordIndex += 1;
    },

    setResult: (state, action) => {
      state.result = action.payload;
    },
    setStartCountdown: (state, action) => {
      state.startCountdown = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWordAsync.fulfilled, (state, action) => {
      state.words = action.payload;
    });
  },
});

export const {
  decreaseCountdown,
  setInput,
  checkMatch,
  incrementWordIndex,
  setResult,
  setStartCountdown,
  setCurrCharIndex,
  setCurrChar,
} = gameSlice.actions;

export default gameSlice.reducer;
