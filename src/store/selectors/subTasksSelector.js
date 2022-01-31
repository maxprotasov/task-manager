import { createSelector } from '@reduxjs/toolkit'

const tasksSelector = state => state.subTasks

export const getSubTasksSelector = createSelector(tasksSelector, tasks => tasks.subTasksInfo)
