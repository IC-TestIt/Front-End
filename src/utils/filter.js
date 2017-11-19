export class FluentFilterService {
  arr = []
  constructor (self, list, filterCallback, prop) {
    this.self = self
    this.list = list
    this.filterCallback = filterCallback
    this.prop = prop
  }

  addFilter (obj, callback) {
    this.arr.push({ obj: obj, callback: callback })
    return this
  }

  filter () {
    this.arr.forEach(x => {
      this.self[x.obj] = this.self[x.obj].concat(this.list.filter((item) => {
        return x.callback(this.filterCallback(item[this.prop]))
      }))
    })
  }
}

export function formatDouble (num) {
  return num.toFixed(2)
}

export function compareString (a, b) {
  let nameA = a.toUpperCase()
  let nameB = b.toUpperCase()
  if (nameA < nameB) {
    return -1
  } else if (nameA > nameB) {
    return 1
  } else {
    return 0
  }
}
