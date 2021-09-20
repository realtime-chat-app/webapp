export const enc = (str: string): string => {
  return btoa(str)
}

export const dec = (encoded: string): any => {
  return atob(encoded)
}
