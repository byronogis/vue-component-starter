import * as ramda from 'ramda'

export function shared() {
  const res = ramda.all(Boolean, [1, 2, 3])
  console.log(res)

  const res2 = ramda.any(Boolean, [1, 2, 3])
  console.log(res2)

  return 'shared'
}
