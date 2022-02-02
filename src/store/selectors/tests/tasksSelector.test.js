import {
  getFilteredTasksSubTasksSelector,
  getSortedTasksSelector,
  getSortRulesSelector,
} from 'store/selectors/tasksSelector'
import { initialState, initSortMap } from 'store/reducers/tasksReducer'
import { SORT_TYPES } from 'contants/commonContants'
import { sortBy } from 'utils/sort'

describe('Tasks Selector', () => {
  const tasks = [
    { id: 3, title: 'arrange', createTime: 1643733231569 },
    { id: 1, title: 'bor', createTime: 1643733227487 },
    { id: 2, title: 'clever', createTime: 1643733229470 },
  ]
  const subTasks = [
    { id: '1', taskId: 1, title: 'bore' },
    { id: '4', taskId: 1, title: 'mifac' },
    { id: '2', taskId: 2, title: 'solliar' },
  ]

  const selectedLabels = []
  const labels = ['1', '2', '3', '4']

  const reducersState = {
    subTasksReducer: {
      labels,
      subTasks,
      selectedLabels,
    },
    tasksReducer: {
      ...initialState,
      taskList: tasks,
    },
  }

  it('Get sort rules selector', () => {
    expect(getSortRulesSelector(reducersState)).toStrictEqual(initSortMap[SORT_TYPES.DATE])
    expect(
      getSortRulesSelector({
        ...reducersState,
        tasksReducer: { taskList: tasks, sortRules: initSortMap[SORT_TYPES.STRING] },
      }),
    ).toStrictEqual(initSortMap[SORT_TYPES.STRING])
  })

  describe('get sorted tasks selector', () => {
    it('default state', () => {
      expect(getSortedTasksSelector(reducersState)).toStrictEqual(
        sortBy(tasks, initSortMap[SORT_TYPES.DATE]),
      )
      expect(getSortedTasksSelector(reducersState)).not.toStrictEqual(
        sortBy(tasks, initSortMap[SORT_TYPES.STRING]),
      )
    })

    it('sort type by date', () => {
      expect(
        getSortedTasksSelector({
          ...reducersState,
          tasksReducer: { taskList: tasks, sortRules: initSortMap[SORT_TYPES.STRING] },
        }),
      ).toStrictEqual(sortBy(tasks, initSortMap[SORT_TYPES.STRING]))
      expect(
        getSortedTasksSelector({
          ...reducersState,
          tasksReducer: { taskList: tasks, sortRules: initSortMap[SORT_TYPES.STRING] },
        }),
      ).not.toStrictEqual(sortBy(tasks, initSortMap[SORT_TYPES.DATE]))
    })
  })

  describe('get filtered tasks and subTasks selector', () => {
    it('default sort value', () => {
      expect(getFilteredTasksSubTasksSelector(reducersState)).toStrictEqual({
        subTasks,
        tasks: sortBy(tasks, initSortMap[SORT_TYPES.DATE]),
      })
    })

    it('first search value', () => {
      const filteredSubtasks = [
        { id: '4', taskId: 1, title: 'mifac' },
        { id: '2', taskId: 2, title: 'solliar' },
      ]

      const filteredTasks = [{ id: 3, title: 'arrange', createTime: 1643733231569 }]

      expect(
        getFilteredTasksSubTasksSelector({
          ...reducersState,
          tasksReducer: { ...reducersState.tasksReducer, searchValue: 'a' },
        }),
      ).toStrictEqual({
        subTasks: filteredSubtasks,
        tasks: sortBy(filteredTasks, initSortMap[SORT_TYPES.DATE]),
      })
    })

    it('second search value', () => {
      const filteredSubtasks = [{ id: '1', taskId: 1, title: 'bore' }]

      const filteredTasks = [{ id: 1, title: 'bor', createTime: 1643733227487 }]

      expect(
        getFilteredTasksSubTasksSelector({
          ...reducersState,
          tasksReducer: { ...reducersState.tasksReducer, searchValue: 'bo' },
        }),
      ).toStrictEqual({
        subTasks: filteredSubtasks,
        tasks: sortBy(filteredTasks, initSortMap[SORT_TYPES.DATE]),
      })
    })
  })
})
