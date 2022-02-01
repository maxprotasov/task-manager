import tasksReducer, { initialState, initSortMap } from 'store/reducers/tasksReducer'
import {
  setCreatedTaskSuccess,
  setDeleteTaskSuccess,
  setSearchValue,
  setTasksFetchSuccess,
  sortTasksByDate,
} from 'store/actions/taskActions'
import { SORT_TYPES } from 'contants/commonContants'

describe('Tasks Reducer', () => {
  const tasks = [
    { id: 1, title: 'some title', createTime: '' },
    { id: 2, title: 'some title', createTime: '' },
  ]

  test('Should return the initial state', () => {
    expect(tasksReducer(undefined, {})).toEqual(initialState)
  })

  test('Should set task after init fetch', () => {
    expect(tasksReducer(initialState, setTasksFetchSuccess({ tasks }))).toEqual({
      ...initialState,
      taskList: tasks,
    })
  })

  describe('Set tasks fetch success', () => {
    const newTasks = { id: 3, title: 'some title', createTime: '' }

    test('With init state', () => {
      expect(
        tasksReducer(
          { ...initialState, taskList: tasks },
          setCreatedTaskSuccess({ task: newTasks }),
        ),
      ).toEqual({
        ...initialState,
        taskList: [...tasks, newTasks],
      })
    })
  })

  describe('Delete Task success', () => {
    test('Task is on the state', () => {
      expect(
        tasksReducer({ ...initialState, taskList: tasks }, setDeleteTaskSuccess({ taskId: 1 })),
      ).toEqual({ ...initialState, taskList: [tasks[1]] })
    })

    test('Task is not on the state', () => {
      expect(
        tasksReducer({ ...initialState, taskList: tasks }, setDeleteTaskSuccess({ taskId: 5 })),
      ).toEqual({ ...initialState, taskList: tasks })
    })
  })

  describe('Search value', () => {
    test('set some search value', () => {
      expect(tasksReducer(initialState, setSearchValue({ searchValue: 'search value' }))).toEqual({
        ...initialState,
        searchValue: 'search value',
      })
    })

    test('clear search value', () => {
      expect(
        tasksReducer(
          { ...initialState, searchValue: 'search value' },
          setSearchValue({ searchValue: '' }),
        ),
      ).toEqual({ ...initialState, searchValue: '' })
    })
  })

  describe('Sort Tasks', () => {
    test('By Title', () => {
      expect(tasksReducer(initialState, sortTasksByDate({ type: SORT_TYPES.STRING }))).toEqual({
        ...initialState,
        sortRules: initSortMap[SORT_TYPES.STRING],
      })
    })

    test('By Date', () => {
      expect(
        tasksReducer(
          { ...initialState, sortRules: initSortMap[SORT_TYPES.STRING] },
          sortTasksByDate({ type: SORT_TYPES.DATE }),
        ),
      ).toEqual(initialState)
    })

    test('By Undefined', () => {
      expect(tasksReducer(initialState, sortTasksByDate({ type: 'some Value' }))).toEqual(
        initialState,
      )
    })
  })
})
