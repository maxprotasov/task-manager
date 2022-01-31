import subTasksReducer, { initialState } from 'store/reducers/subTasksReducer'
import {
  deleteSubTaskSuccess,
  setSubTaskListFetchSuccess,
  setSubTasksFetchSuccess,
} from 'store/actions/subTaskActions'

describe('Subtasks Reducer', () => {
  const subTasksInfo = [
    { taskId: 1, subTasks: [{ id: '1', taskId: 1 }, { id: '4', taskId: 1 }] },
    { taskId: 2, subTasks: [{ id: '2', taskId: 2 }] },
  ]

  test('should return the initial state', () => {
    expect(subTasksReducer(undefined, {})).toEqual(initialState)
  })

  test('should set subTasksList after init fetch', () => {
    expect(subTasksReducer(initialState, setSubTaskListFetchSuccess({ subTasksInfo }))).toEqual({
      subTasksInfo,
    })
  })

  describe('set sub tasks fetch success', () => {
    const newSubTasks = { taskId: 3, subTasks: [{ id: '3', taskId: 3 }] }

    test('with init state', () => {
      expect(
        subTasksReducer(initialState, setSubTasksFetchSuccess({ subTasks: newSubTasks })),
      ).toEqual({ subTasksInfo: [newSubTasks] })
    })

    test('with some state', () => {
      expect(
        subTasksReducer({ subTasksInfo }, setSubTasksFetchSuccess({ subTasks: newSubTasks })),
      ).toEqual({ subTasksInfo: [...subTasksInfo, newSubTasks] })
    })
  })

  describe('delete subtask success', () => {
    test('deleted subtask is on the state', () => {
      expect(
        subTasksReducer({ subTasksInfo }, deleteSubTaskSuccess({ taskId: 1, id: '1' })),
      ).toEqual({
        subTasksInfo: [
          { taskId: 1, subTasks: [{ id: '4', taskId: 1 }] },
          { taskId: 2, subTasks: [{ id: '2', taskId: 2 }] },
        ],
      })
    })

    test('deleted subtask is not on the state', () => {
      expect(
        subTasksReducer({ subTasksInfo }, deleteSubTaskSuccess({ taskId: 5, id: '5' })),
      ).toEqual({ subTasksInfo })
    })
  })
})
