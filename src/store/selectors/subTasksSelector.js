import { createSelector } from '@reduxjs/toolkit'

export const subTasksSelector = state => state.subTasksReducer

export const getSubTasksSelector = createSelector(subTasksSelector, subTasks => subTasks.subTasks)

export const getSubTaskLabelsSelector = createSelector(getSubTasksSelector, subTasks => {
  const myMap = new Map()

  subTasks.forEach(({ labels, id }) =>
    labels.forEach(label => {
      const labelAlreadyDefined = myMap.has(label)

      if (labelAlreadyDefined) {
        return myMap.set(label, [...myMap.get(label), id])
      }

     return myMap.set(label, [id])
    }),
  )

  return myMap
})
