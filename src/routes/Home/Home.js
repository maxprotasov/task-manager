import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchValueSelector } from 'store/selectors/tasksSelector'
import { getSubTaskLabelsSelector } from 'store/selectors/subTasksSelector'
import { createNewTask, setSearchValue } from 'store/actions/taskActions'
import { setSelectedLabels } from 'store/actions/subTaskActions'
import { Button, Search, Title, Dropdown } from 'components/atoms'
import { DefaultTemplate } from 'components/templates'
import { SortingPanel } from 'components/molecules'
import { Tasks } from 'modules'
import { Header, SubHeader } from './Home.styles'

const Home = () => {
  const dispatch = useDispatch()
  const labels = useSelector(getSubTaskLabelsSelector)
  const searchValue = useSelector(getSearchValueSelector)
  const onCreateNewTask = useCallback(() => dispatch(createNewTask()), [dispatch])
  const onSetSearchValue = useCallback(
    value => dispatch(setSearchValue({ searchValue: value })),
    [dispatch],
  )
  const onSetSelectedLabels = useCallback(
    values => dispatch(setSelectedLabels({ selectedLabels: values })),
    [dispatch],
  )

  return (
    <DefaultTemplate>
      <Header>
        <Title>Tasks Manager</Title>
        <Search value={searchValue} onChange={onSetSearchValue} />
        <Button onClick={onCreateNewTask}>Create New Task</Button>
      </Header>

      <section>
        <SubHeader>
          <Dropdown selectOptions={onSetSelectedLabels} options={labels} />
          <SortingPanel />
        </SubHeader>
        <Tasks />
      </section>
    </DefaultTemplate>
  )
}

export default Home
