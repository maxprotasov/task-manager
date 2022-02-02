import { createAction } from '@reduxjs/toolkit'

export const SUBTASK_LIST_FETCH_SUCCESS = 'SUBTASK_LIST_FETCH_SUCCESS'
export const SUBTASK_LIST_FETCH_ERROR = 'SUBTASK_LIST_FETCH_ERROR'

export const SUBTASKS_FETCH_SUCCESS = 'SUBTASKS_FETCH_SUCCESS'
export const SUBTASKS_FETCH_ERROR = 'SUBTASKS_FETCH_ERROR'

export const SUBTASK_DELETE = 'SUBTASK_DELETE'
export const SUBTASK_DELETE_SUCCESS = 'SUBTASK_DELETE_SUCCESS'
export const SUBTASK_DELETE_ERROR = 'SUBTASK_DELETE_ERROR'

export const SUBTASK_SELECT_LABELS = 'SUBTASK_SELECT_LABELS'

export const setSubTaskListFetchSuccess = createAction(SUBTASK_LIST_FETCH_SUCCESS)
export const setSubTaskListFetchError = createAction(SUBTASK_LIST_FETCH_ERROR)

export const setSubTasksFetchSuccess = createAction(SUBTASKS_FETCH_SUCCESS)
export const setSubTasksFetchError = createAction(SUBTASKS_FETCH_ERROR)

export const deleteSubTask = createAction(SUBTASK_DELETE)
export const deleteSubTaskSuccess = createAction(SUBTASK_DELETE_SUCCESS)
export const deleteSubTaskError = createAction(SUBTASK_DELETE_ERROR)

export const setSelectedLabels = createAction(SUBTASK_SELECT_LABELS)
