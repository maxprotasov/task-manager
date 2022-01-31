import React, { useMemo, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createNewTask } from 'store/actions/taskActions'
import { getTasksSelector, getSortRulesSelector } from 'store/selectors/tasksSelector'
import { getSubTasksSelector } from 'store/selectors/subTasksSelector'
import { sortBy } from 'utils/sort'
import Task from 'modules/Tasks/components/Task/Task'
import SubTask from 'modules/Tasks/components/SubTask/SubTask'
import { Button, Title, Search } from 'components/atoms'
import { SortingPanel } from 'components/molecules'

const CommonWrapper = styled.div`
padding: 24px;
`
const TaskWrapper = styled.div`
  box-shadow: 0 2px 0 0 #314362;
`

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
    <CommonWrapper>
      <Title>
        Tasks
        <Button onClick={onCreateNewTask}>Create New Task</Button>
      </Title>
      <Search value={searchValue} onChange={setSearchValue} />
      <SortingPanel />
      <section>
        {sortedTasks.map(task => {
          const currentSubTasks = filteredBySearch.subTasks.find(subTask => task.id === subTask.taskId)
          const currentTask = filteredBySearch.tasks.find(filteredTask => task.id === filteredTask.id)

          return (
            <TaskWrapper key={task.id}>
              {currentTask && <Task task={task} />}
              {currentSubTasks &&
                currentSubTasks.subTasks.map(subTask => (
                  <SubTask key={subTask.id} subTask={subTask} />
                ))}
            </TaskWrapper>
          )
        })}
      </section>
    </CommonWrapper>
  )
}

export default Tasks
