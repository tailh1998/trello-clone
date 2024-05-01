export const deepClone = <T = unknown>(data: T): T => JSON.parse(JSON.stringify(data))
