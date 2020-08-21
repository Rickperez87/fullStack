const setPost = document.getElementById("getInputField"),
  submitBtn = document.getElementById("submitBtn"),
  list = document.getElementById("getList"),
  liTags = document.getElementsByClassName("li"),
  dateContainer = document.getElementsByClassName("dateContainer");
const apiUrl = "https://nameless-citadel-22168.herokuapp.com/";

window.onload = async function () {
  list.innerHTML = await getData();
};

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

//List Click Event - Delete Button Or Update Last Cleaned Date
list.addEventListener("click", async (e) => {
  let id;
  if (e.target.className === "deleteBtn") {
    id = e.target.parentElement.id;
    try {
      await deleteData(id);
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
    list.innerHTML = await getData();
    return;
  } catch (e) {
    return e;
  }
});

//fetch CRUD Functions
const getData = function () {
  return fetch(apiUrl + "api/data")
    .then((res) => res.json())
    .then((data) =>
      data
        .map((e) => {
          let formattedDate = formatDateString(
            e.lastCleanedDate[e.lastCleanedDate.length - 1]
          );
          return `<li class='liTag' id='${e._id}'><div class='deleteBtn'>X</div> <div class='dateContainer'>     <span class='dateString'> ${formattedDate}</span></div><span class='roomString'>${e.room}</span> </li>`;
        })
        .join("")
    );
};

const postData = function (input) {
  return fetch(apiUrl + "api/data", {
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
  return fetch(apiUrl + "api/data/${id}", {
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
  return fetch(apiUrl + `api/data/${id}`, {
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
