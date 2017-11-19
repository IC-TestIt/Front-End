import moment from 'moment'
const REFERENCE = moment()
const TODAY = REFERENCE.clone().startOf('day')
const YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day')
const A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day')
const TOMORROW = REFERENCE.clone().add(1, 'days').startOf('day')
const NEXT_WEEK = REFERENCE.clone().add(7, 'days').startOf('day')

export function formatDate (date) {
  let formatedDate = new Date(date).toLocaleDateString('pt-br')
  if (momentDate(date) <= moment('01/01/2000')) {
    return 'Indefinida'
  }
  return formatedDate
}

export function isToday (momentDate) {
  return momentDate.isSame(TODAY, 'd')
}

export function isTodayOrBefore (momentDate) {
  return momentDate.isSameOrBefore(TODAY)
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

export function isInThisWeek (momentDate) {
  return momentDate.isSameOrBefore(NEXT_WEEK) && momentDate.isAfter(TOMORROW)
}

export function isTomorrow (momentDate) {
  return momentDate.isSame(TOMORROW, 'd')
}

export function isInNextWeeks (momentDate) {
  return momentDate.isAfter(NEXT_WEEK)
}

export function momentDate (dateTime) {
  return moment(new Date(dateTime))
}
