const buttons = document.querySelectorAll("button");
const inputEls = document.querySelectorAll("#yearEl, #monthEl, #dayEl");
const selectEl = document.querySelector("#monthEl");
const sexagenaryElsByYear = document.querySelector("#sexagenaryElsByYear tbody");
const sexagenaryElsByCycle = document.querySelector("#sexagenaryElsByCycle tbody");
const selectList = document.querySelector('input[name="selectList"]:checked');
const radioEls = document.getElementsByName("selectList");

const byYearDiv = document.querySelector("#sexagenaryElsByYear");
const byCycleDiv = document.querySelector("#sexagenaryElsByCycle");

const startYear = document.querySelector("#startYear");
const endYear = document.querySelector("#endYear");

const months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

const TODAY = "today";
const CENTURY = "century";
const YEAR = "year";
const MONTH = "month";
const DAY = "day";
const SEARCH = "inputSearchEl";
const EVENT_CLICK = "click";
const SEXAGENARY = "sexagenary";
const START = -5037;
const END = new DateUtils().year;

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

	for (let i = 0; i < radioEls.length; i++) {
		radioEls[i].addEventListener("click", handleList);
	}
}

function handleList(event) {
	const element = event.target.value;
	element === YEAR ? deleteChildNodes(sexagenaryElsByYear) : deleteChildNodes(sexagenaryElsByCycle);
	displayList(element);
}

function displayList(element) {
	switch (element) {
		case YEAR:
			displaySexagenaryElsByYear();
			byYearDiv.style.display = "block";
			byCycleDiv.style.display = "none";
			break;
		case SEXAGENARY:
			displaySexagenaryElsByCycle();
			byCycleDiv.style.display = "block";
			byYearDiv.style.display = "none";
			break;
		default:
			break;
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
			case SEARCH:
				const element = getSelectRadio();
				element === YEAR ? deleteChildNodes(sexagenaryElsByYear) : deleteChildNodes(sexagenaryElsByCycle);
				displayList(element);
				break;
			default:
				break;
		}
	}

	setCalendarOther();
}

function getSelectRadio() {
	return document.querySelector('input[name="selectList"]:checked').value;
}

function deleteChildNodes(node) {
	while (node.hasChildNodes()) {
		node.removeChild(node.firstChild);
	}
}

function displaySexagenaryElsByYear() {
	const start = startYear.value ? parseInt(startYear.value) : START;
	let end = endYear.value ? parseInt(endYear.value) : END;
	if (start > end) {
		end = END;
		endYear.value = END;
	}

	for (var year = start; year <= end; year = year + 3) {
		trObj = document.createElement("TR");
		let cnt = 0;
		for (var i = year; i < year + 3; i++) {
			cnt++;
			if (i === 0) continue;
			let { celestial, earthly } = getSexagenary(i);
			tdObj1 = document.createElement("TD");
			if (i < 0) {
				tdObj1.innerHTML = `B.C. ${Math.abs(i)}`;
			} else {
				tdObj1.innerHTML = `A.D. ${i}`;
			}
			tdObj2 = document.createElement("TD");
			tdObj2.innerHTML = `${celestialStem[celestial].cn}${earthlyBranches[earthly].cn}(${celestialStem[celestial].kr}${earthlyBranches[earthly].kr})`;
			tdObj3 = document.createElement("TD");
			tdObj3.innerHTML = `${earthlyBranches[earthly].zodiac}`;

			if (celestial === 1 && earthly === 1) {
				tdObj1.style.backgroundColor = "#f1c40f";
				tdObj2.style.backgroundColor = "#f1c40f";
				tdObj3.style.backgroundColor = "#f1c40f";
			}

			if (cnt === 2) {
				tdObj1.style.borderLeft = "1px solid #ccc";
				tdObj3.style.borderRight = "1px solid #ccc";
			}

			trObj.appendChild(tdObj1);
			trObj.appendChild(tdObj2);
			trObj.appendChild(tdObj3);
		}

		sexagenaryElsByYear.appendChild(trObj);
	}
}

function displaySexagenaryElsByCycle() {
	const start = startYear.value ? parseInt(startYear.value) : START;
	const end = endYear.value ? parseInt(endYear.value) : END;

	const list = getCycle();

	for (let i = 0; i < list.length; i++) {
		trObj = document.createElement("TR");

		tdObj1 = document.createElement("TD");
		tdObj1.innerHTML = list[i].sexagenary;
		tdObj2 = document.createElement("TD");
		tdObj2.innerHTML = list[i].zodiac;
		tdObj3 = document.createElement("TD");
		tdObj4 = document.createElement("TD");
		let bcYears = "";
		let adYears = "";
		for (var year = start; year <= end; year++) {
			const { celestial, earthly } = getSexagenary(year);
			if (celestial === list[i].cNo && earthly === list[i].eNo) {
				if (year < 0) {
					bcYears = bcYears + `${Math.abs(year)}, `;
				} else {
					adYears = adYears + `${year}, `;
				}
			}
		}
		tdObj3.innerHTML = bcYears;
		tdObj4.innerHTML = adYears;

		tdObj3.style.borderLeft = "1px solid #ccc";
		tdObj3.style.borderRight = "1px solid #ccc";

		trObj.appendChild(tdObj1);
		trObj.appendChild(tdObj2);
		trObj.appendChild(tdObj3);
		trObj.appendChild(tdObj4);
		sexagenaryElsByCycle.appendChild(trObj);
	}
}

function init() {
	setMonthOptions();
	setToday();
	addEvent();
	displaySexagenaryElsByYear();
}

init();
