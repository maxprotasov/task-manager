import subTasksReducer, { initialState } from 'store/reducers/subTasksReducer'
import {
  deleteSubTaskSuccess,
  setSubTaskListFetchSuccess,
  setSubTasksFetchSuccess,
} from 'store/actions/subTaskActions'

describe('Subtasks Reducer', () => {
  const subTasksLists = [
    [
      { id: '1', taskId: 1, labels: ['1'] },
      { id: '4', taskId: 1, labels: ['2'] },
    ],
    [{ id: '2', taskId: 2, labels: ['3', '4'] }],
  ]

  const subTasks = [
    { id: '1', taskId: 1, labels: ['1'] },
    { id: '4', taskId: 1, labels: ['2'] },
    { id: '2', taskId: 2, labels: ['3', '4'] },
  ]

  const labels = ['1', '2', '3', '4']

  it('should return the initial state', () => {
    expect(subTasksReducer(undefined, {})).toStrictEqual(initialState)
  })

  it('should set subTasksList after init fetch', () => {
    expect(
      subTasksReducer(
        initialState,
        setSubTaskListFetchSuccess({ ...initialState, subTasks: subTasksLists }),
      ),
    ).toStrictEqual({
      ...initialState,
      labels,
      subTasks,
    })
  })

  describe('set sub tasks fetch success', () => {
    const newSubTasks = { id: '3', taskId: 3 }

    it('with init state', () => {
      expect(
        subTasksReducer(initialState, setSubTasksFetchSuccess({ subTasks: [newSubTasks] })),
      ).toStrictEqual({ ...initialState, subTasks: [newSubTasks] })
    })

    it('with some state', () => {
      expect(
        subTasksReducer(
          { ...initialState, subTasks },
          setSubTasksFetchSuccess({ subTasks: [newSubTasks] }),
        ),
      ).toStrictEqual({ ...initialState, subTasks: [...subTasks, newSubTasks] })
    })
  })

  describe('delete subtask success', () => {
    it('deleted subtask is on the state', () => {
      expect(
        subTasksReducer(
          { ...initialState, subTasks },
          deleteSubTaskSuccess({ taskId: 1, id: '1' }),
        ),
      ).toStrictEqual({
        ...initialState,
        subTasks: [
          { id: '4', taskId: 1, labels: ['2'] },
          { id: '2', taskId: 2, labels: ['3', '4'] },
        ],
      })
    })

    it('deleted subtask is not on the state', () => {
      expect(
        subTasksReducer(
          { ...initialState, subTasks },
          deleteSubTaskSuccess({ taskId: 5, id: '5' }),
        ),
      ).toStrictEqual({
        ...initialState,
        subTasks,
      })
    })
  })
})
