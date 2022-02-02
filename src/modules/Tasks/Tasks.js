import React from 'react'
import { useSelector } from 'react-redux'
import { SubTask, Task } from 'modules'
import {
  getFilteredTasksSubTasksSelector,
  getSortedTasksSelector,
} from 'store/selectors/tasksSelector'
import { TaskWrapper } from './Tasks.styles'

const Tasks = () => {
  const sortedTasks = useSelector(getSortedTasksSelector)
  const { tasks, subTasks } = useSelector(getFilteredTasksSubTasksSelector)

  return sortedTasks.map(task => {
    const currentSubTasks = subTasks.filter(({ taskId }) => taskId === task.id)
    const currentTask = tasks.find(({ id }) => id === task.id)

    return (
      <TaskWrapper key={task.id}>
        {currentTask && <Task task={currentTask} />}
        {currentSubTasks.map(subTask => (
          <SubTask key={subTask.id} subTask={subTask} />
        ))}
      </TaskWrapper>
    )
  })
}

export default Tasks
