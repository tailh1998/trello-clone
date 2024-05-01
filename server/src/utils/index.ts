import { pick } from "lodash"

export const getInfoData = <T>({ fields = [], object }: { fields: string[]; object: T }) =>
  pick(object, fields)

/**
 *
 * @param select ["a","b"]
 * @returns Object { a:1, b:1 }
 */
export const getSelectData = (select: string[] = []): Record<string, 1> => {
  return Object.fromEntries(select.map((el) => [el, 1]))
}

/**
 *
 * @param  unSelect ["a","b"]
 * @returns Object { a:0, b:0 }
 */
export const getUnSelectData = (unSelect: string[] = []): Record<string, 0> => {
  return Object.fromEntries(unSelect.map((el) => [el, 0]))
}

// TODO: I will type this function later.
const updateNestedObjectParser = (obj: any): Record<string, any> => {
  const final: Record<string, any> = {}

  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === "object" && !Array.isArray(obj[k])) {
      const response = updateNestedObjectParser(obj[k])
      Object.keys(response).forEach((a) => {
        const x = `${k}.${a}`
        // z: Partially update MongoDB object
        final[x] = response[a]
      })
    } else {
      final[k] = obj[k]
    }
  })

  return final
}
