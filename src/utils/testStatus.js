const APPLIED = 2
const UNCORRECTED = 3
const CORRECTED = 4

export function isApplied (status) {
  return status === APPLIED
}

export function isUncorrected (status) {
  return status === UNCORRECTED
}

export function isCorrected (status) {
  return status === CORRECTED
}
