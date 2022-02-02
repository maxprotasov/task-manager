import tasksReducer, { initialState, initSortMap } from 'store/reducers/tasksReducer'
import {
  setCreatedTaskSuccess,
  setDeleteTaskSuccess,
  setSearchValue,
  setTasksFetchSuccess,
  sortTasksByDate,
} from 'store/actions/taskActions'
import { SORT_TYPES } from 'contants/commonContants'

describe('tasks Reducer', () => {
  const tasks = [
    { id: 1, title: 'some title', createTime: '' },
    { id: 2, title: 'some title', createTime: '' },
  ]

  it('Should return the initial state', () => {
    expect(tasksReducer(undefined, {})).toStrictEqual(initialState)
  })

  it('Should set task after init fetch', () => {
    expect(tasksReducer(initialState, setTasksFetchSuccess({ tasks }))).toStrictEqual({
      ...initialState,
      taskList: tasks,
    })
  })

  describe('Set tasks fetch success', () => {
    const newTasks = { id: 3, title: 'some title', createTime: '' }

    it('With init state', () => {
      expect(
        tasksReducer(
          { ...initialState, taskList: tasks },
          setCreatedTaskSuccess({ task: newTasks }),
        ),
      ).toStrictEqual({
        ...initialState,
        taskList: [...tasks, newTasks],
      })
    })
  })

  describe('Delete Task success', () => {
    it('Task is on the state', () => {
      expect(
        tasksReducer({ ...initialState, taskList: tasks }, setDeleteTaskSuccess({ taskId: 1 })),
      ).toStrictEqual({ ...initialState, taskList: [tasks[1]] })
    })

    it('Task is not on the state', () => {
      expect(
        tasksReducer({ ...initialState, taskList: tasks }, setDeleteTaskSuccess({ taskId: 5 })),
      ).toStrictEqual({ ...initialState, taskList: tasks })
    })
  })

  describe('Search value', () => {
    it('set some search value', () => {
      expect(
        tasksReducer(initialState, setSearchValue({ searchValue: 'search value' })),
      ).toStrictEqual({
        ...initialState,
        searchValue: 'search value',
      })
    })

    it('clear search value', () => {
      expect(
        tasksReducer(
          { ...initialState, searchValue: 'search value' },
          setSearchValue({ searchValue: '' }),
        ),
      ).toStrictEqual({ ...initialState, searchValue: '' })
    })
  })

  describe('Sort Tasks', () => {
    it('By Title', () => {
      expect(
        tasksReducer(initialState, sortTasksByDate({ type: SORT_TYPES.STRING })),
      ).toStrictEqual({
        ...initialState,
        sortRules: initSortMap[SORT_TYPES.STRING],
      })
    })

    it('By Date', () => {
      expect(
        tasksReducer(
          { ...initialState, sortRules: initSortMap[SORT_TYPES.STRING] },
          sortTasksByDate({ type: SORT_TYPES.DATE }),
        ),
      ).toStrictEqual(initialState)
    })

    it('By Undefined', () => {
      expect(tasksReducer(initialState, sortTasksByDate({ type: 'some Value' }))).toStrictEqual(
        initialState,
      )
    })
  })
})
