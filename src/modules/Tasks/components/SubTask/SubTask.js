import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { string, shape, arrayOf } from 'prop-types'
import { deleteSubTask } from 'store/actions/subTaskActions'
import { Checkbox } from 'components/atoms'

const SubTask = ({ subTask }) => {
  const { id, title } = subTask
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = useCallback(() => {
    dispatch(deleteSubTask({ subTaskId: id }))
    setChecked(prevState => !prevState)
  }, [dispatch, id])

  return (
    <div key={id}>
      <div>
        <Checkbox label={title} value={id} checked={checked} onChange={handleCheckboxChange} />
      </div>
    </div>
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
