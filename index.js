const setPost = document.getElementById("getInputField"),
  submitBtn = document.getElementById("submitBtn"),
  list = document.getElementById("getList");
liTags = document.getElementsByTagName("li");

//on load start
window.onload = async function () {
  list.innerHTML = await getData();
};

//Submit Events
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
// update last cleaned Date on clcking the Room card Event
list.addEventListener("click", async (e) => {
  let id = "",
    data;
  if (!(e.target.className === "liTag" || "roomString" || "dateString")) {
    console.log("returned no className valid");
    return;
  } else if ((e.target.className = "liTag")) {
    id = e.target.id;
    console.log("liTag", id);
  } else {
    id = e.target.parentElement.id;
    console.log("spanTag", id);
  }
  try {
    console.log(id);
    await putData(id);
    list.innerHTML = await getData();
    console.log("id", id, "data", data);
  } catch (err) {
    console.log("error", err);
  }
});

//delete event
list.addEventListener("click", async (e) => {
  if (e.target.className === "deleteBtn") {
    const id = e.target.parentElement.id;
    try {
      await deleteData(id);
    } catch (err) {
      console.error("error", err);
    }
    list.innerHTML = await getData();
  }
});

//fetch CRUD Functions

const getData = function () {
  return fetch("http://localhost:3002/")
    .then((res) => res.json())
    .then((data) =>
      data
        .map((e) => {
          let formattedDate = formatDateString(
            e.lastCleanedDate[e.lastCleanedDate.length - 1]
          );
          return `<li class='liTag' id='${e._id}'><div class='deleteBtn'>X</div><span class='roomString'>${e.room}  </span> <span class='dateString'>${formattedDate}</span></li>`;
        })
        .join("")
    );
};

const postData = function (input) {
  return fetch("http://localhost:3002/", {
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
  return fetch(`http://localhost:3002/${id}`, {
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
    .catch((error) => console.error("error:", error));
};

const deleteData = function (id) {
  return fetch(`http://localhost:3002/${id}`, {
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
