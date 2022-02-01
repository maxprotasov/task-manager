import { expectSaga, testSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {
  setCreatedTaskSuccess,
  setDeleteTask,
  setTasksFetchSuccess,
  TASK_CREATE_SUCCESS,
  TASKS_FETCH_SUCCESS,
} from 'store/actions/taskActions'
import { throwError } from 'redux-saga-test-plan/providers'
import subTaskSagas, {
  getSubTasks,
  getAllSubTasks,
  onFetchSubtasks,
  onDeleteSubTask,
} from 'store/sagas/subTasksSagas'
import {
  deleteSubTask,
  deleteSubTaskError,
  deleteSubTaskSuccess,
  setSubTaskListFetchError,
  setSubTaskListFetchSuccess,
  setSubTasksFetchError,
  setSubTasksFetchSuccess,
  SUBTASK_DELETE,
} from 'store/actions/subTaskActions'
import { deleteSubtask, fetchSubTasks } from 'api/subTasks'
import { getSubTasksSelector } from 'store/selectors/subTasksSelector'

describe('SubTasks Sagas', () => {
  const expectedException = new Error('sub tasks exception')

  describe('getAllSubTasks', () => {
    it('Success', () => {
      return expectSaga(subTaskSagas)
        .dispatch(setTasksFetchSuccess({ tasks: [{ id: '1' }] }))
        .take(TASKS_FETCH_SUCCESS)
        .provide([[matchers.call.fn(onFetchSubtasks), { id: '1' }]])
        .put(setSubTaskListFetchSuccess({ subTasks: [{ id: '1' }] }))
        .run()
    })

    it('Error', () => {
      return expectSaga(subTaskSagas)
        .dispatch(setTasksFetchSuccess({ tasks: [{ id: '1' }] }))
        .take(TASKS_FETCH_SUCCESS)
        .provide([[matchers.call.fn(onFetchSubtasks), throwError(expectedException)]])
        .put(setSubTaskListFetchError)
        .run()
    })
  })

  describe('getSubTasks', () => {
    it('Success', () => {
      return expectSaga(subTaskSagas)
        .dispatch(setCreatedTaskSuccess({ task: { id: '1' } }))
        .take(TASK_CREATE_SUCCESS)
        .provide([[matchers.call.fn(fetchSubTasks), { id: '2' }]])
        .put(setSubTasksFetchSuccess({ subTasks: { id: '2' } }))
        .run()
    })

    it('Error', () => {
      return expectSaga(subTaskSagas)
        .dispatch(setCreatedTaskSuccess({ task: { id: '1' } }))
        .take(TASK_CREATE_SUCCESS)
        .provide([[matchers.call.fn(fetchSubTasks), throwError(expectedException)]])
        .put(setSubTasksFetchError)
        .run()
    })
  })

  describe('onDeleteSubTask', () => {
    const tasks = [
      { id: 1, taskId: '1' },
      { id: 2, taskId: '1' },
      { id: 3, taskId: '2' },
    ]

    it('Delete only subtask success', () => {
      return expectSaga(subTaskSagas)
        .dispatch(deleteSubTask({ subTaskId: '1' }))
        .take(SUBTASK_DELETE)
        .provide([
          [matchers.call.fn(deleteSubtask), { id: '1', taskId: '1' }],
          [matchers.select.selector(getSubTasksSelector), tasks],
        ])
        .put(deleteSubTaskSuccess({ id: '1', taskId: '1' }))
        .run()
    })

    it('Delete only subtask success testSaga', () => {
      testSaga(onDeleteSubTask, { payload: { subTaskId: 1 } })
        .next()
        .call(deleteSubtask, 1)
        .next({ taskId: '1', id: 1 })
        .select(getSubTasksSelector)
        .next(tasks)
        .put(deleteSubTaskSuccess({ taskId: '1', id: 1 }))
        .next()
        .isDone()
    })

    it('Delete task and subtask success', () => {
      return expectSaga(subTaskSagas)
        .dispatch(deleteSubTask({ subTaskId: 3 }))
        .take(SUBTASK_DELETE)
        .provide([
          [matchers.call.fn(deleteSubtask), { id: 3, taskId: '2' }],
          [matchers.select.selector(getSubTasksSelector), tasks],
        ])
        .put(setDeleteTask({ taskId: '2' }))
        .put(deleteSubTaskSuccess({ id: 3, taskId: '2' }))
        .run()
    })

    it('Delete task and subtask success testSaga', () => {
      testSaga(onDeleteSubTask, { payload: { subTaskId: 3 } })
        .next()
        .call(deleteSubtask, 3)
        .next({ taskId: '2', id: 3 })
        .select(getSubTasksSelector)
        .next(tasks)
        .put(setDeleteTask({ taskId: '2' }))
        .next()
        .put(deleteSubTaskSuccess({ taskId: '2', id: 3 }))
        .next()
        .isDone()
    })

    it('Delete subtask Error', () => {
      return expectSaga(subTaskSagas)
        .dispatch(deleteSubTask({ subTaskId: '1' }))
        .take(SUBTASK_DELETE)
        .provide([[matchers.call.fn(deleteSubtask), throwError(expectedException)]])
        .put(deleteSubTaskError)
        .run()
    })
  })
})
