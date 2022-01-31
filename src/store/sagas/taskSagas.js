import { put, call, takeEvery, all } from 'redux-saga/effects'
import { createTask, deleteTask, fetchTasks } from 'api/tasks'
import {
  setCreatedTaskError,
  setCreatedTaskSuccess,
  setDeleteTaskError,
  setDeleteTaskSuccess,
  setTasksFetchError,
  setTasksFetchSuccess,
  TASK_CREATE,
  TASK_DELETE,
} from 'store/actions/taskActions'

export function* getTasks() {
  try {
    const tasks = yield call(fetchTasks)

    yield put(setTasksFetchSuccess({ tasks }))
  } catch (e) {
    yield put(setTasksFetchError)
  }
}

export function* deleteTaskInfo({ payload }) {
  try {
    const deletedTask = yield call(deleteTask, payload.taskId)

    yield put(setDeleteTaskSuccess({ taskId: deletedTask.id }))
  } catch (e) {
    yield put(setDeleteTaskError)
  }
}

export function* setNewTask() {
  try {
    const task = yield call(createTask)

    yield put(setCreatedTaskSuccess({ task }))
  } catch (e) {
    yield put(setCreatedTaskError)
  }
}

function* taskSagas() {
  yield all([
    call(getTasks),
    takeEvery(TASK_CREATE, setNewTask),
    takeEvery(TASK_DELETE, deleteTaskInfo),
  ])
}

export default taskSagas
