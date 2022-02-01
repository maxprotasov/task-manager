import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { string, shape, arrayOf } from 'prop-types'
import { deleteSubTask } from 'store/actions/subTaskActions'
import { Checkbox, Chip } from 'components/atoms'
import { SubTaskWrapper } from './SubTasks.styles'

const SubTask = ({ subTask: { id, title, labels } }) => {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = useCallback(() => {
    dispatch(deleteSubTask({ subTaskId: id }))
    setChecked(prevState => !prevState)
  }, [dispatch, id])

  return (
    <SubTaskWrapper key={id}>
      <Checkbox label={title} value={id} checked={checked} onChange={handleCheckboxChange} />
      {labels.map(label => (
        <Chip key={id + label} value={label} />
      ))}
    </SubTaskWrapper>
  )
}

SubTask.propTypes = {
  subTask: shape({
    id: string.isRequired,
    title: string.isRequired,
    taskId: string.isRequired,
    labels: arrayOf(string).isRequired,
  }).isRequired,
}

export default SubTask
