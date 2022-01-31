import { createSelector } from '@reduxjs/toolkit'

const tasksSelector = state => state.tasks

export const getTasksSelector = createSelector(tasksSelector, tasks => tasks.taskList)
export const getSortRulesSelector = createSelector(tasksSelector, tasks => tasks.sortRules)
