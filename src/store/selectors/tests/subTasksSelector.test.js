import {
  getFilteredSubtasksByLabelSelector,
  getLabelsSelector,
  getSelectedLabelsSelector,
  getSubTaskLabelsSelector,
  getSubTasksSelector,
  subTasksSelector,
} from 'store/selectors/subTasksSelector'

describe('Subtasks Selector', () => {
  const subTasks = [
    { id: '1', taskId: 1, labels: ['3'] },
    { id: '4', taskId: 1, labels: ['2'] },
    { id: '2', taskId: 2, labels: ['1', '4'] },
  ]

  const selectedLabels = ['1', '2']
  const labels = ['1', '2']

  const reducersState = {
    subTasksReducer: {
      labels,
      subTasks,
      selectedLabels,
    },
  }

  it('subTasksSelector return the initial state', () => {
    expect(subTasksSelector(reducersState)).toStrictEqual({ ...reducersState.subTasksReducer })
  })

  it('get subtasks selector', () => {
    expect(getSubTasksSelector(reducersState)).toStrictEqual(subTasks)
  })

  it('get selected labels selector', () => {
    expect(getSelectedLabelsSelector(reducersState)).toStrictEqual(selectedLabels)
  })

  it('get labels selector', () => {
    expect(getLabelsSelector(reducersState)).toStrictEqual(labels)
  })

  it('get sub task labels selector', () => {
    expect(getSubTaskLabelsSelector(reducersState)).toStrictEqual([
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ])
  })

  describe('getFilteredSubtasksByLabelSelector', () => {
    it('with some selected labels', () => {
      expect(getFilteredSubtasksByLabelSelector(reducersState)).toStrictEqual([
        { id: '4', taskId: 1, labels: ['2'] },
        { id: '2', taskId: 2, labels: ['1', '4'] },
      ])
    })

    it('with one selected label', () => {
      expect(
        getFilteredSubtasksByLabelSelector({
          ...reducersState,
          subTasksReducer: { ...reducersState.subTasksReducer, selectedLabels: ['1'] },
        }),
      ).toStrictEqual([{ id: '2', taskId: 2, labels: ['1', '4'] }])
    })

    it('without selected labels', () => {
      expect(
        getFilteredSubtasksByLabelSelector({
          ...reducersState,
          subTasksReducer: { ...reducersState.subTasksReducer, selectedLabels: [] },
        }),
      ).toStrictEqual(subTasks)
    })

    it('with all selected labels', () => {
      expect(
        getFilteredSubtasksByLabelSelector({
          ...reducersState,
          subTasksReducer: {
            ...reducersState.subTasksReducer,
            selectedLabels: ['1', '2', '3', '4'],
          },
        }),
      ).toStrictEqual(subTasks)
    })
  })
})
