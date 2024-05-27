import moment from 'moment';

export const getHoursDiff = (date1 : object, date2: object) => {
  const parsedDate1 = moment(date1, 'YYYY-MM-DD HH:mm:ss.SSS');
  const parsedDate2 = moment(date2, 'YYYY-MM-DD HH:mm:ss.SSS');
  const minutesDifference = parsedDate2.diff(parsedDate1, 'minutes');
  return Math.ceil(minutesDifference / 60)
}
