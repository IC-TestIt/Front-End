import moment from 'moment'

export default {
  convertDate: (date) => {
    return moment(new Date(date)).format('DD/MM/YYYY')
  }
}
