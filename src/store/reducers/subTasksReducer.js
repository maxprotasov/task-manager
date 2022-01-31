import {
  SUBTASK_DELETE_SUCCESS,
  SUBTASK_LIST_FETCH_SUCCESS,
  SUBTASKS_FETCH_SUCCESS,
} from 'store/actions/subTaskActions'

const initialState = {
  subTasksInfo: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SUBTASK_LIST_FETCH_SUCCESS: {
      return { ...state, subTasksInfo: [...state.subTasksInfo, ...payload.subTasksInfo] }
    }

    case SUBTASKS_FETCH_SUCCESS: {
      return { ...state, subTasksInfo: [...state.subTasksInfo, payload.subTasks] }
    }

    case SUBTASK_DELETE_SUCCESS: {
      return {
        ...state,
        subTasksInfo: state.subTasksInfo.map(subTaskData => {
          if (subTaskData.taskId === payload.taskId) {
            return {
              ...subTaskData,
              subTasks: subTaskData.subTasks.filter(subTask => subTask.id !== payload.id),
            }
          }

          return subTaskData
        }),
      }
    }

    default:
      return state
  }
}
