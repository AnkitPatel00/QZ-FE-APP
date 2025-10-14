import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import que from '../que';

const BACKEND = import.meta.env.VITE_BACKEND


export const getQuestions = createAsyncThunk(
  "get/questions",
  async ({ category }) => {
    try {
      const response = await fetch(`${BACKEND}/quiz${category?`?category=${category}`:""}`);
      const data = await response.json();
      return data;
      
    } catch (error) {
      throw error;
    }
  }
);

const questionSlice = createSlice({
  name: "questionsState",
  initialState: {
    questions:[],
    status: "idle",
    error: null,
    score:0,
    questionIndex: 0,
    gameMenu:true,
    gameOver: false,
  },
  reducers: {

    gameOverToggle: (state,action) => {
      state.gameOver = action.payload
    },
    gameMenuToggle: (state,action) => {
      state.gameMenu = action.payload
    },
    increaseScore: (state,action) => {
      state.score = action.payload ?? state.score +1
    },
    increaseQuestionIndex: (state,action) => {
      state.questionIndex = action.payload ?? state.questionIndex +1
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload.questions;
        state.gameMenu = false
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export default questionSlice.reducer;
export const {gameOverToggle,increaseScore,increaseQuestionIndex,gameMenuToggle} = questionSlice.actions;
