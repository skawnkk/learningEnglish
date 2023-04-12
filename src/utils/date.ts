const getFullNumber = (d: number) => {
  if (d < 10) return `0${d}`
  return d
}

export const convertYYMMDD = (source: Date, format = '.') => {
  const {year, month, date} = {
    year: source.getFullYear().toString().slice(2),
    month: getFullNumber(source.getMonth() + 1),
    date: getFullNumber(source.getDate()),
  }

  return [year, month, date].join(format)
}
