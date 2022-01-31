import { all } from 'redux-saga/effects'
import taskSagas from 'store/sagas/taskSagas'
import subTaskSagas from 'store/sagas/subTasksSagas'

export default function* () {
  yield all([taskSagas(), subTaskSagas()])
}
