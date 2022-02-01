import { createBrowserHistory } from 'history'
import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import tasksReducer from 'store/reducers/tasksReducer'
import subTasksReducer from 'store/reducers/subTasksReducer'

const history = createBrowserHistory()

const reducer = combineReducers({
  router: connectRouter(history),
  tasksReducer: tasksReducer,
  subTasksReducer: subTasksReducer,
})

export { history }

export default reducer
