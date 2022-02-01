import { createSelector } from '@reduxjs/toolkit'
import { sortBy } from 'utils/sort'
import { getSubTasksSelector } from './subTasksSelector'

const tasksSelector = state => state.tasksReducer

export const getSortRulesSelector = createSelector(tasksSelector, tasks => tasks.sortRules)
export const getSearchValueSelector = createSelector(tasksSelector, tasks => tasks.searchValue)

export const getSortedTasksSelector = createSelector(tasksSelector, tasks =>
  sortBy(tasks.taskList, tasks.sortRules),
)

export const getFilteredTasksSubTasksSelector = createSelector(
  getSortedTasksSelector,
  getSubTasksSelector,
  getSearchValueSelector,
  (tasks, subTasks, searchValue) => {
    const search = value => value.title.toLowerCase().match(searchValue.toLowerCase())

    return {
      tasks: searchValue ? tasks.filter(search) : tasks,
      subTasks: searchValue ? subTasks.filter(search) : subTasks,
    }
  },
)
