const setRoomOptions = function (data) {
  return data
    .map((e) => `<option value='${e.room}'>${e.room}</option>`)
    .join("");
};

export { setRoomOptions };
