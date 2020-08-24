import { getData } from "./crud";
import { renderData } from "./renderData";
import { setRoomOptions } from "./setRoomOptions";

const list = document.getElementById("getList"),
  select = document.querySelector("select");
let data;

const handleChange = async () => {
  data = await getData();
  list.innerHTML = renderData(data);
  select.innerHTML = setRoomOptions(data);
  return;
};

export { handleChange };
