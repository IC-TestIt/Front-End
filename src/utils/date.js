import moment from 'moment'

const REFERENCE = moment()
const TODAY = REFERENCE.clone().startOf('day')
const YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day')
const A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day')

export function formatDate (date) {
  return new Date(date).toLocaleDateString('pt-br')
}

export function isToday (momentDate) {
  return momentDate.isSame(TODAY, 'd')
}

export function isYesterday (momentDate) {
  return momentDate.isSame(YESTERDAY, 'd')
}

export function isWithinAWeek (momentDate) {
  return momentDate.isAfter(A_WEEK_OLD)
}

export function isTwoWeeksOrMore (momentDate) {
  return !isWithinAWeek(momentDate)
}

export function momentDate (dateTime) {
  return moment(new Date(dateTime))
}
