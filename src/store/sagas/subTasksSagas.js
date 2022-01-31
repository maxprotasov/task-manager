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

function* getSubTasks({ payload }) {
  try {
    const subTasksInfo = yield Promise.all(payload.tasks.map(task => fetchSubTasks(task.id)))

    yield put(setSubTaskListFetchSuccess({ subTasksInfo }))
  } catch (e) {
    yield put(setSubTaskListFetchError)
  }
}

function* getSubTask({ payload }) {
  try {
    const subTasks = yield call(() => fetchSubTasks(payload.task.id))

    yield put(setSubTasksFetchSuccess({ subTasks }))
  } catch (e) {
    yield put(setSubTasksFetchError)
  }
}

function* onDeleteSubTask({ payload }) {
  try {
    const deletedSubTask = yield call(() => deleteSubtask(payload.subTaskId))
    const subTasksInfo = yield select(getSubTasksSelector)
    const { subTasks } = subTasksInfo.find(el => el.taskId === deletedSubTask.taskId)

    if (subTasks.length === 1) {
      yield put(setDeleteTask({ taskId: deletedSubTask.taskId }))
    }

    yield put(deleteSubTaskSuccess(deletedSubTask))
  } catch (e) {
    yield put(deleteSubTaskError)
  }
}

function* subTaskSagas() {
  yield all([
    takeLatest(TASKS_FETCH_SUCCESS, getSubTasks),
    takeLatest(TASK_CREATE_SUCCESS, getSubTask),
    takeEvery(SUBTASK_DELETE, onDeleteSubTask),
  ])
}

export default subTaskSagas
