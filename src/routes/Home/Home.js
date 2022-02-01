import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchValueSelector } from 'store/selectors/tasksSelector'
import { createNewTask, setSearchValue } from 'store/actions/taskActions'
import { Button, Search, Title } from 'components/atoms'
import { DefaultTemplate } from 'components/templates'
import { SortingPanel } from 'components/molecules'
import { Tasks } from 'modules'
import { Header } from './Home.styles'

const Home = () => {
  const dispatch = useDispatch()
  const searchValue = useSelector(getSearchValueSelector)
  const onCreateNewTask = useCallback(() => dispatch(createNewTask()), [dispatch])
  const onSetSearchValue = useCallback(
    value => dispatch(setSearchValue({ searchValue: value })),
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
        <SortingPanel />
        <Tasks />
      </section>
    </DefaultTemplate>
  )
}

export default Home
