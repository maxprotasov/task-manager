import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortTasksByDate, sortTasksByTitle } from 'store/actions/taskActions'
import { getSortRulesSelector } from 'store/selectors/tasksSelector'
import { SORT_TYPES } from 'contants/commonContants'
import { Button } from 'components/atoms'
import { SortingPanelWrapper } from './SortingPannel.styles'

const SortingPanel = () => {
  const sortRules = useSelector(getSortRulesSelector)
  const dispatch = useDispatch()

  const onSortByTitle = useCallback(() => {
    dispatch(sortTasksByTitle({ type: SORT_TYPES.STRING }))
  }, [dispatch])

  const onSortByDate = useCallback(() => {
    dispatch(sortTasksByDate({ type: SORT_TYPES.DATE }))
  }, [dispatch])

  return (
    <SortingPanelWrapper>
      Sort by:
      <Button type="secondary" active={sortRules.type === SORT_TYPES.DATE} onClick={onSortByDate}>
        Date
      </Button>
      <Button
        type="secondary"
        active={sortRules.type === SORT_TYPES.STRING}
        onClick={onSortByTitle}
      >
        Title
      </Button>
    </SortingPanelWrapper>
  )
}

export default SortingPanel
