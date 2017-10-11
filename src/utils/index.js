import moment from 'moment'

export const convertDate = (date) => {
  return moment(new Date(date)).format('DD/MM/YYYY')
}
