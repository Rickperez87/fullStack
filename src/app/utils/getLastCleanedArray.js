import { formatDateString } from "./formatDateString";

const getLastCleanedArray = (data, room) => {
  const filtered = data.filter((e) => e.room === room);
  return filtered[0].lastCleanedDate.map((e) => formatDateString(e));
};

export { getLastCleanedArray };
