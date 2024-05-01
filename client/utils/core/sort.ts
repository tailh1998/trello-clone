const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj))

/**
 * ---
 * Order an array of objects based on another array & return new Ordered Array
 * The original array will not be modified.
 * ---
 * @param {*} originalArray
 * @param {*} orderArray
 * @param {*} key = Key to order
 * @return new Ordered Array
 */
export const mapOrder = <T extends Record<string, any>>(
  originalArray: T[],
  orderArray: string[],
  key: string
): T[] => {
  if (!originalArray || !orderArray || !key) return []

  return deepClone<T[]>(originalArray).sort(
    (a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  )
}
