import { getData, postData, putData, deleteData } from "./app/utils/crud";
import { setLogs } from "./app/utils/setLogs";
import { setAverage } from "./app/utils/setAverage";
import { handleChange } from "./app/utils/handlechange";

const setPost = document.getElementById("getInputField"),
  submitBtn = document.getElementById("submitBtn"),
  list = document.getElementById("getList"),
  liTags = document.getElementsByClassName("li"),
  ulLogs = document.getElementById("logs"),
  dateContainer = document.getElementsByClassName("dateContainer"),
  average = document.getElementById("average"),
  selector = document.getElementById("rooms");

let rooms, dateCleanedArray;
let dataArray = [];

window.onload = async function () {
  await handleChange();
};

//Event Listeners

submitBtn.addEventListener("click", async (e) => {
  let input = setPost.value;
  let data = Array.from(document.getElementsByClassName("roomString"));
  if (data.some((e) => e.innerHTML.trim() === input)) {
    let toBeUpdated = data.filter((e) => e.innerHTML.trim() === input);
    let id = toBeUpdated[0].parentElement.id;
    if (id) {
      await putData(id);
      await handleChange();
      setPost.value = "";
      return;
    }
  }
  await postData(input);
  await handleChange();
  setPost.value = "";
});

setPost.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    submitBtn.click();
  }
});

list.addEventListener("click", async (e) => {
  let id;
  if (e.target.className === "deleteBtn") {
    id = e.target.parentElement.id;
    try {
      await deleteData(id);
    } catch (e) {
      return e;
    }
    await handleChange();
    return;
  } else if (
    e.target.className === "dateContainer" ||
    e.target.className === "roomString"
  ) {
    id = e.target.parentElement.id;
    console.log("else if ||", `id:${id}`, `e.target${e.target}`);
  } else if (e.target.className === "liTag") {
    id = e.target.id;
    console.log("else if", `id:${id}`, `e.target${e.target}`);
  } else {
    id = e.target.parentElement.parentElement.id;
    console.log("else", id, e.target);
  }
  try {
    await putData(id);
  } catch (e) {
    return e;
  }
  await handleChange();
  return;
});

selector.addEventListener("change", async (e) => {
  let data = await getData();
  ulLogs.innerHTML = setLogs(data, e.target.value);
  average.innerHTML = `Weekly Average: ${setAverage(data, e.target.value)}`;
});
