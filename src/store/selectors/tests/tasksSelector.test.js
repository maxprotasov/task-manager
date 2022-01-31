import { getTasksSelector, getSortRulesSelector } from 'store/selectors/tasksSelector'
import { initSortMap } from 'store/reducers/tasksReducer'
import { SORT_TYPES } from 'contants/commonContants'

describe('Subtasks Selector', () => {
  const tasks = [
    { id: 1, title: 'some title', createTime: '' },
    { id: 2, title: 'some title', createTime: '' },
  ]
  const reducersState = {
    subTasks: {},
    tasks: {
      taskList: tasks,
      sortRules: initSortMap[SORT_TYPES.DATE]
    }
  }

  test('get tasks selector', () => {
    expect(getTasksSelector(reducersState)).toEqual(tasks)
  })

  test('Get sort rules selector', () => {
    expect(getSortRulesSelector(reducersState)).toEqual(initSortMap[SORT_TYPES.DATE])
  })
})
