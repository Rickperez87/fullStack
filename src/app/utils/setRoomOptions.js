const setRoomOptions = function (data) {
  return data
    .map((el) => `<option value='${el.room}'>${el.room}</option>`)
    .join("");
};

export { setRoomOptions };
