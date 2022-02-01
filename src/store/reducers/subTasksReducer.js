import {
  SUBTASK_DELETE_SUCCESS,
  SUBTASK_LIST_FETCH_SUCCESS,
  SUBTASKS_FETCH_SUCCESS,
} from 'store/actions/subTaskActions'

export const initialState = {
  subTasks: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SUBTASK_LIST_FETCH_SUCCESS: {
      return {
        ...state,
        subTasks: payload.subTasks.reduce((acc, task) => [...acc, ...task], []),
      }
    }

    case SUBTASKS_FETCH_SUCCESS: {
      return { ...state, subTasks: [...state.subTasks, ...payload.subTasks] }
    }

    case SUBTASK_DELETE_SUCCESS: {
      return {
        ...state,
        subTasks: state.subTasks.filter(subTask => subTask.id !== payload.id),
      }
    }

    default:
      return state
  }
}
