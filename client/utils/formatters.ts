export const capitalizeFirstLetter = (val?: string): string =>
  !val ? "" : `${val.charAt(0).toUpperCase()}${val.slice(1)}`
