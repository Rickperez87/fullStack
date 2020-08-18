const setPost = document.getElementById("getInputField"),
  submitBtn = document.getElementById("submitBtn"),
  list = document.getElementById("getList"),
  liTags = document.getElementsByClassName("li"),
  dateContainer = document.getElementsByClassName("dateContainer");
//on load start
window.onload = async function () {
  list.innerHTML = await getData();
  function doToEach() {
    console.log(dateContainer);
    for (i = 0; i < dateContainer.length; i++)
      dateContainer[i].insertBefore(
        createSVGClock(),
        dateContainer[i].firstChild
      );
  }
  doToEach();
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

//List Click Event - Delete Button Or Update Last Cleaned Date
list.addEventListener("click", async (e) => {
  let id;
  if (e.target.className === "deleteBtn") {
    id = e.target.parentElement.id;
    try {
      await deleteData(id);
    } catch (err) {
      console.error("error", err);
    }
    list.innerHTML = await getData();
    return;
  } else if ((e.target.className = "liTag")) {
    id = e.target.id;
  } else {
    id = e.target.parentElement.id;
  }
  try {
    await putData(id);
    list.innerHTML = await getData();
  } catch (err) {
    console.log("error", err);
  }
  return;
});

//fetch CRUD Functions
const getData = function () {
  return fetch("http://localhost:3002/api/data")
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
  return fetch("http://localhost:3002/api/data", {
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
  return fetch(`http://localhost:3002/api/data/${id}`, {
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
  return fetch(`http://localhost:3002/api/data${id}`, {
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

const createSVGClock = () => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  width = "24";
  height = "24";
  const SVGClock = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  SVGClock.setAttribute(
    "d",
    "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"
  );
  svg.appendChild(SVGClock);
  return svg;
};
console.log(createSVGClock());
