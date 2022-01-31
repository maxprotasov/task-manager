import React from 'react'
import { string, shape, number } from 'prop-types'
import { Title } from 'components/atoms'

const Task = ({ task }) => (
  <div>
    <Title>{task.title}</Title>
  </div>
)

Task.propTypes = {
  task: shape({
    id: string.isRequired,
    title: string.isRequired,
    createTime: number,
  }).isRequired,
}

export default Task
