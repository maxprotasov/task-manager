import React, { useMemo, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewTask } from 'store/actions/taskActions'
import { getTasksSelector, getSortRulesSelector } from 'store/selectors/tasksSelector'
import { getSubTasksSelector } from 'store/selectors/subTasksSelector'
import Task from 'modules/Tasks/components/Task/Task'
import { sortBy } from 'utils/sort'
import { Button, Title, Search } from 'components/atoms'
import { SortingPanel } from 'components/molecules'
import SubTask from 'modules/Tasks/components/SubTask/SubTask'

const Tasks = () => {
  const tasks = useSelector(getTasksSelector)
  const subTasks = useSelector(getSubTasksSelector)
  const sortRules = useSelector(getSortRulesSelector)
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')

  const sortedTasks = useMemo(() => sortBy(tasks, sortRules), [tasks, sortRules])

  const filteredBySearch = useMemo(() => {
    if (searchValue) {
      const search = value => value.title.toLowerCase().match(searchValue)

      return {
        tasks: sortedTasks.filter(search),
        subTasks: subTasks.map(subTaskInfo => ({
          ...subTaskInfo,
          subTasks: subTaskInfo.subTasks.filter(search),
        })),
      }
    }

    return {
      tasks: sortedTasks,
      subTasks,
    }
  }, [sortedTasks, subTasks, searchValue])

  const onCreateNewTask = useCallback(() => {
    dispatch(createNewTask())
  }, [dispatch])

  return (
    <div>
      <Title>Tasks</Title>
      <Search value={searchValue} onChange={setSearchValue} />
      <Button onClick={onCreateNewTask}>Create New Task</Button>
      <SortingPanel />
      <section>
        {sortedTasks.map(task => {
          const currentSubTasks = filteredBySearch.subTasks.find(subTask => task.id === subTask.taskId)
          const currentTask = filteredBySearch.tasks.find(filteredTask => task.id === filteredTask.id)

          return (
            <div key={task.id}>
              {currentTask && <Task task={task} />}
              {currentSubTasks &&
                currentSubTasks.subTasks.map(subTask => (
                  <SubTask key={subTask.id} subTask={subTask} />
                ))}
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default Tasks
