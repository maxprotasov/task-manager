import { SORT_TYPES } from 'contants/commonContants'

export const sortBy = (array, { type, fieldName, reverse }) => {
  const sortedArray = [...array].sort((first, second) => {
    if (type === SORT_TYPES.DATE) {
      return new Date(first[fieldName]) - new Date(second[fieldName])
    }

    if (SORT_TYPES.STRING) {
      const operandA = first[fieldName]
      const operandB = second[fieldName]

      if (operandA > operandB) {
        return 1
      }

      if (operandA < operandB) {
        return -1
      }
    }

    return 0
  })

  return reverse ? sortedArray.reverse() : sortedArray
}
