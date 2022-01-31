import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'components/atoms'
import { sortTasksByDate, sortTasksByTitle } from 'store/actions/taskActions'
import { SORT_TYPES } from 'contants/commonContants'
import { SortingPanelWrapper } from 'components/molecules/SortingPanel/SortingPannel.styles'

const SortingPanel = () => {
  const dispatch = useDispatch()

  const onSortByTitle = useCallback(() => {
    dispatch(sortTasksByTitle({ type: SORT_TYPES.STRING }))
  }, [dispatch])

  const onSortByDate = useCallback(() => {
    dispatch(sortTasksByDate({ type: SORT_TYPES.DATE }))
  }, [dispatch])

  return (
    <SortingPanelWrapper>
      Sort by
      <Button type="secondary" onClick={onSortByDate}>Date</Button>
      <Button type="secondary" onClick={onSortByTitle}>Title</Button>
    </SortingPanelWrapper>
  )
}

export default SortingPanel
