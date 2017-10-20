export default {
  session: {
    setItem (item, data) {
      sessionStorage.setItem(item, data)
    },
    getItem (item) {
      sessionStorage.getItem(item)
    }
  },
  local: {
    setItem (item, data) {
      localStorage.setItem(item, data)
    },
    getItem (item) {
      localStorage.getItem(item)
    },
    clear () {
      localStorage.clear()
    }
  }
}
