const buttons = document.querySelectorAll("button");
const inputEls = document.querySelectorAll("#yearEl, #monthEl, #dayEl");
const selectEl = document.querySelector("#monthEl");
const sexagenaryEls = document.querySelector("#sexagenaryEls tbody");

const months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

const TODAY = "today";
const CENTURY = "century";
const YEAR = "year";
const MONTH = "month";
const DAY = "day";
const EVENT_CLICK = "click";

function setMonthOptions() {
	for (let key in months) {
		optionObj = document.createElement("option");
		optionObj.text = months[key];
		optionObj.value = parseInt(key) + 1;
		selectEl.options.add(optionObj);
	}
}

function setToday(event) {
	const now = new DateUtils();
	setCalendar(now);
	if (typeof event === "undefined") setCalendarOther();
}

function addEvent() {
	for (let button of buttons) {
		button.addEventListener("click", handleCalendar);
	}

	for (let inputEl of inputEls) {
		inputEl.addEventListener("change", handleCalendar);
	}
}

function handleCalendar(event) {
	if (event.type === EVENT_CLICK) {
		const elementName = event.currentTarget.parentElement.className;
		const action = event.currentTarget.innerText;

		switch (elementName) {
			case TODAY:
				setToday(elementName);
				break;
			case CENTURY:
			case YEAR:
				changeYear(elementName, action);
				break;
			case MONTH:
				changeMonth(action);
				break;
			case DAY:
				changeDay(action);
				break;
			default:
				break;
		}
	}

	setCalendarOther();
}

function displaySexagenaryEls() {
	for (var year = -5000; year <= 2020; year++) {
		if (year === 0) continue;
		let { celestial, earthly } = getSexagenary(year);
		trObj = document.createElement("TR");

		tdObj1 = document.createElement("TD");
		tdObj1.innerHTML = year;
		tdObj2 = document.createElement("TD");
		tdObj2.innerHTML = `${celestialStem[celestial].cn}${earthlyBranches[earthly].cn}(${celestialStem[celestial].kr}${earthlyBranches[earthly].kr})년`;
		tdObj3 = document.createElement("TD");
		tdObj3.innerHTML = `${earthlyBranches[earthly].zodiac}띠`;

		trObj.appendChild(tdObj1);
		trObj.appendChild(tdObj2);
		trObj.appendChild(tdObj3);

		sexagenaryEls.appendChild(trObj);
	}
}

function init() {
	setMonthOptions();
	setToday();
	addEvent();
	displaySexagenaryEls();
}

init();
