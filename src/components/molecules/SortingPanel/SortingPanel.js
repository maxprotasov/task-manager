import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'components/atoms'
import { sortTasksByDate, sortTasksByTitle } from 'store/actions/taskActions'
import { SORT_TYPES } from 'contants/commonContants'

const SortingPanel = () => {
  const dispatch = useDispatch()

  const onSortByTitle = useCallback(() => {
    dispatch(sortTasksByTitle({ type: SORT_TYPES.STRING }))
  }, [dispatch])

  const onSortByDate = useCallback(() => {
    dispatch(sortTasksByDate({ type: SORT_TYPES.DATE }))
  }, [dispatch])

  return (
    <div>
      Sort by
      <Button onClick={onSortByDate}>Date</Button>
      <Button onClick={onSortByTitle}>Title</Button>
    </div>
  )
}

export default SortingPanel
