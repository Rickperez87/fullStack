const setPost = document.getElementById("getInputField"),
  submitBtn = document.getElementById("submitBtn"),
  list = document.getElementById("getList"),
  liTags = document.getElementsByClassName("li"),
  ulLogs = document.getElementById("logs"),
  dateContainer = document.getElementsByClassName("dateContainer"),
  select = document.querySelector("select"),
  average = document.getElementById("average"),
  selector = document.getElementById("rooms");

let data, rooms, dateCleanedArray;
let dataArray = [];

const apiUrl = "https://nameless-citadel-22168.herokuapp.com/";
const apiURLDev = "http://localhost:3002/";

window.onload = async function () {
  data = await getData();
  list.innerHTML = renderData(data);
  select.innerHTML = setRoomOptions(data);
};

//Event Listners

submitBtn.addEventListener("click", async (e) => {
  let input = setPost.value;
  let data = Array.from(document.getElementsByClassName("roomString"));
  if (data.some((e) => e.innerHTML.trim() === input)) {
    let toBeUpdated = data.filter((e) => e.innerHTML.trim() === input);
    let id = toBeUpdated[0].parentElement.id;
    if (id) {
      await putData(id, input);
      list.innerHTML = await getData();
      setPost.value = "";
      return;
    }
  }
  await postData(input);
  list.innerHTML = await getData();
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
      // data = await getData();
      // list.innerHTML = renderData(data);
      // select.innerHTML = setRoomOptions(data);
      // ulLogs.innerHTML = setLogs(data, select.target.value);
      await handleChange();
      return;
    } catch (e) {
      return e;
    }
    list.innerHTML = await getData();
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
    data = await getData();
    list.innerHTML = renderData(data);
    select.innerHTML = setRoomOptions(data);
    ulLogs.innerHTML = setLogs(data, select.target.value);
    return;
  } catch (e) {
    return e;
  }
});

selector.addEventListener("change", (e) => {
  ulLogs.innerHTML = setLogs(data, e.target.value);
  average.innerHTML = `Weekly Average: ${setAverage(data, e.target.value)}`;
});

//fetch CRUD Functions
const getData = function () {
  return fetch(apiURLDev + "api/data")
    .then((res) => res.json())
    .then((data) => data);
};

const postData = function (input) {
  return fetch(apiURLDev + "api/data", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ room: input, date: Date.now() }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("success:", data);
    })
    .catch((error) => console.error("error:", error));
};

const putData = function (id) {
  return fetch(apiURLDev + `api/data/${id}`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ date: Date.now() }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("successful update:", data);
    })
    .catch((e) => e);
};

const deleteData = function (id) {
  return fetch(apiURLDev + `api/data/${id}`, {
    method: "delete",
    mode: "cors",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("success:", data);
    })
    .catch((error) => console.error("error:", error));
};

//Helper Functions
const formatDateString = (unformatedDate) => {
  let formatedDate, DayMonthDateYear, AMPM, getHours, hour, d;
  d = new Date(unformatedDate);
  getHours = d.getHours();
  AMPM = getHours > 12 ? "PM" : "AM";
  hour = getHours > 12 ? getHours - 12 : getHours;

  return (formatedDate = `${d.toDateString()} ${addZeroPadForTime(
    hour
  )}:${addZeroPadForTime(d.getMinutes())} ${AMPM}`);
};

const addZeroPadForTime = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

const setRoomOptions = function (data) {
  return data
    .map((e) => `<option value='${e.room}'>${e.room}</option>`)
    .join("");
};

function renderData(data) {
  return data
    .map((e) => {
      let formattedDate = formatDateString(
        e.lastCleanedDate[e.lastCleanedDate.length - 1]
      );
      return `<li class='liTag' id='${e._id}'><div class='deleteBtn'>X</div> <div class='dateContainer'>     <span class='dateString'> ${formattedDate}</span></div><span class='roomString'>${e.room}</span> </li>`;
    })
    .join("");
}

function setLogs(data, room) {
  return getLastCleanedArray(data, room)
    .map((e) => `<li class='liCleaned' >${formatDateString(e)}</li>`)
    .join("");
}

const getLastCleanedArray = (data, room) => {
  const filtered = data.filter((e) => e.room === room);
  return filtered[0].lastCleanedDate.map((e) => formatDateString(e));
};

const setAverage = (data, room) => {
  let arr = getLastCleanedArray(data, room);
  let d = new Date();
  let firstEntry = arr[arr.length - 1];
  let weeks = Math.ceil((d.getDate() - new Date(firstEntry).getDate()) / 7);
  weeks = weeks === 0 ? 1 : weeks;
  let average = Math.ceil(arr.length / weeks);
  return average;
};

const handleChange = async () => {
  data = await getData();
  list.innerHTML = renderData(data);
  select.innerHTML = setRoomOptions(data);
  ulLogs.innerHTML = setLogs(data, select.target.value);
  average.innerHTML = `Weekly Average: ${setAverage(data, e.target.value)}`;
  return;
};
