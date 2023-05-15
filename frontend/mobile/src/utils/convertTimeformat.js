function convertTimeFormat(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  const date = new Date();

  date.setHours(hours, minutes, seconds);

  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  const timeIn12Hour = date.toLocaleTimeString('ko-KR', options);

  return timeIn12Hour;
}

export default convertTimeFormat;
