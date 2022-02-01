import { SORT_TYPES } from 'contants/commonContants'
import {
  SORT_TASKS_BY_DATE,
  SORT_TASKS_BY_TITLE,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_SUCCESS,
  TASKS_FETCH_SUCCESS,
  TASKS_SET_SEARCH_VALUE,
} from 'store/actions/taskActions'

export const initSortMap = {
  [SORT_TYPES.DATE]: { type: SORT_TYPES.DATE, fieldName: 'createTime', reverse: false },
  [SORT_TYPES.STRING]: { type: SORT_TYPES.STRING, fieldName: 'title', reverse: false },
}

export const initialState = {
  taskList: [],
  searchValue: '',
  sortRules: initSortMap[SORT_TYPES.DATE],
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

    case TASKS_SET_SEARCH_VALUE: {
      return { ...state, searchValue: payload.searchValue }
    }

    case SORT_TASKS_BY_TITLE:
    case SORT_TASKS_BY_DATE: {
      if (state.sortRules.type === payload.type) {
        return {
          ...state,
          sortRules: { ...initSortMap[payload.type], reverse: !state.sortRules.reverse },
        }
      }

      return { ...state, sortRules: initSortMap[payload.type] || state.sortRules }
    }

    default:
      return state
  }
}
