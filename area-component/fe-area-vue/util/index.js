export function isEmptyObject (obj) {
  return Object.keys(obj).length === 0
}

export function copyList (list) {
  let nl = []
  for (let i = 0, len = list.length; i < len; i++) {
    nl[i] = list[i]
  }
  return nl
}
