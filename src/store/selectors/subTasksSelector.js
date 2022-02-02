import { createSelector } from '@reduxjs/toolkit'
import intersection from 'lodash.intersection'

export const subTasksSelector = state => state.subTasksReducer

export const getSubTasksSelector = createSelector(subTasksSelector, ({ subTasks }) => subTasks)
export const getLabelsSelector = createSelector(subTasksSelector, ({ labels }) => labels)

export const getSelectedLabelsSelector = createSelector(
  subTasksSelector,
  ({ selectedLabels }) => selectedLabels,
)
export const getSubTaskLabelsSelector = createSelector(getLabelsSelector, labels =>
  labels.map(label => ({ value: label, label })),
)

export const getFilteredSubtasksByLabelSelector = createSelector(
  getSubTasksSelector,
  getSelectedLabelsSelector,
  (subTasks, selectedLabels) =>
    selectedLabels.length
      ? subTasks.filter(({ labels }) => intersection(labels, selectedLabels).length)
      : subTasks,
)
