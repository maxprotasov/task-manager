import { put, call, takeLatest, takeEvery, select, all } from 'redux-saga/effects'
import { setDeleteTask, TASK_CREATE_SUCCESS, TASKS_FETCH_SUCCESS } from 'store/actions/taskActions'
import { getSubTasksSelector } from 'store/selectors/subTasksSelector'
import { fetchSubTasks, deleteSubtask } from 'api/subTasks'
import {
  deleteSubTaskError,
  deleteSubTaskSuccess,
  setSubTaskListFetchError,
  setSubTaskListFetchSuccess,
  setSubTasksFetchError,
  setSubTasksFetchSuccess,
  SUBTASK_DELETE,
} from 'store/actions/subTaskActions'

export function* onFetchSubtasks({ payload }) {
  return yield call(fetchSubTasks, payload)
}

export function* getAllSubTasks({ payload }) {
  try {
    const subTasks = yield all(
      payload.tasks.map(task => call(onFetchSubtasks, { payload: task.id })),
    )

    yield put(setSubTaskListFetchSuccess({ subTasks }))
  } catch (e) {
    yield put(setSubTaskListFetchError)
  }
}

export function* getSubTasks({ payload: { task } }) {
  try {
    const subTasks = yield call(onFetchSubtasks, { payload: task.id })

    yield put(setSubTasksFetchSuccess({ subTasks }))
  } catch (e) {
    yield put(setSubTasksFetchError)
  }
}

export function* onDeleteSubTask({ payload }) {
  try {
    const deletedSubTask = yield call(deleteSubtask, payload.subTaskId)
    const subTasks = yield select(getSubTasksSelector)
    const isLastSubTask = subTasks.find(
      ({ id, taskId }) => id !== deletedSubTask.id && taskId === deletedSubTask.taskId,
    )

    if (!isLastSubTask) {
      yield put(setDeleteTask({ taskId: deletedSubTask.taskId }))
    }

    yield put(deleteSubTaskSuccess(deletedSubTask))
  } catch (e) {
    yield put(deleteSubTaskError)
  }
}

function* subTaskSagas() {
  yield all([
    takeLatest(TASKS_FETCH_SUCCESS, getAllSubTasks),
    takeEvery(TASK_CREATE_SUCCESS, getSubTasks),
    takeEvery(SUBTASK_DELETE, onDeleteSubTask),
  ])
}

export default subTaskSagas
