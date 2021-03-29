const formatDateString = (unformatedDate) => {
  let AMPM, getHours, hour, d, formattedDate;
  d = new Date(unformatedDate);
  getHours = d.getHours();
  AMPM = getHours > 12 ? "PM" : "AM";
  hour = getHours > 12 ? getHours - 12 : getHours;

  return (formattedDate = `${d.toDateString()}`);

  //remove hour and minute to date format
  // ${addZeroPadForTime(hour)}:${addZeroPadForTime(d.getMinutes())} ${AMPM}`);
};

const addZeroPadForTime = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

export { formatDateString };
