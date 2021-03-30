import { formatDateString } from "./formatDateString";

function renderData(data) {
  return data
    .map((e) => {
      let formattedDate = formatDateString(
        e.lastCleanedDate[e.lastCleanedDate.length - 1]
      );
      return `<li class='liTag' id='${e._id}'><div class='deleteBtn'><svg class="delete__icon"><use xlink:href="./img/sprite.svg#icon-bin2"></svg></div> <div class='dateContainer'>     <span class='dateString'> ${formattedDate}</span></div><span class='roomString'>${e.room}</span> </li>`;
    })
    .join("");
}

export { renderData };
