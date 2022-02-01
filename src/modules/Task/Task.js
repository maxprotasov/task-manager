import React from 'react'
import { string, shape, number } from 'prop-types'
import { Title } from 'components/atoms'

const Task = ({ task }) => (
  <div>
    <Title subTitle>{task.title}</Title>
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
