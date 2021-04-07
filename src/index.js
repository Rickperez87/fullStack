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

const encodeHTML = (string) => {
  return string
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
};
//Event Listeners
submitBtn.addEventListener("click", async (e) => {
  let inputValue = encodeHTML(inputField.value).toLowerCase();
  let arrMainText = [...document.querySelectorAll(".roomString")];
  //check if input already created
  let textExists = arrMainText.find(
    (el) => el.textContent.trim().toLowerCase() === inputValue
  );
  //if text unique post data
  if (!textExists) {
    console.log("text doesnt exist");
    await postData(inputValue);
    await handleChange();
    inputField.value = "";
  }
  //text already exists get id and update DB
  else {
    console.log("text Exists");
    let id = textExists.closest(".liTag").id;
    await putData(id);
    await handleChange();
    inputField.value = "";
  }
});

const submitOnEnter = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    submitBtn.click();
  }
};
inputField.addEventListener("keyup", submitOnEnter);

//handle clicking card elements: detlete or update time stamp
list.addEventListener("click", async (e) => {
  let id;
  let clicked = e.target;
  if (!clicked.closest(".liTag")) {
    return;
  } else if (!clicked.closest(".deleteBtn")) {
    id = clicked.closest(".liTag").id;
    try {
      await putData(id);
    } catch (e) {
      return e;
    }
    await handleChange();
    return;
  } else {
    id = clicked.closest(".liTag").id;
    try {
      await deleteData(id);
    } catch (e) {
      return e;
    }
    await handleChange();
    return;
  }
});
console.log(average);
//pulldown UI
selector.addEventListener("change", async (e) => {
  let data = await getData();
  ulLogs.innerHTML = setLogs(data, e.target.value);
  average.innerHTML = `Weekly Average: ${setAverage(data, e.target.value)}`;
});
