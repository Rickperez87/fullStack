/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/utils/crud.js":
/*!*******************************!*\
  !*** ./src/app/utils/crud.js ***!
  \*******************************/
/*! exports provided: getData, postData, putData, deleteData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getData\", function() { return getData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"postData\", function() { return postData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"putData\", function() { return putData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteData\", function() { return deleteData; });\nlet apiUrl;\n\nif (true) {\n  apiUrl = \"http://localhost:3002/\";\n} else {}\n\n//fetch CRUD Functions\nconst getData = function () {\n  return fetch(apiUrl + \"api/data\")\n    .then((res) => res.json())\n    .then((data) => data);\n};\n\nconst postData = function (input) {\n  return fetch(apiUrl + \"api/data\", {\n    method: \"POST\",\n    mode: \"cors\",\n    body: JSON.stringify({ room: input, date: Date.now() }),\n    headers: {\n      \"Content-type\": \"application/json; charset=UTF-8\",\n    },\n  })\n    .then((resp) => resp.json())\n    .then((data) => {})\n    .catch((error) => console.error(\"error:\", error));\n};\n\nconst putData = function (id) {\n  return fetch(apiUrl + `api/data/${id}`, {\n    method: \"PUT\",\n    mode: \"cors\",\n    body: JSON.stringify({ date: Date.now() }),\n    headers: {\n      \"Content-type\": \"application/json; charset=UTF-8\",\n    },\n  })\n    .then((resp) => resp.json())\n    .then((data) => {})\n    .catch((e) => e);\n};\n\nconst deleteData = function (id) {\n  return fetch(apiUrl + `api/data/${id}`, {\n    method: \"delete\",\n    mode: \"cors\",\n    headers: {\n      \"Content-type\": \"application/json; charset=UTF-8\",\n    },\n  })\n    .then((resp) => resp.json())\n    .then((data) => {})\n    .catch((error) => console.error(\"error:\", error));\n};\n\n\n\n\n//# sourceURL=webpack:///./src/app/utils/crud.js?");

/***/ }),

/***/ "./src/app/utils/formatDateString.js":
/*!*******************************************!*\
  !*** ./src/app/utils/formatDateString.js ***!
  \*******************************************/
/*! exports provided: formatDateString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatDateString\", function() { return formatDateString; });\nconst formatDateString = (unformatedDate) => {\n  let AMPM, getHours, hour, d, formattedDate;\n  d = new Date(unformatedDate);\n  getHours = d.getHours();\n  AMPM = getHours > 12 ? \"PM\" : \"AM\";\n  hour = getHours > 12 ? getHours - 12 : getHours;\n\n  return (formattedDate = `${d.toDateString()}`);\n\n  //remove hour and minute to date format\n  // ${addZeroPadForTime(hour)}:${addZeroPadForTime(d.getMinutes())} ${AMPM}`);\n};\n\nconst addZeroPadForTime = (num) => {\n  return num < 10 ? `0${num}` : `${num}`;\n};\n\n\n\n\n//# sourceURL=webpack:///./src/app/utils/formatDateString.js?");

/***/ }),

/***/ "./src/app/utils/getLastCleanedArray.js":
/*!**********************************************!*\
  !*** ./src/app/utils/getLastCleanedArray.js ***!
  \**********************************************/
/*! exports provided: getLastCleanedArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLastCleanedArray\", function() { return getLastCleanedArray; });\n/* harmony import */ var _formatDateString__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatDateString */ \"./src/app/utils/formatDateString.js\");\n\n\nconst getLastCleanedArray = (data, room) => {\n  const filtered = data.filter((e) => e.room === room);\n  return filtered[0].lastCleanedDate.map((e) => Object(_formatDateString__WEBPACK_IMPORTED_MODULE_0__[\"formatDateString\"])(e));\n};\n\n\n\n\n//# sourceURL=webpack:///./src/app/utils/getLastCleanedArray.js?");

/***/ }),

/***/ "./src/app/utils/handlechange.js":
/*!***************************************!*\
  !*** ./src/app/utils/handlechange.js ***!
  \***************************************/
/*! exports provided: handleChange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleChange\", function() { return handleChange; });\n/* harmony import */ var _crud__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crud */ \"./src/app/utils/crud.js\");\n/* harmony import */ var _renderData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderData */ \"./src/app/utils/renderData.js\");\n/* harmony import */ var _setRoomOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setRoomOptions */ \"./src/app/utils/setRoomOptions.js\");\n\n\n\n\nconst list = document.getElementById(\"getList\"),\n  select = document.querySelector(\"select\");\nlet data;\n\nconst handleChange = async () => {\n  data = await Object(_crud__WEBPACK_IMPORTED_MODULE_0__[\"getData\"])();\n  list.innerHTML = Object(_renderData__WEBPACK_IMPORTED_MODULE_1__[\"renderData\"])(data);\n  select.innerHTML = `<option value=\"\">Select a Room</option>${Object(_setRoomOptions__WEBPACK_IMPORTED_MODULE_2__[\"setRoomOptions\"])(\n    data\n  )}</optgroup>`;\n  return;\n};\n\n\n\n\n//# sourceURL=webpack:///./src/app/utils/handlechange.js?");

/***/ }),

/***/ "./src/app/utils/renderData.js":
/*!*************************************!*\
  !*** ./src/app/utils/renderData.js ***!
  \*************************************/
/*! exports provided: renderData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderData\", function() { return renderData; });\n/* harmony import */ var _formatDateString__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatDateString */ \"./src/app/utils/formatDateString.js\");\n\n\nfunction renderData(data) {\n  return data\n    .map((e) => {\n      let formattedDate = Object(_formatDateString__WEBPACK_IMPORTED_MODULE_0__[\"formatDateString\"])(\n        e.lastCleanedDate[e.lastCleanedDate.length - 1]\n      );\n      return `<li class='liTag' id='${e._id}'><div class='deleteBtn'><svg class=\"delete__icon\"><use xlink:href=\"./img/sprite.svg#icon-bin2\"></svg></div> <div class='dateContainer'>     <span class='dateString'> ${formattedDate}</span></div><span class='roomString'>${e.room}</span> </li>`;\n    })\n    .join(\"\");\n}\n\n\n\n\n//# sourceURL=webpack:///./src/app/utils/renderData.js?");

/***/ }),

/***/ "./src/app/utils/setAverage.js":
/*!*************************************!*\
  !*** ./src/app/utils/setAverage.js ***!
  \*************************************/
/*! exports provided: setAverage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setAverage\", function() { return setAverage; });\n/* harmony import */ var _getLastCleanedArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getLastCleanedArray */ \"./src/app/utils/getLastCleanedArray.js\");\n\n\nconst setAverage = (data, room) => {\n  let arr = Object(_getLastCleanedArray__WEBPACK_IMPORTED_MODULE_0__[\"getLastCleanedArray\"])(data, room);\n  let d = new Date();\n  let firstEntry = arr[arr.length - 1];\n  let weeks = Math.ceil((d.getDate() - new Date(firstEntry).getDate()) / 7);\n  weeks = weeks === 0 ? 1 : weeks;\n  let average = Math.ceil(arr.length / weeks);\n  return average;\n};\n\n\n\n\n//# sourceURL=webpack:///./src/app/utils/setAverage.js?");

/***/ }),

/***/ "./src/app/utils/setLogs.js":
/*!**********************************!*\
  !*** ./src/app/utils/setLogs.js ***!
  \**********************************/
/*! exports provided: setLogs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setLogs\", function() { return setLogs; });\n/* harmony import */ var _formatDateString__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatDateString */ \"./src/app/utils/formatDateString.js\");\n/* harmony import */ var _getLastCleanedArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getLastCleanedArray */ \"./src/app/utils/getLastCleanedArray.js\");\n\n\n\nfunction setLogs(data, room) {\n  return Object(_getLastCleanedArray__WEBPACK_IMPORTED_MODULE_1__[\"getLastCleanedArray\"])(data, room)\n    .map((e) => `<li class='liCleaned' >${Object(_formatDateString__WEBPACK_IMPORTED_MODULE_0__[\"formatDateString\"])(e)}</li>`)\n    .join(\"\");\n}\n\n\n\n\n//# sourceURL=webpack:///./src/app/utils/setLogs.js?");

/***/ }),

/***/ "./src/app/utils/setRoomOptions.js":
/*!*****************************************!*\
  !*** ./src/app/utils/setRoomOptions.js ***!
  \*****************************************/
/*! exports provided: setRoomOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setRoomOptions\", function() { return setRoomOptions; });\nconst setRoomOptions = function (data) {\n  return data\n    .map((el) => `<option value='${el.room}'>${el.room}</option>`)\n    .join(\"\");\n};\n\n\n\n\n//# sourceURL=webpack:///./src/app/utils/setRoomOptions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_utils_crud__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/utils/crud */ \"./src/app/utils/crud.js\");\n/* harmony import */ var _app_utils_setLogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/utils/setLogs */ \"./src/app/utils/setLogs.js\");\n/* harmony import */ var _app_utils_setAverage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/utils/setAverage */ \"./src/app/utils/setAverage.js\");\n/* harmony import */ var _app_utils_handlechange__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/utils/handlechange */ \"./src/app/utils/handlechange.js\");\n\n\n\n\n\nconst inputField = document.getElementById(\"getInputField\"),\n  submitBtn = document.getElementById(\"submitBtn\"),\n  list = document.getElementById(\"getList\"),\n  ulLogs = document.getElementById(\"logs\"),\n  average = document.getElementById(\"average\"),\n  selector = document.getElementById(\"rooms\");\n\nwindow.onload = async function () {\n  await Object(_app_utils_handlechange__WEBPACK_IMPORTED_MODULE_3__[\"handleChange\"])();\n};\n\nconst encodeHTML = (string) => {\n  return string\n    .replace(/&/g, \"&amp;\")\n    .replace(/</g, \"&lt;\")\n    .replace(/\"/g, \"&quot;\");\n};\n//Event Listeners\n\nsubmitBtn.addEventListener(\"click\", async (e) => {\n  let inputValue = encodeHTML(inputField.value).toLowerCase();\n  let arrMainText = [...document.querySelectorAll(\".roomString\")];\n  console.log(arrMainText);\n  //check if input already created update\n  if (\n    arrMainText.some((el) => el.innerHTML.trim().toLowerCase() === inputValue)\n  ) {\n    let toBeUpdated = arrMainText.find(\n      (el) => el.innerHTML.trim().toLowerCase() === inputValue\n    );\n    let id = toBeUpdated.parentElement.id;\n    if (id) {\n      await Object(_app_utils_crud__WEBPACK_IMPORTED_MODULE_0__[\"putData\"])(id);\n      await Object(_app_utils_handlechange__WEBPACK_IMPORTED_MODULE_3__[\"handleChange\"])();\n      inputField.value = \"\";\n      return;\n    }\n  }\n  //else if new input post the new value\n  await Object(_app_utils_crud__WEBPACK_IMPORTED_MODULE_0__[\"postData\"])(inputValue);\n  await Object(_app_utils_handlechange__WEBPACK_IMPORTED_MODULE_3__[\"handleChange\"])();\n  inputField.value = \"\";\n});\n\n//submit on enter key press\nconst didPressEnter = (e) => {\n  if (e.keyCode === 13) {\n    e.preventDefault();\n    submitBtn.click();\n  }\n};\ninputField.addEventListener(\"keyup\", didPressEnter);\n\n//handle clicking card elements: detlete or update time stamp\nlist.addEventListener(\"click\", async (e) => {\n  let id;\n  let clicked = e.target;\n  if (!clicked.closest(\".liTag\")) {\n    return;\n  } else if (!clicked.closest(\".deleteBtn\")) {\n    id = clicked.closest(\".liTag\").id;\n    try {\n      await Object(_app_utils_crud__WEBPACK_IMPORTED_MODULE_0__[\"putData\"])(id);\n    } catch (e) {\n      return e;\n    }\n    await Object(_app_utils_handlechange__WEBPACK_IMPORTED_MODULE_3__[\"handleChange\"])();\n    return;\n  } else {\n    id = clicked.closest(\".liTag\").id;\n    try {\n      await Object(_app_utils_crud__WEBPACK_IMPORTED_MODULE_0__[\"deleteData\"])(id);\n    } catch (e) {\n      return e;\n    }\n    await Object(_app_utils_handlechange__WEBPACK_IMPORTED_MODULE_3__[\"handleChange\"])();\n    return;\n  }\n});\n\n//pulldown UI\nselector.addEventListener(\"change\", async (e) => {\n  let data = await Object(_app_utils_crud__WEBPACK_IMPORTED_MODULE_0__[\"getData\"])();\n  ulLogs.innerHTML = Object(_app_utils_setLogs__WEBPACK_IMPORTED_MODULE_1__[\"setLogs\"])(data, e.target.value);\n  average.innerHTML = `Weekly Average: ${Object(_app_utils_setAverage__WEBPACK_IMPORTED_MODULE_2__[\"setAverage\"])(data, e.target.value)}`;\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });