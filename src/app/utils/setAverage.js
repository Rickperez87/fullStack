import { getLastCleanedArray } from "./getLastCleanedArray";

const setAverage = (data, room) => {
  let arr = getLastCleanedArray(data, room);
  let d = new Date();
  let firstEntry = arr[arr.length - 1];
  let weeks = Math.ceil((d.getDate() - new Date(firstEntry).getDate()) / 7);
  weeks = weeks === 0 ? 1 : weeks;
  let average = Math.ceil(arr.length / weeks);
  return average;
};

export { setAverage };
