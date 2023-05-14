export default function changeDate(date, change) {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + change);
  const newDate = `${dateObj.getFullYear()}-${String(
    dateObj.getMonth() + 1,
  ).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  return newDate;
}
