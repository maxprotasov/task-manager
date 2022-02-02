import {
  SUBTASK_DELETE_SUCCESS,
  SUBTASK_LIST_FETCH_SUCCESS,
  SUBTASK_SELECT_LABELS,
  SUBTASKS_FETCH_SUCCESS,
} from 'store/actions/subTaskActions'

export const initialState = {
  subTasks: [],
  selectedLabels: [],
  labels: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SUBTASK_LIST_FETCH_SUCCESS: {
      const subTasks = payload.subTasks.flat()

      return {
        ...state,
        labels: [...new Set(subTasks.map(({ labels }) => labels).flat())],
        subTasks,
      }
    }

    case SUBTASKS_FETCH_SUCCESS: {
      return { ...state, subTasks: [...state.subTasks, ...payload.subTasks] }
    }

    case SUBTASK_SELECT_LABELS: {
      return {
        ...state,
        selectedLabels: payload.selectedLabels.reduce(
          (acc, subTaskIds) => [...acc, subTaskIds.value],
          [],
        ),
      }
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
