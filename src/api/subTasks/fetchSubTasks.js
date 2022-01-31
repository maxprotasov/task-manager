import Storage from 'utils/storage'
import delay from 'utils/delay'

export default delay(taskId => {
  const subTasks = Storage.subTasks.get()

  return {
    taskId,
    subTasks: subTasks.filter(subTask => subTask.taskId === taskId),
  }
})
