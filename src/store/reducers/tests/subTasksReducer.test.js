import subTasksReducer, { initialState } from 'store/reducers/subTasksReducer'
import {
  deleteSubTaskSuccess,
  setSubTaskListFetchSuccess,
  setSubTasksFetchSuccess,
} from 'store/actions/subTaskActions'

describe('Subtasks Reducer', () => {
  const subTasksLists = [
    [
      { id: '1', taskId: 1 },
      { id: '4', taskId: 1 },
    ],
    [{ id: '2', taskId: 2 }],
  ]

  const subTasks = [
    { id: '1', taskId: 1 },
    { id: '4', taskId: 1 },
    { id: '2', taskId: 2 },
  ]

  test('should return the initial state', () => {
    expect(subTasksReducer(undefined, {})).toEqual(initialState)
  })

  test('should set subTasksList after init fetch', () => {
    expect(
      subTasksReducer(initialState, setSubTaskListFetchSuccess({ subTasks: subTasksLists })),
    ).toEqual({
      subTasks,
    })
  })

  describe('set sub tasks fetch success', () => {
    const newSubTasks = { id: '3', taskId: 3 }

    test('with init state', () => {
      expect(
        subTasksReducer(initialState, setSubTasksFetchSuccess({ subTasks: [newSubTasks] })),
      ).toEqual({ subTasks: [newSubTasks] })
    })

    test('with some state', () => {
      expect(
        subTasksReducer({ subTasks }, setSubTasksFetchSuccess({ subTasks: [newSubTasks] })),
      ).toEqual({ subTasks: [...subTasks, newSubTasks] })
    })
  })

  describe('delete subtask success', () => {
    test('deleted subtask is on the state', () => {
      expect(subTasksReducer({ subTasks }, deleteSubTaskSuccess({ taskId: 1, id: '1' }))).toEqual({
        subTasks: [
          { id: '4', taskId: 1 },
          { id: '2', taskId: 2 },
        ],
      })
    })

    test('deleted subtask is not on the state', () => {
      expect(subTasksReducer({ subTasks }, deleteSubTaskSuccess({ taskId: 5, id: '5' }))).toEqual({
        subTasks,
      })
    })
  })
})
