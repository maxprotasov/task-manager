import { createAction } from '@reduxjs/toolkit'

export const TASKS_FETCH_SUCCESS = 'TASKS_FETCH_SUCCESS'
export const TASKS_FETCH_ERROR = 'TASKS_FETCH_ERROR'

export const SORT_TASKS_BY_DATE = 'SORT_TASKS_BY_DATE'
export const SORT_TASKS_BY_TITLE = 'SORT_TASKS_BY_TITLE'

export const TASK_CREATE = 'TASK_CREATE'
export const TASK_CREATE_SUCCESS = 'TASK_CREATE_SUCCESS'
export const TASK_CREATE_ERROR = 'TASK_CREATE_ERROR'

export const TASK_DELETE = 'TASK_DELETE'
export const TASK_DELETE_SUCCESS = 'TASK_DELETE_SUCCESS'
export const TASK_DELETE_ERROR = 'TASK_DELETE_ERROR'

export const setTasksFetchSuccess = createAction(TASKS_FETCH_SUCCESS)
export const setTasksFetchError = createAction(TASKS_FETCH_ERROR)

export const createNewTask = createAction(TASK_CREATE)
export const setCreatedTaskSuccess = createAction(TASK_CREATE_SUCCESS)
export const setCreatedTaskError = createAction(TASK_CREATE_ERROR)

export const setDeleteTask = createAction(TASK_DELETE)
export const setDeleteTaskSuccess = createAction(TASK_DELETE_SUCCESS)
export const setDeleteTaskError = createAction(TASK_DELETE_ERROR)

export const sortTasksByDate = createAction(SORT_TASKS_BY_DATE)
export const sortTasksByTitle = createAction(SORT_TASKS_BY_TITLE)
