import { SORT_TYPES } from 'contants/commonContants'
import {
  SORT_TASKS_BY_DATE,
  SORT_TASKS_BY_TITLE,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_SUCCESS,
  TASKS_FETCH_SUCCESS,
} from 'store/actions/taskActions'

const initSortMap = {
  [SORT_TYPES.DATE]: { type: SORT_TYPES.DATE, fieldName: 'createTime', reverse: false },
  [SORT_TYPES.STRING]: { type: SORT_TYPES.STRING, fieldName: 'title', reverse: false },
}

const initialState = {
  taskList: [],
  sortRules: initSortMap[SORT_TYPES.STRING],
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case TASKS_FETCH_SUCCESS: {
      return { ...state, taskList: payload.tasks }
    }

    case TASK_CREATE_SUCCESS: {
      return { ...state, taskList: [...state.taskList, payload.task] }
    }

    case TASK_DELETE_SUCCESS: {
      return { ...state, taskList: state.taskList.filter(task => task.id !== payload.taskId) }
    }

    case SORT_TASKS_BY_TITLE:
    case SORT_TASKS_BY_DATE: {
      if (state.sortRules.type === payload.type) {
        return {
          ...state,
          sortRules: { ...initSortMap[payload.type], reverse: !state.sortRules.reverse },
        }
      }

      return { ...state, sortRules: initSortMap[payload.type] }
    }

    default:
      return state
  }
}