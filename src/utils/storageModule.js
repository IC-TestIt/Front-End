export default {
  session: {
    set (item, data) {
      if (typeof data === 'object') {
        data = JSON.stringify(data)
      }
      sessionStorage.setItem(item, data)
    },
    get (item) {
      const value = sessionStorage.getItem(item)
      try {
        return JSON.parse(value)
      } catch (e) {
        return value
      }
    }
  },
  local: {
    set (item, data) {
      localStorage.setItem(item, data)
    },
    get (item) {
      localStorage.getItem(item)
    },
    clear () {
      localStorage.clear()
    }
  }
}
