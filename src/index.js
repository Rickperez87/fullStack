import { getData, postData, putData, deleteData } from "./app/utils/crud";
import { setLogs } from "./app/utils/setLogs";
import { setAverage } from "./app/utils/setAverage";
import { handleChange } from "./app/utils/handlechange";

const inputField = document.getElementById("getInputField"),
  submitBtn = document.getElementById("submitBtn"),
  list = document.getElementById("getList"),
  ulLogs = document.getElementById("logs"),
  average = document.getElementById("average"),
  selector = document.getElementById("rooms");

window.onload = async function () {
  await handleChange();
};

//Event Listeners

submitBtn.addEventListener("click", async (e) => {
  let inputValue = inputField.value;
  let arrMainText = Array.from(document.getElementsByClassName("roomString"));
  //check if input already created update
  if (arrMainText.some((el) => el.innerHTML.trim() === input)) {
    let toBeUpdated = arrMainText.find((el) => el.innerHTML.trim() === input);
    let id = toBeUpdated.parentElement.id;
    if (id) {
      await putData(id);
      await handleChange();
      inputField.value = "";
      return;
    }
  }
  //else if new input post the new value
  await postData(inputValue);
  await handleChange();
  inputField.value = "";
});

const didPressEnter = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    submitBtn.click();
  }
};
inputField.addEventListener("keyup", didPressEnter);

list.addEventListener("click", async (e) => {
  let id;
  if (
    e.target.className === "deleteBtn" ||
    e.target.parentElement.parentElement.className === "deleteBtn" ||
    e.target.parentElement.className === "deleteBtn"
  ) {
    id = e.target.parentElement.parentElement.parentElement.id;
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
  } else if (e.target.className === "liTag") {
    id = e.target.id;
  } else {
    id = e.target.parentElement.parentElement.id;
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
