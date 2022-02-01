import { getSubTasksSelector } from 'store/selectors/subTasksSelector'

describe('Subtasks Selector', () => {
  const subTasks = [
    {
      taskId: 1,
      subTasks: [
        { id: '1', taskId: 1 },
        { id: '4', taskId: 1 },
      ],
    },
    { taskId: 2, subTasks: [{ id: '2', taskId: 2 }] },
  ]
  const reducersState = {
    subTasksReducer: {
      subTasks,
    },
  }

  test('should return the initial state', () => {
    expect(getSubTasksSelector(reducersState)).toEqual(subTasks)
  })
})
