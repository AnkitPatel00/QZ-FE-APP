import { configureStore } from '@reduxjs/toolkit'
import questionReducer from '../features/question.slice'

const store = configureStore({
  reducer: {
  questionsState:questionReducer
}
})

export default store