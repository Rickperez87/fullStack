const api = ["https://purgo.rickperez.dev/", "http://localhost:3002/"];

const apiUrl = api[0];

//fetch CRUD Functions

const getData = function () {
  return fetch(apiUrl + "api/data")
    .then((res) => res.json())
    .then((data) => data);
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
  return fetch(apiUrl + `api/data/${id}`, {
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

export { getData, postData, putData, deleteData };
