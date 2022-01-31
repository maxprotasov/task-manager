import Storage from 'utils/storage'
import delay from 'utils/delay'

export default delay(taskId => {
  const tasks = Storage.tasks.get()
  const task = tasks.find(t => t.id === taskId)

  if (task) {
    Storage.tasks.set(tasks.filter(st => st.id !== taskId))

    return task
  }

  throw new Error(`Task [${taskId}] not found`)
})
