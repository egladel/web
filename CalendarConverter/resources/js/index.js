const buttons = document.querySelectorAll("button");
const inputEls = document.querySelectorAll("#yearEl, #monthEl, #dayEl");

const months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

const TODAY = "today";
const CENTURY = "century";
const YEAR = "year";
const MONTH = "month";
const DAY = "day";

function setToday() {
	const now = new Utils();
	setCalendar(now);
}

function addButtonsEventListener() {
	for (let button of buttons) {
		button.addEventListener("click", handleCalendar);
	}
}

function addInputElsEventListener() {
	for (let inputEl of inputEls) {
		inputEl.addEventListener("change", changeCalendar);
	}
}

function changeCalendar(event) {
	const elementName = event.target.id;
	switch (elementName) {
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
	setLeap();
	setWeekday();
}

function handleCalendar(event) {
	const elementName = event.currentTarget.parentElement.className;
	const action = event.currentTarget.innerText;

	switch (elementName) {
		case TODAY:
			setToday();
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
	setLeap();
	setWeekday();
}

function init() {
	setToday();
	addButtonsEventListener();
	addInputElsEventListener();
}

init();
