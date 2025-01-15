import { FilterAttributes } from 'models'

/**
 *
 * @param filtered - Filter Query Object
 */
function filterQueryObject(filtered: FilterAttributes[]) {
  const resultObject = {}
  if (typeof filtered !== 'object') {
    throw new Error(`Filtered must be an object, expected ${typeof filtered}`)
  }

  for (let i = 0; i < filtered.length; i += 1) {
    // eslint-disable-next-line prefer-const
    let { id, value } = filtered[i]
    if (id.split('.').length > 1) {
      id = `$${id}$`
    }
    // @ts-ignore
    resultObject[id] = { $regex: `.*${value}.*` }
  }

  return resultObject
}

function getFilter(filtered: any) {
  const resultObject: any = {}
  if (typeof filtered !== 'object') {
    throw new Error(`Filtered must be an object, expected ${typeof filtered}`)
  }
  Object.keys(filtered).map((key) => {
    const value = filtered[key]
    if (Array.isArray(value)) {
      resultObject[key] = { $in: value }
    } else {
      resultObject[key] = value
    }
  })
  return resultObject
}
function getOrder(sorted: any) {
  const order: any = {}
  if (sorted && sorted.length > 0) {
    sorted.forEach((element: any) => {
      const { col, sort } = element
      order[col] = sort == 'asc' ? 1 : -1
    })
  }
}

export { filterQueryObject, getFilter, getOrder }
