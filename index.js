const setPost = document.getElementById("getInput"),
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
  console.log(data.some((e) => e.innerHTML.trim() == input));
  if (data.some((e) => e.innerHTML.trim() === input)) {
    let toBeUpdated = data.filter((e) => e.innerHTML.trim() === input);
    let id = toBeUpdated[0].parentElement.id;
    console.log(id);

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
          let parseDate = new Date(
            e.lastCleanedDate[e.lastCleanedDate.length - 1]
          );
          return `<li id='${
            e._id
          }'><div class='deleteBtn'>X</div><span class='roomString'>${
            e.room
          }  </span> <span class='dateString'>${parseDate.toDateString()}</span></li>`;
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

const putData = function (id, input) {
  return fetch(`http://localhost:3002/${id}`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ room: input, date: Date.now() }),
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
