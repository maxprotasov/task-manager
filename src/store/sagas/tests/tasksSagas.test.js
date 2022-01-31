import { expectSaga, testSaga } from 'redux-saga-test-plan'
import taskSagas, { deleteTaskInfo, getTasks } from 'store/sagas/taskSagas'
import * as matchers from 'redux-saga-test-plan/matchers'
import { createTask, deleteTask, fetchTasks } from 'api/tasks'
import {
  createNewTask,
  setCreatedTaskError,
  setCreatedTaskSuccess,
  setDeleteTask, setDeleteTaskError,
  setDeleteTaskSuccess,
  setTasksFetchError,
  setTasksFetchSuccess,
  TASK_CREATE,
  TASK_DELETE,
} from 'store/actions/taskActions'
import { throwError } from 'redux-saga-test-plan/providers'

describe('Tasks Sagas', () => {
  const expectedException = new Error('my expecting exception')

  describe('getTasks', () => {
    it('Success', () => {
      return expectSaga(taskSagas)
        .call(getTasks)
        .provide([[matchers.call.fn(fetchTasks), [{ id: 42, title: 'John Doe' }]]])
        .put(setTasksFetchSuccess({ tasks: [{ id: 42, title: 'John Doe' }] }))
        .run()
    })

    it('Error', () => {
      return expectSaga(taskSagas)
        .call(getTasks)
        .provide([[matchers.call.fn(fetchTasks), throwError(expectedException)]])
        .put(setTasksFetchError)
        .run()
    })
  })
  describe('createNewTask', () => {
    it('Success', () => {
      return expectSaga(taskSagas)
        .dispatch(createNewTask)
        .take(TASK_CREATE)
        .provide([[matchers.call.fn(createTask), { id: 42, title: 'John Doe' }]])
        .put(setCreatedTaskSuccess({ task: { id: 42, title: 'John Doe' } }))
        .run()
    })

    it('Error', () => {
      return expectSaga(taskSagas)
        .dispatch(createNewTask)
        .take(TASK_CREATE)
        .provide([[matchers.call.fn(createTask), throwError(expectedException)]])
        .put(setCreatedTaskError)
        .run()
    })
  })

  describe('setDeleteTask', () => {
    it('Success', () => {
      return expectSaga(taskSagas)
        .dispatch(setDeleteTask({ taskId: '1' }))
        .take(TASK_DELETE)
        .call(getTasks)
        .provide([[matchers.call.fn(deleteTask), { id: '1' }]])
        .put(setDeleteTaskSuccess({ taskId: '1' }))
        .run()
    })

    it('Error', () => {
      return expectSaga(taskSagas)
        .dispatch(setDeleteTask({ taskId: '1' }))
        .take(TASK_DELETE)
        .call(getTasks)
        .provide([[matchers.call.fn(deleteTask), throwError(expectedException)]])
        .put(setDeleteTaskError)
        .run()
    })
  })
})
