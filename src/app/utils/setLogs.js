import { formatDateString } from "./formatDateString";
import { getLastCleanedArray } from "./getLastCleanedArray";

function setLogs(data, room) {
  return getLastCleanedArray(data, room)
    .map((e) => `<li class='liCleaned' >${formatDateString(e)}</li>`)
    .join("");
}

export { setLogs };
