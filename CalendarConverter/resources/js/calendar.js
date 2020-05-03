const yearEl = document.getElementById("yearEl");
const monthEl = document.getElementById("monthEl");
const dayEl = document.getElementById("dayEl");
const hourEl = document.getElementById("hourEl");
const minuteEl = document.getElementById("minuteEl");
const secondEl = document.getElementById("secondEl");
const weekdayEl = document.getElementById("weekdayEl");
const leapEl = document.getElementById("leapEl");

const week = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
const NORMAL_YEAR = "Normal year";
const LEAP_YEAR = "Leap year";

const LESS_THAN = "<";
const GREATER_THAN = ">";
const UNIT = 1;
const FIRST = 1;
const LAST_MONTH = 12;

function setCalendar(dateObj) {
	setYear(dateObj.year);
	setMonth(dateObj.month);
	setDay(dateObj.day);
	setTime(dateObj.hour, dateObj.minute, dateObj.second);
	setWeekday(dateObj.weekday);
	setLeap();
}

// Gregorian Date Year Setting
function setYear(value) {
	yearEl.value = value;
}

// Gregorian Date Month Setting
function setMonth(value) {
	for (i = 0; i < monthEl.options.length; i++) {
		if (monthEl.options[i].value === value.toString()) {
			monthEl.options[i].selected = "selected";
		}
	}
}

// Gregorian Date Day Setting
function setDay(value) {
	dayEl.value = value;
}

// Gregorian Date Leap or Normal setting
function setLeap() {
	if ((yearEl.value % 4 === 0 && yearEl.value % 100 !== 0) || yearEl.value % 400 === 0) {
		leapEl.value = LEAP_YEAR;
	} else {
		leapEl.value = NORMAL_YEAR;
	}
}

// Gregorian Date Time Setting
function setTime(hour, minute, second) {
	hourEl.value = hour < 10 ? `0${hour}` : hour;
	minuteEl.value = minute < 10 ? `0${minute}` : minute;
	secondEl.value = second < 10 ? `0${second}` : second;
}

// Gregorian Date Weekday setting
function setWeekday() {
	const value = new Date(yearEl.value, parseInt(monthEl.value) - 1, dayEl.value);
	weekdayEl.value = week[value.getDay()];
}

// Gregorian Date Year Change
function changeYear(element, action) {
	const units = element === CENTURY ? 100 : UNIT;
	const year = parseInt(yearEl.value);
	if (action === LESS_THAN) {
		if (year - units === 0) {
			yearEl.value = year - units - UNIT;
		} else {
			yearEl.value = year - units;
		}
	} else {
		if (year + units === 0) {
			yearEl.value = year + units + UNIT;
		} else {
			yearEl.value = year + units;
		}
	}
}

// Gregorian Date Month Change
function changeMonth(action) {
	const year = parseInt(yearEl.value);
	const month = parseInt(monthEl.value);
	if (action === LESS_THAN) {
		monthEl.value = month - UNIT;
		if (monthEl.value === "") {
			monthEl.value = LAST_MONTH;
			if (year - UNIT === 0) {
				yearEl.value = year - UNIT - 1;
			} else {
				yearEl.value = year - UNIT;
			}
		}
	} else {
		monthEl.value = month + UNIT;
		if (monthEl.value === "") {
			monthEl.value = FIRST;
			if (year + UNIT === 0) {
				yearEl.value = year + UNIT + 1;
			} else {
				yearEl.value = year + UNIT;
			}
		}
	}
}

// Gregorian Date Day Change
function changeDay(action) {
	const day = parseInt(dayEl.value);
	const month = parseInt(monthEl.value);
	const year = parseInt(yearEl.value);
	const lastDay = calLastDay(month);

	if (action === LESS_THAN) {
		if (day - UNIT === 0) {
			dayEl.value = calLastDay(month - UNIT);
			if (month - UNIT === 0) {
				monthEl.value = LAST_MONTH;
				if (year - UNIT === 0) {
					yearEl.value = year - UNIT - 1;
				} else {
					yearEl.value = year - UNIT;
				}
			} else {
				monthEl.value = month - UNIT;
			}
		} else {
			dayEl.value = day - UNIT;
		}
	} else {
		if (day === lastDay) {
			dayEl.value = FIRST;
			if (month === LAST_MONTH) {
				monthEl.value = FIRST;
				if (year + UNIT === 0) {
					yearEl.value = year + UNIT + 1;
				} else {
					yearEl.value = year + UNIT;
				}
			} else {
				monthEl.value = month + UNIT;
			}
		} else {
			dayEl.value = day + UNIT;
		}
	}
}

function calLastDay(month) {
	switch (month) {
		case 2:
			lastDay = leapEl.value === LEAP_YEAR ? 29 : 28;
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			lastDay = 30;
			break;
		default:
			lastDay = 31;
			break;
	}
	return lastDay;
}
